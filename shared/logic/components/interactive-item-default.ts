export function getInteractiveItemDefaultIcon(
  isActive: boolean | undefined,
): string {
  return isActive ? 'check' : 'chevron_right';
}

export function getInteractiveItemDefaultSubtitle(
  isActive: boolean | undefined,
): string {
  return isActive
    ? 'interactive_item_default.active'
    : 'interactive_item_default.inactive';
}
