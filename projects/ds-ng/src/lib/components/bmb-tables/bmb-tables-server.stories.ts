import { BmbTablesComponent } from './bmb-tables.component';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';

export default {
  title: 'Components/Containers/Table/ServerSide',
  component: BmbTablesComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BmbIconComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('', 'service')} `, 'https://bamboo.tec.mx/latest/componentes/table/descripcion-general-h1hRplJO')}
${getBasicExampleBlock('BmbTablesComponent')}
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  BmbIconComponent,
  BmbLayoutItemDirective,
  BmbTablesComponent,
} from '../../projects/ds-ng/src/public-api';
import { HttpClient, HttpParams } from '@angular/common/http';

const ID_STATUS = {
  SOLICITADO: 1,
  AUTORIZADO: 2,
  PENDIENTE: 3,
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    BmbTablesComponent,
    BmbIconComponent,
    BmbLayoutItemDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @ViewChild(BmbTablesComponent) tableComponent!: BmbTablesComponent;
  @ViewChild('actionTemplate') actionTemplate!: TemplateRef<any>;

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
      label: 'CONTRACT_TYPE',
      dataKey: 'nombreTipoContrato',
      type: 'string' as const,
    },
    {
      def: 'nombrePuestoFacultad',
      label: 'POSITION_FACULTY',
      dataKey: 'nombrePuestoFacultad',
      type: 'string' as const,
    },
    {
      def: 'nombreRol',
      label: 'TAXONOMY_ASSIGNMENT_LABELS.TEACHER_ROLE',
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
    isSelectable: false,
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
}

\`\`\`

Below is an example of how to use this component in HTML:

\`\`\`
        `,
      },
    },
  },
  args: {
    data: [
      {
        lastName: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        name: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum',
        birthday: '02/02/2000',
        country: 'Mexico',
      },
      {
        lastName: 'Nava',
        name: 'Jesus',
        birthday: '03/04/1998',
        country: 'Mexico',
        detail: 'Detail text',
      },
    ],
    columns: [
      {
        def: 'name',
        label: 'Nombre',
        dataKey: 'name',
        icon: 'face',
        labelEn: 'Name',
      },
      {
        def: 'lastName',
        label: 'Apellido',
        dataKey: 'lastName',
        cellTemplate: 'dynamicCell',
        icon: 'face',
        labelEn: 'Last Name',
      },
      {
        def: 'birthday',
        label: 'Cumpleaños',
        dataKey: 'birthday',
        labelEn: 'Birthday',
      },
      { def: 'country', label: 'País', dataKey: 'country', labelEn: 'Country' },
    ],
    config: {
      isSelectable: false,
      isExpandible: false,
      isPaginable: true,
      showActions: true,
    },
    truncate: false,
    wrap: false,
    initialTableSelection: [1],
    lang: 'es',
  },
} as Meta<typeof BmbTablesComponent>;

type Story = StoryObj<BmbTablesComponent>;

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
      totalItems: 100, // valor simulado
      showSearch: true,
      showFilters: false,
      serverSide: true,
      lang: 'es',
    },
    template: `
      <bmb-table
        [serverSide]="true"
        [showSearch]="true"
        [showFilters]="false"
        [truncate]="false"
        [wrap]="false"
        [data]="data"
        [columns]="columns"
        [config]="config"
        [pageSize]="pageSize"
        [totalItems]="totalItems"
        (searchChange)="onSearch($event)"
        (searchModeChange)="onSearchMode($event)"
        (filtersChange)="onFilters($event)"
        (pageChange)="onPageRequest($event)"
        [lang]="lang"
        [actionTemplate]="actionTemplate"
      >
      </bmb-table>

      <ng-template #actionTemplate let-row="row">
        <div class="action-container">
          <button size="small">
            <div class="bmb-description__icon">
              <bmb-icon [icon]="'edit'" />
              <div class="font-semibold-3">Editar</div>
            </div>
          </button>
        </div>
      </ng-template>
    `,
  }),
};
