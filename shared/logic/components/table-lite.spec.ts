import {
  filterTableLiteRows,
  getTableLiteClasses,
  getTableLiteCssVars,
  getTableLiteLastPage,
  getTableLitePaginationText,
  isTableLiteColumnSticky,
  isTableLiteSinglePage,
  normalizeTableLiteColumns,
} from './table-lite';

describe('table-lite', () => {
  describe('getTableLiteClasses', () => {
    it('should default to the top filters class', () => {
      expect(getTableLiteClasses('top')).toEqual([
        'bmb_table_lite',
        'bmb_table_lite-filters-top',
      ]);
    });

    it('should return the right filters class', () => {
      expect(getTableLiteClasses('right')).toEqual([
        'bmb_table_lite',
        'bmb_table_lite-filters-right',
      ]);
    });

    it('should return the bottom filters class', () => {
      expect(getTableLiteClasses('bottom')).toEqual([
        'bmb_table_lite',
        'bmb_table_lite-filters-bottom',
      ]);
    });

    it('should return the left filters class', () => {
      expect(getTableLiteClasses('left')).toEqual([
        'bmb_table_lite',
        'bmb_table_lite-filters-left',
      ]);
    });
  });

  describe('isTableLiteColumnSticky', () => {
    it('should be sticky when explicitly true', () => {
      expect(isTableLiteColumnSticky(true, 3)).toBe(true);
    });

    it('should not be sticky when explicitly false', () => {
      expect(isTableLiteColumnSticky(false, 0)).toBe(false);
    });

    it('should default to sticky for the first column when undefined', () => {
      expect(isTableLiteColumnSticky(undefined, 0)).toBe(true);
    });

    it('should default to not sticky for other columns when undefined', () => {
      expect(isTableLiteColumnSticky(undefined, 1)).toBe(false);
    });
  });

  describe('getTableLiteCssVars', () => {
    it('should build vars with every section enabled', () => {
      expect(getTableLiteCssVars(3, true, true, true)).toEqual({
        '--col-count': 3,
        '--col-checkbox': '62px',
        '--col-expand': '40px',
        '--col-actions': '80px',
        '--grid-template':
          'var(--col-checkbox, 62px) var(--col-expand, 40px) repeat(3, minmax(120px, 1fr)) var(--col-actions, 80px)',
      });
    });

    it('should build vars with every section disabled', () => {
      expect(getTableLiteCssVars(2, false, false, false)).toEqual({
        '--col-count': 2,
        '--col-checkbox': '0px',
        '--col-expand': '0px',
        '--col-actions': '0px',
        '--grid-template': 'repeat(2, minmax(120px, 1fr))',
      });
    });
  });

  describe('getTableLiteLastPage', () => {
    it('should calculate the last page', () => {
      expect(getTableLiteLastPage(25, 10)).toBe(2);
    });

    it('should return 0 when pageSize is 0', () => {
      expect(getTableLiteLastPage(25, 0)).toBe(0);
    });

    it('should never return a negative page', () => {
      expect(getTableLiteLastPage(0, 10)).toBe(0);
    });
  });

  describe('isTableLiteSinglePage', () => {
    it('should be true when total fits within one page', () => {
      expect(isTableLiteSinglePage(5, 10)).toBe(true);
    });

    it('should be false when total exceeds the page size', () => {
      expect(isTableLiteSinglePage(15, 10)).toBe(false);
    });
  });

  describe('getTableLitePaginationText', () => {
    it('should report 0 when total is 0', () => {
      expect(getTableLitePaginationText(0, 0, 10)).toBe('0 de 0');
    });

    it('should report 0 when pageSize is 0', () => {
      expect(getTableLitePaginationText(10, 0, 0)).toBe('0 de 10');
    });

    it('should build the range for the current page', () => {
      expect(getTableLitePaginationText(25, 1, 10)).toBe('11 - 20 de 25');
    });

    it('should clamp the end index to the total', () => {
      expect(getTableLitePaginationText(25, 2, 10)).toBe('21 - 25 de 25');
    });
  });

  describe('normalizeTableLiteColumns', () => {
    it('should default the type to string and keep labelEn', () => {
      const result = normalizeTableLiteColumns([
        { label: 'Name', def: 'name', dataKey: 'name', labelEn: 'Name EN' },
      ]);
      expect(result).toEqual([
        {
          label: 'Name',
          def: 'name',
          dataKey: 'name',
          labelEn: 'Name EN',
          type: 'string',
        },
      ]);
    });

    it('should preserve an explicit type', () => {
      const result = normalizeTableLiteColumns([
        { label: 'Age', def: 'age', dataKey: 'age', type: 'number' },
      ]);
      expect(result[0].type).toBe('number');
    });

    it('should return an empty array for a nullish input', () => {
      expect(normalizeTableLiteColumns(null as any)).toEqual([]);
    });
  });

  describe('filterTableLiteRows', () => {
    const columns = [
      { label: 'Name', def: 'name', dataKey: 'name', type: 'string' as const },
      { label: 'Age', def: 'age', dataKey: 'age', type: 'number' as const },
      {
        label: 'Joined',
        def: 'joined',
        dataKey: 'joined',
        type: 'date' as const,
      },
    ];
    const rows = [
      { name: 'Alice', age: 30, joined: '2020-01-10' },
      { name: 'Bob', age: 45, joined: '2021-06-15' },
      { name: 'Carol', age: 22, joined: '2019-03-01' },
    ];

    it('should return all rows when there are no filters', () => {
      expect(filterTableLiteRows(rows, columns, {}, '')).toEqual(rows);
    });

    it('should filter by a string contains filter', () => {
      const result = filterTableLiteRows(
        rows,
        columns,
        { name_contains: 'ali' },
        '',
      );
      expect(result).toEqual([rows[0]]);
    });

    it('should filter by a numeric range', () => {
      const result = filterTableLiteRows(
        rows,
        columns,
        { age_min: 25, age_max: 40 },
        '',
      );
      expect(result).toEqual([rows[0]]);
    });

    it('should exclude rows whose numeric value is not a number', () => {
      const result = filterTableLiteRows(
        [{ name: 'X', age: 'n/a', joined: '2020-01-01' }],
        columns,
        { age_min: 0 },
        '',
      );
      expect(result).toEqual([]);
    });

    it('should filter by a date range', () => {
      const result = filterTableLiteRows(
        rows,
        columns,
        { joined_from: '2020-01-01', joined_to: '2020-12-31' },
        '',
      );
      expect(result).toEqual([rows[0]]);
    });

    it('should keep rows with an invalid date value', () => {
      const result = filterTableLiteRows(
        [{ name: 'X', age: 1, joined: 'not-a-date' }],
        columns,
        { joined_from: '2020-01-01' },
        '',
      );
      expect(result).toHaveLength(1);
    });

    it('should apply a global search across all columns', () => {
      const result = filterTableLiteRows(rows, columns, {}, 'bob');
      expect(result).toEqual([rows[1]]);
    });

    it('should combine column filters and global search', () => {
      const result = filterTableLiteRows(
        rows,
        columns,
        { age_min: 20 },
        'carol',
      );
      expect(result).toEqual([rows[2]]);
    });

    it('should default a column with no type to string filtering', () => {
      const untypedColumns = [
        { label: 'Name', def: 'name', dataKey: 'name' },
      ];
      const result = filterTableLiteRows(
        rows,
        untypedColumns,
        { name_contains: 'bob' },
        '',
      );
      expect(result).toEqual([rows[1]]);
    });

    it('should keep a row with a missing date value', () => {
      const result = filterTableLiteRows(
        [{ name: 'X', age: 1, joined: '' }],
        columns,
        { joined_from: '2020-01-01' },
        '',
      );
      expect(result).toHaveLength(1);
    });

    it('should treat a missing field as empty for a string contains filter', () => {
      const result = filterTableLiteRows(
        [{ age: 1 }],
        columns,
        { name_contains: 'x' },
        '',
      );
      expect(result).toEqual([]);
    });

    it('should treat a missing field as empty for the global search', () => {
      const result = filterTableLiteRows(
        [{ name: 'Alice', age: 30 }],
        columns,
        {},
        'zzz',
      );
      expect(result).toEqual([]);
    });
  });
});
