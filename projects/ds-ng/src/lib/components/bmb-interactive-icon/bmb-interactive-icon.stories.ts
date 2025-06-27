import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  BmbInteractiveIconComponent,
  IBmbInteractiveIconAppearance,
} from './bmb-interactive-icon.component';

const appearanceOptions: IBmbInteractiveIconAppearance[] = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'mitec_blue',
  'mitec_red',
  'mitec_green',
  'mitec_orange',
  'mitec_light_green',
  'mitec_purple',
  'creative_violet',
  'creative_indigo',
  'creative_emerald',
  'creative_licorice',
  'creative_darkteal',
  'creative_peach',
  'creative_sepia',
  'creative_softred',
  'creative_wattle',
  'creative_shipcove',
  'creative_plantation',
  'creative_rum',
  'creative_hibiscus',
  'creative_ripelemon',
  'buttons-primary-normal',
  'purple-primary',
  'general_contrasts-main-selection',
  'general_contrasts-main-selection-alternative',
];

export default {
  title: 'Components/Buttons/Interactive icon',
  component: BmbInteractiveIconComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbInteractiveIconComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbInteractiveIconComponent ],
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
    // appearanceContrast: {
    //   name: 'Appearance',
    //   control: {
    //     type: 'select',
    //   },
    //   options: ['default', 'primary', 'alternative'],
    //   description: 'Defines the appearance style.',
    //   table: {
    //     category: 'Properties',
    //     type: { summary: 'string' },
    //   },
    // },
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: 'Sets the title of the interactive icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    description: {
      name: 'Description',
      control: {
        type: 'text',
      },
      description: 'Sets the description of the interactive icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description:
        'Sets the name of the icon to use. Please use Material icons: https://fonts.google.com/icons. Do not use the image property if you want to use an icon. If you need to set an image as icon, you can set the image path here.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    appearance: {
      name: 'Appearance',
      control: {
        type: 'select',
      },
      options: appearanceOptions,
      description:
        'Sets the appearance of the interactive icon, affecting its visual style.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'red' },
        type: { summary: 'string' },
      },
    },
    link: {
      name: 'Link',
      control: {
        type: 'text',
      },
      description:
        'Sets the link for redirection to another page. If this input is empty it will emit the button event.',
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
        'Sets the target for the link. Refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a for more information.',
      table: {
        category: 'Events',
        type: { summary: 'IBmbTargetLink' },
        defaultValue: { summary: '_blank' },
      },
    },
    horizontal: {
      name: 'Horizontal',
      control: { type: 'boolean' },
      description:
        'This property is effective when you want to include a description with a horizontal orientation.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    layout: {
      name: 'Layout',
      control: {
        type: 'select',
      },
      options: ['regular', 'button', 'app_drawer'],
      description: 'Sets the layout behavior.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    setButtonTemplate: {
      name: 'Set button template',
      control: { type: 'boolean' },
      description:
        'This property switch the template component to a button, if you enable this option, you do not need send the `target`, and `link` properties, and set the ouput `buttonClick`.',
      table: {
        category: 'Deprecated',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    buttonClick: {
      name: 'Button click',
      control: null,
      description:
        'This event is only emitted if the "Link" property is empty.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    // appearanceContrast: 'default',
    title: 'Canvas',
    description: 'Short Description',
    appearance: 'red',
    icon: 'face',
    target: '_blank',
    link: 'https://www.youtube.com/',
    horizontal: false,
    layout: 'regular',
    setButtonTemplate: false,
  },
} as Meta<typeof BmbInteractiveIconComponent>;

type Story = StoryObj<BmbInteractiveIconComponent>;

export const Default: Story = {};
