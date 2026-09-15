// Umbrales oficiales de Core Web Vitals para Largest Contentful Paint (ms).
// https://web.dev/articles/lcp
export const LCP_BUDGET = {
  good: 2500,
  needsImprovement: 4000,
};

export function classifyLcp(lcpMs) {
  if (lcpMs == null || Number.isNaN(lcpMs)) return 'unknown';
  if (lcpMs <= LCP_BUDGET.good) return 'good';
  if (lcpMs <= LCP_BUDGET.needsImprovement) return 'needs-improvement';
  return 'poor';
}

export const STATUS_EMOJI = {
  good: '🟢',
  'needs-improvement': '🟡',
  poor: '🔴',
  unknown: '⚪️',
};
