export function resolveInitialTheme(
  savedTheme: string | null,
  defaultTheme: string,
): string {
  return savedTheme || defaultTheme;
}

export function resolveRequestedTheme(
  savedTheme: string | null,
  requestedTheme: string | undefined,
  defaultTheme: string,
): string {
  return savedTheme || requestedTheme || defaultTheme;
}
