import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  OnChanges,
  effect,
  SimpleChanges,
  model,
  ChangeDetectorRef,
  computed,
  HostBinding,
  inject,
} from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbCheckboxComponent } from '../bmb-checkbox/bmb-checkbox.component';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { BmbDateRangeComponent } from '../bmb-date-range/bmb-date-range.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { TranslatePipe } from '../../pipes/translations';

import {
  IBmbTableLiteFiltersPosition as IBmbFiltersPosition,
  ITableLiteColumn,
  ITableLiteConfig as TableConfig,
  IBmbTableLang,
} from '../../_shared/types';

type TableColum = ITableLiteColumn<TemplateRef<any>>;
import {
  filterTableLiteRows,
  getTableLiteClasses,
  getTableLiteCssVars,
  getTableLiteLastPage,
  getTableLitePaginationText,
  isTableLiteColumnSticky,
  isTableLiteSinglePage,
  normalizeTableLiteColumns,
} from '../../_shared/logic/components/table-lite';

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
    TranslatePipe,
  ],
  templateUrl: './bmb-table-lite.component.html',
  styleUrl: './bmb-table-lite.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTableLiteComponent implements OnInit, OnChanges {
  // -----------------------------------------------------------------------------
  // 🔧 CONFIGURACIÓN INTERNA (no visible desde el template)
  // -----------------------------------------------------------------------------
  private _rawColumns: TableColum[] = [];
  private _rawConfig: TableConfig = {
    isSelectable: false,
    isExpandible: false,
    isPaginable: false,
    showActions: false,
  };

  // -----------------------------------------------------------------------------
  // 📊 DATOS Y ESTADO DE LA TABLA
  // -----------------------------------------------------------------------------
  originalData: any[] = []; // Datos originales sin filtros
  filteredData: any[] = []; // Datos tras aplicar filtros
  pageSlice: any[] = []; // Página actual que se muestra

  expandedElement: any; // Fila expandida actual
  selection = new SelectionModel<any>(true, []); // Selección de filas
  tableConfig: TableConfig | undefined; // Configuración activa de la tabla

  // -----------------------------------------------------------------------------
  // 🔍 FORMULARIO DE FILTROS Y BÚSQUEDA
  // -----------------------------------------------------------------------------
  filterForm = new FormGroup({}); // Controles dinámicos de filtros
  searchControl = new FormControl(''); // Control de búsqueda (texto)

  // -----------------------------------------------------------------------------
  // 🧩 COLUMNAS Y ESTRUCTURA DE LA TABLA
  // -----------------------------------------------------------------------------
  tableColumns: TableColum[] = []; // Columnas renderizadas en la tabla

  // -----------------------------------------------------------------------------
  // ⚙️ INPUTS (configuración externa del componente)
  // -----------------------------------------------------------------------------
  showSearch = input<boolean>(false); // Muestra u oculta el buscador
  pageSize = input<number>(); // Tamaño de página
  totalItems = input<number>(0); // Total de elementos (server)
  data = input<any[]>([]); // Data recibida
  columns = input<TableColum[]>([]); // Definición de columnas
  config = input<TableConfig>(); // Configuración general

  truncate = input<boolean>(false); // Activa truncado de texto
  lang = input<IBmbTableLang>('es'); // Idioma ('es' | 'en')
  serverSide = input<boolean>(false); // Modo servidor o cliente
  filtersPosition = input<IBmbFiltersPosition>('top'); // Posición filtros
  initialTableSelection = input<number[]>([]); // Selección inicial de filas
  actionTemplate = input<TemplateRef<any> | null>(null); // Template de acciones
  detailTemplate = input<TemplateRef<any> | null>(null); // Template de detalle

  // -----------------------------------------------------------------------------
  // ⚡ MODELOS REACTIVOS (usando signals)
  // -----------------------------------------------------------------------------
  clearSelection = model<boolean>(false); // Limpia selección desde fuera
  currentPage = model<number>(0); // Página actual
  filtersVisible = model<boolean>(false); // Estado visible/oculto de filtros

  // -----------------------------------------------------------------------------
  // 📤 OUTPUTS (eventos que emite la tabla)
  // -----------------------------------------------------------------------------
  select = output<any>(); // Cambio de selección
  clickedRow = output<any>(); // Click en una fila
  searchChange = output<string>(); // Texto del buscador
  filtersChange = output<Record<string, any>>(); // Filtros aplicados
  searchModeChange = output<'client' | 'server'>(); // Modo de búsqueda
  pageChange = output<{
    pageIndex: number;
    pageSize: number;
  }>(); // Cambio de página

  // -----------------------------------------------------------------------------
  // 🧮 PROPIEDADES COMPUTADAS
  // -----------------------------------------------------------------------------
  parsedFiltersColumns = computed(() =>
    this.columns().filter((column) => column.isFilterable !== false),
  );

  // -----------------------------------------------------------------------------
  // 🧠 CICLO DE VIDA Y EFECTOS REACTIVOS
  // -----------------------------------------------------------------------------

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    // 🧩 Efecto: controla la página actual en modo servidor, asegurando que
    // no exceda los límites (0 → lastPage)
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

    // 🧩 Efecto: limpia la selección de filas si se activa `clearSelection`
    effect(
      () => {
        if (this.clearSelection()) {
          this.selection.clear();
          this.clearSelection.set(false);
          this.select.emit(this.selection.selected);
        }
      },
      { allowSignalWrites: true },
    );
  }

  // 🧩 Detecta cambios en inputs reactivos (data, columns, config)
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) this.parseData(changes['data'].currentValue || []);
    if (changes['columns'])
      this.parseColumns(changes['columns'].currentValue || []);
    if (changes['config']) this.setConfig(changes['config'].currentValue || {});
  }

  // 🧩 Inicializa filtros y suscripciones del buscador
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

      this.cdr.markForCheck();
    });

    this._rawConfig = this.config() || {};
    this.parseData(this.data());
    this.parseColumns(this.columns());

    // 👇 importante: recrear filtros una vez que todo esté listo
    setTimeout(() => {
      this.setupDynamicFilters();
      this.cdr.markForCheck();
    });
  }

  // -----------------------------------------------------------------------------
  // 🧩 MANEJO DE DATOS Y COLUMNAS
  // -----------------------------------------------------------------------------

  // 🔹 Normaliza y aplica los datos iniciales según el modo (server/client)
  parseData(data: any[]) {
    this.originalData = Array.isArray(data) ? data : [];
    if (!this.serverSide()) {
      this.applyFilters();
      this.applyClientPagination();
    } else {
      this.filteredData = [...this.originalData];
      this.pageSlice = [...this.filteredData];
    }

    // 🧩 Aplica selección inicial si está configurada
    const selectedRows = this.initialTableSelection() ?? [];
    if (selectedRows.length && this.filteredData.length) {
      this.selection.clear();
      selectedRows.forEach((idx) => {
        if (this.filteredData[idx]) {
          this.selection.select(this.filteredData[idx]);
        }
      });
    }
  }

  // 🔹 Estandariza las columnas y genera sus filtros dinámicos
  parseColumns(columns: TableColum[]) {
    const normalized = normalizeTableLiteColumns(columns);
    this._rawColumns = normalized;
    this.applyColumnsAndConfig(normalized);
    this.setupDynamicFilters();
    this.applyFilters();
    this.applyClientPagination();
  }

  // 🔹 Fusiona la configuración por defecto con la recibida vía input
  setConfig(cfg: TableConfig) {
    this.tableConfig = { ...this._rawConfig, ...cfg };
    this.applyColumnsAndConfig(this._rawColumns);
  }

  // 🔹 Aplica columnas visibles y configura las especiales (select/expand/actions)
  private applyColumnsAndConfig(newColumns: TableColum[] = []) {
    if (!newColumns.length) return;

    const displayColumns = [...newColumns.map((c) => c.def)];
    if (this._rawConfig.isExpandible) displayColumns.unshift('expand');
    if (this._rawConfig.isSelectable) displayColumns.unshift('select');
    if (this._rawConfig.showActions) displayColumns.push('actions');

    this.tableColumns = newColumns;
    this.tableConfig = this._rawConfig;
  }

  // -----------------------------------------------------------------------------
  // 🎛️ FILTROS Y BÚSQUEDA
  // -----------------------------------------------------------------------------

  // 🔹 Crea dinámicamente los controles del formulario de filtros
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

    this.filterForm.valueChanges.subscribe(() => {
      if (this.serverSide()) {
        this.filtersChange.emit(this.filterForm.value);
      } else {
        this.applyFilters();
      }
      this.cdr.markForCheck();
    });
  }

  // 🔹 Aplica los filtros, búsqueda y paginación según el modo activo
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

    this.filteredData = filterTableLiteRows(
      this.originalData,
      this._rawColumns,
      values,
      searchText,
    );
    this.applyClientPagination();
    this.cdr.markForCheck();
  }

  // -----------------------------------------------------------------------------
  // 📄 PAGINACIÓN (CLIENTE Y SERVIDOR)
  // -----------------------------------------------------------------------------

  // 🔹 Determina el tamaño actual de página
  get resolvedPageSize(): number {
    return this.pageSize() ?? 10;
  }

  // 🔹 Aplica la paginación del lado del cliente
  private applyClientPagination() {
    if (this.serverSide() || !this.tableConfig?.isPaginable) {
      this.pageSlice = [...this.filteredData];
      return;
    }
    const start = this.currentPage() * this.resolvedPageSize;
    const end = start + this.resolvedPageSize;
    this.pageSlice = this.filteredData.slice(start, end);
  }

  // 🔹 Evento de cambio de página (client/server)
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

  // 🔹 Helpers de control de página
  isFirstPage(): boolean {
    return this.currentPage() <= 0;
  }
  isLastPage(): boolean {
    return this.currentPage() >= this.lastPage();
  }
  isSinglePage(): boolean {
    const totalItems = this.serverSide()
      ? this.totalItems() ?? 0
      : this.filteredData.length;
    return isTableLiteSinglePage(totalItems, this.resolvedPageSize);
  }

  // 🔹 Calcula la última página disponible
  lastPage(): number {
    const total = this.serverSide()
      ? this.totalItems() ?? 0
      : this.filteredData.length;
    return getTableLiteLastPage(total, this.resolvedPageSize);
  }

  // 🔹 Navegación entre páginas
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

  // 🔹 Texto descriptivo del rango paginado (ej. "1 - 5 de 20")
  getPaginationText(): string {
    const total = this.serverSide()
      ? this.totalItems?.() ?? 0
      : this.filteredData.length;
    const pageIndex = this.currentPage?.() ?? 0;
    const pageSize = this.resolvedPageSize;
    return getTableLitePaginationText(total, pageIndex, pageSize);
  }

  // -----------------------------------------------------------------------------
  // 🖱️ INTERACCIÓN DE FILAS Y SELECCIÓN
  // -----------------------------------------------------------------------------

  // 🔹 Emite el evento de click en fila
  onSelectRow(row: any): void {
    this.clickedRow.emit(row);
  }

  // 🔹 Emite el evento cuando cambia la selección
  onSelect() {
    this.select.emit(this.selection.selected);
  }

  // 🔹 Comprueba si todas las filas visibles están seleccionadas
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.pageSlice.length;
    return numRows > 0 && numSelected === numRows;
  }

  // 🔹 Alterna la selección de todas las filas visibles
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.onSelect();
      return;
    }
    this.selection.select(...this.pageSlice);
    this.onSelect();
  }

  // 🔹 Etiqueta accesible del checkbox (usada por ARIA)
  checkboxLabel(row?: any): string {
    if (!row) return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    const idx = this.pageSlice.indexOf(row);
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${idx + 1}`;
  }

  // -----------------------------------------------------------------------------
  // 🎨 UTILIDADES DE RENDERIZADO Y CLASES
  // -----------------------------------------------------------------------------

  isEven(rowIndex: number): boolean {
    return rowIndex % 2 === 0;
  }
  isOdd(rowIndex: number): boolean {
    return !this.isEven(rowIndex);
  }
  isTemplateRef(value: any): boolean {
    return value instanceof TemplateRef;
  }

  // 🔹 Define clases dinámicas para celdas de datos
  getCellClasses(row: any, columnKey: string, index: number): any {
    const column = this.tableColumns[index];
    const semanticType = row[columnKey + 'Type'];

    const isSticky = isTableLiteColumnSticky(column?.sticky, index);

    return {
      'bmb_table_lite-sticky': isSticky,
      truncated: this.truncate(),
      ['bmb_table_lite-' + semanticType]: !!semanticType,
    };
  }

  // 🔹 Define clases dinámicas para encabezados
  getHeaderCellClasses(i: number): any {
    const column = this.tableColumns[i];

    const isSticky = isTableLiteColumnSticky(column?.sticky, i);

    return {
      'bmb_table_lite-sticky': isSticky,
      truncated: this.truncate(),
    };
  }

  // 🔹 Determina clases principales del contenedor según posición de filtros
  getTableClasses(): string[] {
    return getTableLiteClasses(this.filtersPosition());
  }

  // 🔹 Obtiene un control del formulario de filtros
  getFormControl(name: string): FormControl {
    return this.filterForm.get(name) as FormControl;
  }

  // 🔹 Alterna la visibilidad del panel de filtros
  toggleFilters(): void {
    this.filtersVisible.set(!this.filtersVisible());
  }

  // -----------------------------------------------------------------------------
  // 🧮 VARIABLES CSS Y BINDINGS DINÁMICOS
  // -----------------------------------------------------------------------------

  @HostBinding('style.--col-count')
  get colCount() {
    return this.tableColumns.length;
  }

  @HostBinding('style.--col-checkbox')
  get colCheckbox() {
    return this.tableConfig?.isSelectable ? '62px' : '0px';
  }

  @HostBinding('style.--col-expand')
  get colExpand() {
    return this.tableConfig?.isExpandible ? '40px' : '0px';
  }

  @HostBinding('style.--col-actions')
  get colActions() {
    return this.tableConfig?.showActions ? '80px' : '0px';
  }

  @HostBinding('style.--has-checkbox')
  get hasCheckbox() {
    return this.tableConfig?.isSelectable ? 1 : 0;
  }

  @HostBinding('style.--has-expand')
  get hasExpand() {
    return this.tableConfig?.isExpandible ? 1 : 0;
  }

  @HostBinding('style.--has-actions')
  get hasActions() {
    return this.tableConfig?.showActions ? 1 : 0;
  }

  // 🔹 Expone las variables CSS usadas para el grid dinámico
  get cssVars() {
    return getTableLiteCssVars(
      this.tableColumns.length,
      this.tableConfig?.isSelectable,
      this.tableConfig?.isExpandible,
      this.tableConfig?.showActions,
    );
  }

  trackByColumn(column: any): string | number {
    return column.def || column.label;
  }

  trackByRow(row: any): string | number {
    return row.id || row.sociedad;
  }
}
