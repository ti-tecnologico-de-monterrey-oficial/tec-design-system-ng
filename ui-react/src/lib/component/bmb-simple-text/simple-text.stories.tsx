import type { Meta, StoryObj } from '@storybook/react-vite';
import { BmbSimpleText } from './index';
import {
  BMB_BASE_GENERAL_CONTRAST_LIST,
  BMB_SEMANTIC_BASE_COLOR_LIST,
} from '../../_shared/types/foundations/colors/color-type';

const meta: Meta<typeof BmbSimpleText> = {
  title: 'Dev tools/Simple text',
  component: BmbSimpleText,
  argTypes: {
    size: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'bold'],
    },
    color: {
      control: 'select',
      options: [
        'inherit',
        ...BMB_BASE_GENERAL_CONTRAST_LIST,
        ...BMB_SEMANTIC_BASE_COLOR_LIST,
      ],
    },
    elementType: {
      control: 'select',
      options: ['p', 'span', 'div', 'section', 'small'],
    },
  },
  args: {
    size: 4,
    weight: 'regular',
    color: 'general-contrasts-100',
    elementType: 'p',
    children: 'Simple text example',
  },
};

export default meta;
type Story = StoryObj<typeof BmbSimpleText>;

export const Default: Story = {};
