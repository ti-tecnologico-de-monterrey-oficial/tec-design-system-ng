export const countUnreadItems = <T extends { isRead: boolean }>(
  items: readonly T[],
): number => items.reduce((total, item) => total + Number(!item.isRead), 0);
