import { getInnerHeaderLeftIcon } from './inner-header';

describe('inner-header', () => {
  describe('getInnerHeaderLeftIcon', () => {
    it('should return an empty string by default', () => {
      expect(getInnerHeaderLeftIcon(false, false)).toBe('');
    });

    it('should return arrow_back when showReturn is true and showClose is false', () => {
      expect(getInnerHeaderLeftIcon(false, true)).toBe('arrow_back');
    });

    it('should return close when showClose is true and showReturn is false', () => {
      expect(getInnerHeaderLeftIcon(true, false)).toBe('close');
    });

    it('should return an empty string when both are true', () => {
      expect(getInnerHeaderLeftIcon(true, true)).toBe('');
    });
  });
});
