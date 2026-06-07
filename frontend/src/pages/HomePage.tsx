import { useState } from 'react';
import {
  getHealth,
  getAppStatus,
  type HealthResponse,
  type AppStatusResponse,
} from '../api/client';
import { useClickCounter } from '../hooks/useClickCounter';

// Turns the backend's ISO timestamp into something human-readable.
function formatTime(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : date.toLocaleString();
}

// Turns uptime in seconds into "1h 02m 03s".
function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${h}h ${pad(m)}m ${pad(s)}s`;
}

export default function HomePage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [healthError, setHealthError] = useState<string | null>(null);
  const [healthLoading, setHealthLoading] = useState(false);

  const [status, setStatus] = useState<AppStatusResponse | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);

  // Closure-based hook: counts how many times the health button was clicked.
  const { count: healthClicks, increment: countHealthClick } = useClickCounter();

  async function checkHealth() {
    countHealthClick(); // bump the click counter on every press
    setHealthLoading(true);
    setHealthError(null);
    try {
      setHealth(await getHealth());
    } catch (err) {
      // Network failure or non-2xx: surface a clear message.
      setHealthError(
        err instanceof Error ? err.message : 'ה־backend לא זמין כרגע'
      );
      setHealth(null);
    } finally {
      setHealthLoading(false);
    }
  }

  async function checkStatus() {
    setStatusLoading(true);
    setStatusError(null);
    try {
      setStatus(await getAppStatus());
    } catch (err) {
      setStatusError(
        err instanceof Error ? err.message : 'ה־backend לא זמין כרגע'
      );
      setStatus(null);
    } finally {
      setStatusLoading(false);
    }
  }

  return (
    <section>
      <h2>Backend connection</h2>
      <button onClick={checkHealth} disabled={healthLoading}>
        {healthLoading ? 'Checking…' : 'Check backend connection'}
      </button>
      <span style={{ marginInlineStart: '0.5rem', color: '#666' }}>
        Clicks: {healthClicks}
      </span>

      {health && (
        <dl style={{ background: '#f5f5f5', padding: '0.75rem', borderRadius: 6 }}>
          <div>
            <strong>Status:</strong> {health.status}
          </div>
          <div>
            <strong>Version:</strong> {health.version}
          </div>
          <div>
            <strong>Time:</strong> {formatTime(health.time)}
          </div>
        </dl>
      )}

      {healthError && (
        <p style={{ color: 'crimson' }}>
          ה־backend לא זמין כרגע — {healthError}
        </p>
      )}

      <h2 style={{ marginTop: '2rem' }}>App status</h2>
      <button onClick={checkStatus} disabled={statusLoading}>
        {statusLoading ? 'Loading…' : 'Load app status'}
      </button>

      {status && (
        <p style={{ background: '#f5f5f5', padding: '0.75rem', borderRadius: 6 }}>
          Environment: <strong>{status.environment}</strong> · Uptime:{' '}
          <strong>{formatUptime(status.uptimeSeconds)}</strong>
        </p>
      )}

      {statusError && (
        <p style={{ color: 'crimson' }}>
          ה־backend לא זמין כרגע — {statusError}
        </p>
      )}
    </section>
  );
}
