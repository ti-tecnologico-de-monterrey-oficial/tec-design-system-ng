import { getHeaderSectionStyles } from './header-section';

describe('header-section', () => {
  describe('getHeaderSectionStyles', () => {
    it('should return an empty object without an image or appearance', () => {
      expect(getHeaderSectionStyles('home')).toEqual({});
    });

    it('should use a transparent background for image icons', () => {
      expect(getHeaderSectionStyles('https://example.com/icon.png')).toEqual({
        'background-color': 'transparent',
      });
    });

    it('should build the background style from the icon appearance', () => {
      expect(getHeaderSectionStyles('home', 'green-light')).toEqual({
        'background-color': 'rgb(var(--green-light))',
      });
    });

    it('should prioritize the image check over the appearance', () => {
      expect(
        getHeaderSectionStyles('https://example.com/icon.svg', 'green-light'),
      ).toEqual({ 'background-color': 'transparent' });
    });
  });
});
