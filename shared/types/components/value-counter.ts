export type BmbValueCounterFormatter = (
  progress: string,
  total: string,
) => string;

export interface BmbValueCounterParts {
  progress: string;
  total: string;
}
