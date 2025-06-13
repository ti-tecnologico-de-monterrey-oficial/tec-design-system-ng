import { BmbServerTableComponent } from './bmb-server-table.component';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { storiesLayoutVertical } from '../../utils/bambooLayout';

export default {
  title: 'Macro Componentes/Server table',
  component: BmbServerTableComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BmbIconComponent],
    }),
    storiesLayoutVertical,
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbServerTableComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbServerTableComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})

export class AppComponent {
}
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
        type: { summary: 'object[]' },
        defaultValue: { summary: '[]' },
      },
    },
    columns: {
      name: 'Columns',
      control: {
        type: 'IBmbServerTableColumn',
      },
      description: 'Set the columns to show in the table.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbServerTableColumn[]' },
        defaultValue: { summary: '[]' },
      },
    },
    totalRecords: {
      name: 'Total Records',
      control: 'number',
      description: 'Set the total number of records.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    pageSize: {
      name: 'Page Size',
      control: 'number',
      description: 'Set the number of records per page.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: 10 },
      },
    },
    pageSizeOptions: {
      name: 'Page Size Options',
      control: 'array',
      description: 'Set the options for the page size.',
      table: {
        category: 'Properties',
        type: { summary: 'number[]' },
        defaultValue: { summary: '[]' },
      },
    },
    loading: {
      name: 'Loading',
      control: 'boolean',
      description: 'Set the loading state.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    pageChange: {
      name: 'Page Change',
      control: null,
      description: 'Set the function to call when the page changes.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    dataChange: {
      name: 'Data Change',
      control: null,
      description: 'Set the function to call when the data changes.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onClickRow: {
      name: 'Click Row',
      control: null,
      description: 'Set the function to call when a row is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
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
        key: 'name',
        label: 'Name',
      },
      {
        key: 'lastName',
        label: 'Last Name',
      },
      {
        key: 'birthday',
        label: 'Birthday',
      },
      {
        key: 'country',
        label: 'Country',
      },
    ],
    totalRecords: 2,
    pageSizeOptions: [5, 10, 15],
    pageSize: 10,
    loading: false,
  },
} as Meta<typeof BmbServerTableComponent>;

type Story = StoryObj<BmbServerTableComponent>;

export const Default: Story = {};
