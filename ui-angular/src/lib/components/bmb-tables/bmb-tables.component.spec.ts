import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BmbTablesComponent } from './bmb-tables.component';
import { TableColum, TableConfig } from '../../_shared/types';

describe('BmbTablesComponent', () => {
  let component: BmbTablesComponent;
  let fixture: ComponentFixture<BmbTablesComponent>;

  const columns: TableColum[] = [
    { label: 'Name', def: 'name', dataKey: 'name', type: 'string' },
    { label: 'Age', def: 'age', dataKey: 'age', type: 'number' },
    { label: 'Joined', def: 'joined', dataKey: 'joined', type: 'date' },
  ];
  const data = [
    { name: 'Alice', age: 30, joined: '2020-01-10' },
    { name: 'Bob', age: 45, joined: '2021-06-15' },
    { name: 'Carol', age: 22, joined: '2019-03-01' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BmbTablesComponent, NoopAnimationsModule],
    });
    fixture = TestBed.createComponent(BmbTablesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialization', () => {
    it('should parse data and columns', () => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.detectChanges();

      expect(component.dataSource.data).toEqual(data);
      expect(component.tableColumns.map((c) => c.def)).toEqual([
        'name',
        'age',
        'joined',
      ]);
    });

    it('should apply the initial table selection', () => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('initialTableSelection', [0, 2]);
      fixture.detectChanges();

      expect(component.selection.selected).toEqual([data[0], data[2]]);
    });
  });

  describe('getTableClasses', () => {
    it('should default to the top filters class', () => {
      expect(component.getTableClasses()).toEqual([
        'bmb_table',
        'bmb_table-filters-top',
      ]);
    });

    it('should reflect the filtersPosition input', () => {
      fixture.componentRef.setInput('filtersPosition', 'left');
      expect(component.getTableClasses()).toEqual([
        'bmb_table',
        'bmb_table-filters-left',
      ]);
    });
  });

  describe('getCellClasses', () => {
    it('should mark the first column as sticky unless disabled', () => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.detectChanges();

      expect(component.getCellClasses(data[0], 'name', 0)['bmb_table-sticky']).toBe(
        true,
      );

      fixture.componentRef.setInput('disableStickyColumn', true);
      expect(component.getCellClasses(data[0], 'name', 0)['bmb_table-sticky']).toBe(
        false,
      );
    });
  });

  describe('isEven / isOdd', () => {
    it('should alternate even and odd rows, skipping detail rows', () => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.detectChanges();

      expect(component.isEven(0)).toBe(true);
      expect(component.isOdd(0)).toBe(false);
      expect(component.isEven(1)).toBe(false);
    });
  });

  describe('selection', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.detectChanges();
    });

    it('should toggle all rows on and off', () => {
      expect(component.isAllSelected()).toBe(false);

      component.toggleAllRows();
      expect(component.isAllSelected()).toBe(true);

      component.toggleAllRows();
      expect(component.isAllSelected()).toBe(false);
    });

    it('should build an aria label for the select-all checkbox', () => {
      expect(component.checkboxLabel()).toBe('select all');
      component.toggleAllRows();
      expect(component.checkboxLabel()).toBe('deselect all');
    });

    it('should clear the selection and emit via the master checkbox handler', () => {
      component.toggleAllRows();
      const emitSpy = jest.spyOn(component.select, 'emit');
      const event = { target: { checked: false } } as unknown as Event;

      component.handleMasterSelection(event);

      expect(component.selection.selected).toEqual([]);
      expect(emitSpy).toHaveBeenCalled();
    });

    it('should emit clickedRow on row selection', () => {
      const emitSpy = jest.spyOn(component.clickedRow, 'emit');
      component.onSelectRow(data[0]);
      expect(emitSpy).toHaveBeenCalledWith(data[0]);
    });
  });

  describe('filters and search', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.detectChanges();
    });

    it('should filter client-side on a numeric range', () => {
      component.getFormControl('age_min').setValue('25');
      component.getFormControl('age_max').setValue('40');

      expect(component.dataSource.data).toEqual([data[0]]);
    });

    it('should filter client-side on a string contains filter', () => {
      component.getFormControl('name_contains').setValue('bob');

      expect(component.dataSource.data).toEqual([data[1]]);
    });

    it('should filter client-side on a date range', () => {
      component.getFormControl('joined_from').setValue('2020-01-01');
      component.getFormControl('joined_to').setValue('2020-12-31');

      expect(component.dataSource.data).toEqual([data[0]]);
    });

    it('should emit filtersChange in server mode', () => {
      fixture.componentRef.setInput('serverSide', true);
      fixture.detectChanges();
      const emitSpy = jest.spyOn(component.filtersChange, 'emit');

      component.applyFilters();

      expect(emitSpy).toHaveBeenCalled();
    });

    it('should toggle the filters panel visibility', () => {
      expect(component.filtersVisible()).toBe(false);
      component.toggleFilters();
      expect(component.filtersVisible()).toBe(true);
    });

    it('should filter client-side when the search control changes', fakeAsync(() => {
      component.searchControl.setValue('bob');
      tick();

      expect(component.dataSource.filter).toBe('bob');
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
  });

  describe('server-side pagination', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.componentRef.setInput('serverSide', true);
      fixture.componentRef.setInput('totalItems', 25);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();
    });

    it('should compute the last page', () => {
      expect(component.lastPage()).toBe(2);
    });

    it('should report pagination text for the current page', () => {
      expect(component.getPaginationText()).toBe('1 - 10 de 25');
    });

    it('should navigate to the next and previous page, emitting pageChange', () => {
      const emitSpy = jest.spyOn(component.pageChange, 'emit');

      component.goToNextPage();
      expect(component.currentPage()).toBe(1);
      expect(emitSpy).toHaveBeenCalledWith({ pageIndex: 2, pageSize: 10 });

      component.goToPreviousPage();
      expect(component.currentPage()).toBe(0);
    });

    it('should navigate to the first and last page', () => {
      component.goToLastPage();
      expect(component.currentPage()).toBe(2);

      component.goToFirstPage();
      expect(component.currentPage()).toBe(0);
    });

    it('should not go beyond the last page', () => {
      component.goToLastPage();
      component.goToNextPage();
      expect(component.currentPage()).toBe(2);
    });

    it('should not go below the first page', () => {
      component.goToPreviousPage();
      expect(component.currentPage()).toBe(0);
    });

    it('should clear the selection on page change when configured', () => {
      fixture.componentRef.setInput('clearSelectionWhenPageChanges', true);
      fixture.detectChanges();
      component.toggleAllRows();

      component.goToNextPage();

      expect(component.selection.selected).toEqual([]);
    });
  });

  describe('onPageEvent', () => {
    it('should update the paginator page index in client mode', () => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.componentRef.setInput('config', { isPaginable: true });
      fixture.detectChanges();

      component.onPageEvent({ pageIndex: 0, pageSize: 10 } as any);

      expect(component.dataSource.paginator?.pageIndex).toBe(0);
    });

    it('should emit pageChange in server mode', () => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.componentRef.setInput('serverSide', true);
      fixture.detectChanges();
      const emitSpy = jest.spyOn(component.pageChange, 'emit');

      component.onPageEvent({ pageIndex: 1, pageSize: 10 } as any);

      expect(emitSpy).toHaveBeenCalledWith({ pageIndex: 2, pageSize: 10 });
    });
  });

  describe('selectionMode: page', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.componentRef.setInput('selectionMode', 'page');
      fixture.detectChanges();
    });

    it('should select and deselect only the visible page via the master checkbox', () => {
      const selectEvent = { target: { checked: true } } as unknown as Event;
      component.handleMasterSelection(selectEvent);

      expect(component.checkIfAllRowsSelected()).toBe(true);

      component.handleMasterSelection(selectEvent);
      expect(component.checkIfAllRowsSelected()).toBe(false);
    });

    it('should report partial selection', () => {
      component.selection.select(data[0]);
      expect(component.checkIfSomeRowsSelected()).toBe(true);
    });
  });

  describe('filtersModel', () => {
    it('should update the model when filters change', () => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.detectChanges();

      component.getFormControl('name_contains').setValue('ali');

      expect(component.filtersModel()['name_contains']).toBe('ali');
    });

    it('should populate the filter form from an external model update', () => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.detectChanges();

      fixture.componentRef.setInput('filtersModel', { name_contains: 'bob' });
      fixture.detectChanges();

      expect(component.getFormControl('name_contains').value).toBe('bob');
      expect(component.dataSource.data).toEqual([data[1]]);
    });

    it('should reset the filter form when the model is cleared', () => {
      fixture.componentRef.setInput('data', data);
      fixture.componentRef.setInput('columns', columns);
      fixture.detectChanges();

      fixture.componentRef.setInput('filtersModel', { name_contains: 'bob' });
      fixture.detectChanges();
      fixture.componentRef.setInput('filtersModel', {});
      fixture.detectChanges();

      expect(component.getFormControl('name_contains').value).toBeNull();
    });
  });

  describe('isTemplateRef / sanitizeHTML', () => {
    it('should detect a non-template value', () => {
      expect(component.isTemplateRef('plain text')).toBe(false);
    });

    it('should sanitize html content', () => {
      expect(component.sanitizeHTML('<b>bold</b>')).toBeTruthy();
    });
  });
});

interface TestRow {
  id: number;
  name: string;
}

@Component({
  template: `
    <ng-template #cellTpl let-row="row" let-column="column" let-index="index">
      <span
        class="custom-cell"
        [attr.data-index]="index"
        [attr.data-column-def]="column.def"
        [attr.data-column-label]="column.label"
      >
        {{ index }}:{{ column.def }}:{{ row.name }}
      </span>
    </ng-template>
    <bmb-table [data]="data" [columns]="columns" [config]="config"></bmb-table>
  `,
  imports: [BmbTablesComponent],
})
class CellTemplateTestHostComponent implements OnInit {
  @ViewChild('cellTpl', { static: true }) cellTpl!: TemplateRef<unknown>;

  data: TestRow[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Carol' },
  ];

  config: TableConfig = {
    isSelectable: false,
    isExpandible: false,
    isPaginable: false,
    showActions: false,
  };

  columns: TableColum[] = [];

  ngOnInit(): void {
    // Mirrors the real-world pattern: the column-level cellTemplate can only
    // be assigned once the ng-template's ViewChild has been resolved.
    this.columns = [
      {
        def: 'name',
        label: 'Name',
        dataKey: 'name',
        cellTemplate: this.cellTpl,
      },
    ];
  }
}

describe('BmbTablesComponent - column cellTemplate', () => {
  let hostFixture: ComponentFixture<CellTemplateTestHostComponent>;
  let hostComponent: CellTemplateTestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CellTemplateTestHostComponent, BmbTablesComponent, NoopAnimationsModule],
    }).compileComponents();

    hostFixture = TestBed.createComponent(CellTemplateTestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  function getCustomCells(): HTMLElement[] {
    return Array.from(
      hostFixture.nativeElement.querySelectorAll('.custom-cell'),
    );
  }

  it('should render the column-level cellTemplate when no row-level "<dataKey>Template" is provided', () => {
    const cells = getCustomCells();

    expect(cells.length).toBe(hostComponent.data.length);

    cells.forEach((cell, i) => {
      expect(cell.textContent).toContain(hostComponent.data[i].name);
    });
  });

  it('should not fall back to the default cell rendering when a column cellTemplate exists', () => {
    const nameCells: HTMLElement[] = Array.from(
      hostFixture.nativeElement.querySelectorAll('td.mat-column-name'),
    );

    expect(nameCells.length).toBe(hostComponent.data.length);
    nameCells.forEach((cell) => {
      expect(cell.querySelector('.custom-cell')).toBeTruthy();
    });
  });

  it('should expose the correct row "index" to the cellTemplate context for every row', () => {
    const cells = getCustomCells();

    cells.forEach((cell, i) => {
      expect(cell.getAttribute('data-index')).toBe(String(i));
    });
  });

  it('should expose the correct "column" metadata to the cellTemplate context', () => {
    const cells = getCustomCells();

    cells.forEach((cell) => {
      expect(cell.getAttribute('data-column-def')).toBe('name');
      expect(cell.getAttribute('data-column-label')).toBe('Name');
    });
  });
});
