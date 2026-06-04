import dotenv from 'dotenv';
import path from 'path';

// Load variables from backend/.env into process.env.
dotenv.config();

export const config = {
  appName: 'Study Sync – Fullstack Learning Tracker',
  appVersion: '0.1.0',
  // Defaults to 'dev' so the health/status endpoints always report something.
  environment: process.env.NODE_ENV || 'dev',
  port: Number(process.env.PORT) || 4000,
  databaseFile: process.env.DATABASE_FILE
    ? path.resolve(process.cwd(), process.env.DATABASE_FILE)
    : path.resolve(process.cwd(), 'data', 'study-sync.sqlite'),
};
