import { Meta, StoryObj } from '@storybook/angular';
import { BmbActionIconComponent } from './bmb-action-icon.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import { InputParameterDescriptions } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Buttons/Action icon',
  component: BmbActionIconComponent,
  parameters: {
    controls: {
      exclude: ['buttonPress', 'getIcon', 'handleClick', 'handlePress'],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('action-icon', 'component', 'interactive')} to use icons as buttons to execute actions`, 'https://bamboo.tec.mx/latest/componentes/action-icon/descripcion-general-FzB28S1H')}
${getBasicExampleBlock('BmbActionIconComponent')}
        `,
      },
    },
  },
  argTypes: {
    idElement: InputParameterDescriptions.inputId,
    icon: InputParameterDescriptions.icon,
    alt: InputParameterDescriptions.alt,
    iconSize: InputParameterDescriptions.iconSize,
    isFill: InputParameterDescriptions.isIconFill,
    toggleIconActive: {
      control: {
        type: 'text',
      },
      description: 'Sets the icon name to toggle',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
      },
    },
    isToggleActive: {
      control: {
        type: 'boolean',
      },
      description:
        "Sets the toggle activation to change the icons depending on whether it is active or inactive. 'Icon active toggle' when true.",
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean (optional)' },
      },
    },
    isAccentColor: {
      control: {
        type: 'boolean',
      },
      description: 'Sets the accent color on toggle icons when true.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean (optional)' },
      },
    },
    dotNotification: InputParameterDescriptions.iconDotNotification,
    link: InputParameterDescriptions.link,
    target: InputParameterDescriptions.target,
    buttonClick: {
      control: false,
      description:
        'Emits the event then on click, this event is only emitted if the `link` property is empty.',
      table: {
        category: 'Events',
        type: { summary: 'handleClick($event)' },
      },
    },
    disabled: InputParameterDescriptions.disabled,
  },
  args: {
    idElement: '',
    icon: 'info',
    iconSize: 24,
    buttonClick: () => {
      console.log('Action icon click');
    },
  },
} as Meta<typeof BmbActionIconComponent>;

type Story = StoryObj<BmbActionIconComponent>;

export const Default: Story = {
  name: 'Default example',
};

export const OutlineExample = {
  name: 'Example of an icon with outline',
  args: {
    isFill: false,
  },
};

export const ToggleAccentColorExample = {
  name: 'Toggle icon example (accent color)',
  args: {
    icon: 'fit_screen',
    toggleIconActive: 'close_fullscreen',
    iconSize: 24,
  },
};

export const ToggleExample = {
  name: 'Example of a toggle icon without accent color',
  args: {
    ...ToggleAccentColorExample.args,
    isAccentColor: false,
  },
};

export const DotNotificationExample = {
  name: 'Example of an icon with a notification',
  args: {
    dotNotification: 5,
  },
};

export const DisabledIconExample = {
  name: 'Disabled icon example',
  args: {
    disabled: true,
  },
};

export const ImageExample = {
  args: {
    icon: 'https://img.freepik.com/premium-vector/approved-icon-with-thumb-up-approved-label-quality-control_349999-1321.jpg?w=2000',
    alt: 'Youtube icon',
    iconSize: 32,
  },
};

export const IconLinkExample = {
  name: 'Example of an icon as a link',
  args: {
    link: 'https://www.example.com/',
    target: '_blank',
  },
};
