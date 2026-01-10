import { Meta, StoryObj } from '@storybook/angular';
import { BmbTitleContentComponent } from './bmb-title-content.component';
import { RELEVANT_TITLE } from '../../utils/doc/utils';
import { DBmbIconParamDesc } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Internals/Title content template',
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
    titleFontWeight: {
      name: 'Title font weight',
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
        type: { summary: 'string (optional)' },
      },
    },
    subtitleFontWeight: {
      name: 'Title font weight',
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
    subtitleIcon: {
      name: 'Subtitle icon',
      control: { type: 'text' },
      description: 'Sets the subtitle icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
      },
    },
    subtitleIconSize: {
      name: 'Subtitle icon size',
      control: { type: 'number' },
      description: `Size of the subtitle icon or width of the image to use.<br/><br/>
${RELEVANT_TITLE.note}<= 0 will be inherited.`,
      table: {
        category: 'Properties',
        defaultValue: { summary: '0' },
        type: { summary: 'number (optional)' },
      },
    },
    isCenterContent: {
      name: 'Center content',
      control: { type: 'boolean' },
      description:
        'Sets the content centered when true, refers to the title and subtitle.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean  (optional)' },
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
    iconSize: DBmbIconParamDesc.iconSize,
    bgIconAppearance: {
      name: 'Icon background color',
      control: {
        type: 'select',
      },
      options: [
        'blue-mariner-50',
        'blue-mariner-100',
        'blue-mariner-200',
        'blue-mariner-300',
        'blue-mariner-400',
        'blue-mariner-500',
        'blue-mariner-700',
        'blue-mariner-800',
        'blue-mariner-900',
        'blue-mariner-950',
        'gray-charade-50',
        'gray-charade-100',
        'gray-charade-200',
        'gray-charade-300',
        'gray-charade-500',
        'gray-charade-600',
        'gray-charade-700',
        'gray-charade-800',
        'gray-charade-900',
        'gray-charade-950',
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
      description: 'Sets icon background color.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbColor (optional)' },
      },
    },
    transparentBgC: {
      name: 'Transparent background color',
      control: { type: 'boolean' },
      description: "Sets the icon's background color to transparent when true.",
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean (optional)' },
      },
    },
  },
  args: {
    title: 'Title',
    titleSize: '5',
    titleFontWeight: '600',
    subtitle: 'Subtitle',
    subtitleSize: '4',
    subtitleFontWeight: '400',
    subtitleIcon: '',
    subtitleIconSize: 0,
    isCenterContent: false,
    dataLocalNav: [],
    transparentBgC: false,
    icon: 'account_balance_wallet',
    iconSize: 24,
    bgIconAppearance: 'green-light',
  },
} as Meta<typeof BmbTitleContentComponent>;

type Story = StoryObj<BmbTitleContentComponent>;

export const Default: Story = {};
