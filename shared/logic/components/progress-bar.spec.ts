import { getProgressBarColorClass, getProgressBarValue } from './progress-bar';

describe('progress-bar', () => {
  describe('getProgressBarValue', () => {
    it('should return 0 when totalCount is 0', () => {
      expect(getProgressBarValue(10, 0)).toBe('0');
    });

    it('should calculate the percentage', () => {
      expect(getProgressBarValue(50, 100)).toBe('50.00');
    });

    it('should clamp negative values to 0', () => {
      expect(getProgressBarValue(-10, 100)).toBe('0');
    });

    it('should clamp values above 100 to 100', () => {
      expect(getProgressBarValue(150, 100)).toBe('100');
    });
  });

  describe('getProgressBarColorClass', () => {
    it('should build the class name from the status color', () => {
      expect(getProgressBarColorClass('success')).toBe(
        'bmb_progress-bar-active-success',
      );
      expect(getProgressBarColorClass('error')).toBe(
        'bmb_progress-bar-active-error',
      );
    });
  });
});
