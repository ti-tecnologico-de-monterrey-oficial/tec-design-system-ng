export function hasPortalToastNotification(
  notifications: { component?: string }[],
): boolean {
  return notifications.some((n) => n.component === 'toast');
}
