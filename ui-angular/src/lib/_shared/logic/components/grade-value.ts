export const truncateGradeValue = (
  score: number | string | undefined,
): string => String(score ?? '').substring(0, 4);
