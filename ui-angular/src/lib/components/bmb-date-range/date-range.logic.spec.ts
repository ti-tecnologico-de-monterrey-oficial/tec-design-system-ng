import {
  getDateRangeClasses,
  getDisableDateAfter,
  getDisableDateBefore,
} from '../../_shared/logic/components/date-range';

describe('date range shared logic', () => {
  it.each([
    ['15/06/2024', 'dd/MM/yyyy', '14/06/2024'],
    ['01/03/2024', 'dd/MM/yyyy', '29/02/2024'],
    ['2025-01-01', 'yyyy-MM-dd', '2024-12-31'],
  ])('calculates the start boundary for %s', (value, format, expected) => {
    expect(getDisableDateBefore(value, format, 'previous')).toBe(expected);
  });

  it.each(['', 'not-a-date', '31/02/2024'])(
    'retains the start boundary for %s',
    (value) => {
      expect(getDisableDateBefore(value, 'dd/MM/yyyy', 'previous')).toBe(
        'previous',
      );
    },
  );

  it('preserves the end boundary rules, including unparsed nonempty values', () => {
    expect(getDisableDateAfter('20/06/2024', 'previous')).toBe('20/06/2024');
    expect(getDisableDateAfter('', 'previous')).toBe('previous');
    expect(getDisableDateAfter('not-a-date', 'previous')).toBe('not-a-date');
  });

  it('preserves the layout classes', () => {
    expect(getDateRangeClasses(false)).toEqual([
      'bmb_date-range',
      'bmb_date-range-column',
    ]);
    expect(getDateRangeClasses(true)).toEqual(['bmb_date-range']);
  });
});
