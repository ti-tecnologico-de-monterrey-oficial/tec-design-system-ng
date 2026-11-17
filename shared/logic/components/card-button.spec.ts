import { shouldEmitCardButtonAddContent, truncateCardButtonText } from './card-button';

describe('card-button', () => {
  describe('truncateCardButtonText', () => {
    it('should truncate text longer than maxLength', () => {
      expect(truncateCardButtonText('abcdefgh', 4)).toBe('abcd...');
    });

    it('should return the text unchanged when within maxLength', () => {
      expect(truncateCardButtonText('abc', 4)).toBe('abc');
    });
  });

  describe('shouldEmitCardButtonAddContent', () => {
    it('should be true when not fully interactive', () => {
      expect(
        shouldEmitCardButtonAddContent(false, false, '', undefined, undefined),
      ).toBe(true);
    });

    it('should be true when fully interactive with a left content image and no icon or textLink', () => {
      expect(
        shouldEmitCardButtonAddContent(
          true,
          true,
          '',
          { src: 'img.png' } as any,
          undefined,
        ),
      ).toBe(true);
    });

    it('should be false when fully interactive but leftContent is false', () => {
      expect(
        shouldEmitCardButtonAddContent(true, false, '', undefined, undefined),
      ).toBe(false);
    });

    it('should be false when there is a leftContentIcon', () => {
      expect(
        shouldEmitCardButtonAddContent(
          true,
          true,
          'icon',
          { src: 'img.png' } as any,
          undefined,
        ),
      ).toBe(false);
    });

    it('should be false when there is a textLink', () => {
      expect(
        shouldEmitCardButtonAddContent(
          true,
          true,
          '',
          { src: 'img.png' } as any,
          { href: '/x' } as any,
        ),
      ).toBe(false);
    });

    it('should be false when there is no left content image', () => {
      expect(
        shouldEmitCardButtonAddContent(true, true, '', undefined, undefined),
      ).toBe(false);
    });
  });
});
