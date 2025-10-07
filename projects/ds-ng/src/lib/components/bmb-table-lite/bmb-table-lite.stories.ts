import { BmbTableLiteComponent } from './bmb-table-lite.component';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
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

  clearSelectionFlag = false;

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
        gorem: 'Gorem Ipsum Gorem Ipsum Gorem Ipsum',
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
        lastName: 'Benitez',
        name: 'Romina',
        birthday: '02/02/2000',
        info: 'buscar',
        gorem: 'Gorem Ipsum',
        goremType: 'success',
        country: 'Mexico',
      },
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
        lastName: 'Benitez',
        name: 'Romina',
        birthday: '02/02/2000',
        info: 'buscar',
        gorem: 'Gorem Ipsum',
        goremType: 'success',
        country: 'Mexico',
      },
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
        lastName: 'Benitez',
        name: 'Romina',
        birthday: '02/02/2000',
        info: 'buscar',
        gorem: 'Gorem Ipsum',
        goremType: 'success',
        country: 'Mexico',
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
    this.columns = this.columns.map((col) => {
      if (col.def === 'name') {
        return { ...col, htmlLabel: this.headerNameTemplate };
      }
      return col;
    });

    this.data = this.data.map((row) => {
      return {
        ...row,
        lastNameTemplate: this.lastNameTemplate,
        infoTemplate: this.infoTemplate,
      };
    });

    this.cdr.detectChanges();
  }

  onSelect(selected: any) {
    console.log('Selected rows', selected);
  }

  clickButton(event: any) {
    console.log('Button clicked', event);
  }

  isString(value: any): value is string {
    return typeof value === 'string';
  }

  isObject(value: any): value is object {
    return typeof value === 'object' && value !== null;
  }

  onClickRow(event: any) {
    console.log('Button clicked', event);
  }

  resetSelection() {
    this.clearSelectionFlag = true;
  }
`;

export default {
  title: 'Components/Containers/Table lite',
  component: BmbTableLiteComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BmbIconComponent,
        BmbTableLiteComponent,
        BmbBadgeComponent,
        CommonModule,
      ],
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
${getGeneralDescription({
  content: `${getGeneralComponentDescription({ name: 'table-lite' })} rendering highly configurable and interactive tables.
>
It supports features such as selection, expansion, pagination, dynamic filtering, column resizing,
custom actions, and templating for both actions and detail rows.
  `,
  generalDocLink:
    'https://bamboo.tec.mx/latest/componentes/table/descripcion-general-h1hRplJO',
})}
${getSpecialSpecifications(getEmptyStateMessage())}
${getBasicExampleBlock(
  `
  BmbIconComponent,
  BmbTableLiteComponent,
  BmbBadgeComponent,
  CommonModule,
  BmbThemeComponent,
`,
  '',
  additionalBlock,
)}
\`\`\`html

<bmb-table-lite
  [truncate]="true"
  [data]="data"
  [columns]="columns"
  [config]="config"
  [pageSize]="5"
  [truncate]="true"
  [showSearch]="true"
  [filtersVisible]="false"
  [filtersPosition]="'bottom'"
  [lang]="'es'"
  [serverSide]="false"
  [actionTemplate]="actionTemplate"
  [detailTemplate]="detailTemplate"
  (select)="onSelect($event)"
  (clickedRow)="onClickRow($event)"
  [(clearSelection)]="clearSelectionFlag"
>
</bmb-table-lite>

<button (click)="resetSelection()">Limpiar selección</button>

<!-- Templates -->

<ng-template #lastNameTemplate let-row="row">
  <bmb-icon icon="face" [size]="20"></bmb-icon>
  <span> {{ row.lastName }}</span>
  <button (click)="clickButton($event)" size="small">
    <bmb-icon icon="edit" [size]="20" color="white" />
  </button>
</ng-template>

<ng-template #infoTemplate let-row="row">
  <bmb-badge
    [appearance]="'info'"
    [text]="row.info"
    [container]="false"
  ></bmb-badge>
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
  <span>{{ column.label }} Title</span>
  <bmb-icon icon="face" class="bmb_table-data-icon" />
</ng-template>

<ng-template #detailTemplate let-row="row">
  <div *ngIf="isString(row.detail)">
    {{ row.detail }}
  </div>

  <bmb-table-lite
    *ngIf="isObject(row.detail)"
    [data]="row.detail.data"
    [columns]="row.detail.columns"
    [config]="row.detail.config"
    [truncate]="false"
  ></bmb-table-lite>
</ng-template>

\`\`\`
        `,
      },
    },
  },
  argTypes: {
    // ──────────────────────────────────────────────────────────────
    // 🧩 DATA & STRUCTURE
    // ──────────────────────────────────────────────────────────────
    data: {
      control: { type: 'object' },
      description:
        'Defines the data source for the table. Each object represents one row.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
        type: { summary: 'any[]' },
      },
    },
    columns: {
      control: { type: 'object' },
      description:
        'Defines the structure of the table columns, including labels, data keys, and optional templates.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
        type: { summary: 'TableColum[]' },
      },
    },
    config: {
      control: { type: 'object' },
      description:
        'Sets the general configuration of the table, including options like selectability, expandability, pagination, and actions.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '{}' },
        type: { summary: 'TableConfig' },
      },
    },

    // ──────────────────────────────────────────────────────────────
    // ⚙️ DISPLAY & BEHAVIOR
    // ──────────────────────────────────────────────────────────────
    truncate: {
      control: { type: 'boolean' },
      description:
        'Determines whether long text inside cells should be truncated (with ellipsis).',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showSearch: {
      control: { type: 'boolean' },
      description:
        'Displays the search bar above the table. When `true`, users can filter data using keywords.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    filtersVisible: {
      control: { type: 'boolean' },
      description:
        'Controls the visibility of the filters panel. This property is a **Model**, meaning it can be two-way bound.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean (model)' },
        defaultValue: { summary: 'false' },
      },
    },
    filtersPosition: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      description:
        'Defines the position where the filters section will appear around the table.',
      table: {
        category: 'Properties',
        type: { summary: `'top' | 'right' | 'bottom' | 'left'` },
        defaultValue: { summary: `'top'` },
      },
    },
    pageSize: {
      control: { type: 'number' },
      description:
        'Sets the number of rows displayed per page when pagination is enabled.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '10' },
        type: { summary: 'number' },
      },
    },
    totalItems: {
      control: { type: 'number' },
      description:
        'Defines the total number of items when working with **server-side pagination**.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '0' },
        type: { summary: 'number' },
      },
    },
    serverSide: {
      control: { type: 'boolean' },
      description:
        'Enables server-side mode. When `true`, pagination, search, and filters emit events for remote data handling.',
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
        'Sets the language of the table labels (headers, filters, etc).',
      table: {
        category: 'Properties',
        type: { summary: `'es' | 'en'` },
        defaultValue: { summary: `'es'` },
      },
    },

    // ──────────────────────────────────────────────────────────────
    // 🧠 SELECTION & INTERACTION
    // ──────────────────────────────────────────────────────────────
    initialTableSelection: {
      control: { type: 'object' },
      description: `
Defines the initial row selection of the table.

This is an array of row indexes that will be automatically selected when the table loads.

If the data is loaded asynchronously, make sure to update this property after data is available.`,
      table: {
        category: 'Properties',
        type: { summary: 'number[]' },
        defaultValue: { summary: '[]' },
      },
    },
    clearSelection: {
      control: { type: 'boolean' },
      description:
        'Clears all selected rows when set to `true`. This property is a **Model**, allowing reactive control from outside the component.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean (model)' },
        defaultValue: { summary: 'false' },
      },
    },
    currentPage: {
      control: { type: 'number' },
      description:
        'Represents the current page index. It can be **controlled externally** when using server-side pagination. This property is a **Model**.',
      table: {
        category: 'Properties',
        type: { summary: 'number (model)' },
        defaultValue: { summary: '0' },
      },
    },

    // ──────────────────────────────────────────────────────────────
    // 🎨 CUSTOM TEMPLATES
    // ──────────────────────────────────────────────────────────────
    actionTemplate: {
      control: { type: 'none' },
      description:
        'Provides a custom Angular template to render buttons or elements inside the "Actions" column.',
      table: {
        category: 'Slots / Templates',
        defaultValue: { summary: '-' },
        type: { summary: 'TemplateRef<any>' },
      },
    },
    detailTemplate: {
      control: { type: 'none' },
      description:
        'Defines the custom template to display below a row when it is expanded.',
      table: {
        category: 'Slots / Templates',
        defaultValue: { summary: '-' },
        type: { summary: 'TemplateRef<any>' },
      },
    },

    // ──────────────────────────────────────────────────────────────
    // 📤 OUTPUT EVENTS
    // ──────────────────────────────────────────────────────────────
    select: {
      control: false,
      description:
        'Emitted when the user selects or deselects one or more rows using checkboxes.',
      table: {
        category: 'Events',
        defaultValue: { summary: '-' },
        type: { summary: 'EventEmitter<any[]>' },
      },
    },
    clickedRow: {
      control: false,
      description:
        'Emitted when the user clicks on a row. Useful for triggering actions like detail views.',
      table: {
        category: 'Events',
        defaultValue: { summary: '-' },
        type: { summary: 'EventEmitter<any>' },
      },
    },
    pageChange: {
      control: false,
      description:
        'Emitted when the user changes the page. Useful in **server-side pagination** to fetch new data remotely.',
      table: {
        category: 'Events',
        defaultValue: { summary: '-' },
        type: {
          summary: 'EventEmitter<{ pageIndex: number; pageSize: number }>',
        },
      },
    },
    filtersChange: {
      control: false,
      description:
        'Emitted when filters are modified in **server-side mode**. Contains the full set of current filter values.',
      table: {
        category: 'Events',
        defaultValue: { summary: '-' },
        type: { summary: 'EventEmitter<Record<string, any>>' },
      },
    },
    searchChange: {
      control: false,
      description:
        'Emitted when the user types in the search bar in **server-side mode**.',
      table: {
        category: 'Events',
        defaultValue: { summary: '-' },
        type: { summary: 'EventEmitter<string>' },
      },
    },
    searchModeChange: {
      control: false,
      description:
        'Emitted when the search mode changes between **client-side** and **server-side**.',
      table: {
        category: 'Events',
        defaultValue: { summary: '-' },
        type: { summary: `EventEmitter<'client' | 'server'>` },
      },
    },
  },
  args: {
    // ──────────────────────────────────────────────────────────────
    // 🧩 DATA & COLUMNS
    // ──────────────────────────────────────────────────────────────
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

    // ──────────────────────────────────────────────────────────────
    // ⚙️ CONFIGURATION
    // ──────────────────────────────────────────────────────────────
    config: {
      isSelectable: true,
      isExpandible: true,
      isPaginable: true,
      showActions: true,
    },

    truncate: false,
    serverSide: false,
    lang: 'es',
    filtersPosition: 'top',

    // ──────────────────────────────────────────────────────────────
    // 📊 PAGINATION & FILTERS
    // ──────────────────────────────────────────────────────────────
    pageSize: 10,
    totalItems: 3,
    currentPage: 0,
    filtersVisible: false,

    // ──────────────────────────────────────────────────────────────
    // 🧠 SELECTION & SEARCH
    // ──────────────────────────────────────────────────────────────
    initialTableSelection: [1], // selects the second row
    clearSelection: false,
    showSearch: false,

    // ──────────────────────────────────────────────────────────────
    // 🎨 CUSTOM TEMPLATES (placeholders)
    // ──────────────────────────────────────────────────────────────
    actionTemplate: null,
    detailTemplate: null,
  },
} as Meta<typeof BmbTableLiteComponent>;

type Story = StoryObj<BmbTableLiteComponent>;

export const Default: Story = {};
