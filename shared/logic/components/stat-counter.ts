export function getStatCounterStepsArray(totalSteps: number): number[] {
  return new Array(totalSteps || 0).fill(0).map((_, i) => i);
}
