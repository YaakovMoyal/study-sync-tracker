import { Request, Response } from 'express';
import { config } from '../config/env';

/**
 * GET /health
 * Liveness/health check. Returns a richer payload so the frontend can
 * show what it is talking to and when.
 * Always 200 when the process is up enough to answer.
 */
export function getHealth(_req: Request, res: Response): void {
  res.status(200).json({
    status: 'ok',
    app: config.appName,
    version: config.appVersion,
    time: new Date().toISOString(), // ISO timestamp, formatted on the client
  });
}
