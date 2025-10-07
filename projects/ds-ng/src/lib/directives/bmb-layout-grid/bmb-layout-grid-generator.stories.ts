import { Component, input, signal } from '@angular/core';
import {
  BmbLayoutGridDirective,
  BmbLayoutGridItemDirective,
} from './bmb-layout-grid.directive';
import { SizeNames } from '../../types';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import {
  attributes,
  getGeneralDescription,
  getPageStructureForFoundationStories,
  getSpecialSpecifications,
  SANDBOX_TITLE,
} from '../../utils/doc/utils';
import { CommonModule } from '@angular/common';
import { BmbAccordionComponent } from '../../components/bmb-accordion/bmb-accordion.component';
import { BmbActionIconComponent } from '../../components/bmb-action-icon/bmb-action-icon.component';
import { BmbLayoutDirective } from '../bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../bmb-layout/bmb-layout-item.directive';

@Component({
  standalone: true,
  selector: 'storybook-layout-grid-stories',
  template: `
    <div
      bmbLayoutGrid
      [colGapSize]="colGapSize()"
      [rowGapSize]="rowGapSize()"
      [columnSize]="columnSize()"
      [rowSize]="rowSize()"
      [columns]="columns()"
      [rows]="rows()"
      [height]="height()"
    >
      <section
        *ngFor="let item of generateItems(); index as i; trackBy: trackByFn"
        (mousedown)="mouseDown(item)"
        (mouseup)="mouseUp(item)"
        class="grid-placeholder"
        [ngStyle]="{ 'grid-area': item }"
      ></section>
      <section
        *ngFor="let item of generatedItems(); index as i; trackBy: trackByFn"
        [ngStyle]="getItemStyles(i)"
        bmbLayoutGridItem
        [colStart]="getCoordinates('colStart', item)"
        [rowStart]="getCoordinates('rowStart', item)"
        [numberOfColumns]="getCoordinates('cols', item)"
        [numberOfRows]="getCoordinates('rows', item)"
      >
        <span [ngStyle]="getSpanStyles(i)">Item: {{ i + 1 }}</span>
      </section>
    </div>
    <bmb-accordion
      borderRadius="m"
      margin="m"
      paddingHeader="m"
      paddingContent="m"
      [hideToggle]="false"
      icon="keyboard_arrow_down"
      [active]="false"
      [disabled]="false"
      [expanded]="false"
    >
      <ng-template #bmbAccordionHeader>
        <section
          style="flex: 1"
          bmbLayout
          margin="none"
          alignItems="center"
          justify="spaceBetween"
        >
          <div bmbLayoutItem margin="none" [isDynamicItem]="true" [colGrow]="1">
            Show generated HTML code
          </div>
          <div bmbLayoutItem margin="none" [isDynamicItem]="true">
            <bmb-action-icon
              icon="content_copy"
              [iconSize]="24"
              (buttonClick)="copyCode()"
              title="Copy code"
            />
          </div>
        </section>
      </ng-template>
      <ng-template #bmbAccordionContent>
        <pre> {{ getHTMLCode() }} </pre>
      </ng-template>
    </bmb-accordion>
  `,
  imports: [
    BmbLayoutGridDirective,
    CommonModule,
    BmbLayoutGridItemDirective,
    BmbAccordionComponent,
    BmbActionIconComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  styles: `
    .grid-placeholder {
      background-image: repeating-linear-gradient(
        45deg,
        var(--general_contrasts-50) 0,
        var(--general_contrasts-50) 1px,
        transparent 0,
        transparent 50%
      );
      background-size: 8px 8px;
      border: 1px solid var(--general_contrasts-50);
      padding: 1rem;
      opacity: 0.5;
      user-select: none;
    }
  `,
})
class StorybookLayoutGridStories {
  colGapSize = input<SizeNames>('m');
  rowGapSize = input<SizeNames>('m');
  columnSize = input<string[] | string>('auto');
  rowSize = input<string[] | string>('auto');
  columns = input<number>(1);
  rows = input<number>(1);
  height = input<string | number>('auto');

  start: string = '';
  end: string = '';
  generatedItems = signal<string[]>([]);
  colors = [
    'var(--violet-tint)',
    'var(--indigo-tint)',
    'var(--emerald-tint)',
    'var(--licorice-tint)',
    'var(--dark-teal-tint)',
    'var(--peach-tint)',
    'var(--sepia-tint)',
    'var(--soft-red-tint)',
    'var(--wattle-tint)',
    'var(--ship-cove-tint)',
    'var(--plantation-tint)',
    'var(--rum-tint)',
    'var(--ripe-lemon-tint)',
    'var(--hibiscus-tint)',
  ];

  copyCode() {
    const code = this.getHTMLCode();
    navigator.clipboard
      .writeText(code)
      .then(() => {
        console.log('Code copied to clipboard');
      })
      .catch((err) => {
        console.error('Error copying code: ', err);
      });
  }

  getSpanStyles(index: number) {
    const color = this.colors[index % this.colors.length];

    return {
      'background-color': `rgba(${color}, 1)`,
      padding: '.25rem 1rem',
      'border-radius': '1rem',
    };
  }

  getHTMLCode() {
    return `
      <div
        bmbLayoutGrid
        colGapSize="${this.colGapSize()}"
        rowGapSize="${this.rowGapSize()}"
        [columnSize]="${this.columnSize()}"
        [rowSize]="${this.rowSize()}"
        [columns]="${this.columns()}"
        [rows]="${this.rows()}"
      >
        ${this.generatedItems().reduce((acc, item) => {
          return (
            acc +
            `
            <section
              bmbLayoutGridItem
              [colStart]="${this.getCoordinates('colStart', item)}"
              [rowStart]="${this.getCoordinates('rowStart', item)}"
              [numberOfColumns]="${this.getCoordinates('cols', item)}"
              [numberOfRows]="${this.getCoordinates('rows', item)}"
            > <!-- Item content here --> </section>
          `
          );
        }, '')}
      </div>
    `;
  }

  generateItems() {
    const elements = Array(this.rows()).fill(0);
    const namedItems = elements.map((_, r_index) => {
      const items = Array(this.columns()).fill(0);
      return items.map((_, c_index) => {
        return `${r_index + 1} / ${c_index + 1} / ${r_index + 2} / ${c_index + 2}`;
      });
    });

    return namedItems.flat();
  }

  getCoordinates(section: string, item: string) {
    switch (section) {
      case 'colStart':
        return parseInt(item.split(' / ')[1]);
      case 'rowStart':
        return parseInt(item.split(' / ')[0]);
      case 'cols':
        return parseInt(item.split(' / ')[3]) - parseInt(item.split(' / ')[1]);
      case 'rows':
        return parseInt(item.split(' / ')[2]) - parseInt(item.split(' / ')[0]);
      default:
        return 0;
    }
  }

  mouseDown(event: string) {
    this.start = event;
  }

  mouseUp(event: string) {
    this.end = event;
    this.generateNewItem();
  }

  getItemStyles(index: number) {
    const color = this.colors[index % this.colors.length];

    return {
      'z-index': 1,
      'background-color': `rgba(${color}, .5)`,
      border: `1px solid rgba(${color}, 1)`,
      padding: '1rem',
    };
  }

  generateNewItem() {
    const coordinates = {
      start: this.start.split(' / '),
      end: this.end.split(' / '),
    };
    const start = {
      row: Math.min(
        parseInt(coordinates.start[0]),
        parseInt(coordinates.end[0]),
      ),
      column: Math.min(
        parseInt(coordinates.start[1]),
        parseInt(coordinates.end[1]),
      ),
    };
    const end = {
      row: Math.max(
        parseInt(coordinates.start[2]),
        parseInt(coordinates.end[2]),
      ),
      column: Math.max(
        parseInt(coordinates.start[3]),
        parseInt(coordinates.end[3]),
      ),
    };
    const newItem = `${start.row} / ${start.column} / ${end.row} / ${end.column}`;
    this.generatedItems.update((currentItems) => [...currentItems, newItem]);
    this.start = '';
    this.end = '';
  }
}

export default {
  title: 'Dev tools/Grid generator',
  component: StorybookLayoutGridStories,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BmbLayoutGridItemDirective,
        StorybookLayoutGridStories,
        BmbAccordionComponent,
        BmbActionIconComponent,
        BmbLayoutDirective,
        BmbLayoutItemDirective,
      ],
    }),
  ],
  parameters: {
    docs: {
      page: () => getPageStructureForFoundationStories(),
      description: {
        component: `
${getGeneralDescription({ content: '***Grid generator*** is a tool that helps generate grids graphically, provides the code generated dynamically based on the interaction with this tool.', generalDocLink: 'https://bamboo.tec.mx/latest/dev-tools/coleccion-de-componentes-uC69aq75' })}
${getSpecialSpecifications(`
Make click and drag to create a new item in the grid. The new item will be created with the same size as the selected area.
The grid is responsive and will adapt to the size of the container.<br/><br/>
>
The grid is generated using CSS Grid Layout, which allows for a flexible and responsive layout.
The grid items are created using the \`BmbLayoutGridItemDirective\`, which allows for easy customization of the grid items.<br/><br/>
>
You can copy the generated HTML code and use it in your own project.
The generated HTML code will include the \`bmbLayoutGrid\` and \`bmbLayoutGridItem\` directives, which are required for the grid to work properly.<br/><br/>
>
### ${SANDBOX_TITLE}
`)}
`,
      },
    },
  },
  argTypes: {
    colGapSize: {
      control: {
        type: 'select',
      },
      options: ['none', 'xs', 's', 'm', 'l', 'xl'],
      description: 'The gap size between columns.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'm' },
      },
    },
    rows: {
      control: {
        type: 'number',
      },
      description: 'The number of rows in the grid.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    columns: {
      control: {
        type: 'number',
      },
      description: 'The number of columns in the grid.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    rowSize: {
      control: {
        type: 'object',
      },
      description: 'The size of the rows in the grid.',
      table: {
        category: 'Properties',
        type: { summary: 'string | string[]' },
        defaultValue: { summary: 'auto' },
      },
    },
    columnSize: {
      control: {
        type: 'object',
      },
      description: 'The size of the columns in the grid.',
      table: {
        category: 'Properties',
        type: { summary: 'string | string[]' },
        defaultValue: { summary: 'auto' },
      },
    },
    rowGapSize: {
      control: {
        type: 'select',
      },
      options: ['none', 'xs', 's', 'm', 'l', 'xl'],
      description: 'The gap size between rows.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'm' },
      },
    },
    height: {
      control: {
        type: 'number',
      },
      description:
        'The height of the grid. If a number is provided, it will be used as the height in pixels. If a string is provided, it will be used as the height in CSS units (e.g. "100%", "50vh", etc.).',
      table: {
        category: 'Properties',
        type: { summary: 'string | number' },
        defaultValue: { summary: 'auto' },
      },
    },
  },
  args: {
    colGapSize: 'm',
    rowGapSize: 'm',
    rows: 3,
    columns: 3,
    rowSize: ['2fr', '1fr'],
    columnSize: ['1fr', '2fr'],
    height: 500,
  },
} as Meta<StorybookLayoutGridStories>;

export const Default: StoryFn<typeof StorybookLayoutGridStories> = (args) => {
  return {
    props: args,
    template: `
      <storybook-layout-grid-stories ${attributes(args)} />
    `,
  };
};
