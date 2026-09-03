import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BmbTablesComponent } from './bmb-tables.component';
import { TableColum, TableConfig } from './bmb-tables.interface';

describe('BmbTablesComponent', () => {
  let component: BmbTablesComponent;
  let fixture: ComponentFixture<BmbTablesComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BmbTablesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
      declarations: [CellTemplateTestHostComponent],
      imports: [BmbTablesComponent, NoopAnimationsModule],
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
