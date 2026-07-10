import { isImage } from '../../utils/utils';

export class BmbIconLogic {
  static isImage(icon: string): boolean {
    return isImage(icon);
  }

  static getImageStyles(size?: number) {
    return {
      width: size ? `${size}px` : '1em',
      height: size ? `${size}px` : '1em',
    };
  }

  static getFontVariationSettings(): string {
    return "'FILL' 1, wght 400";
  }

  static getSvgName(path: string): string {
    if (!isImage(path)) return path;

    return path.substring(
      path.lastIndexOf('/') + 1,
      path.lastIndexOf('.'),
    );
  }
}