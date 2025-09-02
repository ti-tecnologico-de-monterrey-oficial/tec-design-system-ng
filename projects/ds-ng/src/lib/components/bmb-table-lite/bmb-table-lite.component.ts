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
  ChangeDetectorRef,
  computed,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { DateTime } from 'luxon';
import { SelectionModel } from '@angular/cdk/collections';

import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbCheckboxComponent } from '../bmb-checkbox/bmb-checkbox.component';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { BmbDateRangeComponent } from '../bmb-date-range/bmb-date-range.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';

import {
  IBmbFiltersPosition,
  TableColum,
  TableConfig,
  IBmbTableLang,
} from './bmb-table-lite.interface';

@Component({
  selector: 'bmb-table-lite',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BmbIconComponent,
    BmbCheckboxComponent,
    BmbInputComponent,
    BmbDateRangeComponent,
    BmbActionIconComponent,
  ],
  templateUrl: './bmb-table-lite.component.html',
  styleUrl: './bmb-table-lite.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTableLiteComponent implements AfterViewInit, OnInit, OnChanges {
  private _rawColumns: TableColum[] = [];
  private _rawConfig: TableConfig = {
    isSelectable: false,
    isExpandible: false,
    isPaginable: false,
    showActions: false,
  };
  originalData: any[] = [];
  filteredData: any[] = [];
  pageSlice: any[] = [];

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
  resizableMousemove?: () => void;
  resizableMouseup?: () => void;

  searchControl = new FormControl('');

  showSearch = input<boolean>(false);
  showFilters = input<boolean>(false);
  pageSize = input<number>();
  totalItems = input<number>(0);
  data = input<any[]>([]);
  columns = input<TableColum[]>([]);
  actionTemplate = input<TemplateRef<any> | null>(null);
  config = input<TableConfig>();
  detailTemplate = input<TemplateRef<any> | null>(null);
  truncate = input<boolean>(false);
  wrap = input<boolean>(true);
  initialTableSelection = input<number[]>([]);
  lang = input<IBmbTableLang>('es');
  clearSelection = model<boolean>(false);
  serverSide = input<boolean>(false);
  currentPage = model<number>(0);
  filtersVisible = model<boolean>(false);
  filtersPosition = input<IBmbFiltersPosition>('top');

  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() clickedRow: EventEmitter<any> = new EventEmitter();
  @Output() searchChange = new EventEmitter<string>();
  @Output() filtersChange = new EventEmitter<Record<string, any>>();
  @Output() searchModeChange = new EventEmitter<'client' | 'server'>();
  @Output() pageChange = new EventEmitter<{
    pageIndex: number;
    pageSize: number;
  }>();

  @ViewChild('tableRef', { read: ElementRef }) private tableRef?: ElementRef;

  @HostListener('window:resize')
  onResize() {
    this.setTableResize(this.tableRef?.nativeElement.clientWidth ?? 0);
  }

  parsedFiltersColumns = computed(() =>
    this.columns().filter((column) => column.isFilterable !== false),
  );

  constructor(
    private renderer: Renderer2,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
  ) {
    effect(() => {
      if (!this.serverSide()) return;
      const last = this.lastPage();
      if (this.currentPage() < 0) {
        this.currentPage.set(0);
        this.cdr.detectChanges();
      } else if (this.currentPage() > last) {
        this.currentPage.set(last);
        this.cdr.detectChanges();
      }
    });

    effect(() => {
      const selectedRows = this.initialTableSelection() ?? [];
      if (selectedRows.length && this.filteredData.length) {
        this.selection.clear();
        selectedRows.forEach((idx) => {
          if (this.filteredData[idx])
            this.selection.select(this.filteredData[idx]);
        });
      } else {
        this.selection.clear();
      }
    });

    effect(() => {
      if (this.clearSelection()) {
        this.selection.clear();
        this.clearSelection.set(false);
        this.select.emit(this.selection.selected);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) this.parseData(changes['data'].currentValue || []);
    if (changes['columns'])
      this.parseColumns(changes['columns'].currentValue || []);
    if (changes['config']) this.setConfig(changes['config'].currentValue || {});
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((value) => {
      const search = (value || '').trim().toLowerCase();
      if (this.serverSide()) {
        this.searchModeChange.emit('server');
        this.searchChange.emit(search);
      } else {
        this.searchModeChange.emit('client');
        this.applyFilters();
      }
    });

    this._rawConfig = this.config() || {};
    this.parseData(this.data());
    this.parseColumns(this.columns());
  }

  ngAfterViewInit() {
    this.setTableResize(this.tableRef?.nativeElement.clientWidth ?? 0);
  }

  parseData(data: any[]) {
    this.originalData = Array.isArray(data) ? data : [];
    if (!this.serverSide()) {
      this.applyFilters();
      this.applyClientPagination();
    } else {
      this.filteredData = [...this.originalData];
      this.pageSlice = [...this.filteredData];
    }
  }

  parseColumns(columns: TableColum[]) {
    const normalized = (columns || []).map((col) => ({
      type: 'string' as const,
      labelEn: col.labelEn,
      ...col,
    }));
    this._rawColumns = normalized;
    this.applyColumnsAndConfig(normalized);
    this.setupDynamicFilters();
    this.applyFilters();
    this.applyClientPagination();
  }

  setConfig(cfg: TableConfig) {
    this.tableConfig = { ...this._rawConfig, ...cfg };
    this.applyColumnsAndConfig(this._rawColumns);
  }

  private applyColumnsAndConfig(newColumns: TableColum[] = []) {
    if (!newColumns.length) return;

    const displayColumns = [...newColumns.map((c) => c.def)];
    if (this._rawConfig.isExpandible) displayColumns.unshift('expand');
    if (this._rawConfig.isSelectable) displayColumns.unshift('select');
    if (this._rawConfig.showActions) displayColumns.push('actions');

    this.tableColumns = newColumns;
    this.tableDisplayColumns = displayColumns;
    this.tableConfig = this._rawConfig;
  }

  setupDynamicFilters() {
    Object.keys(this.filterForm.controls).forEach((k) =>
      this.filterForm.removeControl(k),
    );

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
        default:
          this.filterForm.addControl(`${key}_contains`, new FormControl(''));
      }
    });

    this.filterForm.valueChanges.subscribe(() => this.applyFilters());
  }

  applyFilters(): void {
    const values = this.filterForm.value as any;

    if (this.serverSide()) {
      this.filtersChange.emit(values);
      return;
    }

    if (!this._rawColumns || this._rawColumns.length === 0) {
      this.filteredData = [...this.originalData];
      this.applyClientPagination();
      this.cdr.markForCheck();
      return;
    }

    const searchText = (this.searchControl.value || '').toLowerCase().trim();
    let filtered = [...this.originalData];

    this._rawColumns.forEach((column) => {
      const key = column.dataKey;
      const type = column.type || 'string';

      if (type === 'number') {
        const rawMin = values[`${key}_min`];
        const rawMax = values[`${key}_max`];

        const min =
          rawMin === null || rawMin === undefined || rawMin === ''
            ? null
            : Number(rawMin);
        const max =
          rawMax === null || rawMax === undefined || rawMax === ''
            ? null
            : Number(rawMax);

        filtered = filtered.filter((row) => {
          const v = Number(row[key]);
          if (Number.isNaN(v)) return false;
          return (min === null || v >= min) && (max === null || v <= max);
        });
      }

      if (type === 'date') {
        const dateFormat = column.dateFormat || 'yyyy-MM-dd';
        const rawFrom = values[`${key}_from`];
        const rawTo = values[`${key}_to`];

        const from = rawFrom
          ? DateTime.fromFormat(String(rawFrom), dateFormat)
          : null;
        const to = rawTo
          ? DateTime.fromFormat(String(rawTo), dateFormat)
          : null;

        filtered = filtered.filter((row) => {
          const raw = row[key];
          if (!raw) return true;
          const dateVal = DateTime.fromFormat(String(raw), dateFormat);
          if (!dateVal.isValid) return true;
          const gte = !from || (from.isValid && dateVal >= from);
          const lte = !to || (to.isValid && dateVal <= to);
          return gte && lte;
        });
      }

      if (type === 'string') {
        const contains = (values[`${key}_contains`] || '').toLowerCase().trim();
        if (contains) {
          filtered = filtered.filter((row) =>
            (row[key] ?? '').toString().toLowerCase().includes(contains),
          );
        }
      }
    });

    if (searchText) {
      filtered = filtered.filter((row) =>
        this._rawColumns.some((col) =>
          ((row[col.dataKey] ?? '') + '').toLowerCase().includes(searchText),
        ),
      );
    }

    this.filteredData = filtered;
    this.applyClientPagination();
    this.cdr.markForCheck();
  }

  get resolvedPageSize(): number {
    return this.pageSize() ?? 10;
  }

  private applyClientPagination() {
    if (this.serverSide() || !this.tableConfig?.isPaginable) {
      this.pageSlice = [...this.filteredData];
      return;
    }
    const start = this.currentPage() * this.resolvedPageSize;
    const end = start + this.resolvedPageSize;
    this.pageSlice = this.filteredData.slice(start, end);
  }

  onPageEvent(pageIndex: number) {
    this.currentPage.set(pageIndex);
    if (this.serverSide()) {
      this.pageChange.emit({
        pageIndex: pageIndex + 1,
        pageSize: this.resolvedPageSize,
      });
    } else {
      this.applyClientPagination();
    }
  }

  lastPage(): number {
    const total = this.serverSide()
      ? (this.totalItems() ?? 0)
      : this.filteredData.length;
    const size = this.resolvedPageSize;
    const result = size === 0 ? 0 : Math.ceil(total / size) - 1;
    return Math.max(0, result);
  }

  goToFirstPage() {
    if (this.currentPage() > 0) this.onPageEvent(0);
  }

  goToPreviousPage() {
    if (this.currentPage() > 0) this.onPageEvent(this.currentPage() - 1);
  }

  goToNextPage() {
    if (this.currentPage() < this.lastPage())
      this.onPageEvent(this.currentPage() + 1);
  }

  goToLastPage() {
    this.onPageEvent(this.lastPage());
  }

  getPaginationText(): string {
    const total = this.serverSide()
      ? (this.totalItems?.() ?? 0)
      : this.filteredData.length;
    const pageIndex = this.currentPage?.() ?? 0;
    const pageSize = this.resolvedPageSize;

    if (total === 0 || pageSize === 0) return `0 de ${total}`;
    const startIndex = pageIndex * pageSize + 1;
    const endIndex = Math.min((pageIndex + 1) * pageSize, total);
    return `${startIndex} - ${endIndex} de ${total}`;
  }

  sanitizeHTML(label: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(label);
  }

  onSelectRow(row: any): void {
    this.clickedRow.emit(row);
  }

  onSelect() {
    this.select.emit(this.selection.selected);
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.pageSlice.length;
    return numRows > 0 && numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.onSelect();
      return;
    }
    this.selection.select(...this.pageSlice);
    this.onSelect();
  }

  checkboxLabel(row?: any): string {
    if (!row) return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    const idx = this.pageSlice.indexOf(row);
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${idx + 1}`;
  }

  isEven(rowIndex: number): boolean {
    return rowIndex % 2 === 0;
  }
  isOdd(rowIndex: number): boolean {
    return !this.isEven(rowIndex);
  }

  isTemplateRef(value: any): boolean {
    return value instanceof TemplateRef;
  }

  getCellClasses(row: any, columnKey: string, index: number): any {
    const semanticType = row[columnKey + 'Type'];
    return {
      'bmb_table_lite-sticky': index === 0,
      truncated: this.truncate(),
      wrapped: this.wrap(),
      ['bmb_table_lite-' + semanticType]: !!semanticType,
    };
  }

  setTableResize(_tableWidth: number) {}

  onResizeColumn(event: MouseEvent, index: number) {
    this.currentResizeIndex = index;
    this.pressed = true;
    this.startX = event.pageX;

    const th = (event.target as HTMLElement).closest(
      '.bmb_table_lite-th',
    ) as HTMLElement | null;
    this.startWidth = th?.offsetWidth ?? 0;

    event.preventDefault();
    this.mouseMove(index);
  }

  mouseMove(index: number) {
    const cleanMove = this.renderer.listen(
      'document',
      'mousemove',
      (event: MouseEvent) => {
        if (!this.pressed) return;
        const dx = event.pageX - (this.startX ?? 0);
        const newW = Math.max(50, (this.startWidth ?? 0) + dx);
        const col = this.tableColumns[index];
        if (col) col.width = newW;
        this.cdr.markForCheck();
      },
    );
    const cleanUp = this.renderer.listen('document', 'mouseup', () => {
      if (this.pressed) {
        this.pressed = false;
        this.currentResizeIndex = -1;
        cleanMove();
        cleanUp();
      }
    });
  }

  getFormControl(name: string): FormControl {
    return this.filterForm.get(name) as FormControl;
  }

  toggleFilters(): void {
    this.filtersVisible.set(!this.filtersVisible());
  }

  getTableClasses(): string[] {
    const classList = ['bmb_table_lite'];
    switch (this.filtersPosition()) {
      case 'right':
        classList.push('bmb_table_lite-filters-right');
        break;
      case 'bottom':
        classList.push('bmb_table_lite-filters-bottom');
        break;
      case 'left':
        classList.push('bmb_table_lite-filters-left');
        break;
      default:
        classList.push('bmb_table_lite-filters-top');
    }
    return classList;
  }
}
