import { InputSignal } from '@angular/core';
import {
  BmbLayoutGridDirective,
  BmbLayoutGridItemDirective,
} from './bmb-layout-grid.directive';
import { SizeNames } from '../../types';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { attributes } from '../../utils/utils';
import { CommonModule } from '@angular/common';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../../components/bmb-card/bmb-card.component';

const meta: Meta<BmbLayoutGridDirective> = {
  title: 'Micro Componentes/Layout Grid',
  component: BmbLayoutGridDirective,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        BmbLayoutGridDirective,
        BmbLayoutGridItemDirective,
        BmbCardComponent,
        BmbCardContentComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbLayoutGridDirective, BmbLayoutGridItemDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbLayoutGridDirective, BmbLayoutGridItemDirective ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

The layout grid is a powerful tool for creating complex layouts in your application. It allows you to define a grid structure and place items within that grid. The grid can be customized with different row and column sizes, as well as gaps between items.

The grid is defined using the \`bmbLayoutGrid\` directive, and items within the grid are defined using the \`bmbLayoutGridItem\` directive.

## Defining columns and rows
You can define the number of columns and rows in the grid using the \`columns\` and \`rows\` properties. The grid will automatically adjust to fit the specified number of columns and rows.

## Defining column and row sizes
You can define the size of each column and row using the \`columnSize\` and \`rowSize\` properties. These properties can accept a single value or an array of values, allowing for flexible grid layouts.

Yo can use px, em, rem, fr, % and auto as values for the rowSize and columnSize properties.

## Grid generator
You can use this tool to generate a custom grid: [Grid generator](https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/micro-componentes-grid-generator--documentation)
        `,
      },
    },
  },
  argTypes: {
    colGapSize: {
      name: 'Column gap size',
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
      name: 'Number of rows',
      control: {
        type: 'number',
      },
      description: 'The number of rows in the grid.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: 1 },
      },
    },
    columns: {
      name: 'Number of columns',
      control: {
        type: 'number',
      },
      description: 'The number of columns in the grid.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: 1 },
      },
    },
    rowSize: {
      name: 'Row size',
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
      name: 'Column size',
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
      name: 'Row gap size',
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
      name: 'Height',
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
    colGapSize: 'm' as unknown as InputSignal<SizeNames>,
    rowGapSize: 'm' as unknown as InputSignal<SizeNames>,
    rows: 3 as unknown as InputSignal<number>,
    columns: 3 as unknown as InputSignal<number>,
    rowSize: ['auto'] as unknown as InputSignal<string[] | string>,
    columnSize: ['auto'] as unknown as InputSignal<string[] | string>,
    height: 'auto' as unknown as InputSignal<string | number>,
  },
};

export default meta;

type Story = StoryFn<BmbLayoutGridDirective>;

function generateItems(rows: number, columns: number) {
  const elements = Array(rows).fill(0);
  const namedItems = elements.reduce((acc, _, r_index) => {
    const items = Array(columns).fill(0);
    return (
      acc +
      items.reduce((row_acc, _, c_index) => {
        return (
          row_acc +
          `
      <bmb-card
        bmbLayoutGridItem
        [colStart]="${c_index + 1}"
        [rowStart]="${r_index + 1}"
        [numberOfColumns]="1"
        [numberOfRows]="1"
        margin="none"
      >
        <bmb-card-content padding="m">
          <span>Content ${r_index * columns + (c_index + 1)}</span>
        </bmb-card-content>
      </bmb-card>
      `
        );
      }, '')
    );
  }, '');

  return namedItems;
}

export const Default = {
  args: {},
  render: (args: any) => ({
    props: args,
    template: `
      <div bmbLayoutGrid ${attributes(args)}>
        ${generateItems(args.rows, args.columns)}
      </div>
    `,
  }),
};
