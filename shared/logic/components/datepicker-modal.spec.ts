import { DateTime } from 'luxon';
import {
  getAdjustedMonth,
  getAdjustedYear,
  getDatepickerDayClasses,
  getDatepickerYearsRange,
  isDatepickerDateDisabled,
  isDatepickerYearSelected,
  resolveDatepickerInitialState,
} from './datepicker-modal';

describe('datepicker-modal', () => {
  describe('getDatepickerYearsRange', () => {
    it('should build a centered range of years', () => {
      expect(getDatepickerYearsRange(4, 2024)).toEqual([
        '2023',
        '2024',
        '2025',
        '2026',
      ]);
    });
  });

  describe('getDatepickerDayClasses', () => {
    const now = DateTime.fromObject({ year: 2024, month: 6, day: 15 });

    it('should mark the day as current month', () => {
      const date = DateTime.fromObject({ year: 2024, month: 6, day: 10 });
      expect(getDatepickerDayClasses(date, 6, null, now)).toContain(
        'bmb_datepicker-modal-button-current-month',
      );
    });

    it('should mark the day as selected', () => {
      const date = DateTime.fromObject({ year: 2024, month: 6, day: 10 });
      expect(getDatepickerDayClasses(date, 6, date, now)).toContain(
        'bmb_datepicker-modal-button-selected',
      );
    });

    it('should mark the day as today', () => {
      expect(getDatepickerDayClasses(now, 6, null, now)).toContain(
        'bmb_datepicker-modal-button-today',
      );
    });

    it('should return no classes for an unrelated day', () => {
      const date = DateTime.fromObject({ year: 2024, month: 7, day: 10 });
      expect(getDatepickerDayClasses(date, 6, null, now)).toEqual([]);
    });
  });

  describe('isDatepickerDateDisabled', () => {
    const date = DateTime.fromObject({ year: 2024, month: 6, day: 15 });

    it('should be disabled when before the minimum date', () => {
      const before = DateTime.fromObject({ year: 2024, month: 6, day: 20 });
      expect(isDatepickerDateDisabled(date, before, undefined)).toBe(true);
    });

    it('should be disabled when after the maximum date', () => {
      const after = DateTime.fromObject({ year: 2024, month: 6, day: 10 });
      expect(isDatepickerDateDisabled(date, undefined, after)).toBe(true);
    });

    it('should not be disabled within range', () => {
      const before = DateTime.fromObject({ year: 2024, month: 6, day: 1 });
      const after = DateTime.fromObject({ year: 2024, month: 6, day: 30 });
      expect(isDatepickerDateDisabled(date, before, after)).toBe(false);
    });

    it('should not be disabled when no bounds are set', () => {
      expect(isDatepickerDateDisabled(date, undefined, undefined)).toBe(
        false,
      );
    });
  });

  describe('isDatepickerYearSelected', () => {
    it('should match the selected year', () => {
      expect(isDatepickerYearSelected(2024, '2024')).toBe(true);
      expect(isDatepickerYearSelected(2024, '2025')).toBe(false);
    });
  });

  describe('getAdjustedYear', () => {
    it('should subtract when going to less', () => {
      expect(getAdjustedYear(2024, 'less', 1)).toBe(2023);
    });

    it('should add when going forward', () => {
      expect(getAdjustedYear(2024, 'more', 1)).toBe(2025);
    });

    it('should default yearsAmount to 0 when not provided', () => {
      expect(getAdjustedYear(2024, 'less')).toBe(2024);
    });
  });

  describe('getAdjustedMonth', () => {
    it('should wrap to december of the previous year from january', () => {
      expect(getAdjustedMonth(1, 2024, 'less')).toEqual({
        month: 12,
        year: 2023,
      });
    });

    it('should go back a month within the same year', () => {
      expect(getAdjustedMonth(6, 2024, 'less')).toEqual({
        month: 5,
        year: 2024,
      });
    });

    it('should wrap to january of the next year from december', () => {
      expect(getAdjustedMonth(12, 2024, 'more')).toEqual({
        month: 1,
        year: 2025,
      });
    });

    it('should go forward a month within the same year', () => {
      expect(getAdjustedMonth(6, 2024, 'more')).toEqual({
        month: 7,
        year: 2024,
      });
    });
  });

  describe('resolveDatepickerInitialState', () => {
    const now = DateTime.fromObject({ year: 2024, month: 6, day: 15 });

    it('should derive the state from a provided value', () => {
      const state = resolveDatepickerInitialState(
        '10/03/2023',
        'dd/MM/yyyy',
        now,
      );

      expect(state.selectedYear).toBe(2023);
      expect(state.selectedMonth).toBe(3);
      expect(state.selectedDate?.day).toBe(10);
    });

    it('should fall back to now when no value is provided', () => {
      const state = resolveDatepickerInitialState('', 'dd/MM/yyyy', now);

      expect(state.selectedYear).toBe(2024);
      expect(state.selectedMonth).toBe(6);
      expect(state.selectedDate).toBeNull();
    });
  });
});
