import { BmbTablesComponent } from './bmb-tables.component';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { attributes } from '../../utils/utils';

export default {
  title: 'Macro Componentes/Table',
  component: BmbTablesComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BmbIconComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BmbBadgeComponent,
  BmbIconComponent,
  BmbTablesComponent,
  BmbThemeComponent,
} from '../../projects/ds-ng/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    BmbTablesComponent,
    BmbThemeComponent,
    BmbIconComponent,
    BmbBadgeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
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
}
\`\`\`

Below is an example of how to use this component in HTML:

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
      name: 'Data',
      control: {
        type: 'object',
      },
      description: 'Set the data to show in the table.',
      table: {
        category: 'Properties',
        type: { summary: 'object' },
      },
    },
    columns: {
      name: 'Columns',
      control: {
        type: 'object',
      },
      description: 'Set the columns to show in the table.',
      table: {
        category: 'Properties',
        type: { summary: 'object' },
      },
    },
    config: {
      name: 'Config',
      control: { type: 'object' },
      description: 'Set the main config for the table',
      table: {
        category: 'Properties',
        type: { summary: 'object' },
      },
    },
    truncate: {
      name: 'Truncate',
      control: {
        type: 'boolean',
      },
      description:
        'Determine if the text in all table cells will be truncated or not.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    wrap: {
      name: 'Wrap',
      control: {
        type: 'boolean',
      },
      description:
        'Determine if the text in all table cells will be wrapped or not.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    actionTemplate: {
      name: 'Action Template',
      control: { type: 'template' },
      description: 'Set the action buttons to show in the Action column',
      table: {
        category: 'Properties',
        type: { summary: 'template' },
      },
    },
    detailTemplate: {
      name: 'Detail Template',
      control: { type: 'template' },
      description: 'Set the template to show the detail row',
      table: {
        category: 'Properties',
        type: { summary: 'template' },
      },
    },
    pageSize: {
      name: 'Page Size',
      control: { type: 'number' },
      description:
        'Set the number of elements to show in the table when the pagination is activated',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    select: {
      name: 'Select',
      control: {
        type: '',
      },
      description:
        'This output can be used to save the row selected by the checkbox configuration.',
      table: {
        category: 'Events',
        type: { summary: 'onSelect($event)' },
      },
    },
    clickedRow: {
      name: 'Clicked Row',
      control: {
        type: '',
      },
      description:
        'This output can be used to save the row selected by the interaction of a click.',
      table: {
        category: 'Events',
        type: { summary: 'clickedRow($event)' },
      },
    },
    initialTableSelection: {
      name: 'Initial Table Selection',
      control: {
        type: 'object',
      },
      description:
        'Set the initial selection of the table. This is an array of indexes that will be selected when the table is initialized. **Warning**: If the data is asynchronous, this property must also be asynchronous.',
      table: {
        category: 'Properties',
        type: { summary: 'number[]' },
        defaultValue: { summary: '[]' },
      },
    },
    showSearch: {
      name: 'Show Search',
      control: {
        type: 'boolean',
      },
      description: 'Show or hide the search input at the top of the table.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showFilters: {
      name: 'Show Filters',
      control: {
        type: 'boolean',
      },
      description: 'Show or hide the column filters section.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    lang: {
      name: 'Language',
      control: {
        type: 'select',
      },
      options: ['es', 'en'],
      description:
        'Set the language of the table. This will change the text of the headers table.',
      table: {
        category: 'Properties',
        type: { summary: 'BmbTableLang' },
        defaultValue: { summary: 'es' },
      },
    }
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
      { def: 'birthday', label: 'Cumpleaños', dataKey: 'birthday', labelEn: 'Birthday' },
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

export const Default = {};
