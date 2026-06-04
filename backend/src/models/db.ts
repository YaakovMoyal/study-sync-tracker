import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { config } from '../config/env';

// Make sure the folder that will hold the SQLite file exists.
const dbDir = path.dirname(config.databaseFile);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new Database(config.databaseFile);

// Sensible defaults for a local app.
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

/**
 * Create the initial schema if it does not exist yet.
 * For this learning project we treat "run on startup" as our migration step.
 */
export function initSchema(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      email         TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at    TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
}
