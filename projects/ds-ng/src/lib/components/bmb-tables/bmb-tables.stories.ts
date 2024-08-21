import { BmbTablesComponent } from './bmb-tables.component';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

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
import { BmbTablesComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbTablesComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})

export class AppComponent {
  config = {
    isSelectable: true,
    isExpandible: true,
    isPaginable: true,
    showActions: true,
  };

  onSelect(selected: any) {
    // Maneja la selección
  }

  clickButton(event: any) {
    // Maneja el click del botón
  }
}
\`\`\`

Below is an example of how to use this component in HTML:

\`\`\`html
<bmb-table
  [truncate]="false"
  [wrap]="false"
  [data]="[
    {
      lastName: templateForThisCell,
      name: 'Atenea',
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
  ]"
  [columns]="[
    {
      def: 'name',
      label: 'Name',
      dataKey: 'name',
      htmlLabel: dynamicLabel,
    },
    {
      def: 'lastName',
      label: 'Last Name',
      dataKey: 'lastName',
    },
    {
      def: 'birthday',
      label: 'Birthday',
      dataKey: 'birthday',
    },
    {
      def: 'country',
      label: 'Country',
      dataKey: 'country',
    },
  ]"
  [config]="config"
  (select)="onSelect($event)"
  [actionTemplate]="templateAction"
  [detailTemplate]="detailTemplate"
>
  <!-- Define la plantilla dinámica para cada celda -->
  <ng-template #templateForThisCell let-row="row">
    <!-- Aqui puedes meter lo que quieras y como quieras -->
    <div style="display: flex; align-items: center">
      <bmb-icon icon="face"></bmb-icon>
      Benitez
      <bmb-icon icon="face"></bmb-icon>
      <bmb-icon icon="face"></bmb-icon>
    </div>
  </ng-template>

  <!-- Template para los actions -->
  <ng-template #templateAction>
    <div class="action-container">
      <button (click)="clickButton($event)" size="small">
        <bmb-icon [icon]="'apps'" />
      </button>
      <button (click)="clickButton($event)" size="small">
        <bmb-icon [icon]="'add'" />
      </button>
    </div>
  </ng-template>


  <!-- Template para Labels -->
  <ng-template #dynamicLabel let-column="column" let-i="index">
    Title
    <bmb-icon icon="face" class="bmb_table-data-icon" />
  </ng-template>

  <!-- Template para details -->
  <ng-template #detailTemplate let-element="row">
    {{ element.detail }}
  </ng-template>
</bmb-table>
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
      description: 'This output can be used to save the row selected .',
      table: {
        category: 'Events',
        type: { summary: 'onSelect($event)' },
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
        label: 'Name',
        dataKey: 'name',
        icon: 'face',
      },
      {
        def: 'lastName',
        label: 'Last Name',
        dataKey: 'lastName',
        cellTemplate: 'dynamicCell',
        icon: 'face',
      },
      { def: 'birthday', label: 'Birthday', dataKey: 'birthday' },
      { def: 'country', label: 'Country', dataKey: 'country' },
    ],
    config: {
      isSelectable: false,
      isExpandible: false,
      isPaginable: true,
      showActions: true,
    },
    truncate: false,
    wrap: false,
  },
} as Meta<typeof BmbTablesComponent>;

type Story = StoryObj<BmbTablesComponent>;

export const Default: Story = {};
