import { BROKEN_IMAGE } from '../utils-core';
export const handleImageNotFoundError = (
  imageName: string,
  event: Event,
): void => {
  const target = event.target as HTMLImageElement | null;
  const fallback = BROKEN_IMAGE;

  if (target && target.tagName === 'IMG') {
    if (!target.src.includes('broken-image.jpg')) {
      target.onerror = null;
      const parentElement = target.parentElement as HTMLImageElement;

      if (
        parentElement &&
        parentElement?.childElementCount &&
        parentElement?.firstElementChild?.tagName === 'SOURCE'
      ) {
        Array.from(parentElement.children).forEach((element) => {
          element.setAttribute('srcset', fallback);
          if (element.hasAttribute('src')) {
            element.setAttribute('src', fallback);
          }
        });
      } else {
        target.setAttribute('src', fallback);
        if (target.hasAttribute('srcset')) {
          target.setAttribute('srcset', fallback);
        }
      }
    }
  }

  console.error('Image not found error:', imageName);
};

export const getUUID = (): string => {
  return window.crypto.randomUUID();
};
