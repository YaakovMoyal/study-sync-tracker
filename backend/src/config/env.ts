import dotenv from 'dotenv';
import path from 'path';

// Load variables from backend/.env into process.env.
dotenv.config();

export const config = {
  appName: 'Study Sync',
  port: Number(process.env.PORT) || 4000,
  databaseFile: process.env.DATABASE_FILE
    ? path.resolve(process.cwd(), process.env.DATABASE_FILE)
    : path.resolve(process.cwd(), 'data', 'study-sync.sqlite'),
};
