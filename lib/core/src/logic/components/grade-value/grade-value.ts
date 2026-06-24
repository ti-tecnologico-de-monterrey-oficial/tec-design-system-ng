import { IBmbContrast } from '../../../../types/colors';

export type IBmbGradeType =
  | 'main-grade'
  | 'partial-grade';

export const getTruncatedScore = (
  score: number | string | undefined,
): string => {
  return String(score ?? '').substring(0, 4);
};