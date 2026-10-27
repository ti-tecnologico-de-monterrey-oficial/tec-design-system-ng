/** Lookup policy is explicit because existing Angular and React traversal differs. */
export function translateDictionary(
  dictionary: unknown,
  keyList: string,
  objectsOnly = false,
): string {
  const value = keyList?.split('.').reduce<any>((current, key) => {
    if (
      objectsOnly &&
      (!current || typeof current !== 'object' || !(key in current))
    )
      return undefined;
    return current?.[key];
  }, dictionary);
  return typeof value === 'string' ? value : keyList;
}

/** Existing dictionary updates are shallow, rather than recursive merges. */
export function mergeDictionary<T extends object>(
  current: T | undefined,
  incoming: T,
): T {
  return { ...current, ...incoming };
}
