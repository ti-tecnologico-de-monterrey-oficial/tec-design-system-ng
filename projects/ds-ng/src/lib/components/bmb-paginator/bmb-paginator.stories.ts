import { Meta, StoryObj } from '@storybook/angular';
import { BmbPaginatorComponent } from './bmb-paginator.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
} from '../../utils/doc/utils';
import { getOnEventParam } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Status indicators/Paginator',
  component: BmbPaginatorComponent,
  parameters: {
    docs: {
      controls: { exclude: ['getPaginationText', 'onPageChange', ''] },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('paginator')} to add controls to navigate between pages, using "next" and "previous" buttons, even displays a specific subset of the total pages at a time.`, 'https://bamboo.tec.mx/latest/componentes/paginator/descripcion-general-ermvHDlX')}
${getBasicExampleBlock(
  'BmbPaginatorComponent',
  '',
  `items: any[] = []; // Datos completos
    displayedItems: any[] = []; // Datos a mostrar en la página actual
    totalItems: number = 0;
    itemsPerPage: number = 5;
    currentPage: number = 1;

    fetchData(): void {
        // Simulación de datos. En una aplicación real, puedes hacer una solicitud HTTP.
        this.items = [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6",
        "Item 7",
        "Item 8",
        "Item 9",
        "Item 10",
        "Item 11",
        "Item 12",
        "Item 13",
        "Item 14",
        "Item 15",
        "Item 16",
        "Item 17",
        "Item 18",
        "Item 19",
        "Item 20"
    ],
        this.totalItems = this.items.length;
        this.updateDisplayedItems();
    }

    updateDisplayedItems(): void {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        this.displayedItems = this.items.slice(start, end);
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.updateDisplayedItems();
    }`,
)}
\`\`\`html
<table class="table">
  <thead>
    <tr>
      <th>#</th>
      <th>Item</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let item of displayedItems; let i = index">
      <td>{{ (currentPage - 1) * itemsPerPage + i + 1 }}</td>
      <td>{{ item }}</td>
    </tr>
  </tbody>
</table>

<bmb-paginator
  [totalItems]="totalItems"
  [itemsPerPage]="itemsPerPage"
  [currentPage]="currentPage"
  (pageChange)="onPageChange($event)">
</bmb-paginator>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    totalItems: {
      control: 'number',
      description: 'Sets the total items of the table',
      table: {
        type: { summary: 'number' },
        category: 'Properties',
        defaultValue: { summary: 0 },
      },
    },
    itemsPerPage: {
      control: {
        type: 'number',
      },
      description: 'Sets the total number of items to show per page',
      table: {
        type: { summary: 'number' },
        category: 'Properties',
        defaultValue: { summary: 5 },
      },
    },
    currentPage: {
      control: {
        type: 'number',
      },
      description: 'Sets the number of page to show',
      table: {
        type: { summary: 'number' },
        category: 'Properties',
        defaultValue: { summary: 5 },
      },
    },
    pageChange: getOnEventParam(
      getOnEvent('page number', 'pageChange'),
      `<br/>Useful to use to receive the new page that will be displayed.`,
    ),
  },
  args: {
    totalItems: 20,
    itemsPerPage: 5,
    currentPage: 1,
  },
} as Meta<typeof BmbPaginatorComponent>;

type Story = StoryObj<BmbPaginatorComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
        <bmb-paginator
            [totalItems]="totalItems"
            [itemsPerPage]="itemsPerPage"
            [currentPage]="currentPage"
            (pageChange)="onPageChange($event)">
        </bmb-paginator>
      `,
  }),
};
