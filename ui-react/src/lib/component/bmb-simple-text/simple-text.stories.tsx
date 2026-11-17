import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  BMB_BASE_GENERAL_CONTRAST_LIST,
  BMB_SEMANTIC_BASE_COLOR_LIST,
} from '../../_shared/types/foundations/colors/color-type';
import { BmbSimpleText } from './index';

const colors = [
  'inherit',
  ...BMB_BASE_GENERAL_CONTRAST_LIST,
  ...BMB_SEMANTIC_BASE_COLOR_LIST,
];

const meta = {
  title: 'Components/Typography/Simple Text',
  component: BmbSimpleText,
  parameters: {
    docs: {
      description: {
        component: `
Renders a text block with configurable size, weight, color, and HTML element.

### Usage

\`\`\`tsx
<BmbSimpleText size={4} weight="regular" color="inherit">
  Interface text
</BmbSimpleText>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      description: 'Sets the font size using the design system scale from 1 to 12.',
      table: {
        category: 'Properties',
        type: { summary: '1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12' },
        defaultValue: { summary: '4' },
      },
    },
    weight: {
      control: 'inline-radio',
      options: ['light', 'regular', 'bold'],
      description: 'Sets the font weight of the text.',
      table: {
        category: 'Properties',
        type: { summary: 'light | regular | bold' },
        defaultValue: { summary: 'regular' },
      },
    },
    color: {
      control: 'select',
      options: colors,
      description: 'Sets the text color using a design system token.',
      table: {
        category: 'Properties',
        type: { summary: 'color token | inherit' },
        defaultValue: { summary: 'inherit' },
      },
    },
    elementType: {
      control: 'select',
      options: ['p', 'span', 'div', 'section', 'small'],
      description: 'Sets the semantic HTML element used to render the text.',
      table: {
        category: 'Properties',
        type: { summary: 'p | span | div | section | small' },
        defaultValue: { summary: 'p' },
      },
    },
  },
  args: {
    children: 'Simple text for interface content',
    size: 4,
    weight: 'regular',
    color: 'inherit',
    elementType: 'p',
  },
} satisfies Meta<typeof BmbSimpleText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WeightVariants: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['light', 'regular', 'bold'] as const).map((weight) => (
        <BmbSimpleText key={weight} {...args} weight={weight}>
          {weight}
        </BmbSimpleText>
      ))}
    </div>
  ),
};

export const SizeScale: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      {[2, 4, 6, 8, 10, 12].map((size) => (
        <BmbSimpleText key={size} {...args} size={size as 2 | 4 | 6 | 8 | 10 | 12}>
          Size {size}
        </BmbSimpleText>
      ))}
    </div>
  ),
};
