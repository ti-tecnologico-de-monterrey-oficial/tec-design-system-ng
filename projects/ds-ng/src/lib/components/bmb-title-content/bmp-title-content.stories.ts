import { Meta, StoryObj } from '@storybook/angular';
import { BmbTitleContentComponent } from './bmb-title-content.component';

export default {
  title: 'Internal/Title content template',
  component: BmbTitleContentComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbTitleContentComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbTitleContentComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class AppComponent {

...
\`\`\`


Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    title: {
      name: 'Title',
      control: { type: 'text' },
      description: 'Sets the title.',
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
      },
    },
    titleSize: {
      name: 'Title size',
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
    subtitle: {
      name: 'Subtitle',
      control: { type: 'text' },
      description: 'Sets the subtitle (optional)',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    subtitleSize: {
      name: 'Subtitle size',
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
        defaultValue: { summary: '4' },
        type: { summary: 'string (required)' },
      },
    },
    dataLocalNav: {
      name: 'Data Local Navigation',
      control: { type: 'object' },
      description: 'Array of breadcrumb data for Local Navigation.',
      table: {
        category: 'Properties',
        type: {
          summary:
            'IBmbDataTopBar[] (optional), [{ text: string, link?: string, }]',
        },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description: 'Sets the icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
      },
    },
    iconSize: {
      name: 'Icon size',
      control: { type: 'number' },
      description:
        'Size of the icon or width of the image to use. Note: <= 0 will be inherited.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '24' },
        type: { summary: 'number' },
      },
    },
    bgIconAppearance: {
      name: 'Icon background color',
      control: {
        type: 'select',
      },
      options: [
        'mariner-50',
        'mariner-100',
        'mariner-200',
        'mariner-300',
        'mariner-400',
        'mariner-500',
        'mariner-700',
        'mariner-800',
        'mariner-900',
        'mariner-950',
        'charade-50',
        'charade-100',
        'charade-200',
        'charade-300',
        'charade-500',
        'charade-600',
        'charade-700',
        'charade-800',
        'charade-900',
        'charade-950',
        'white-primary',
        'blue-tec',
        'mitec-blue',
        'mitec-green',
        'mitec-red',
        'mitec-orange',
        'black-primary',
        'black-light',
        'black-tint',
        'black-min',
        'white-light',
        'white-tint',
        'white-min',
        'neon-primary',
        'neon-light',
        'neon-tint',
        'blue-primary',
        'blue-light',
        'blue-tint',
        'green-primary',
        'green-light',
        'green-tint',
        'purple-primary',
        'purple-light',
        'purple-tint',
        'red-primary',
        'red-light',
        'red-tint',
        'yellow-primary',
        'yellow-light',
        'yellow-tint',
        'teal-primary',
        'teal-light',
        'teal-tint',
        'container-home',
        'container-secondary',
        'container-button',
        'background-main',
        'container-home-light',
        'container-secondary-light',
        'container-button-light',
        'background-main-light',
        'container-home-tec',
        'container-secondary-tec',
        'container-button-tec',
        'background-main-tec',
      ],
      description:
        'Sets icon background color. This applies only if transparentBgC (Transparent background color) is false.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbColor' },
      },
    },
    transparentBgC: {
      name: 'Transparent background color',
      control: { type: 'boolean' },
      description: "Sets the icon's background color to transparent when true.",
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    title: 'Title',
    titleSize: '5',
    subtitle: 'Subtitle',
    subtitleSize: '4',
    dataLocalNav: [],
    transparentBgC: false,
    icon: 'account_balance_wallet',
    iconSize: 24,
    bgIconAppearance: 'green-light',
  },
} as Meta<typeof BmbTitleContentComponent>;

type Story = StoryObj<BmbTitleContentComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <bmb-title-content
        [title]="title"
        [titleSize]="titleSize"
        [subtitle]="subtitle"
        [subtitleSize]="subtitleSize"
        [transparentBgC]="transparentBgC"
        [icon]="icon"
        [iconSize]="iconSize"
        [bgIconAppearance]="bgIconAppearance"
      />
    `,
  }),
};
