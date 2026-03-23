import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbActionIconComponent } from './bmb-action-icon.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  IBmbOnEvent,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  getDefaultValueControl,
  getOnClickParam,
  ON_BUTTON_CLICK,
  ON_CLICK_DESCRIPTION,
} from '../../utils/doc/parameterDescriptions';
import { BmbTooltipComponent } from '../bmb-tooltip/bmb-tooltip.component';

const onButtonPress: IBmbOnEvent = getOnEvent('', 'buttonPress');

export default {
  title: 'Components/Buttons/Action icon',
  component: BmbActionIconComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbTooltipComponent],
    }),
  ],
  parameters: {
    controls: {
      exclude: ['getIcon', 'handleClick', 'handlePress'],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'action-icon', type: 'component', additional: 'interactive' })} to use icons as buttons to execute actions`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/action-icon/descripcion-general-FzB28S1H' })}
${getBasicExampleBlock(
  'BmbActionIconComponent',
  '',
  `${onButtonPress.handleExample}
  ${ON_BUTTON_CLICK.handleExample}`,
)}
        `,
      },
    },
  },
  argTypes: {
    idElement: DBmbGenericParamDesc.uniqueId,
    icon: DBmbIconParamDesc.icon,
    alt: DBmbIconParamDesc.alt,
    iconSize: DBmbIconParamDesc.iconSize,
    isFill: DBmbIconParamDesc.isIconFill,
    toggleIconActive: {
      ...DBmbIconParamDesc.icon,
      description: `${DBmbIconParamDesc.icon.description}<br/><br/> This icon will be used in the toggle functionality, as long as \`isToggleActive\` is *true*. `,
    },
    isToggleActive: {
      control: {
        type: 'boolean',
      },
      description: `
Sets the toggle functionality to be activated when *true*, to change the icons depending on whether it is active or inactive.

The toggle needs the following properties for correct operation:
- \`icon\`
- \`toggleIconActive\`.
      `,
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
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
        defaultValue: getDefaultValueControl(true),
        type: { summary: 'boolean (optional)' },
      },
    },
    dotNotification: DBmbIconParamDesc.iconDotNotification,
    link: DBmbGenericParamDesc.linkOrButton,
    target: DBmbGenericParamDesc.target,
    buttonClick: getOnClickParam(
      ON_BUTTON_CLICK,
      `${ON_CLICK_DESCRIPTION}.<br/><br/>
This property switches the \`isToggleActive\` when \`isToggleActive\` is true`,
    ),
    buttonPress: getOnClickParam(onButtonPress, ON_CLICK_DESCRIPTION),
    disabled: DBmbGenericParamDesc.disabled,
  },
  args: {
    idElement: '',
    icon: 'info',
    iconSize: 24,
    buttonPress: () => {
      console.log('Action icon click');
    },
    buttonClick: () => {
      console.log('Action icon click');
    },
  },
} as Meta<typeof BmbActionIconComponent>;

type Story = StoryObj<
  BmbActionIconComponent & {
    tooltipText: string;
    tooltipTitle: string;
  }
>;

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

export const WithTooltipControls: Story = {
  name: 'With tooltip (controls)',
  render: (args) => ({
    props: args,
    template: `
      <bmb-tooltip
        [text]="tooltipText"
        [componentTitle]="tooltipTitle"
      >
        <bmb-action-icon
          [icon]="icon"
          [iconSize]="iconSize"
        />
      </bmb-tooltip>
    `,
  }),
  args: {
    icon: 'info',
    iconSize: 24,
    tooltipText: 'Tooltip description',
    tooltipTitle: 'Tooltip title',
  },
  argTypes: {
    tooltipText: {
      control: 'text',
      description: 'Tooltip description',
    },
    tooltipTitle: {
      control: 'text',
      description: 'Tooltip title',
    },
  },
};
