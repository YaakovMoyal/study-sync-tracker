import { useState } from 'react';
import { getHealth, type HealthResponse } from '../api/client';

export default function HomePage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function checkConnection() {
    setLoading(true);
    setError(null);
    try {
      const result = await getHealth();
      setHealth(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setHealth(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <h2>Backend connection</h2>
      <button onClick={checkConnection} disabled={loading}>
        {loading ? 'Checking…' : 'Check backend connection'}
      </button>

      {health && (
        <pre style={{ background: '#f5f5f5', padding: '0.75rem' }}>
          {JSON.stringify(health, null, 2)}
        </pre>
      )}

      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
    </section>
  );
}
