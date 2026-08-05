/**
 * Pure logic shared by the Angular bmb-icon implementation.
 */

export class BmbIconLogic {
  static isImage(icon: string): boolean {
    const regx = /\.|\//gm;
    return regx.test(icon);
  }

  static getFontVariationSettings(): string {
    return "wght 400, grad 200, opsz 40";
  }

  static getImageStyles(size?: number): Record<string, string> {
    return {
      width: size ? `${size}px` : '1em',
      height: size ? `${size}px` : '1em',
      display: 'block',
    };
  }
}
