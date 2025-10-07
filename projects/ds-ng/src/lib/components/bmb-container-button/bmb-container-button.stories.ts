import { Meta, StoryObj } from '@storybook/angular';
import { BmbContainerButtonComponent } from './bmb-container-button.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';
import {
  attributes,
  getBasicExampleBlock,
  getEmptyStateMessage,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
} from '../../utils/doc/utils';
import {
  DBmbDropdownMenuParamDesc,
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  getAppearanceParam,
  getDefaultValueControl,
  getOnClickParam,
  ON_CLICK_DESCRIPTION,
} from '../../utils/doc/parameterDescriptions';

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
  title: 'Components/Buttons/Container button',
  component: BmbContainerButtonComponent,
  parameters: {
    docs: {
      controls: {
        exclude: ['getClassList', 'handleClick', 'handleSecondaryClick'],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'BmbContainerButtonComponent' })} to use the container as a button`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/container-button/descripcion-general-dzTxNX36' })}
${getSpecialSpecifications(getEmptyStateMessage())}
${getBasicExampleBlock('BmbContainerButtonComponent')}
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
      description: 'The title of the button container.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
    },
    subtitle: {
      control: {
        type: 'text',
      },
      description: 'The subtitle of the button container.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
    },
    link: DBmbGenericParamDesc.linkOrButton,
    target: DBmbGenericParamDesc.target,
    iconLeft: DBmbIconParamDesc.icon,
    isUserImage: {
      control: { type: 'boolean' },
      description:
        'When set to true, the container button will display a user image for the left icon.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    iconRight: DBmbIconParamDesc.icon,
    score: {
      control: {
        type: 'text',
      },
      description:
        'The score number of the button container. Do not use the iconLeft property if you want to use score.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
    },
    square: {
      control: { type: 'boolean' },
      description:
        'When set to true, the container button will change the appearance. Please not use grade property if you are using square and iconLeft properties.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    small: {
      control: { type: 'boolean' },
      description:
        'When set to true, the container button will be small (160x80 pixels) and only show the icon/grade and title.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    state: {
      control: { type: 'select' },
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
      },
      options: ['disabled', 'error'],
      description: 'The state of the button: disabled or error.',
    },
    alternative: {
      control: { type: 'boolean' },
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
      },
      description: 'If true, applies the alternative styles to the button.',
    },
    badgeText: {
      control: {
        type: 'text',
      },
      description:
        'The text of the badge. The width will increase depending on the length of the text.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
    },
    badgeAppearance: getAppearanceParam('the badge', appearanceOptions),
    setButtonTemplate: DBmbGenericParamDesc.deprecated,
    enableSecondaryAction: {
      control: { type: 'boolean' },
      description:
        'When set to true, it will enable the secondary action button. The secondary action button will be displayed on the right side of the button.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    enableBookmark: {
      control: { type: 'boolean' },
      description:
        'When set to true, it will enable the bookmark button. The bookmark button will be displayed on the right side of the button.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    isBookmarkActive: {
      control: { type: 'boolean' },
      description: 'When set to true, the bookmark button will be active.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    onButton: getOnClickParam(getOnEvent('', 'onButton'), ON_CLICK_DESCRIPTION),
    secondaryAction: getOnClickParam(
      getOnEvent('', 'secondaryAction'),
      ON_CLICK_DESCRIPTION,
    ),
    dropdownMenuItems: DBmbDropdownMenuParamDesc.items,
  },
  args: {
    title: 'Tema de App',
    iconLeft: 'home',
    iconRight: 'chevron_right',
    onButton: () => {
      console.log('Container button clicked');
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

export const SecondaryMenuExample = {
  name: 'Enable secondary menu example',
  args: {
    dropdownMenuItems: [
      {
        icon: 'link',
        text: 'External Link External Link External Link',
        url: 'https://example.com',
      },
      {
        icon: 'link',
        text: 'internal Link',
        url: 'https://example.com',
      },
      {
        icon: 'delete',
        text: 'Delete',
      },
      {
        icon: 'settings',
        text: 'Settings',
      },
    ],
  },
  render: (args: any) => ({
    template: `
    <div style="height: 25rem">
      <bmb-container-button ${attributes(args)} />
    </div>
    `,
  }),
};
