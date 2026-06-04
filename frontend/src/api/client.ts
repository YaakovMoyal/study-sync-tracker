const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

export interface HealthResponse {
  status: string;
  app: string;
  version: string;
  time: string; // ISO timestamp
}

export interface AppStatusResponse {
  app: string;
  environment: string;
  uptimeSeconds: number;
  // Present only when requested with ?verbose=true:
  version?: string;
  nodeVersion?: string;
  time?: string;
}

// Shape of the backend's error payload: { error: string }.
async function extractError(res: Response, fallback: string): Promise<string> {
  try {
    const body = (await res.json()) as { error?: string };
    return body.error ?? fallback;
  } catch {
    return fallback;
  }
}

// Calls GET /health on the backend.
export async function getHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_BASE_URL}/health`);
  if (!res.ok) {
    throw new Error(await extractError(res, `Health check failed (${res.status})`));
  }
  return (await res.json()) as HealthResponse;
}

// Calls GET /status/app on the backend.
export async function getAppStatus(): Promise<AppStatusResponse> {
  const res = await fetch(`${API_BASE_URL}/status/app`);
  if (!res.ok) {
    throw new Error(await extractError(res, `Status check failed (${res.status})`));
  }
  return (await res.json()) as AppStatusResponse;
}
