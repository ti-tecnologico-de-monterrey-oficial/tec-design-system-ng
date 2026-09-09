export function resolveBalanceOverviewProgressCircleTitle(
  title: string | string[],
): string | string[] {
  return Array.isArray(title) && title.length === 0 ? '' : title;
}
