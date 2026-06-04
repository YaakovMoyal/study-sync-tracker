import { Request, Response, NextFunction } from 'express';

/**
 * An error that carries an HTTP status code.
 * Route handlers throw this for *known* / controlled failures
 * (e.g. a bad query parameter -> 400) so the central handler can
 * respond with the right status instead of a generic 500.
 */
export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

// Small helper so controllers can do: throw createError(400, '...').
export function createError(status: number, message: string): HttpError {
  return new HttpError(status, message);
}

// Catches any request that did not match a route -> 404 Not Found.
export function notFound(_req: Request, res: Response): void {
  res.status(404).json({ error: 'Not Found' });
}

/**
 * Central error handler. Express identifies it by its 4 arguments.
 *
 * - For known errors we trust err.status (e.g. 400) and err.message.
 * - For anything unexpected we fall back to 500 Internal Server Error
 *   and hide the raw message from the client.
 */
export function errorHandler(
  err: Error & { status?: number },
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // A valid client/server status was set explicitly -> use it.
  const hasExplicitStatus =
    typeof err.status === 'number' && err.status >= 400 && err.status <= 599;
  const status = hasExplicitStatus ? (err.status as number) : 500;

  // Only leak the message for controlled errors; mask unexpected ones.
  const message = hasExplicitStatus ? err.message : 'Internal Server Error';

  // Always log the full error server-side for debugging.
  console.error(err);

  res.status(status).json({ error: message });
}
