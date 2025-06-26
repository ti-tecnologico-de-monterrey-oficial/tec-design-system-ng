import { Meta, StoryFn } from '@storybook/angular';
import { BmbHomeCardComponent } from './bmb-home-card.component';
import { attributes, attributesText } from '../../utils/utils';

export default {
  title: 'Components/Containers/Home card',
  component: BmbHomeCardComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbHomeCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbHomeCardComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class AppComponent {
  dataLocalNav: IBmbDataTopBar[] = [
      { text: 'Breadcrumb 1', link: '/' },
      { text: 'Breadcrumb 2', link: '/emprendedor' },
      { text: 'Breadcrumb 3', link: '/emprendedor/vivencia' },
      { text: 'Breadcrumb 4', link: '/emprendedor/vivencia' },
      { text: 'Breadcrumb 5', link: '/emprendedor/vivencia' },
      { text: 'Breadcrumb 6', link: '/emprendedor/vivencia' },
    ]
...
\`\`\`


Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    leftIcon: {
      name: 'Left icon',
      control: { type: 'text' },
      description: 'Sets left header icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description: 'Sets header icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
      },
    },
    bgIconAppearance: {
      name: 'Icon background color',
      control: { type: 'text' },
      description: 'Sets icon background color.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbColor (optional)' },
      },
    },
    title: {
      name: 'Title',
      control: { type: 'text' },
      description: 'Sets he main title of the home card..',
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
      },
    },
    subtitle: {
      name: 'Subtitle',
      control: { type: 'text' },
      description: 'Sets card subtitle',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
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
    actionHeaders: {
      name: 'Action header',
      control: { type: 'object' },
      description:
        'Sets an array of IBmbActionHeader objects, default value is an empty array.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[] (empty array)' },
        type: {
          summary:
            'IBmbActionHeader[], {icon: string; iconSize?: number; iconActiveToggle?: string; isToggleActive?: boolean; isAccentColor?: boolean; link?: string; target?: IBmbTargetLink; action: () => void;}',
        },
      },
    },
    showRightButton: {
      name: 'Show right button',
      control: { type: 'boolean' },
      description:
        'Sets a flag to indicate whether the card should show the right button or buttons.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    isMobile: {
      name: 'Is mobile',
      control: { type: 'boolean' },
      description:
        'Sets a flag to indicate whether the card should adapt to mobile view.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    contentPadding: {
      name: 'Content padding',
      control: { type: 'text' },
      description:
        "Sets the he padding size for the card's content. Uses predefined size names (e.g., 'xs','s','m','l','xl','none','auto')",
      table: {
        category: 'Properties',
        defaultValue: { summary: 'l' },
        type: { summary: 'SizeNames (optional)' },
      },
    },
    onClose: {
      name: 'On close',
      control: null,
      description: 'Emmit the close event.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onBack: {
      name: 'On back',
      control: null,
      description: 'Emmit the back event.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    test_text: {
      name: 'Text',
      description: 'Header content example.',
      table: {
        category: 'Example',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    leftIcon: 'chevron_left',
    icon: 'account_balance_wallet',
    bgIconAppearance: 'green-light',
    title: 'Title',
    subtitle: 'Subtitle',
    dataLocalNav: [],
    actionHeaders: [],
    showRightButton: true,
    isMobile: false,
    test_text: 'hello world',
  },
} as Meta<typeof BmbHomeCardComponent>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
    <bmb-home-card
      ${attributes(args)}
    >
      <p>${attributesText(args)}</p>
    </bmb-home-card>
  `,
});

export const Default = customizable();
