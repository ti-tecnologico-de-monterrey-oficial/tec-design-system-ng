import { DateTime } from 'luxon';

/**
 * Pure logic shared by the Angular and React bmb-date-range implementations,
 * so both frameworks render the exact same class names and date rules from the same source.
 */
export function getDateRangeClasses(multipleRow: boolean): string[] {
  const classes = ['bmb_date-range'];
  if (!multipleRow) classes.push('bmb_date-range-column');
  return classes;
}

export function getDisableDateBefore(
  value: string,
  dateFormat: string,
  currentValue: string,
): string {
  if (!value) return currentValue;

  const parsedDate = DateTime.fromFormat(value, dateFormat);
  if (!parsedDate.isValid) return currentValue;

  return parsedDate.minus({ day: 1 }).toFormat(dateFormat);
}
