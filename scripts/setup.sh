#!/usr/bin/env bash
set -euo pipefail
# Project GenAtlasX automatic setup script (v2)
# Fully automatic: installs deps, builds, docs, builds docker images, starts services, and opens live docs URL.

PROJ_NAME="Project GenAtlasX"
BANNER=$(cat <<'B'
───────────────────────────────────────────────
   🌌  PROJECT GENATLASX — SETUP INITIALIZER  
───────────────────────────────────────────────
     Created by CyberDevil & GPT-5  |  2025
───────────────────────────────────────────────
B
)
LIVE_DOCS_URL="https://cyberdevil.github.io/GenAtlasX/docs"

echo -e "\033[36m${BANNER}\033[0m"

# Check Node.js and npm
if command -v node >/dev/null 2>&1; then
  echo "✔ Node: $(node --version)"
else
  echo "⚠ Node.js not found. Please install Node.js v18+ and re-run."
fi

if command -v npm >/dev/null 2>&1; then
  echo "✔ npm: $(npm --version)"
else
  echo "⚠ npm not found. Please install npm and re-run."
fi

# Copy env example if needed
if [ ! -f .env.local ] && [ -f .env.example ]; then
  cp .env.example .env.local
  echo "✔ .env.local created from .env.example"
fi

# Install node dependencies
if [ -f package.json ]; then
  echo "Installing npm dependencies (this may take a while)..."
  npm ci --silent
fi

# Build the app (if build script exists)
if npm run | grep -q " build"; then
  echo "Building project..."
  npm run build || echo "Build failed or skipped"
fi

# Build docs with mkdocs if mkdocs.yml present
if [ -f mkdocs.yml ]; then
  if command -v mkdocs >/dev/null 2>&1; then
    echo "Building MkDocs documentation..."
    mkdocs build
  else
    echo "mkdocs not found; attempting to install pip package 'mkdocs'..."
    if command -v pip >/dev/null 2>&1; then
      pip install --user mkdocs mkdocs-material || true
      ~/.local/bin/mkdocs build || echo "MkDocs build attempted; please run 'mkdocs build' manually if needed."
    else
      echo "pip not available; skipping docs build."
    fi
  fi
fi

# Build docker images if docker-compose.yml present and docker available
if [ -f docker-compose.yml ] && command -v docker >/dev/null 2>&1; then
  echo "Building Docker images..."
  docker compose build --no-cache || echo "Docker build had issues (continue)"
  echo "Starting containers in detached mode..."
  docker compose up --build -d || echo "Docker compose up failed or skipped"
else
  echo "Docker or docker-compose not available or compose file missing; skipping docker step."
fi

echo ""
echo "🎉 Setup complete!"
echo "You can run the application using:"
echo "  npm run start:all"
echo "or using Docker:"
echo "  docker compose up --build"
echo ""
echo "Attempting to open live docs URL: ${LIVE_DOCS_URL}"

# Open the live docs URL in the default browser if possible
if command -v xdg-open >/dev/null 2>&1; then
  xdg-open "${LIVE_DOCS_URL}" >/dev/null 2>&1 || true
elif command -v open >/dev/null 2>&1; then
  open "${LIVE_DOCS_URL}" || true
elif command -v start >/dev/null 2>&1; then
  start "${LIVE_DOCS_URL}" || true
else
  echo "Open the docs in your browser: ${LIVE_DOCS_URL}"
fi

echo "───────────────────────────────────────────────"
echo "Setup finished. Happy hacking, CyberDevil! ⚡"
echo "───────────────────────────────────────────────"
