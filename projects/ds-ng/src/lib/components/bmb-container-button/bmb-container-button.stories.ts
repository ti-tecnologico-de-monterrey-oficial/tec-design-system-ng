import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerButtonComponent } from './bmb-container-button.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';
import { attributes } from '../../utils/utils';

const appearanceOptions: IBbmBgAppearance[] = [
  'normal',
  'strong',
  'success',
  'info',
  'warning',
  'error',
  'brand',
  'alert',
  'mitec_blue',
  'mitec_red',
  'mitec_green',
  'mitec_orange',
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
    isUserImage: {
      name: 'Is user image',
      control: { type: 'boolean' },
      description:
        'When set to true, the container button will display a user image for the left icon.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
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
    enableSecondaryAction: {
      name: 'Enable Secondary Action',
      control: { type: 'boolean' },
      description:
        'When set to true, it will enable the secondary action button. The secondary action button will be displayed on the right side of the button.',
      table: {
        category: 'Properties',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    enableBookmark: {
      name: 'Enable Bookmark',
      control: { type: 'boolean' },
      description:
        'When set to true, it will enable the bookmark button. The bookmark button will be displayed on the right side of the button.',
      table: {
        category: 'Properties',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    isBookmarkActive: {
      name: 'Is Bookmark Active',
      control: { type: 'boolean' },
      description: 'When set to true, the bookmark button will be active.',
      table: {
        category: 'Properties',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    onButton: {
      name: 'On Button',
      control: { summary: 'function' },
      description: 'Event emitted when the button is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    secondaryAction: {
      name: 'Secondary action',
      control: { summary: 'function' },
      description: 'Event emitted when the secondary action button is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    title: 'Tema de App',
    iconLeft: 'home',
    iconRight: 'chevron_right',
    onButton: (event: any) => {
      alert('Container button clicked');
    },
  },
} as Meta<typeof BmbContainerButtonComponent>;

type Story = StoryObj<BmbContainerButtonComponent>;

export const Default: Story = {
  name: 'Default example (button click event emission)',
};

export const TitleExample = {
  name: 'Example with only title',
  args: {
    iconLeft: '',
    iconRight: '',
  },
};

export const RightIconExample = {
  name: 'Example of variant with icon on the right',
  args: {
    iconLeft: '',
    iconRight: 'chevron_right',
  },
};

export const ScoreExample = {
  name: 'Example of variant for grades (number)',
  args: {
    iconLeft: '',
    score: 90,
  },
};

export const TextScoreExample = {
  name: 'Example of variant for grades (string)',
  args: {
    iconLeft: '',
    score: 'Cu',
  },
};

export const BadgeExample = {
  name: 'Variant with badge example',
  args: {
    badgeText: 'Example',
    badgeAppearance: 'normal',
  },
};

export const BookmarkExample = {
  name: 'Variant with bookmark example',
  args: {
    iconRight: '',
    enableBookmark: true,
  },
};

export const BookmarkActiveExample = {
  name: 'Variant with bookmark active example',
  args: {
    iconRight: '',
    enableBookmark: true,
    isBookmarkActive: true,
  },
};

export const UserImageExample = {
  name: 'Varian for profile (user image) example',
  args: {
    title: 'Ana María Gutiérrez Pineda',
    subtitle: 'email@email.com',
    iconRight: '',
    iconLeft: 'https://picsum.photos/id/64/200/300',
    isUserImage: true,
  },
};

export const ErrorStateExample = {
  name: 'Example for the error state variant',
  args: {
    state: 'error',
  },
};

export const DisableStateExample = {
  name: 'Example for the disabled state variant',
  args: {
    state: 'disabled',
  },
};

export const AlternativeVersionExample = {
  name: 'Alternative version example',
  args: {
    alternative: true,
  },
};

export const AlternativeVersionErrorExample = {
  name: 'Example of an alternative version for the error state variant',
  args: {
    alternative: true,
    state: 'error',
  },
};

export const AlternativeVersionDisableExample = {
  name: 'Example of an alternative version for the disabled state variant',
  args: {
    alternative: true,
    state: 'disabled',
  },
};

export const SquareExample = {
  name: 'Square version example',
  args: {
    iconRight: '',
    square: true,
    small: false,
  },
};

export const SmallExample = {
  name: 'Small version example',
  args: {
    iconRight: '',
    small: true,
    square: false,
  },
};

export const SecondaryActionExample = {
  name: 'Enable secondary action example',
  args: {
    enableSecondaryAction: true,
    secondaryAction: (event: any) => {
      alert('Secondary action clicked');
    },
  },
  render: (args: any) => ({
    template: `
    <!--
    This allows the action of the left icon to be executed as a secondary action
    in addition to the primary action of the container button.
    -->
    <bmb-container-button ${attributes(args)} />
    `,
  }),
};

export const LinkExample = {
  name: 'Link example',
  args: {
    link: 'https://www.example.com/',
    target: '_blank',
  },
  render: (args: any) => ({
    template: `
    <!-- It is not necessary to add the onbutton event. -->
    <bmb-container-button ${attributes(args)} />
    `,
  }),
};
