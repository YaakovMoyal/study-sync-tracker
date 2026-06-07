/**
 * Closure demo (Day 2: scope / hoisting / closures).
 *
 * `createRequestCounter` returns two functions that both "close over" the
 * same private `count` variable. That variable lives in this function's
 * scope, not in the global scope, so it cannot be touched from outside —
 * the only way to change it is through `increment()`. Because the closure
 * keeps the scope alive, `count` survives between calls and remembers its
 * value: that is the state we are after.
 */
export interface RequestCounter {
  increment(): number; // bumps the count and returns the new value
  getCount(): number; // reads the current count without changing it
}

export function createRequestCounter(): RequestCounter {
  // Private state. Only the closures below can see this binding.
  let count = 0;

  return {
    increment() {
      count += 1;
      return count;
    },
    getCount() {
      return count;
    },
  };
}

// One shared counter for the whole app. Every controller that imports this
// gets the *same* closure instance, so the count is cumulative across routes.
export const requestCounter = createRequestCounter();
