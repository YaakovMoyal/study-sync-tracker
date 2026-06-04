import { Request, Response } from 'express';
import { config } from '../config/env';

export function getHealth(_req: Request, res: Response): void {
  res.json({ status: 'ok', app: config.appName });
}
