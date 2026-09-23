import type { IBmbAcademicProgressMetric } from '../../types/components/academic-progress';
import type { IBmbNameValuePair } from '../../types/utils';

export const copyAcademicProgressMetrics = (
  metrics: IBmbAcademicProgressMetric[],
): IBmbAcademicProgressMetric[] =>
  metrics.map(({ name, value }) => ({ name, value }));

export const getAcademicProgressMetrics = (
  accredited: IBmbNameValuePair,
  average: IBmbNameValuePair,
  summary: IBmbNameValuePair,
): IBmbAcademicProgressMetric[] =>
  [accredited, average, summary].map(({ name, value }) => ({
    name,
    // Preserve legacy values at runtime: this assertion does not coerce them.
    value: value as number,
  }));

export const shouldShowAcademicProgressMetric = (
  metric: IBmbNameValuePair,
): boolean => typeof metric.value === 'number';

export const getMissingAcademicProgressInputs = (
  accredited?: IBmbNameValuePair,
  average?: IBmbNameValuePair,
  summary?: IBmbNameValuePair,
): string[] => {
  const missing: string[] = [];
  if (!accredited) missing.push('accredited');
  if (!average) missing.push('average');
  if (!summary) missing.push('summary');
  return missing;
};
