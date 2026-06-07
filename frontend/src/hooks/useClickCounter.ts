import { useState, useCallback } from 'react';

/**
 * Closure demo (Day 2: scope / hoisting / closures).
 *
 * `useClickCounter` is a tiny hook that counts button clicks. The returned
 * `increment` function is a closure: it "closes over" React's `setCount`
 * updater. We use the `prev => prev + 1` form so the closure always reads
 * the latest value from React instead of a stale `count` captured at render
 * time — a classic closure gotcha worth pointing out on a study day.
 */
export function useClickCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  // useCallback keeps the same closure between renders (stable reference).
  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return { count, increment };
}
