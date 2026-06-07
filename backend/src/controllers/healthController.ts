import { Request, Response } from 'express';
import { config } from '../config/env';
import { requestCounter } from '../utils/requestCounter';

/**
 * GET /health
 * Liveness/health check. Returns a richer payload so the frontend can
 * show what it is talking to and when.
 * Always 200 when the process is up enough to answer.
 */
export function getHealth(_req: Request, res: Response): void {
  // Closure in action: the count is kept inside requestCounter's scope and
  // persists between requests (see utils/requestCounter.ts).
  const requestCount = requestCounter.increment();

  res.status(200).json({
    status: 'ok',
    app: config.appName,
    version: config.appVersion,
    time: new Date().toISOString(), // ISO timestamp, formatted on the client
    requestCount, // how many times the tracked endpoints were hit
  });
}
