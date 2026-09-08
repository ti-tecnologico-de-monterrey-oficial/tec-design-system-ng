export const STEP_PROGRESS_BAR_MOBILE_TABLET_QUERY = '(max-width: 992px)';

export const truncateStepProgressLabel = (
  value?: string,
  maximumLength = 90,
): string =>
  value
    ? value.length > maximumLength
      ? `${value.slice(0, maximumLength).trimEnd()}…`
      : value
    : '';

export const getStepProgressIndexes = (totalSteps: number): number[] =>
  Array.from({ length: Math.max(0, totalSteps || 0) }, (_, index) => index);

export const getStepProgressNumber = (index: number): number => index + 1;

export const getActiveStepProgressNumber = (activeStep: number): number =>
  activeStep + 1;
