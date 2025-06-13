import { CommonModule } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  TemplateRef,
  HostListener,
  Renderer2,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  OnChanges,
  effect,
  SimpleChanges,
  model,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatTableDataSource,
  MatTableModule,
  MatTable,
} from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbCheckboxComponent } from '../bmb-checkbox/bmb-checkbox.component';
import { TableColum, TableConfig } from './bmb-tables.interface';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { FormControl, FormGroup } from '@angular/forms';
import { BmbDropdownComponent } from '../bmb-dropdown/bmb-dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BmbDateRangeComponent } from '../bmb-date-range/bmb-date-range.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';

export type BmbTableLang = 'en' | 'es';

@Component({
  selector: 'bmb-table',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbCheckboxComponent,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    BmbInputComponent,
    BmbDropdownComponent,
    ReactiveFormsModule,
    BmbDateRangeComponent,
    BmbActionIconComponent,
  ],
  templateUrl: './bmb-tables.component.html',
  styleUrls: ['./bmb-tables.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
})
export class BmbTablesComponent implements AfterViewInit, OnInit, OnChanges {
  private _rawColumns: TableColum[] = [];
  private _rawConfig: TableConfig = {
    isSelectable: false,
    isExpandible: false,
    isPaginable: false,
    showActions: false,
  };

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  originalData: any[] = [];
  filterForm = new FormGroup({});
  tableDisplayColumns: string[] = [];
  tableColumns: TableColum[] = [];
  expandedElement: any;
  selection = new SelectionModel<any>(true, []);
  tableConfig: TableConfig | undefined;

  pressed = false;
  currentResizeIndex?: number;
  startX?: number;
  startWidth?: number;
  isResizingRight?: boolean;
  resizableMousemove?: () => void;
  resizableMouseup?: () => void;

  searchControl = new FormControl('');
  filtersVisible = false;

  showSearch = input<boolean>(false);
  showFilters = input<boolean>(false);
  pageSize = input<number>();
  data = input<any[]>([]);
  columns = input<TableColum[]>([]);
  actionTemplate = input<TemplateRef<any> | null>(null);
  config = input<TableConfig>();
  detailTemplate = input<TemplateRef<any> | null>(null);
  truncate = input<boolean>(false);
  wrap = input<boolean>(true);
  initialTableSelection = input<number[]>([]);
  lang = input<BmbTableLang>('es');
  clearSelection = model<boolean>(false);

  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() clickedRow: EventEmitter<any> = new EventEmitter();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable, { read: ElementRef }) private matTableRef?: ElementRef;
  @ViewChild('headerCellRef') headerCellRef!: ElementRef;
  @ViewChild('cellRef') cellRef!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setTableResize(this.matTableRef!.nativeElement.clientWidth);
  }

  constructor(
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
  ) {
    effect(() => {
      const selectedRows = this.initialTableSelection() ?? [];
      if (selectedRows.length && this.dataSource.data.length) {
        selectedRows.forEach((row) => {
          this.selection.select(this.dataSource.data[row]);
        });
      } else {
        this.selection.clear();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.parseData(changes['data'].currentValue);
    }

    if (changes['columns']) {
      this.parseColumns(changes['columns'].currentValue);
    }

    if (changes['config']) {
      this.setConfig(changes['config'].currentValue);
    }

    if (changes['clearSelection']) {
      if (this.clearSelection()) {
        this.selection.clear();
        this.clearSelection.set(false);
        this.select.emit(this.selection.selected);
      }
    }
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((value) => {
      const safeValue = (value || '').trim().toLowerCase();
      this.dataSource.filter = safeValue;
    });

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchStr =
        `${data.name} ${data.lastName} ${data.country}`.toLowerCase();
      return searchStr.includes(filter);
    };
    const selectedRows = this.initialTableSelection() ?? [];
    if (selectedRows.length && this.dataSource.data.length) {
      selectedRows.forEach((row) => {
        this.selection.select(this.dataSource.data[row]);
      });
    } else {
      this.selection.clear();
    }

    this._rawConfig = this.config() || {};
    //this.applyColumnsAndConfig();

    this.parseData(this.data());
    this.parseColumns(this.columns());
  }

  parseData(data: any[]) {
    this.dataSource.data = data;
    this.originalData = data;
    this.applyFilters();

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  parseColumns(columns: TableColum[]) {
    this._rawColumns = columns;
    this.applyColumnsAndConfig(columns);
    this.setupDynamicFilters();
  }

  sanitizeHTML(label: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(label);
  }

  ngAfterViewInit() {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    this.setTableResize(this.matTableRef!.nativeElement.clientWidth);
  }

  private applyColumnsAndConfig(newColumns: TableColum[] = []) {
    if (!newColumns || !Array.isArray(newColumns) || newColumns.length === 0) return;

    const displayColumns = [...newColumns.map((col) => col.def)];

    if (this._rawConfig.isExpandible) {
      displayColumns.unshift('expand');
    }

    if (this._rawConfig.isSelectable) {
      displayColumns.unshift('select');
    }

    if (this._rawConfig.showActions) {
      displayColumns.push('actions');
    }

    this._rawColumns = newColumns;
    this.tableColumns = newColumns;
    this.tableDisplayColumns = displayColumns;
    this.tableConfig = this._rawConfig;
  }

  setTableResize(tableWidth: number) {
    let totWidth = 0;
    this.tableColumns.forEach((column) => {
      column.width = column.width || 50;
      totWidth += column.width!;
    });
    const scale = (tableWidth - 5) / totWidth;
  }

  mouseMove(index: number) {
    this.resizableMousemove = this.renderer.listen(
      'document',
      'mousemove',
      (event) => {
        if (this.pressed && event.buttons) {
          const dx = this.isResizingRight
            ? event.pageX - this.startX!
            : -event.pageX + this.startX!;
          const width = this.startWidth! + dx;
        }
      },
    );
    this.resizableMouseup = this.renderer.listen('document', 'mouseup', () => {
      if (this.pressed) {
        this.pressed = false;
        this.currentResizeIndex = -1;
        this.resizableMousemove!();
        this.resizableMouseup!();
      }
    });
  }

  checkResizing(event: any, index: any) {
    const cellData = this.getCellData(index);
    this.isResizingRight =
      index === 0 ||
      (Math.abs(event.pageX - cellData.right) < cellData.width / 2 &&
        index !== this.tableColumns.length - 1);
  }

  getCellData(index: number) {
    const headerRow =
      this.matTableRef!.nativeElement.children[0].querySelector('tr');
    const cell = headerRow.children[index];
    return cell.getBoundingClientRect();
  }

  onResizeColumn(event: any, index: number) {
    this.checkResizing(event, index);
    this.currentResizeIndex = index;
    this.pressed = true;
    this.startX = event.pageX;
    this.startWidth = event.target.parentElement.clientWidth;
    event.preventDefault();
    this.mouseMove(index);
  }

  onSelect() {
    const indexSelected = this.dataSource.data.reduce((acc, current, index) => {
      if (this.selection.isSelected(current)) acc.push(index);
      return acc;
    }, []);
    this.select.emit(this.selection.selected);
  }

  setConfig(config: TableConfig) {
    this.tableConfig = config;

    if (this.tableConfig.isExpandible) {
      this.tableDisplayColumns?.unshift('expand');
    }

    if (this.tableConfig.isSelectable) {
      this.tableDisplayColumns?.unshift('select');
    }

    if (this.tableConfig.showActions) {
      this.tableDisplayColumns?.push('actions');
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.onSelect();
      return;
    }

    this.selection.select(...this.dataSource.data);
    this.onSelect();
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  isEven(rowIndex: number): boolean {
    const filteredIndex = this.dataSource.data
      .filter((row) => !row.isDetail)
      .findIndex((row, index) => index === rowIndex);
    return filteredIndex % 2 === 0;
  }

  isOdd(rowIndex: number): boolean {
    return !this.isEven(rowIndex);
  }

  hasEllipsis(element: HTMLTableCellElement | undefined): boolean {
    if (!element) {
      return false;
    }

    const elementRef = new ElementRef(element);
    return (
      elementRef.nativeElement.scrollWidth >
      elementRef.nativeElement.clientWidth
    );
  }

  getPaginationText(): string {
    if (
      !this.paginator ||
      this.paginator.length === 0 ||
      this.paginator.pageSize === 0
    ) {
      return `0 de ${this.paginator?.length || 0}`;
    }
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize + 1;
    const endIndex = Math.min(
      (this.paginator.pageIndex + 1) * this.paginator.pageSize,
      this.paginator.length,
    );
    return `${startIndex} - ${endIndex} de ${this.paginator.length}`;
  }

  isTemplateRef(value: any): boolean {
    return value instanceof TemplateRef;
  }

  onSelectRow(row: any): void {
    this.clickedRow.emit(row);
  }

  getCellClasses(row: any, columnKey: string, index: number): any {
    const semanticType = row[columnKey + 'Type'];
    const classes: { [key: string]: boolean } = {
      'bmb_table-sticky': index === 0,
      truncated: this.truncate(),
      wrapped: this.wrap(),
    };

    if (semanticType) {
      classes['bmb_table-' + semanticType] = true;
    }

    return classes;
  }

  setupDynamicFilters() {
    this._rawColumns.forEach((column) => {
      const key = column.dataKey;
      switch (column.type) {
        case 'number':
          this.filterForm.addControl(`${key}_min`, new FormControl());
          this.filterForm.addControl(`${key}_max`, new FormControl());
          break;
        case 'date':
          this.filterForm.addControl(`${key}_from`, new FormControl());
          this.filterForm.addControl(`${key}_to`, new FormControl());
          break;
        case 'string':
          this.filterForm.addControl(`${key}_sort`, new FormControl('none'));
          this.filterForm.addControl(`${key}_contains`, new FormControl(''));
          break;
      }
    });

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }

  applyFilters(): void {
    let filtered = [...this.originalData];
    const values = this.filterForm.value as any;

    this._rawColumns.forEach((column) => {
      const key = column.dataKey;
      const type = column.type;

      if (type === 'number') {
        const min = values[`${key}_min`];
        const max = values[`${key}_max`];
        filtered = filtered.filter((row) => {
          const value = +row[key];
          return (min == null || value >= min) && (max == null || value <= max);
        });
      }

      if (type === 'date') {
        const from = values[`${key}_from`]
          ? new Date(values[`${key}_from`]).getTime()
          : null;
        const to = values[`${key}_to`]
          ? new Date(values[`${key}_to`]).getTime()
          : null;
        filtered = filtered.filter((row) => {
          const dateVal = new Date(row[key]).getTime();
          return (!from || dateVal >= from) && (!to || dateVal <= to);
        });
      }

      if (type === 'string') {
        const search = values[`${key}_contains`]?.toLowerCase();
        if (search) {
          filtered = filtered.filter((row) =>
            row[key]?.toLowerCase().includes(search),
          );
        }

        const sort = values[`${key}_sort`];
        if (sort === 'asc') {
          filtered.sort((a, b) => a[key]?.localeCompare(b[key]));
        } else if (sort === 'desc') {
          filtered.sort((a, b) => b[key]?.localeCompare(a[key]));
        }
      }
    });

    this.dataSource.data = filtered;
  }

  getFormControl(name: string): FormControl {
    return this.filterForm.get(name) as FormControl;
  }

  toggleFilters(): void {
    this.filtersVisible = !this.filtersVisible;
  }
}
