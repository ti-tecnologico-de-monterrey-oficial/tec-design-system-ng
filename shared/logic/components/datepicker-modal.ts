import { DateTime } from 'luxon';

export function getDatepickerYearsRange(
  stepYearPicker: number,
  selectedYear: number,
): string[] {
  const yearsList = new Array(stepYearPicker).fill(0);

  return yearsList.map((_, index) =>
    (selectedYear - (stepYearPicker / 2 - 1) + index).toString(),
  );
}

export function getDatepickerDayClasses(
  date: DateTime,
  selectedMonth: number,
  selectedDate: DateTime | null,
  now: DateTime,
): string[] {
  const classList: string[] = [];

  if (date.month === selectedMonth) {
    classList.push('bmb_datepicker-modal-button-current-month');
  }

  if (selectedDate && date.hasSame(selectedDate, 'day')) {
    classList.push('bmb_datepicker-modal-button-selected');
  }

  if (now.hasSame(date, 'day')) {
    classList.push('bmb_datepicker-modal-button-today');
  }

  return classList;
}

export function isDatepickerDateDisabled(
  date: DateTime,
  disableDatesBefore: DateTime | null | undefined,
  disableDatesAfter: DateTime | null | undefined,
): boolean {
  let isValid = disableDatesBefore
    ? date.startOf('day') <= disableDatesBefore.startOf('day')
    : false;

  isValid =
    !isValid && disableDatesAfter
      ? date.startOf('day') >= disableDatesAfter.startOf('day')
      : isValid;

  return isValid;
}

export function isDatepickerYearSelected(
  selectedYear: number,
  year: string,
): boolean {
  return selectedYear === parseInt(year);
}

export function getAdjustedYear(
  selectedYear: number,
  event: string,
  yearsAmount = 0,
): number {
  return event === 'less'
    ? selectedYear - yearsAmount
    : selectedYear + yearsAmount;
}

export function getAdjustedMonth(
  selectedMonth: number,
  selectedYear: number,
  event: string,
): { month: number; year: number } {
  if (event === 'less') {
    if (selectedMonth === 1) return { month: 12, year: selectedYear - 1 };
    return { month: selectedMonth - 1, year: selectedYear };
  }

  if (selectedMonth === 12) return { month: 1, year: selectedYear + 1 };
  return { month: selectedMonth + 1, year: selectedYear };
}

export function resolveDatepickerInitialState(
  value: string,
  dateFormat: string,
  now: DateTime,
): {
  selectedDate: DateTime | null;
  selectedYear: number;
  selectedMonth: number;
} {
  if (value) {
    const formattedDate = DateTime.fromFormat(value, dateFormat);
    return {
      selectedDate: formattedDate,
      selectedYear: formattedDate.year,
      selectedMonth: formattedDate.month,
    };
  }

  return { selectedDate: null, selectedYear: now.year, selectedMonth: now.month };
}
