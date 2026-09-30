import type { Meta, StoryObj } from '@storybook/angular';
import { BmbSimpleTextComponent } from './bmb-simple-text.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '@docs/utils/utils';

export default {
  title: 'Dev tools/Simple text',
  component: BmbSimpleTextComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'BmbSimpleTextComponent' })} render a text block with a configurable size, weight, color and html tag.`)}
${getBasicExampleBlock('BmbSimpleTextComponent')}
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      description: `Sets the title size. **Sizes Reference:**
  - **Size 1**: 10px
  - **Size 2**: 11px
  - **Size 3**: 12px
  - **Size 4**: 14px
  - **Size 5**: 16px
  - **Size 6**: 18px
  - **Size 7**: 20px
  - **Size 8**: 22px
  - **Size 9**: 24px
  - **Size 10**: 26px
  - **Size 11**: 36px
  - **Size 12**: 48px
`,
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    weight: {
      control: { type: 'select' },
      description: 'Sets the font weight of the text.',
      options: ['light', 'regular', 'bold'],
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'regular' },
      },
    },
    color: {
      control: { type: 'select' },
      options: ['inherit', 'general-contrasts-100', 'general-contrasts-90', 'general-contrasts-80', 'general-contrasts-70', 'general-contrasts-60', 'general-contrasts-50', 'general-contrasts-40', 'general-contrasts-30', 'general-contrasts-20', 'general-contrasts-10', 'success-primary', 'success-light', 'success-thin', 'success-primary-alternative', 'success-tint-alternative', 'warning-primary', 'warning-light', 'warning-tint', 'warning-primary-alternative', 'error-primary', 'error-light', 'error-tint', 'info-primary', 'info-light', 'info-tint', 'branding-primary', 'branding-light', 'branding-tint', 'alert-primary', 'alert-light', 'alert-tint'],
      description: 'Sets the text color.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'inherit' },
      },
    },
    elementType: {
     control: null,
      description: 'Sets the html tag used to render the component.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'p' },
      },
    },
  },
  args: {
    size: 4,
    weight: 'regular',
    color: 'general-contrasts-100',
  },
} as Meta<typeof BmbSimpleTextComponent>;

type Story = StoryObj<BmbSimpleTextComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<bmb-simple-text [size]="size" [weight]="weight" [color]="color" [elementType]="elementType">Simple text example</bmb-simple-text>`,
  }),
};
