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

const meta: Meta<BmbLayoutGridItemDirective> = {
  title: 'Foundations/Layouts/Layout grid/Layout grid Item',
  tags: ['!autodocs'],
  component: BmbLayoutGridItemDirective,
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
${getGeneralDescription(getAuxiliaryDescription('Layout grid', 'Layout grid item'), '').replace('Description', '-Description')}
${getSpecialSpecifications(`
The layout grid item is used to define an item within a layout grid. It allows you to specify the position and size of the item within the grid.
><br/><br/><br/>
## Defining the position of the item
You can define the position of the item within the grid using the \`colStart\`, \`rowStart\`, \`numberOfColumns\`, and \`numberOfRows\` properties. These properties allow you to specify the starting column and row for the item, as well as how many columns and rows it should span.
><br/><br/><br/>
${getGridGeneratorLink()}
`).replace('Considerations / Restrictions', '-Considerations / Restrictions')}
${getBasicExampleBlock('BmbLayoutGridDirective, BmbLayoutGridItemDirective').replace('TypeScript example', '-TypeScript example').replace('HTML example', '-HTML example')}
        `,
      },
    },
  },
  argTypes: {
    colStart: {
      control: {
        type: 'number',
      },
      description:
        'The starting column for the item within the grid. This property is **required**.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    rowStart: {
      control: {
        type: 'number',
      },
      description:
        'The starting row for the item within the grid. This property is **required**.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    numberOfColumns: {
      control: {
        type: 'number',
      },
      description:
        'The number of columns the item should span within the grid.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    numberOfRows: {
      control: {
        type: 'number',
      },
      description: 'The number of rows the item should span within the grid.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
  },
  args: {
    colStart: 1,
    rowStart: 1,
    numberOfColumns: 1,
    numberOfRows: 1,
  },
};

export default meta;

type Story = StoryFn<BmbLayoutGridItemDirective>;

function generateItems() {
  const elements = Array(3).fill(0);
  const namedItems = elements.reduce((acc, _, r_index) => {
    const items = Array(3).fill(0);
    return (
      acc +
      items.reduce((row_acc, _, c_index) => {
        return (
          row_acc +
          `
      <div bmbLayoutGridItem [colStart]="${c_index + 1}" [rowStart]="${r_index + 1}" margin="none" style="
        background-image: repeating-linear-gradient(
          45deg,
          var(--general_contrasts-container-outline) 0,
          var(--general_contrasts-container-outline) 1px,
          transparent 0,
          transparent 50%
        );
        background-size: 8px 8px;
        border: 1px solid var(--general_contrasts-container-outline);
        padding: 1rem;
        opacity: 0.5;
        user-select: none;
      ">
        <span>Content ${r_index * 3 + (c_index + 1)}</span>
      </div>
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
      <div bmbLayoutGrid [numberOfColumns]="1"
    [numberOfRows]="1">
        ${generateItems()}
        <bmb-card bmbLayoutGridItem ${attributes(args)} margin="none" style="z-index: 1;" type="primary">
          <bmb-card-content padding="m">
            <span>Element</span>
          </bmb-card-content>
        </bmb-card>
      </div>
    `,
  }),
};
