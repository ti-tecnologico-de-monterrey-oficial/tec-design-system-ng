import {
  BmbLayoutGridDirective,
  BmbLayoutGridItemDirective,
} from './bmb-layout-grid.directive';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import {
  attributes,
  getAuxiliaryDescription,
  getBasicExampleBlock,
  getGeneralDescription,
  getGridGeneratorLink,
  getSpecialSpecifications,
} from '../../utils/doc/utils';
import { CommonModule } from '@angular/common';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../../components/bmb-card/bmb-card.component';

const meta: Meta<BmbLayoutGridDirective> = {
  title: 'Foundations/Layouts/Layout grid',
  tags: ['!autodocs'],
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
    controls: { exclude: ['generateArray', 'getRules'] },
    docs: {
      description: {
        component: `
${getGeneralDescription(`
The ***Layout grid*** is a powerful tool for creating complex layouts in your application.<br/><br/>
${getAuxiliaryDescription('Layout grid', 'Layout grid item')}`)}
${getSpecialSpecifications(`
***Layout grid*** allows you to define a grid structure and place items within that grid.
><br/><br/>
The grid can be customized with different row and column sizes, as well as gaps between items.
><br/><br/>
The grid is defined using the \`bmbLayoutGrid\` directive, and items within the grid are defined using the \`bmbLayoutGridItem\` directive.
><br/><br/><br/>
### Defining columns and rows
You can define the number of columns and rows in the grid using the \`columns\` and \`rows\` properties. The grid will automatically adjust to fit the specified number of columns and rows.
><br/><br/><br/>
### Defining column and row sizes
You can define the size of each column and row using the \`columnSize\` and \`rowSize\` properties. These properties can accept a single value or an array of values, allowing for flexible grid layouts.
><br/><br/>
Yo can use px, em, rem, fr, % and auto as values for the rowSize and columnSize properties.
><br/><br/><br/>
${getGridGeneratorLink()}
`)}
${getBasicExampleBlock('BmbLayoutGridDirective, BmbLayoutGridItemDirective')}
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
        'The height of the grid. If a number is provided, it will be used as the height in pixels. If a string is provided, it will be used as the height in CSS units (e.g. "100%", "50dvh", etc.).',
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
    rowSize: ['auto'],
    columnSize: ['auto'],
    height: 'auto',
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
