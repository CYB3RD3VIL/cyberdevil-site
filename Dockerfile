# Use the official lightweight Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy project files into container
COPY . .

# Install MkDocs and any plugins/themes you use
RUN pip install --no-cache-dir mkdocs mkdocs-material

# Expose MkDocs default port
EXPOSE 8000

# Run MkDocs development server
CMD ["mkdocs", "serve", "-a", "0.0.0.0:8000"]

