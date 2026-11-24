import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { BmbTableLiteComponent } from './bmb-table-lite.component';

describe('BmbTableLiteComponent', () => {
  let component: BmbTableLiteComponent;
  let fixture: ComponentFixture<BmbTableLiteComponent>;

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
  const data = [
    { name: 'Alice', age: 30, joined: '2020-01-10' },
    { name: 'Bob', age: 45, joined: '2021-06-15' },
    { name: 'Carol', age: 22, joined: '2019-03-01' },
  ];

  function createComponent(): void {
    fixture = TestBed.createComponent(BmbTableLiteComponent);
    component = fixture.componentInstance;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BmbTableLiteComponent],
    });
    createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    it('handles cleared inputs and ignores initial selection indexes outside the data', () => {
      createComponent();
      fixture.componentRef.setInput('initialTableSelection', [0, 99]);
      component.parseData(data);
      expect(component.selection.selected).toEqual([data[0]]);
      component.ngOnChanges({
        data: { currentValue: null } as any,
        columns: { currentValue: null } as any,
        config: { currentValue: null } as any,
      });
      expect(component.originalData).toEqual([]);
      expect(component.tableColumns).toEqual([]);
      component.parseData(null as any);
      expect(component.pageSlice).toEqual([]);
    });

    it('reserves layout space for selection, expansion and action columns', () => {
      createComponent();
      fixture.componentRef.setInput('config', {
        isSelectable: true,
        isExpandible: true,
        showActions: true,
      });
      fixture.componentRef.setInput('columns', columns);
      fixture.componentRef.setInput('data', data);
      fixture.detectChanges();
      expect(component.colCheckbox).toBe('62px');
      expect(component.colExpand).toBe('40px');
      expect(component.colActions).toBe('80px');
      expect(component.hasCheckbox).toBe(1);
      expect(component.hasExpand).toBe(1);
      expect(component.hasActions).toBe(1);
      expect(component.cssVars).toEqual(
        expect.objectContaining({ '--col-count': 3 }),
      );
      expect(component.trackByColumn({ label: 'Unnamed column' })).toBe(
        'Unnamed column',
      );
    });

    it('reports server pagination ranges and supports unknown totals', () => {
      createComponent();
      fixture.componentRef.setInput('serverSide', true);
      fixture.componentRef.setInput('totalItems', 25);
      fixture.componentRef.setInput('pageSize', 10);
      component.currentPage.set(1);
      expect(component.isSinglePage()).toBe(false);
      expect(component.getPaginationText()).toBe('11 - 20 de 25');
      fixture.componentRef.setInput('totalItems', undefined);
      expect(component.isSinglePage()).toBe(true);
      expect(component.lastPage()).toBe(0);
      expect(component.getPaginationText()).toBe('0 de 0');
      component.currentPage.set(0);
      component.goToFirstPage();
      expect(component.currentPage()).toBe(0);
    });
    it('should parse data and columns on init', fakeAsync(() => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.detectChanges();
      tick();

      expect(component.filteredData).toEqual(data);
      expect(component.tableColumns).toEqual(
        columns.map((c) => ({ ...c, labelEn: undefined })),
      );
    }));

    it('should apply initial table selection', fakeAsync(() => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.componentRef.setInput('initialTableSelection', [0, 2]);
      fixture.detectChanges();
      tick();

      expect(component.selection.selected).toEqual([data[0], data[2]]);
    }));
  });

  describe('parsedFiltersColumns', () => {
    it('should exclude columns explicitly marked as not filterable', () => {
      fixture.componentRef.setInput('columns', [
        ...columns,
        {
          label: 'Hidden',
          def: 'hidden',
          dataKey: 'hidden',
          isFilterable: false,
        },
      ]);

      expect(component.parsedFiltersColumns()).toHaveLength(columns.length);
    });
  });

  describe('server-side page clamping', () => {
    it('should clamp currentPage to 0 when negative', fakeAsync(() => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.componentRef.setInput('serverSide', true);
      fixture.componentRef.setInput('totalItems', 20);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();
      tick();

      component.currentPage.set(-1);
      fixture.detectChanges();

      expect(component.currentPage()).toBe(0);
    }));

    it('should clamp currentPage to the last page when it exceeds it', fakeAsync(() => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.componentRef.setInput('serverSide', true);
      fixture.componentRef.setInput('totalItems', 20);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();
      tick();

      component.currentPage.set(99);
      fixture.detectChanges();

      expect(component.currentPage()).toBe(component.lastPage());
    }));
  });

  describe('getTableClasses', () => {
    it('should default to the top filters class', () => {
      expect(component.getTableClasses()).toEqual([
        'bmb_table_lite',
        'bmb_table_lite-filters-top',
      ]);
    });

    it('should reflect the filtersPosition input', () => {
      fixture.componentRef.setInput('filtersPosition', 'right');
      expect(component.getTableClasses()).toEqual([
        'bmb_table_lite',
        'bmb_table_lite-filters-right',
      ]);
    });
  });

  describe('getCellClasses / getHeaderCellClasses', () => {
    it('should mark the first column as sticky by default', fakeAsync(() => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.detectChanges();
      tick();

      expect(
        component.getCellClasses(data[0], 'name', 0)['bmb_table_lite-sticky'],
      ).toBe(true);
      expect(component.getHeaderCellClasses(0)['bmb_table_lite-sticky']).toBe(
        true,
      );
      expect(component.getHeaderCellClasses(1)['bmb_table_lite-sticky']).toBe(
        false,
      );
    }));

    it('should not throw for an out-of-range column index', fakeAsync(() => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.detectChanges();
      tick();

      expect(() => component.getCellClasses(data[0], 'name', 99)).not.toThrow();
      expect(() => component.getHeaderCellClasses(99)).not.toThrow();
    }));
  });

  describe('cssVars', () => {
    it('should build css vars from the active config', fakeAsync(() => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.componentRef.setInput('config', { isSelectable: true });
      fixture.detectChanges();
      tick();

      expect(component.cssVars['--col-checkbox']).toBe('62px');
      expect(component.cssVars['--col-count']).toBe(3);
    }));
  });

  describe('pagination', () => {
    beforeEach(fakeAsync(() => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.componentRef.setInput('pageSize', 1);
      fixture.componentRef.setInput('config', { isPaginable: true });
      fixture.detectChanges();
      tick();
    }));

    it('should compute the last page', () => {
      expect(component.lastPage()).toBe(2);
    });

    it('should report pagination text for the current page', () => {
      expect(component.getPaginationText()).toBe('1 - 1 de 3');
    });

    it('should report single page as false when there is more than one page', () => {
      expect(component.isSinglePage()).toBe(false);
    });

    it('should navigate to the next and previous page', () => {
      component.goToNextPage();
      expect(component.currentPage()).toBe(1);

      component.goToPreviousPage();
      expect(component.currentPage()).toBe(0);
    });

    it('should navigate to the first and last page', () => {
      component.goToLastPage();
      expect(component.currentPage()).toBe(2);

      component.goToFirstPage();
      expect(component.currentPage()).toBe(0);
    });

    it('should not go below the first page', () => {
      component.goToPreviousPage();
      expect(component.currentPage()).toBe(0);
    });

    it('should not go beyond the last page', () => {
      component.goToLastPage();
      component.goToNextPage();
      expect(component.currentPage()).toBe(2);
    });

    it('should report isFirstPage and isLastPage correctly', () => {
      expect(component.isFirstPage()).toBe(true);
      expect(component.isLastPage()).toBe(false);

      component.goToLastPage();
      expect(component.isFirstPage()).toBe(false);
      expect(component.isLastPage()).toBe(true);
    });
  });

  describe('selection', () => {
    beforeEach(fakeAsync(() => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.detectChanges();
      tick();
    }));

    it('should toggle all rows on and off', () => {
      expect(component.isAllSelected()).toBe(false);

      component.toggleAllRows();
      expect(component.isAllSelected()).toBe(true);

      component.toggleAllRows();
      expect(component.isAllSelected()).toBe(false);
    });

    it('should emit select when toggling', () => {
      const emitSpy = jest.spyOn(component.select, 'emit');
      component.toggleAllRows();
      expect(emitSpy).toHaveBeenCalled();
    });

    it('should clear the selection when clearSelection is set', fakeAsync(() => {
      component.toggleAllRows();
      fixture.componentRef.setInput('clearSelection', true);
      fixture.detectChanges();
      tick();

      expect(component.selection.selected).toEqual([]);
      expect(component.clearSelection()).toBe(false);
    }));

    it('should emit clickedRow on row selection', () => {
      const emitSpy = jest.spyOn(component.clickedRow, 'emit');
      component.onSelectRow(data[0]);
      expect(emitSpy).toHaveBeenCalledWith(data[0]);
    });

    it('should build an aria label for the select-all checkbox', () => {
      expect(component.checkboxLabel()).toBe('select all');
      component.toggleAllRows();
      expect(component.checkboxLabel()).toBe('deselect all');
    });

    it('should build an aria label for a row checkbox', () => {
      expect(component.checkboxLabel(data[0])).toBe('select row 1');
      component.selection.select(data[0]);
      expect(component.checkboxLabel(data[0])).toBe('deselect row 1');
    });
  });

  describe('search and filters', () => {
    beforeEach(fakeAsync(() => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.detectChanges();
      tick();
    }));

    it('should filter client-side when the search control changes', fakeAsync(() => {
      component.searchControl.setValue('bob');
      tick();

      expect(component.filteredData).toEqual([data[1]]);
    }));

    it('should emit searchChange in server mode', fakeAsync(() => {
      fixture.componentRef.setInput('serverSide', true);
      fixture.detectChanges();
      const emitSpy = jest.spyOn(component.searchChange, 'emit');
      const modeSpy = jest.spyOn(component.searchModeChange, 'emit');

      component.searchControl.setValue('bob');
      tick();

      expect(modeSpy).toHaveBeenCalledWith('server');
      expect(emitSpy).toHaveBeenCalledWith('bob');
    }));

    it('should expose a filter form control', () => {
      expect(component.getFormControl('name_contains')).toBeTruthy();
    });

    it('should toggle the filters panel visibility', () => {
      expect(component.filtersVisible()).toBe(false);
      component.toggleFilters();
      expect(component.filtersVisible()).toBe(true);
    });

    it('should emit filtersChange in server mode when filters change', fakeAsync(() => {
      fixture.componentRef.setInput('serverSide', true);
      fixture.detectChanges();
      const emitSpy = jest.spyOn(component.filtersChange, 'emit');

      component.getFormControl('name_contains').setValue('ali');
      tick();

      expect(emitSpy).toHaveBeenCalled();
    }));
  });

  describe('onPageEvent', () => {
    it('should emit pageChange in server mode', fakeAsync(() => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.componentRef.setInput('serverSide', true);
      fixture.componentRef.setInput('totalItems', 20);
      fixture.detectChanges();
      tick();
      const emitSpy = jest.spyOn(component.pageChange, 'emit');

      component.onPageEvent(1);

      expect(emitSpy).toHaveBeenCalledWith({ pageIndex: 2, pageSize: 10 });
    }));
  });

  describe('isTemplateRef / isEven / isOdd', () => {
    it('should detect even and odd row indexes', () => {
      expect(component.isEven(0)).toBe(true);
      expect(component.isOdd(0)).toBe(false);
      expect(component.isEven(1)).toBe(false);
      expect(component.isOdd(1)).toBe(true);
    });

    it('should detect a non-template value', () => {
      expect(component.isTemplateRef('plain text')).toBe(false);
    });
  });

  describe('trackByColumn / trackByRow', () => {
    it('should track columns by def', () => {
      expect(component.trackByColumn({ def: 'name' })).toBe('name');
    });

    it('should track rows by id', () => {
      expect(component.trackByRow({ id: 'r1' })).toBe('r1');
    });
  });
});
