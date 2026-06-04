import { Request, Response, NextFunction } from 'express';

// Catches any request that did not match a route.
export function notFound(_req: Request, res: Response): void {
  res.status(404).json({ error: 'Not Found' });
}

// Central error handler. Express identifies it by its 4 arguments.
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}
