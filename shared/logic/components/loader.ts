export function shouldShowLoaderOverlay(
  overlay: boolean,
  errorState: boolean,
): boolean {
  return overlay && !errorState;
}

export function getLoaderClasses(
  overlay: boolean,
  errorState: boolean,
): Record<string, boolean> {
  return {
    'bmb_loader-modal': shouldShowLoaderOverlay(overlay, errorState),
    'bmb_loader-error': errorState,
  };
}

export function getLoaderErrorIconClass(appearance: string): string {
  return `bmb_loader-error-icon-${appearance}`;
}
