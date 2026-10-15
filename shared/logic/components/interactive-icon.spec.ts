import { getInteractiveIconClasses } from './interactive-icon';

describe('interactive-icon', () => {
  describe('getInteractiveIconClasses', () => {
    it('should return the base and layout classes by default', () => {
      expect(getInteractiveIconClasses('regular', 'default', false)).toEqual([
        'bmb_interactive_icon',
        'bmb_interactive_icon-regular',
      ]);
    });

    it('should add the primary class when appearanceContrast is primary', () => {
      expect(getInteractiveIconClasses('regular', 'primary', false)).toEqual([
        'bmb_interactive_icon',
        'bmb_interactive_icon-regular',
        'bmb_interactive_icon-primary',
      ]);
    });

    it('should add the alternative class when appearanceContrast is alternative', () => {
      expect(
        getInteractiveIconClasses('regular', 'alternative', false),
      ).toEqual([
        'bmb_interactive_icon',
        'bmb_interactive_icon-regular',
        'bmb_interactive_icon-alternative',
      ]);
    });

    it('should add the horizontal class when horizontal is true', () => {
      expect(getInteractiveIconClasses('regular', 'default', true)).toEqual([
        'bmb_interactive_icon',
        'bmb_interactive_icon-regular',
        'bmb_interactive_icon-horizontal',
      ]);
    });

    it('should use the given layout', () => {
      expect(getInteractiveIconClasses('app_drawer', 'default', false)).toEqual(
        ['bmb_interactive_icon', 'bmb_interactive_icon-app_drawer'],
      );
    });
  });
});
