import { BmbTableLiteComponent } from './bmb-table-lite.component';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  getBasicExampleBlock,
  getEmptyStateMessage,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  RELEVANT_TITLE_LEVEL,
} from '../../utils/doc/utils';

const additionalBlock: string = `
    @ViewChild('infoTemplate') infoTemplate!: TemplateRef<any>;
    @ViewChild('lastNameTemplate') lastNameTemplate!: TemplateRef<any>;
    @ViewChild('actionTemplate') actionTemplate!: TemplateRef<any>;
    @ViewChild('detailTemplate') detailTemplate!: TemplateRef<any>;
    @ViewChild('headerNameTemplate') headerNameTemplate!: TemplateRef<any>;

    constructor(private cdr: ChangeDetectorRef) {}

    config = {
      isSelectable: true,
      isExpandible: true,
      isPaginable: true,
      showActions: true,
    };

    data: any[] = [];
    columns: any[] = [];

    ngOnInit(): void {
      this.data = [
        {
          lastName: 'Benitez',
          name: 'Romina',
          birthday: '02/02/2000',
          info: 'buscar',
          gorem: 'Gorem Ipsum',
          goremType: 'success',
          country: 'Mexico',
        },
        {
          lastName: 'Rodriguez',
          name: 'Edgar',
          birthday: '02/23/2020',
          info: 'Info text',
          gorem: 'Gorem Ipsum',
          goremType: 'success',
          country: 'Francia',
          detail: 'Detalle A',
        },
        {
          lastName: 'Benitez',
          name: 'Atenea',
          birthday: '02/02/2010',
          info: 'Info text',
          gorem: 'Gorem Ipsum',
          goremType: 'success',
          country: 'Mexico',
          detail: 'Detalle A',
        },
        {
          lastName: 'Benitez',
          name: 'Atenea',
          birthday: '02/02/2005',
          info: 'Info text',
          gorem: 'Gorem Ipsum',
          goremType: 'success',
          country: 'Mexico',
          detail: 'Detalle A',
        },
        {
          lastName: 'Benitez',
          name: 'Atenea',
          birthday: '02/02/2000',
          info: 'Info text',
          gorem: 'Gorem Ipsum',
          goremType: 'success',
          country: 'Mexico',
          detail: 'Detalle A',
        },
        {
          lastName: 'Benitez',
          name: 'Atenea',
          birthday: '02/02/2000',
          info: 'Info text',
          gorem: 'Gorem Ipsum',
          goremType: 'success',
          country: 'Mexico',
          detail: 'Detalle A',
        },
        {
          lastName: 'Benitez',
          name: 'Atenea',
          birthday: '02/02/2000',
          info: 'Info text',
          gorem: 'Gorem Ipsum',
          goremType: 'success',
          country: 'Mexico',
          detail: 'Detalle A',
        },

        {
          lastName: 'Nava',
          name: 'Jesus',
          birthday: '03/04/1998',
          country: 'Mexico',
          info: 'Info text',
          gorem: 'Gorem Ipsum',
          goremType: 'error',
          detail: {
            columns: [
              { def: 'id', label: 'ID', dataKey: 'id' },
              {
                def: 'description',
                label: 'Description',
                dataKey: 'description',
              },
            ],
            data: [
              { id: 1, description: 'Detalle A' },
              { id: 2, description: 'Detalle B' },
            ],
            config: {
              isSelectable: false,
              isExpandible: false,
              isPaginable: false,
              showActions: false,
            },
          },
        },
      ];

      this.columns = [
        {
          def: 'name',
          label: 'Name',
          dataKey: 'name',
          type: 'string',
        },
        {
          def: 'lastName',
          label: 'Last Name',
          dataKey: 'lastName',
          type: 'string',
        },
        {
          def: 'birthday',
          label: 'Birthday',
          dataKey: 'birthday',
          type: 'date',
        },
        {
          def: 'info',
          label: 'Info',
          dataKey: 'info',
          type: 'string',
        },
        {
          def: 'gorem',
          label: 'Gorem Ipsum',
          dataKey: 'gorem',
          type: 'string',
        },
        {
          def: 'country',
          label: 'Country',
          dataKey: 'country',
          type: 'string',
        },
      ];
    }

    ngAfterViewInit(): void {
      // Asignar templates a columnas
      this.columns = this.columns.map((col) => {
        if (col.def === 'name') {
          return { ...col, htmlLabel: this.headerNameTemplate };
        }
        return col;
      });

      // Asignar templates a datos
      this.data = this.data.map((row) => {
        return {
          ...row,
          lastNameTemplate: this.lastNameTemplate,
          infoTemplate: this.infoTemplate,
        };
      });

      // Forzar renderizado porque los ViewChild no están disponibles en ngOnInit
      this.cdr.detectChanges();
    }

    onSelect(selected: any) {
      // Maneja la selección
    }

    clickButton(event: any) {
      // Maneja el click del botón
    }

    isString(value: any): value is string {
      return typeof value === 'string';
    }

    isObject(value: any): value is object {
      return typeof value === 'object' && value !== null;
    }
`;

export default {
  title: 'Components/Containers/Table lite',
  component: BmbTableLiteComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BmbIconComponent],
    }),
  ],
  parameters: {
    controls: {
      exclude: [
        'applyColumnsAndConfig',
        'applyFilters',
        'checkboxLabel',
        'checkResizing',
        'getCellClasses\t',
        'getCellData',
        'getFormControl',
        'getPaginationText',
        'hasEllipsis',
        'isAllSelected',
        'isEven',
        'isOdd',
        'isTemplateRef',
        'mouseMove',
        'onResize',
        'onResizeColumn',
        'onSelect\t',
        'onSelectRow',
        'parseColumns',
        'parseData',
        'sanitizeHTM',
        'setConfig',
        'setTableResize',
        'setupDynamicFilters',
        'toggleAllRows',
        'toggleFilters',
        'getCellClasses',
        'onSelect',
        'sanitizeHTML',
        '_rawColumns',
        '_rawConfig',
        'currentResizeIndex',
        'dataSource',
        'expandedElement',
        'filterForm',
        'isResizingRight',
        'originalData',
        'resizableMousemove',
        'resizableMouseup',
        'searchControl',
        'selection',
        'startWidth',
        'tableColumns',
        'tableDisplayColumns',
        'clearSelection',
        'pressed',
        'startX',
        'tableConfig',
      ],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription('table-lite')} rendering highly configurable and interactive tables.
>
It supports features such as selection, expansion, pagination, dynamic filtering, column resizing,
custom actions, and templating for both actions and detail rows.
 `,
  'https://bamboo.tec.mx/latest/componentes/table/descripcion-general-h1hRplJO',
)}
${getSpecialSpecifications(getEmptyStateMessage())}
${getBasicExampleBlock(
  `
  BmbBadgeComponent,
  BmbIconComponent,
  BmbTableLiteComponent,
  BmbThemeComponent,
`,
  '',
  additionalBlock,
)}
\`\`\`html

<bmb-table-lite
  [truncate]="true"
  [wrap]="true"
  [data]="data"
  [columns]="columns"
  [config]="config"
  (select)="onSelect($event)"
  [actionTemplate]="actionTemplate"
  [detailTemplate]="detailTemplate"
  [pageSize]="5"
  [showSearch]="true"
  [showFilters]="true"
>
</bmb-table-lite>

<!-- Templates -->

<ng-template #lastNameTemplate let-row="row">
  <div style="display: flex; align-items: center; gap: 4px">
    <bmb-icon icon="face" [size]="20"></bmb-icon>
    <span> {{ row.lastName }}</span>
    <button (click)="clickButton($event)" size="small">
      <bmb-icon icon="edit" [size]="20" color="white" />
    </button>
  </div>
</ng-template>

<ng-template #infoTemplate let-row="row">
  <div style="display: flex; align-items: center; gap: 4px">
    <bmb-badge
      [appearance]="'info'"
      [text]="row.info"
      [container]="false"
    ></bmb-badge>
  </div>
</ng-template>

<ng-template #actionTemplate>
  <div class="action-container">
    <button (click)="clickButton($event)" size="small">
      <bmb-icon [icon]="'apps'" />
    </button>
    <button (click)="clickButton($event)" size="small">
      <bmb-icon [icon]="'add'" />
    </button>
  </div>
</ng-template>

<ng-template #headerNameTemplate let-column="column" let-i="index">
  <div style="display: flex; align-items: center; gap: 4px">
    <span>{{ column.label }} Title</span>
    <bmb-icon icon="face" class="bmb_table-data-icon" />
  </div>
</ng-template>

<ng-template #detailTemplate let-row="row">
  <!-- Caso 1: solo texto -->
  <div *ngIf="isString(row.detail)">
    {{ row.detail }}
  </div>

  <!-- Caso 2: es un objeto con tabla -->
  <bmb-table-lite
    *ngIf="isObject(row.detail)"
    [data]="row.detail.data"
    [columns]="row.detail.columns"
    [config]="row.detail.config"
    [truncate]="false"
    [wrap]="false"
  ></bmb-table-lite>
</ng-template>

\`\`\`
        `,
      },
    },
  },
  argTypes: {
    data: {
      control: { type: 'object' },
      description: 'Set the data to show in the table.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'object' },
      },
    },
    columns: {
      control: { type: 'object' },
      description: 'Set the columns to show in the table.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'object' },
      },
    },
    config: {
      control: { type: 'object' },
      description: 'Set the main config for the table',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'object' },
      },
    },
    truncate: {
      control: { type: 'boolean' },
      description:
        'Determine if the text in all table cells will be truncated or not.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    filtersVisible: {
      control: { type: 'boolean' },
      description:
        'Show or hide the filters section. This property is a Model.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    wrap: {
      control: { type: 'boolean' },
      description:
        'Determine if the text in all table cells will be wrapped or not.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    actionTemplate: {
      control: { type: 'none' },
      description: 'Set the action buttons to show in the Action column',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'template' },
      },
    },
    detailTemplate: {
      control: { type: 'none' },
      description: 'Set the template to show the detail row',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'template' },
      },
    },
    pageSize: {
      control: { type: 'number' },
      description:
        'Set the number of elements to show in the table when the pagination is activated',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'number' },
      },
    },
    select: {
      control: false,
      description:
        'This output can be used to save the row selected by the checkbox configuration.',
      table: {
        category: 'Events',
        defaultValue: { summary: '-' },
        type: { summary: 'onSelect($event)' },
      },
    },
    clickedRow: {
      control: false,
      description:
        'This output can be used to save the row selected by the interaction of a click.',
      table: {
        category: 'Events',
        defaultValue: { summary: '-' },
        type: { summary: 'clickedRow($event)' },
      },
    },
    initialTableSelection: {
      control: { type: 'object' },
      description: `
Set the initial selection of the table.

This is an array of indexes that will be selected when the table is initialized.

${RELEVANT_TITLE_LEVEL[0]} If the data is asynchronous, this property must also be asynchronous.`,
      table: {
        category: 'Properties',
        type: { summary: 'number[]' },
        defaultValue: { summary: '[]' },
      },
    },
    showSearch: {
      control: { type: 'boolean' },
      description: 'Show or hide the search input at the top of the table.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showFilters: {
      control: { type: 'boolean' },
      description: 'Show or hide the column filters section.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    lang: {
      control: { type: 'select' },
      options: ['es', 'en'],
      description:
        'Set the language of the table. This will change the text of the headers table.',
      table: {
        category: 'Properties',
        type: { summary: 'BmbTableLang' },
        defaultValue: { summary: 'es' },
      },
    },
    filtersPosition: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Set the position of the filters section.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbFiltersPosition' },
        defaultValue: { summary: 'top' },
      },
    },
  },
  args: {
    data: [
      {
        id: 1,
        first_name: 'Mindy',
        last_name: 'Dengel',
        email: 'mdengel0@examiner.com',
        country: 'Latvia',
        birthday: '17/10/2001',
        balance: 9424,
      },
      {
        id: 2,
        first_name: 'Fey',
        last_name: 'Burder',
        email: 'fburder1@nyu.edu',
        country: 'Japan',
        birthday: '06/02/1982',
        balance: 6427,
      },
      {
        id: 3,
        first_name: 'Julienne',
        last_name: 'Gemlbett',
        email: 'jgemlbett2@about.com',
        country: 'Philippines',
        birthday: '14/07/1981',
        balance: 9064,
      },
      // ...puedes dejar todo el dataset largo que ya tienes
    ],
    columns: [
      {
        def: 'first_name',
        label: 'Nombre',
        dataKey: 'first_name',
        icon: 'face',
        labelEn: 'Name',
        type: 'string',
      },
      {
        def: 'last_name',
        label: 'Apellido',
        dataKey: 'last_name',
        icon: 'face',
        labelEn: 'Last Name',
        type: 'string',
      },
      {
        def: 'email',
        label: 'Correo Electrónico',
        dataKey: 'email',
        icon: 'email',
        labelEn: 'Email',
        type: 'string',
        isFilterable: false,
      },
      {
        def: 'birthday',
        label: 'Cumpleaños',
        dataKey: 'birthday',
        labelEn: 'Birthday',
        type: 'date',
        dateFormat: 'dd/MM/yyyy',
      },
      { def: 'country', label: 'País', dataKey: 'country', labelEn: 'Country' },
      {
        def: 'balance',
        label: 'Saldo',
        dataKey: 'balance',
        labelEn: 'Balance',
        type: 'number',
      },
    ],
    config: {
      isSelectable: true,
      isExpandible: true,
      isPaginable: true,
      showActions: true,
    },
    truncate: false,
    wrap: false,
    initialTableSelection: [1],
    lang: 'es',
    pageSize: 10,
    filtersPosition: 'top',
    showFilters: false,
    filtersVisible: false,
    showSearch: false,
  },
} as Meta<typeof BmbTableLiteComponent>;

type Story = StoryObj<BmbTableLiteComponent>;

/** Story con templates y wiring básico */
export const Default: Story = {
  render: (args: any) => ({
    props: {
      ...args,
      // helpers para el detailTemplate
      isString: (v: any): v is string => typeof v === 'string',
      isObject: (v: any): v is object => typeof v === 'object' && v !== null,
      clickButton: (e: Event) => {
        e.stopPropagation();
      },
      // (Opcional) Si quieres remapear columnas/filas para usar templates del header/celda
      columns: args.columns,
      data: args.data,
    },
    template: `
      <bmb-table-lite
        [truncate]="truncate"
        [wrap]="wrap"
        [data]="data"
        [columns]="columns"
        [config]="config"
        (select)="select($event)"
        (clickedRow)="clickedRow($event)"
        [actionTemplate]="actionTemplate"
        [detailTemplate]="detailTemplate"
        [pageSize]="pageSize"
        [showSearch]="showSearch"
        [showFilters]="showFilters"
        [filtersVisible]="filtersVisible"
        [lang]="lang"
        [filtersPosition]="filtersPosition"
        [initialTableSelection]="initialTableSelection"
      ></bmb-table-lite>

      <!-- Templates -->
      <ng-template #lastNameTemplate let-row="row">
        <div style="display: flex; align-items: center; gap: 4px">
          <bmb-icon icon="face" [size]="20"></bmb-icon>
          <span>{{ row.last_name || row.lastName }}</span>
          <button (click)="clickButton($event)">
            <bmb-icon icon="edit" [size]="20" />
          </button>
        </div>
      </ng-template>

      <ng-template #infoTemplate let-row="row">
        <div style="display: flex; align-items: center; gap: 4px">
          <span>{{ row.email || row.info }}</span>
        </div>
      </ng-template>

      <ng-template #actionTemplate>
        <div class="action-container">
          <button (click)="clickButton($event)">
            <bmb-icon icon="apps" />
          </button>
          <button (click)="clickButton($event)">
            <bmb-icon icon="add" />
          </button>
        </div>
      </ng-template>

      <ng-template #headerNameTemplate let-column="column" let-i="index">
        <div style="display: flex; align-items: center; gap: 4px">
          <span>{{ column.label }} Title</span>
          <bmb-icon icon="face" class="bmb_table-data-icon" />
        </div>
      </ng-template>

      <ng-template #detailTemplate let-row="row">
        <!-- Caso 1: solo texto -->
        <div *ngIf="isString(row.detail)">
          {{ row.detail }}
        </div>

        <!-- Caso 2: objeto con tabla anidada -->
        <bmb-table-lite
          *ngIf="isObject(row.detail)"
          [data]="row.detail.data"
          [columns]="row.detail.columns"
          [config]="row.detail.config"
          [truncate]="false"
          [wrap]="false"
        ></bmb-table-lite>
      </ng-template>
    `,
  }),
};
