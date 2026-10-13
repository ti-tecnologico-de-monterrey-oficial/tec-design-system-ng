import { getActionIcon, getSanitizedSvg } from './action-icon';

describe('action-icon', () => {
  describe('getActionIcon', () => {
    it('should return the toggle icon when toggled and a toggle icon is set', () => {
      expect(
        getActionIcon({
          icon: 'face',
          toggleIconActive: 'toggle',
          isToggleActive: true,
        }),
      ).toBe('toggle');
    });

    it('should return the base icon when not toggled', () => {
      expect(
        getActionIcon({
          icon: 'face',
          toggleIconActive: 'toggle',
          isToggleActive: false,
        }),
      ).toBe('face');
    });

    it('should return the base icon when toggled but no toggle icon is set', () => {
      expect(
        getActionIcon({
          icon: 'face',
          toggleIconActive: undefined,
          isToggleActive: true,
        }),
      ).toBe('face');
    });
  });

  describe('getSanitizedSvg', () => {
    it('should return null when not an SVG template but a custom icon is provided', () => {
      expect(
        getSanitizedSvg({
          isSVGTemplate: false,
          customActionIcon: '<svg></svg>',
        }),
      ).toBeNull();
    });

    it('should return null when it is an SVG template but no custom icon is provided', () => {
      expect(
        getSanitizedSvg({ isSVGTemplate: true, customActionIcon: undefined }),
      ).toBeNull();
    });

    it('should return the sanitized content when it is an SVG template with a custom icon', () => {
      expect(
        getSanitizedSvg({
          isSVGTemplate: true,
          customActionIcon: '<svg></svg>',
        }),
      ).toBe('<svg></svg>');
    });

    it('should return an empty sanitized string when neither flag/content condition matches and there is no custom icon', () => {
      expect(
        getSanitizedSvg({ isSVGTemplate: false, customActionIcon: undefined }),
      ).toBe('');
    });
  });
});
