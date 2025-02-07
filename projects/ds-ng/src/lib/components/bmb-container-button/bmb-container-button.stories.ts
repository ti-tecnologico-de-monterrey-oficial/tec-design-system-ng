import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerButtonComponent } from './bmb-container-button.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';

const appearanceOptions: IBbmBgAppearance[] = [
  'normal',
  'strong',
  'success',
  'info',
  'warning',
  'error',
  'brand',
  'background',
  'disabled',
  'mitec_blue',
  'mitec_red',
  'mitec_green',
  'mitec_orange',
  'mitec_light_green',
  'mitec_purple',
];

export default {
  title: 'Macro Componentes/Container Button',
  component: BmbContainerButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent, BmbContainerComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbContainerButtonComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbContainerButtonComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: 'The title of the button container.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    subtitle: {
      name: 'Subtitle',
      control: {
        type: 'text',
      },
      description: 'The subtitle of the button container.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'optional' },
        type: { summary: 'string' },
      },
    },
    link: {
      name: 'Link',
      control: {
        type: 'text',
      },
      description: 'The link for redirection to another page.',
      table: {
        category: 'Events',
        type: { summary: 'string' },
      },
    },
    target: {
      name: 'Target',
      control: {
        type: 'radio',
      },
      options: ['_blank', '_self', '_parent', '_top'],
      description:
        'The target attribute for the link. Refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a for more information.',
      table: {
        category: 'Events',
        type: { summary: 'IBmbTargetLink' },
        defaultValue: { summary: '_blank' },
      },
    },
    iconLeft: {
      name: 'Icon Left',
      control: {
        category: 'Properties',
        type: 'text',
      },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons. Do not use the score property if you want to the iconLeft.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'optional' },
        type: { summary: 'string' },
      },
    },
    iconRight: {
      name: 'Icon Right',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'optional' },
        type: { summary: 'string' },
      },
    },
    score: {
      name: 'Score',
      control: {
        type: 'text',
      },
      description:
        'The score number of the button container. Do not use the iconLeft property if you want to use score.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'optional' },
        type: { summary: 'string' },
      },
    },
    square: {
      name: 'Square',
      control: { type: 'boolean' },
      description:
        'When set to true, the container button will change the appearance. Please not use grade property if you are using square and iconLeft properties.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    small: {
      name: 'Small',
      control: { type: 'boolean' },
      description:
        'When set to true, the container button will be small (160x80 pixels) and only show the icon/grade and title.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    state: {
      name: 'State',
      control: { type: 'select' },
      table: {
        category: 'Properties',
      },
      options: ['disabled', 'error'],
      description: 'The state of the button: disabled or error.',
    },
    alternative: {
      name: 'Alternative',
      control: { type: 'boolean' },
      table: {
        category: 'Properties',
      },
      description: 'If true, applies the alternative styles to the button.',
    },
    badgeText: {
      name: 'Badge Text',
      control: {
        type: 'text',
      },
      description:
        'The text of the badge. The width will increase depending on the length of the text.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'optional' },
        type: { summary: 'string' },
      },
    },
    badgeAppearance: {
      name: 'Badge Appearance',
      control: {
        type: 'select',
      },
      options: appearanceOptions,
      table: {
        category: 'Properties',
        defaultValue: { summary: 'normal' },
        type: { summary: 'string' },
      },
      description: 'The appearance of the badge, affecting its visual style.',
    },
    setButtonTemplate: {
      name: 'Set Button Template',
      control: { type: 'boolean' },
      description:
        'This property switch the template component to a button, if you enable this option, you do not need send the `target`, and `link` properties, and set the ouput `onButton`.',
      table: {
        category: 'Deprecated',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    onButton: {
      action: 'buttonClick',
      description: 'Event emitted when the button is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<any>' },
      },
    },
  },
  args: {
    title: 'Tema de App',
    iconLeft: 'home',
    iconRight: 'chevron_right',
    link: '',
    target: '_blank',
  },
} as Meta<typeof BmbContainerButtonComponent>;

type Story = StoryObj<BmbContainerButtonComponent>;

export const Default: Story = {};
