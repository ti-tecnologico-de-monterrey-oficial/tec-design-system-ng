import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  DESIGN_SYSTEM_TITLE,
  getBasicExampleBlock,
  getGeneralDescription,
  getPageStructureForTemplateStories,
} from '../../utils/doc/utils';
import { BmbTableLiteComponent } from './bmb-table-lite.component';

export default {
  title: 'Components/Containers/Table lite/Server side',
  component: BmbTableLiteComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent, BmbTableLiteComponent, CommonModule],
    }),
  ],
  parameters: {
    docs: {
      page: () => getPageStructureForTemplateStories(),
      description: {
        component: `
${getGeneralDescription(
  `${DESIGN_SYSTEM_TITLE} ***Table Lite - Server side*** allows rendering highly configurable and interactive tables.`,
  {
    generalDocLink: 'https://bamboo.tec.mx/latest/componentes/table/descripcion-general-h1hRplJO',
    isSubStory: true
  })}
${getBasicExampleBlock(
  'BmbTableLiteComponent',
  `

  const ID_STATUS = {
    SOLICITADO: 1,
    AUTORIZADO: 2,
    PENDIENTE: 3,
  };

`,
  `@ViewChild(BmbTableLiteComponent) tableComponent!: BmbTableLiteComponent;
    @ViewChild('actionTemplate') actionTemplate!: TemplateRef<any>;

    clearSelectionFlag = false;
    searchTerm = '';
    searchMode: 'client' | 'server' = 'server';
    filters: Record<string, any> = {};
    pageIndex = 0;
    itemsPerPage = 10;
    data: any[] = [];
    displayedItems: any[] = [];
    totalItems = 0;

    columns = [
      {
        def: 'sociedad',
        label: 'SOCIETY',
        dataKey: 'sociedad',
        type: 'number' as const,
      },
      {
        def: 'claveFuncionSSFF',
        label: 'FUNCTION',
        dataKey: 'claveFuncionSSFF',
        type: 'string' as const,
      },
      {
        def: 'nombreTipoContrato',
        label: 'CONTRACT',
        dataKey: 'nombreTipoContrato',
        type: 'string' as const,
      },
      {
        def: 'nombrePuestoFacultad',
        label: 'POSITION',
        dataKey: 'nombrePuestoFacultad',
        type: 'string' as const,
      },
      {
        def: 'nombreRol',
        label: 'ROLE',
        dataKey: 'nombreRol',
        type: 'string' as const,
      },
      {
        def: 'nombreEstatus',
        label: 'STATUS',
        dataKey: 'nombreEstatus',
        type: 'string' as const,
      },
    ];

    config = {
      isSelectable: true,
      isExpandible: false,
      isPaginable: true,
      showActions: true,
    };

    ID_STATUS = ID_STATUS;

    constructor(
      private http: HttpClient,
      private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
      this.fetchData();
    }

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
            this.data = res.body;
            this.displayedItems = [...this.data];
            this.totalItems = res.pagination.totalRegistros;
            this.cdr.markForCheck();
          },
          error: (err) => {
            console.error('Error fetching data:', err);
          },
        });
    }

    onSearch(term: string) {
      this.searchTerm = term;

      if (this.searchMode === 'server') {
        this.pageIndex = 0;
        this.fetchData();
      }
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

    onSearchMode(mode: 'client' | 'server') {
      this.searchMode = mode;
    }

    editData(id: any): void {
      console.log('Editing row:', id);
    }

    resetSelection() {
      this.clearSelectionFlag = true;
    }

    onClickRow(event: any) {
      console.log('Button clicked', event);
    }`,
  true,
)}
        `,
      },
    },
  },
  args: {
    truncate: false,
    wrap: false,
    initialTableSelection: [1],
    data: [],
    columns: [
      { def: 'sociedad', label: 'Sociedad', dataKey: 'sociedad' },
      {
        def: 'claveFuncionSSFF',
        label: 'Función',
        dataKey: 'claveFuncionSSFF',
      },
      {
        def: 'nombreTipoContrato',
        label: 'Tipo de contrato',
        dataKey: 'nombreTipoContrato',
      },
      {
        def: 'nombrePuestoFacultad',
        label: 'Puesto',
        dataKey: 'nombrePuestoFacultad',
      },
      { def: 'nombreRol', label: 'Rol', dataKey: 'nombreRol' },
      { def: 'nombreEstatus', label: 'Estatus', dataKey: 'nombreEstatus' },
    ],
    config: {
      isSelectable: false,
      isExpandible: false,
      isPaginable: true,
      showActions: true,
    },
    pageSize: 10,
    totalItems: 100, // valor simulado
    showSearch: true,
    showFilters: false,
    serverSide: true,
    lang: 'es',
  },
} as Meta<typeof BmbTableLiteComponent>;

type Story = StoryObj<BmbTableLiteComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      data: [],
      columns: [
        { def: 'sociedad', label: 'Sociedad', dataKey: 'sociedad' },
        {
          def: 'claveFuncionSSFF',
          label: 'Función',
          dataKey: 'claveFuncionSSFF',
        },
        {
          def: 'nombreTipoContrato',
          label: 'Tipo de contrato',
          dataKey: 'nombreTipoContrato',
        },
        {
          def: 'nombrePuestoFacultad',
          label: 'Puesto',
          dataKey: 'nombrePuestoFacultad',
        },
        { def: 'nombreRol', label: 'Rol', dataKey: 'nombreRol' },
        { def: 'nombreEstatus', label: 'Estatus', dataKey: 'nombreEstatus' },
      ],
      config: {
        isSelectable: false,
        isExpandible: false,
        isPaginable: true,
        showActions: true,
      },
      pageSize: 10,
      totalItems: 100,
      showSearch: true,
      showFilters: false,
      serverSide: true,
      lang: 'es',
    },
    template: `
      <bmb-table-lite
        #tableComponent
        [data]="data"
        [columns]="columns"
        [config]="config"
        [pageSize]="itemsPerPage"
        [totalItems]="totalItems"
        [serverSide]="true"
        [filtersVisible]="false"
        [filtersPosition]="'top'"
        [showSearch]="true"
        [lang]="'es'"
        [truncate]="true"
        (pageChange)="onPageRequest($event)"
        (filtersChange)="onFilters($event)"
        (searchChange)="onSearch($event)"
        (searchModeChange)="onSearchMode($event)"
        [actionTemplate]="actionTemplate"
        (searchModeChange)="onSearchMode($event)"
        [(clearSelection)]="clearSelectionFlag"
        (clickedRow)="onClickRow($event)"
      >
      </bmb-table-lite>

      <ng-template #actionTemplate let-row="row">
        <div class="action-container">
          <button size="small" (click)="editData(row)">
            <div class="bmb-description__icon">
              <bmb-icon [icon]="'edit'" />
              <div class="font-semibold-3">Editar</div>
            </div>
          </button>
        </div>
      </ng-template>

      <button (click)="resetSelection()">Limpiar selección</button>
    `,
  }),
};
