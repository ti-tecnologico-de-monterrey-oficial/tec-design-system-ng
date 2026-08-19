import type {
  BmbValueCounterFormatter,
  BmbValueCounterParts,
} from '../../types/components/value-counter';

export const defaultValueCounterFormatter: BmbValueCounterFormatter = (
  progress,
  total,
) => `${progress}/${total}`;

export const formatValueCounter = (
  progress: string,
  total: string,
  formatter: BmbValueCounterFormatter = defaultValueCounterFormatter,
): string => formatter(progress, total);

export const splitValueCounter = (
  formattedText: string,
  separator = '/',
): BmbValueCounterParts => {
  const effectiveSeparator = separator || '/';
  const separatorIndex = formattedText.indexOf(effectiveSeparator);

  if (separatorIndex < 0) {
    return { progress: '', total: formattedText };
  }

  return {
    progress: formattedText.slice(0, separatorIndex),
    total: formattedText.slice(separatorIndex + effectiveSeparator.length),
  };
};
