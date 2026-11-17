import {
  buildTablesDisplayColumns,
  filterTablesRows,
  getTablesCellClasses,
  getTablesClasses,
  getTablesLastPage,
  getTablesPaginationText,
  isTablesRowEven,
  normalizeTablesColumns,
} from './tables';

describe('tables', () => {
  describe('getTablesClasses', () => {
    it('should default to the top filters class', () => {
      expect(getTablesClasses('top')).toEqual([
        'bmb_table',
        'bmb_table-filters-top',
      ]);
    });

    it('should return the right filters class', () => {
      expect(getTablesClasses('right')).toEqual([
        'bmb_table',
        'bmb_table-filters-right',
      ]);
    });

    it('should return the bottom filters class', () => {
      expect(getTablesClasses('bottom')).toEqual([
        'bmb_table',
        'bmb_table-filters-bottom',
      ]);
    });

    it('should return the left filters class', () => {
      expect(getTablesClasses('left')).toEqual([
        'bmb_table',
        'bmb_table-filters-left',
      ]);
    });
  });

  describe('getTablesLastPage', () => {
    it('should calculate the last page', () => {
      expect(getTablesLastPage(25, 10)).toBe(2);
    });

    it('should return 0 when pageSize is 0', () => {
      expect(getTablesLastPage(25, 0)).toBe(0);
    });

    it('should never return a negative page', () => {
      expect(getTablesLastPage(0, 10)).toBe(0);
    });
  });

  describe('getTablesPaginationText', () => {
    it('should report 0 when total is 0', () => {
      expect(getTablesPaginationText(0, 0, 10)).toBe('0 de 0');
    });

    it('should report 0 when pageSize is 0', () => {
      expect(getTablesPaginationText(10, 0, 0)).toBe('0 de 10');
    });

    it('should build the range for the current page', () => {
      expect(getTablesPaginationText(25, 1, 10)).toBe('11 - 20 de 25');
    });

    it('should clamp the end index to the total', () => {
      expect(getTablesPaginationText(25, 2, 10)).toBe('21 - 25 de 25');
    });
  });

  describe('getTablesCellClasses', () => {
    it('should mark the first column as sticky unless disabled', () => {
      expect(getTablesCellClasses(undefined, false, 0, false, false, true)).toEqual({
        'bmb_table-sticky': true,
        truncated: false,
        wrapped: true,
        'bmb_table-undefined': false,
        'bmb_table-content-custom': false,
      });
    });

    it('should not mark other columns as sticky', () => {
      expect(
        getTablesCellClasses(undefined, false, 1, false, false, true)[
          'bmb_table-sticky'
        ],
      ).toBe(false);
    });

    it('should respect disableStickyColumn', () => {
      expect(
        getTablesCellClasses(undefined, false, 0, true, false, true)[
          'bmb_table-sticky'
        ],
      ).toBe(false);
    });

    it('should add a semantic type class when present', () => {
      const result = getTablesCellClasses('error', false, 1, false, false, true);
      expect(result['bmb_table-error']).toBe(true);
    });

    it('should flag a custom content template', () => {
      const result = getTablesCellClasses(undefined, true, 1, false, false, true);
      expect(result['bmb_table-content-custom']).toBe(true);
    });
  });

  describe('buildTablesDisplayColumns', () => {
    it('should return the base columns when no config flags are set', () => {
      expect(buildTablesDisplayColumns(['name', 'age'], {})).toEqual([
        'name',
        'age',
      ]);
    });

    it('should prepend select and expand, and append actions', () => {
      expect(
        buildTablesDisplayColumns(['name'], {
          isExpandible: true,
          isSelectable: true,
          showActions: true,
        }),
      ).toEqual(['select', 'expand', 'name', 'actions']);
    });
  });

  describe('normalizeTablesColumns', () => {
    it('should default the type to string and use the label as labelEn', () => {
      const result = normalizeTablesColumns([
        { label: 'Name', def: 'name', dataKey: 'name' },
      ]);
      expect(result).toEqual([
        { label: 'Name', def: 'name', dataKey: 'name', labelEn: 'Name', type: 'string' },
      ]);
    });

    it('should preserve an explicit type', () => {
      const result = normalizeTablesColumns([
        { label: 'Age', def: 'age', dataKey: 'age', type: 'number' },
      ]);
      expect(result[0].type).toBe('number');
    });

    it('should return an empty array for a nullish input', () => {
      expect(normalizeTablesColumns(null as any)).toEqual([]);
    });
  });

  describe('filterTablesRows', () => {
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
      expect(filterTablesRows(rows, columns, {})).toEqual(rows);
    });

    it('should filter by a string contains filter', () => {
      expect(
        filterTablesRows(rows, columns, { name_contains: 'ali' }),
      ).toEqual([rows[0]]);
    });

    it('should filter by a numeric range', () => {
      expect(
        filterTablesRows(rows, columns, { age_min: '25', age_max: '40' }),
      ).toEqual([rows[0]]);
    });

    it('should filter by a date range', () => {
      expect(
        filterTablesRows(rows, columns, {
          joined_from: '2020-01-01',
          joined_to: '2020-12-31',
        }),
      ).toEqual([rows[0]]);
    });

    it('should ignore an empty string filter value', () => {
      expect(
        filterTablesRows(rows, columns, { name_contains: '' }),
      ).toEqual(rows);
    });

    it('should treat a missing field as no match for a string contains filter', () => {
      const result = filterTablesRows(
        [{ age: 1, joined: '2020-01-01' }],
        columns,
        { name_contains: 'x' },
      );
      expect(result).toEqual([]);
    });
  });

  describe('isTablesRowEven', () => {
    it('should alternate even and odd rows', () => {
      const rows = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
      expect(isTablesRowEven(rows, 0)).toBe(true);
      expect(isTablesRowEven(rows, 1)).toBe(false);
      expect(isTablesRowEven(rows, 2)).toBe(true);
    });

    it('should skip detail rows when computing the index', () => {
      const rows = [
        { name: 'a' },
        { name: 'a-detail', isDetail: true },
        { name: 'b' },
      ];
      expect(isTablesRowEven(rows, 1)).toBe(false);
    });
  });
});
