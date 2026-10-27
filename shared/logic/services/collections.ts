/** Immutable operations; adapters retain IDs, timing, callbacks and reactive emissions. */
export function appendItems<T>(items: T[], additions: T[]): T[] {
  return [...items, ...additions];
}

export function removeItemBy<T, K extends keyof T>(
  items: T[],
  key: K,
  id: T[K],
): T[] {
  return items.filter((item) => item[key] !== id);
}

export function patchItemBy<T, K extends keyof T>(
  items: T[],
  key: K,
  id: T[K],
  patch: Partial<T>,
): T[] {
  return items.map((item) => (item[key] !== id ? item : { ...item, ...patch }));
}

export function hasItemBy<T, K extends keyof T>(
  items: T[],
  key: K,
  id: T[K],
): boolean {
  return items.some((item) => item[key] === id);
}

export function findItemBy<T, K extends keyof T>(
  items: T[],
  key: K,
  id: T[K],
): T | undefined {
  return items.find((item) => item[key] === id);
}
