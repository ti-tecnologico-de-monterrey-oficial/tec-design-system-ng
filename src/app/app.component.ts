import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbTableLiteComponent,
  BmbIconComponent,
} from '../../projects/ds-ng/src/public-api';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [BmbIconComponent, BmbTableLiteComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class AppComponent {
  @ViewChild('actionTemplate') actionTemplate!: TemplateRef<any>;

  displayedItems: any[] = [];
  totalItems = 0;
  itemsPerPage = 10;
  pageIndex = 0;
  searchTerm = '';
  searchMode: 'client' | 'server' = 'server';
  filters: Record<string, any> = {};

  // ---------------------------------------------------------------------------
  // 📑 CONFIGURACIÓN DE COLUMNAS Y TABLA
  // ---------------------------------------------------------------------------
  columns: any[] = [
    { def: 'sociedad', label: 'SOCIETY', dataKey: 'sociedad', type: 'number' },
    {
      def: 'claveFuncionSSFF',
      label: 'FUNCTION',
      dataKey: 'claveFuncionSSFF',
      type: 'string',
    },
    {
      def: 'nombreTipoContrato',
      label: 'CONTRACT_TYPE',
      dataKey: 'nombreTipoContrato',
      type: 'string',
    },
    {
      def: 'nombrePuestoFacultad',
      label: 'POSITION_FACULTY',
      dataKey: 'nombrePuestoFacultad',
      type: 'string',
    },
    {
      def: 'nombreRol',
      label: 'TEACHER_ROLE',
      dataKey: 'nombreRol',
      type: 'string',
    },
    {
      def: 'nombreEstatus',
      label: 'STATUS',
      dataKey: 'nombreEstatus',
      type: 'string',
    },
  ];

  config = {
    isSelectable: false,
    isExpandible: false,
    isPaginable: true,
    showActions: true,
  };

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  // ---------------------------------------------------------------------------
  // 🚀 CARGA INICIAL
  // ---------------------------------------------------------------------------
  ngOnInit(): void {
    this.fetchData();
  }

  // ---------------------------------------------------------------------------
  // 🌐 MÉTODO PRINCIPAL DE CARGA SERVER-SIDE
  // ---------------------------------------------------------------------------
  fetchData(): void {
    const payload = {
      ...this.filters,
      search: this.searchTerm,
      page: this.pageIndex + 1,
      perPage: this.itemsPerPage,
    };

    this.http
      .post<{
        body: any[];
        pagination: { totalRegistros: number; totalPaginas: number };
      }>('http://localhost:3000/GetAsignacionesTaxonomia', payload)
      .subscribe({
        next: (res) => {
          this.displayedItems = res.body || [];
          this.totalItems = res.pagination?.totalRegistros || 0;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('❌ Error fetching data:', err);
        },
      });
  }

  // ---------------------------------------------------------------------------
  // 🔎 EVENTOS DEL MODO SERVER-SIDE
  // ---------------------------------------------------------------------------

  onSearch(term: string): void {
    this.searchTerm = term;
    this.pageIndex = 0;
    this.fetchData();
  }

  onFilters(newFilters: Record<string, any>): void {
    this.filters = newFilters;
    this.pageIndex = 0;
    this.fetchData();
  }

  onPageRequest(event: { pageIndex: number; pageSize: number }): void {
    this.pageIndex = Math.max(0, event.pageIndex - 1);
    this.itemsPerPage = event.pageSize;
    this.fetchData();
  }

  onSearchMode(mode: 'client' | 'server'): void {
    this.searchMode = mode;
  }

  // ---------------------------------------------------------------------------
  // 🧩 ACCIONES Y UTILIDADES
  // ---------------------------------------------------------------------------

  editData(row: any): void {
    console.log('Button clicked', row);
  }

  resetSelection(): void {
    console.log('🧹 Clear selection clicked');
  }
}
