import { Meta, StoryObj } from '@storybook/angular';
import {
  argsToTemplate,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BmbPaginatorComponent } from './bmb-paginator.component';

export default {
  title: 'Micro Componentes/Paginator',
  component: BmbPaginatorComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbPaginatorComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbPaginatorComponent, CommonModule],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})

export class AppComponent {

    items: any[] = []; // Datos completos
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
    }

}
\`\`\`

Below is an example of how you can use this component in HTML:

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
      name: 'Total Items',
      control: 'number',
      description: 'Refers to the total items of the table',
      table: {
        type: { summary: 'number' },
        category: 'Properties',
        defaultValue: { summary: 0 },
      },
    },
    itemsPerPage: {
      name: 'Items Per Page',
      control: {
        type: 'number',
      },
      description: 'Set the total numer of items to show per page',
      table: {
        type: { summary: 'number' },
        category: 'Properties',
        defaultValue: { summary: 5 },
      },
    },
    currentPage: {
      name: 'Current Page',
      control: {
        type: 'number',
      },
      description: 'Set the number of page to show',
      table: {
        type: { summary: 'number' },
        category: 'Properties',
        defaultValue: { summary: 5 },
      },
    },
    pageChange: {
      name: 'Page change',
      control: {
        type: '',
      },
      description: 'This output is used to receive the new page to show.',
      table: {
        category: 'Events',
        type: { summary: 'onPageChange($event)' },
      },
    },
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
