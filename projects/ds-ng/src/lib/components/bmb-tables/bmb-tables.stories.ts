import { BmbTablesComponent } from './bmb-tables.component';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  getBasicExampleBlock,
  getEmptyStateMessage,
  getGeneralComponentDescription,
  getGeneralDescription,
  getModelDescription,
  getOnEvent,
  getSpecialSpecifications,
  RELEVANT_TITLE_LEVEL,
} from '../../utils/doc/utils';
import { getOnEventParam } from '../../utils/doc/parameterDescriptions';

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

const SELECTED_ROW_DESCRIPTION: string =
  '<br/><br/>This can be used to save the row selected.';

export default {
  title: 'Components/Containers/Table',
  tags: ['!autodocs'],
  component: BmbTablesComponent,
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
        'getCellClasses	',
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
        'onSelect	',
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
        'getTableClasses',
        'goToFirstPage',
        'goToLastPage',
        'goToNextPage',
        'goToPreviousPage',
        'lastPage',
        'onPageEvent',
        'parsedFiltersColumns',
        'cellRef',
        'headerCellRef',
        'matTableRef',
        'paginator',
      ],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({ name: 'table' })} rendering highly configurable and interactive tables.
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
  BmbTablesComponent,
  BmbThemeComponent,
`,
  '',
  additionalBlock,
)}
\`\`\`html

<bmb-table
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
</bmb-table>

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
  <bmb-table
    *ngIf="isObject(row.detail)"
    [data]="row.detail.data"
    [columns]="row.detail.columns"
    [config]="row.detail.config"
    [truncate]="false"
    [wrap]="false"
  ></bmb-table>
</ng-template>

\`\`\`
        `,
      },
    },
  },
  argTypes: {
    data: {
      control: {
        type: 'object',
      },
      description: 'Sets the data to show in the table.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'object' },
      },
    },
    columns: {
      control: {
        type: 'object',
      },
      description: 'Sets the columns to show in the table.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'object' },
      },
    },
    config: {
      control: { type: 'object' },
      description: 'Sets the main config for the table',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'object' },
      },
    },
    truncate: {
      control: {
        type: 'boolean',
      },
      description:
        'Determines if the text in all table cells will be truncated or not.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    filtersVisible: {
      control: {
        type: 'boolean',
      },
      description: `Shows or hide the filters section. This property is a Model.<br/><br/>${getModelDescription('filtersVisible')}`,
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    wrap: {
      control: {
        type: 'boolean',
      },
      description:
        'Determines if the text in all table cells will be wrapped or not.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    actionTemplate: {
      control: { type: 'template' },
      description: 'Sets the action buttons to show in the Action column',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'template' },
      },
    },
    detailTemplate: {
      control: { type: 'template' },
      description: 'Sets the template to show the detail row',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'template' },
      },
    },
    pageSize: {
      control: { type: 'number' },
      description:
        'Sets the number of elements to show in the table when the pagination is activated',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'number' },
      },
    },
    currentPage: {
      control: { type: 'number' },
      description: 'Sets the current page index.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
    totalItems: {
      control: { type: 'number' },
      description:
        'Sets the total number of items in the table for pagination (used for server-side pagination).',
      table: {
        category: 'Properties',
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
    serverSide: {
      control: {
        type: 'boolean',
      },
      description:
        'Enables server-side mode. <br/>The data handling:<br/> Pagination, filtering, and sorting.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    select: getOnEventParam(
      getOnEvent('', 'select', 'unknown'),
      `when a row is selected by its checkbox.${SELECTED_ROW_DESCRIPTION}`,
      'other',
    ),
    clickedRow: getOnEventParam(
      getOnEvent('', 'clickedRow', 'unknown'),
      `when a row is selected by the interaction of a click.${SELECTED_ROW_DESCRIPTION}`,
      'other',
    ),
    searchChange: getOnEventParam(
      getOnEvent('the search value', 'searchChange', 'string'),
    ),
    filtersChange: getOnEventParam(
      getOnEvent(
        'whether of the filters',
        'filtersChange',
        'Record<string, any>',
      ),
    ),
    searchModeChange: getOnEventParam(
      getOnEvent(
        "whether search is in 'client' or 'server' mode",
        'searchModeChange',
        "string ('client' | 'server')",
      ),
    ),
    pageChange: getOnEventParam(
      getOnEvent(
        '',
        'searchModeChange',
        `{
  pageIndex: number;
  pageSize: number;
}`,
      ),
      'with the pagination page: index and size',
      'other',
    ),
    initialTableSelection: {
      control: {
        type: 'object',
      },
      description: `
Sets the initial selection of the table.

This is an array of indexes that will be selected when the table is initialized.

${RELEVANT_TITLE_LEVEL[0]} If the data is asynchronous, this property must also be asynchronous.`,
      table: {
        category: 'Properties',
        type: { summary: 'number[]' },
        defaultValue: { summary: '[]' },
      },
    },
    showSearch: {
      control: {
        type: 'boolean',
      },
      description: 'Shows or hide the search input at the top of the table.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showFilters: {
      control: {
        type: 'boolean',
      },
      description: 'Shows or hide the column filters section.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    lang: {
      control: {
        type: 'select',
      },
      options: ['es', 'en'],
      description:
        'Sets the language of the table. This will change the text of the headers table.',
      table: {
        category: 'Properties',
        type: { summary: 'BmbTableLang' },
        defaultValue: { summary: 'es' },
      },
    },
    filtersPosition: {
      control: {
        type: 'select',
      },
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Sets the position of the filters section.',
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
      {
        id: 4,
        first_name: 'Sylas',
        last_name: 'Cartwright',
        email: 'scartwright3@e-recht24.de',
        country: 'Philippines',
        birthday: '25/10/1999',
        balance: 6998,
      },
      {
        id: 5,
        first_name: 'Eyde',
        last_name: 'Mylechreest',
        email: 'emylechreest4@artisteer.com',
        country: 'China',
        birthday: '22/12/1970',
        balance: 2169,
      },
      {
        id: 6,
        first_name: 'Derek',
        last_name: 'MacKill',
        email: 'dmackill5@home.pl',
        country: 'Jamaica',
        birthday: '21/04/1998',
        balance: 8285,
      },
      {
        id: 7,
        first_name: 'Livvie',
        last_name: 'Riddle',
        email: 'lriddle6@reuters.com',
        country: 'Canada',
        birthday: '21/04/1977',
        balance: 6499,
      },
      {
        id: 8,
        first_name: 'Bastian',
        last_name: 'Jozwik',
        email: 'bjozwik7@jugem.jp',
        country: 'Indonesia',
        birthday: '25/10/1998',
        balance: 7052,
      },
      {
        id: 9,
        first_name: 'Jazmin',
        last_name: 'Skryne',
        email: 'jskryne8@indiegogo.com',
        country: 'Equatorial Guinea',
        birthday: '22/04/1976',
        balance: 2351,
      },
      {
        id: 10,
        first_name: 'Ivan',
        last_name: 'Teas',
        email: 'iteas9@washington.edu',
        country: 'Bulgaria',
        birthday: '12/08/1995',
        balance: 1427,
      },
      {
        id: 11,
        first_name: 'Artur',
        last_name: 'Pietruschka',
        email: 'apietruschkaa@whitehouse.gov',
        country: 'China',
        birthday: '08/12/1988',
        balance: 5995,
      },
      {
        id: 12,
        first_name: 'Reta',
        last_name: 'Morffew',
        email: 'rmorffewb@smugmug.com',
        country: 'Brazil',
        birthday: '19/10/1970',
        balance: 2442,
      },
      {
        id: 13,
        first_name: 'Laney',
        last_name: 'Lente',
        email: 'llentec@slate.com',
        country: 'Bahrain',
        birthday: '16/12/1997',
        balance: 3412,
      },
      {
        id: 14,
        first_name: 'Kenny',
        last_name: 'Axby',
        email: 'kaxbyd@vk.com',
        country: 'Indonesia',
        birthday: '13/12/1975',
        balance: 9586,
      },
      {
        id: 15,
        first_name: 'Berenice',
        last_name: 'Pleat',
        email: 'bpleate@facebook.com',
        country: 'Brazil',
        birthday: '15/12/1983',
        balance: 3013,
      },
      {
        id: 16,
        first_name: 'Evita',
        last_name: 'Jobey',
        email: 'ejobeyf@instagram.com',
        country: 'Poland',
        birthday: '07/07/1998',
        balance: 8973,
      },
      {
        id: 17,
        first_name: 'Jay',
        last_name: 'Beenham',
        email: 'jbeenhamg@liveinternet.ru',
        country: 'Canada',
        birthday: '12/03/2003',
        balance: 3628,
      },
      {
        id: 18,
        first_name: 'Zerk',
        last_name: 'Puleston',
        email: 'zpulestonh@elegantthemes.com',
        country: 'France',
        birthday: '17/02/2003',
        balance: 4343,
      },
      {
        id: 19,
        first_name: 'Louise',
        last_name: 'Soutter',
        email: 'lsoutteri@ning.com',
        country: 'Japan',
        birthday: '04/07/1979',
        balance: 6048,
      },
      {
        id: 20,
        first_name: 'Franky',
        last_name: 'Bryett',
        email: 'fbryettj@chron.com',
        country: 'China',
        birthday: '21/02/1984',
        balance: 2449,
      },
      {
        id: 21,
        first_name: 'Anabella',
        last_name: 'Woolliams',
        email: 'awoolliamsk@about.com',
        country: 'Ukraine',
        birthday: '01/08/1977',
        balance: 3459,
      },
      {
        id: 22,
        first_name: 'Prince',
        last_name: 'Echlin',
        email: 'pechlinl@soundcloud.com',
        country: 'Poland',
        birthday: '08/07/1998',
        balance: 8499,
      },
      {
        id: 23,
        first_name: 'Aldis',
        last_name: 'Hollow',
        email: 'ahollowm@feedburner.com',
        country: 'China',
        birthday: '29/01/1970',
        balance: 4668,
      },
      {
        id: 24,
        first_name: 'Debora',
        last_name: 'Sherebrook',
        email: 'dsherebrookn@fastcompany.com',
        country: 'Cuba',
        birthday: '11/01/1986',
        balance: 6975,
      },
      {
        id: 25,
        first_name: 'Wilma',
        last_name: 'Keeffe',
        email: 'wkeeffeo@ezinearticles.com',
        country: 'China',
        birthday: '04/02/1999',
        balance: 4115,
      },
      {
        id: 26,
        first_name: 'Wren',
        last_name: 'McCroary',
        email: 'wmccroaryp@state.gov',
        country: 'Ukraine',
        birthday: '07/03/1990',
        balance: 4006,
      },
      {
        id: 27,
        first_name: 'Beatrix',
        last_name: 'Cornford',
        email: 'bcornfordq@yahoo.com',
        country: 'Albania',
        birthday: '10/03/1986',
        balance: 7778,
      },
      {
        id: 28,
        first_name: 'Garrott',
        last_name: 'Greatbatch',
        email: 'ggreatbatchr@clickbank.net',
        country: 'Gabon',
        birthday: '24/06/1994',
        balance: 3658,
      },
      {
        id: 29,
        first_name: 'Everard',
        last_name: 'Emblem',
        email: 'eemblems@cnbc.com',
        country: 'Estonia',
        birthday: '23/04/1994',
        balance: 4157,
      },
      {
        id: 30,
        first_name: 'Bordy',
        last_name: 'Rising',
        email: 'brisingt@statcounter.com',
        country: 'Poland',
        birthday: '05/09/1992',
        balance: 7404,
      },
      {
        id: 31,
        first_name: 'Muffin',
        last_name: 'Bellefant',
        email: 'mbellefantu@spotify.com',
        country: 'China',
        birthday: '25/05/1971',
        balance: 9618,
      },
      {
        id: 32,
        first_name: 'Dickie',
        last_name: 'Dargue',
        email: 'ddarguev@miitbeian.gov.cn',
        country: 'China',
        birthday: '10/10/2001',
        balance: 5804,
      },
      {
        id: 33,
        first_name: 'Joey',
        last_name: 'Bullard',
        email: 'jbullardw@fc2.com',
        country: 'Ukraine',
        birthday: '31/03/1989',
        balance: 7495,
      },
      {
        id: 34,
        first_name: 'Tyrus',
        last_name: 'Ducker',
        email: 'tduckerx@icio.us',
        country: 'Philippines',
        birthday: '12/06/1979',
        balance: 1545,
      },
      {
        id: 35,
        first_name: 'Almeria',
        last_name: 'Lewty',
        email: 'alewtyy@cloudflare.com',
        country: 'Croatia',
        birthday: '02/02/1996',
        balance: 8850,
      },
      {
        id: 36,
        first_name: 'Rosalie',
        last_name: 'Benbough',
        email: 'rbenboughz@opera.com',
        country: 'Russia',
        birthday: '21/09/1996',
        balance: 7910,
      },
      {
        id: 37,
        first_name: 'Rhianna',
        last_name: 'Biaggelli',
        email: 'rbiaggelli10@virginia.edu',
        country: 'Brazil',
        birthday: '27/12/1978',
        balance: 8238,
      },
      {
        id: 38,
        first_name: 'Melany',
        last_name: 'Giblin',
        email: 'mgiblin11@163.com',
        country: 'Indonesia',
        birthday: '13/05/1971',
        balance: 4732,
      },
      {
        id: 39,
        first_name: 'Esme',
        last_name: 'Chitty',
        email: 'echitty12@bloglovin.com',
        country: 'Liberia',
        birthday: '17/05/1974',
        balance: 4226,
      },
      {
        id: 40,
        first_name: 'Brittni',
        last_name: 'Weond',
        email: 'bweond13@prlog.org',
        country: 'Philippines',
        birthday: '25/03/1985',
        balance: 3344,
      },
      {
        id: 41,
        first_name: 'Meghan',
        last_name: 'Fruen',
        email: 'mfruen14@archive.org',
        country: 'Philippines',
        birthday: '19/04/1982',
        balance: 7365,
      },
      {
        id: 42,
        first_name: 'Josepha',
        last_name: 'Kivelle',
        email: 'jkivelle15@dmoz.org',
        country: 'Colombia',
        birthday: '03/11/1975',
        balance: 3581,
      },
      {
        id: 43,
        first_name: 'Isidro',
        last_name: 'Double',
        email: 'idouble16@soundcloud.com',
        country: 'Czech Republic',
        birthday: '02/09/1990',
        balance: 7701,
      },
      {
        id: 44,
        first_name: 'Bary',
        last_name: 'Sterry',
        email: 'bsterry17@elegantthemes.com',
        country: 'Swaziland',
        birthday: '23/12/1983',
        balance: 1151,
      },
      {
        id: 45,
        first_name: 'Durante',
        last_name: 'Borris',
        email: 'dborris18@craigslist.org',
        country: 'Sweden',
        birthday: '27/11/1991',
        balance: 1231,
      },
      {
        id: 46,
        first_name: 'Elsa',
        last_name: 'Yurenev',
        email: 'eyurenev19@altervista.org',
        country: 'Bulgaria',
        birthday: '02/03/1988',
        balance: 4237,
      },
      {
        id: 47,
        first_name: 'Neal',
        last_name: 'Streetfield',
        email: 'nstreetfield1a@auda.org.au',
        country: 'China',
        birthday: '30/11/1981',
        balance: 4101,
      },
      {
        id: 48,
        first_name: 'Celestine',
        last_name: 'Scapens',
        email: 'cscapens1b@admin.ch',
        country: 'Spain',
        birthday: '03/06/1993',
        balance: 3852,
      },
      {
        id: 49,
        first_name: 'Warde',
        last_name: 'Styles',
        email: 'wstyles1c@ning.com',
        country: 'China',
        birthday: '20/03/1976',
        balance: 9515,
      },
      {
        id: 50,
        first_name: 'Kristen',
        last_name: 'Bangs',
        email: 'kbangs1d@nbcnews.com',
        country: 'Thailand',
        birthday: '19/11/2003',
        balance: 7287,
      },
      {
        id: 51,
        first_name: 'Eliot',
        last_name: 'Sanbroke',
        email: 'esanbroke1e@squarespace.com',
        country: 'Saudi Arabia',
        birthday: '03/02/2002',
        balance: 5542,
      },
      {
        id: 52,
        first_name: 'Brantley',
        last_name: 'Gotthard.sf',
        email: 'bgotthardsf1f@cocolog-nifty.com',
        country: 'Poland',
        birthday: '30/12/1983',
        balance: 6848,
      },
      {
        id: 53,
        first_name: 'Fayette',
        last_name: 'Adlington',
        email: 'fadlington1g@auda.org.au',
        country: 'Indonesia',
        birthday: '17/11/1979',
        balance: 1276,
      },
      {
        id: 54,
        first_name: 'Byrle',
        last_name: 'Bantick',
        email: 'bbantick1h@deviantart.com',
        country: 'Philippines',
        birthday: '25/04/1985',
        balance: 1740,
      },
      {
        id: 55,
        first_name: 'Britney',
        last_name: 'Klishin',
        email: 'bklishin1i@storify.com',
        country: 'Portugal',
        birthday: '20/06/1976',
        balance: 1112,
      },
      {
        id: 56,
        first_name: 'Fields',
        last_name: 'Guiden',
        email: 'fguiden1j@nyu.edu',
        country: 'Mexico',
        birthday: '20/11/1999',
        balance: 3798,
      },
      {
        id: 57,
        first_name: 'Sybilla',
        last_name: 'Zylbermann',
        email: 'szylbermann1k@patch.com',
        country: 'China',
        birthday: '15/11/2002',
        balance: 4025,
      },
      {
        id: 58,
        first_name: 'Gregg',
        last_name: 'Castagnier',
        email: 'gcastagnier1l@sina.com.cn',
        country: 'Dominican Republic',
        birthday: '20/09/1992',
        balance: 6275,
      },
      {
        id: 59,
        first_name: 'Gertrude',
        last_name: 'Jirek',
        email: 'gjirek1m@foxnews.com',
        country: 'Peru',
        birthday: '15/03/1978',
        balance: 2025,
      },
      {
        id: 60,
        first_name: 'Granny',
        last_name: 'Earnshaw',
        email: 'gearnshaw1n@wsj.com',
        country: 'Philippines',
        birthday: '14/11/1983',
        balance: 1709,
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
      {
        def: 'country',
        label: 'País',
        dataKey: 'country',
        labelEn: 'Country',
      },
      {
        def: 'balance',
        label: 'Saldo',
        dataKey: 'balance',
        labelEn: 'Balance',
        type: 'number',
      },
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
    pageSize: 20,
    filtersPosition: 'top',
  },
} as Meta<typeof BmbTablesComponent>;

type Story = StoryObj<BmbTablesComponent>;

export const Default: Story = {};
