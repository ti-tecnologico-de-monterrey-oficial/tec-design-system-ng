import { Meta, StoryObj } from '@storybook/angular';
import { BmbTitleComponent } from './bmb-title.component';
import { getBasicExampleBlock } from '../utils/doc/utils';

export default {
  title: 'Dev tools/Title template',
  component: BmbTitleComponent,
  parameters: {
    docs: {
      controls: {
        exclude: ['getClassNames'],
      },
      description: {
        component: `
${getBasicExampleBlock('BmbTitleComponent')}
        `,
      },
    },
  },
  argTypes: {
    componentTitle: {
      control: { type: 'text' },
      description: 'Sets the title.',
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
      },
    },
    titleSize: {
      control: {
        type: 'radio',
      },
      options: [
        '1',
        '2',
        '3',
        '4',
        '4_5',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ],
      description: `Sets the title size. **Sizes Reference:**
  - **Size 1**: 10px
  - **Size 2**: 11px
  - **Size 3**: 12px
  - **Size 4**: 14px
  - **Size 4_5**: 15px
  - **Size 5**: 16px
  - **Size 6**: 18px
  - **Size 7**: 20px
  - **Size 8**: 22px
  - **Size 9**: 24px
  - **Size 10**: 26px
  - **Size 11**: 36px
  - **Size 12**: 48px
`,
      table: {
        category: 'Properties',
        defaultValue: { summary: '5' },
        type: { summary: 'string (required)' },
      },
    },
    titleFontWeight: {
      control: {
        type: 'select',
      },
      options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
      description:
        'Sets the title font weight. Font weights: 100, 200, 300, 400, 500, 600, 700, 800, 900',
      table: {
        category: 'Properties',
        defaultValue: { summary: '600' },
        type: { summary: 'IBmbFontWeightContent (optional)' },
      },
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Sets the subtitle (optional)',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    subtitleSize: {
      control: {
        type: 'radio',
      },
      options: [
        '1',
        '2',
        '3',
        '4',
        '4_5',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ],
      description: `Sets the subtitle size. **Sizes Reference:**
  - **Size 1**: 10px
  - **Size 2**: 11px
  - **Size 3**: 12px
  - **Size 4**: 14px
  - **Size 4_5**: 15px
  - **Size 5**: 16px
  - **Size 6**: 18px
  - **Size 7**: 20px
  - **Size 8**: 22px
  - **Size 9**: 24px
  - **Size 10**: 26px
  - **Size 11**: 36px
  - **Size 12**: 48px
`,
      table: {
        category: 'Properties',
        defaultValue: { summary: '3' },
        type: { summary: 'string (optional)' },
      },
    },
    subtitleFontWeight: {
      control: {
        type: 'select',
      },
      options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
      description:
        'Sets the title font weight. Font weights: 100, 200, 300, 400, 500, 600, 700, 800, 900',
      table: {
        category: 'Properties',
        defaultValue: { summary: '400' },
        type: { summary: 'IBmbFontWeightContent (optional)' },
      },
    },
    isCenterContent: {
      control: { type: 'boolean' },
      description:
        'Sets the content centered when true, refers to the title and subtitle.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean  (optional)' },
      },
    },
  },
  args: {
    componentTitle: 'Title',
    titleSize: '5',
    titleFontWeight: '600',
    subtitle: 'Subtitle',
    subtitleSize: '3',
    subtitleFontWeight: '400',
    isCenterContent: false,
  },
} as Meta<typeof BmbTitleComponent>;

type Story = StoryObj<BmbTitleComponent>;

export const Default: Story = {};
