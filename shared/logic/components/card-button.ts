import { IBmbImageInfo, IBmbLinkConfiguration } from '../../types';

export function truncateCardButtonText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

export function shouldEmitCardButtonAddContent(
  isFullInteractive: boolean,
  leftContent: boolean,
  leftContentIcon: string,
  leftContentImage: IBmbImageInfo | undefined,
  textLink: IBmbLinkConfiguration | undefined,
): boolean {
  return (
    (isFullInteractive &&
      leftContent &&
      !leftContentIcon &&
      !!leftContentImage &&
      !textLink) ||
    !isFullInteractive
  );
}
