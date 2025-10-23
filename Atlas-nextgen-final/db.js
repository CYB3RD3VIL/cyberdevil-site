const path = require('path');
const Database = require('better-sqlite3');
const dbPath = process.env.DB_PATH || path.join(process.cwd(), 'data', 'dev.db');
const db = new Database(dbPath);

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  name TEXT,
  password TEXT,
  createdAt TEXT
);
CREATE TABLE IF NOT EXISTS teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  slug TEXT UNIQUE,
  createdAt TEXT
);
CREATE TABLE IF NOT EXISTS team_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  teamId INTEGER,
  userId INTEGER,
  role TEXT,
  addedAt TEXT
);
CREATE TABLE IF NOT EXISTS invites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  teamId INTEGER,
  email TEXT,
  token TEXT UNIQUE,
  role TEXT,
  createdAt TEXT,
  redeemedAt TEXT
);
CREATE TABLE IF NOT EXISTS docs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  title TEXT,
  content TEXT,
  ownerId INTEGER,
  teamId INTEGER,
  createdAt TEXT
);
`);

module.exports = db;
