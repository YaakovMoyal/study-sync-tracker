import { Request, Response } from 'express';
import { config } from '../config/env';
import { createError } from '../middleware/errorHandler';
import { requestCounter } from '../utils/requestCounter';

/**
 * GET /status/app
 * General information about the running app: how long it has been up
 * and which environment it thinks it is in.
 *
 * Optional query param `verbose=true|false`:
 *   - omitted        -> compact response
 *   - true           -> include extra fields
 *   - false          -> compact response
 *   - anything else  -> controlled 400 error (demonstrates error handling)
 *
 * Returns 200 when healthy, 400 for a bad query param.
 */
export function getAppStatus(req: Request, res: Response): void {
  const { verbose } = req.query;

  // Validate the (optional) query param. A bad value is a *client* mistake,
  // so we throw a controlled 400 instead of letting it become a 500.
  let isVerbose = false;
  if (verbose !== undefined) {
    if (verbose !== 'true' && verbose !== 'false') {
      throw createError(
        400,
        "Invalid query param 'verbose': expected 'true' or 'false'."
      );
    }
    isVerbose = verbose === 'true';
  }

  const uptimeSeconds = Math.floor(process.uptime());

  // Same shared closure as /health: increment() updates the private count
  // that lives inside requestCounter and is remembered between requests.
  const requestCount = requestCounter.increment();

  const body: Record<string, unknown> = {
    app: config.appName,
    environment: config.environment, // e.g. "dev"
    uptimeSeconds, // process run time in seconds
    requestCount, // cumulative across /health and /status/app
  };

  // Extra detail only when explicitly requested.
  if (isVerbose) {
    body.version = config.appVersion;
    body.nodeVersion = process.version;
    body.time = new Date().toISOString();
  }

  res.status(200).json(body);
}
