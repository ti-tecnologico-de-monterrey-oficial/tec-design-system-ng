import { Meta, StoryObj } from '@storybook/angular';
import { BmbTablesComponent } from './bmb-tables.component';

export default {
  title: 'Macro Componentes/Table',
  component: BmbTablesComponent,
  decorators: [],
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
  data = [
    {
      document: 'Contrato profresor cátedra Biología marina CCM.pdf',
      id: '0890',
      folio: '0010',
      sign: 'Iniciado',
      clave: 'Iniciado',
      un: 'Iniciado',
      calificacion: 'Iniciado',
      curso: 'Iniciado',
      column1: 'Text',
      column2: 'Text',
      column3: 'Text',
      detail:
        'Descripción ejemplo Expandable Row. Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
    {
      document: 'Matemáticas I',
      id: '3468',
      folio: '0011',
      sign: 'Firmado',
      clave: 'Firmado',
      un: 'Firmado',
      calificacion: 'Firmado',
      curso: 'Firmado',
      column1: 'Text',
      column2: 'Text',
      column3: 'Text',
      detail:
        'Descripción ejemplo Expandable Row. Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
    {
      document: 'Expresión verbal en el ámbito profesional',
      id: '4579',
      folio: '0012',
      sign: 'En proceso',
      clave: 'En proceso',
      un: 'En proceso',
      calificacion: 'En proceso',
      curso: 'En proceso',
      column1: 'Text',
      column2: 'Text',
      column3: 'Text',
      detail:
        'Descripción ejemplo Expandable Row. Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
    {
      document: 'Diseño de estructuras de concreto',
      id: '2356',
      folio: '0013',
      sign: 'En proceso',
      clave: 'En proceso',
      un: 'En proceso',
      calificacion: 'En proceso',
      curso: 'En proceso',
      column1: 'Text',
      column2: 'Text',
      column3: 'Text',
      detail:
        'Descripción ejemplo Expandable Row. Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
    {
      document: 'Planeación de microempresas para el desarrollo social',
      id: '5789',
      folio: '0014',
      sign: 'Firmado',
      clave: 'Firmado',
      un: 'Firmado',
      calificacion: 'Firmado',
      curso: 'Firmado',
      column1: 'Text',
      column2: 'Text',
      column3: 'Text',
      detail:
        'Descripción ejemplo Expandable Row. Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
    {
      document: 'Administración de obras',
      id: '2345',
      folio: '0015',
      sign: 'Firmado',
      clave: 'Firmado',
      un: 'Firmado',
      calificacion: 'Firmado',
      curso: 'Firmado',
      column1: 'Text',
      column2: 'Text',
      column3: 'Text',
      detail:
        'Descripción ejemplo Expandable Row. Borem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    },
  ];
  columns = [
    {
      def: 'document',
      label: 'Nombre del Documento',
      dataKey: 'document',
    },
    { def: 'id', label: 'Id', dataKey: 'id' },
    { def: 'folio', label: 'Folio de Docs', dataKey: 'folio' },
    { def: 'sign', label: 'Estado de firma', dataKey: 'sign' },
    { def: 'clave', label: 'Clave', dataKey: 'clave' },
    { def: 'un', label: 'Un', dataKey: 'un' },
    {
      def: 'calificacion',
      label: 'Calificación',
      dataKey: 'calificacion',
    },
    { def: 'curso', label: 'Curso ó Req', dataKey: 'curso' },
    { def: 'column1', label: 'Column Header', dataKey: 'column1' },
    { def: 'column2', label: 'Column Header', dataKey: 'column2' },
    { def: 'column3', label: 'Column Header', dataKey: 'column3' },
  ];
  config = {
    isSelectable: true,
    isExpandible: true,
    isPaginable: true,
    showActions: true,
  };
  select(event: string) {
    window.alert(event);
  }
  clickButton(event: any) {
    window.alert(event);
  }
}
\`\`\`

Below is an example of how to use this component in HTML:

\`\`\`html
<bmb-table
  [pageSize]="4"
  [data]="data"
  [columns]="columns"
  [config]="config"
  (select)="select($event)"
  [actionTemplate]="templateAction"
  [detailTemplate]="detailTemplate"
>
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
      name: 'Action Buttons',
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
        lastName: 1,
        name: 'Hydrogen',
        birthday: 1.0079,
        country: 'H',
        extra: 'Lorem ipsum dolor.',
        detail: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
                atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      },
      {
        lastName: 2,
        name: 'Helium',
        birthday: 4.0026,
        country: 'He',
        extra: 'Lorem ipsum dolor.',
        detail: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
                atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      },
      {
        lastName: 3,
        name: 'Lithium',
        birthday: 6.941,
        country: 'Li',
        extra: 'Lorem ipsum dolor.',
        detail: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
                atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      },
      {
        lastName: 4,
        name: 'Beryllium',
        birthday: 9.0122,
        country: 'Be',
        extra: 'Lorem ipsum dolor.',
        detail: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
                atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      },
      {
        lastName: 5,
        name: 'Boron',
        birthday: 10.811,
        country: 'B',
        extra: 'Lorem ipsum dolor.',
        detail: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
                atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      },
      {
        lastName: 6,
        name: 'Carbon',
        birthday: 12.0107,
        country: 'C',
        extra: 'Lorem ipsum dolor.',
        detail: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
                atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      },
      {
        lastName: 7,
        name: 'Nitrogen',
        birthday: 14.0067,
        country: 'N',
        extra: 'Lorem ipsum dolor.',
        detail: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
                atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      },
      {
        lastName: 8,
        name: 'Oxygen',
        birthday: 15.9994,
        country: 'O',
        extra: 'Lorem ipsum dolor.',
        detail: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
                atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      },
      {
        lastName: 9,
        name: 'Fluorine',
        birthday: 18.9984,
        country: 'F',
        extra: 'Lorem ipsum dolor.',
        detail: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
                atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      },
      {
        lastName: 10,
        name: 'Neon',
        birthday: 20.1797,
        country: 'Ne',
        extra: 'Lorem ipsum dolor.',
        detail: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
                atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      },
    ],
    columns: [
      { def: 'name', label: 'Name', dataKey: 'name' },
      { def: 'lastName', label: 'Last Name', dataKey: 'lastName' },
      { def: 'birthday', label: 'Birthday', dataKey: 'birthday' },
      { def: 'country', label: 'Country', dataKey: 'country' },
      { def: 'extra', label: 'Extra', dataKey: 'extra' },
    ],
    config: {
      isSelectable: false,
      isExpandible: false,
      isPaginable: true,
      showActions: true,
    },
    select: (params: any) => {
      window.alert(params.toString());
    },
  },
} as Meta<typeof BmbTablesComponent>;

type Story = StoryObj<BmbTablesComponent>;

export const Default: Story = {};
