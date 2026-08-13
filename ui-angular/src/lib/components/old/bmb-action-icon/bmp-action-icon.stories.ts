import { Meta, StoryObj } from '@storybook/angular';
import { BmbActionIconComponent } from './bmb-action-icon.component';
import {
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  IBmbOnEvent,
  RELEVANT_TITLE,
} from '@docs/utils/utils';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  getDefaultValueControl,
  getModelDescription,
  getOnClickParam,
  ON_CLICK_DESCRIPTION,
} from '@docs/utils/parameterDescriptions';

const configDetail = `${getAlertBlockquote(
  `Please remember to get the event name using the IBmbActionIconEventType type.
>
    IBmbActionIconEventType {
      name: string;
      event: MouseEvent;
    }
>
`,
  {
    title: RELEVANT_TITLE.configuration,
    blockquoteType: BlockquoteType.important,
    isRelevantTitle: true,
  },
)}`;

const eventTypeDescription = 'MouseEvent | IBmbActionIconEventType';

const onButtonClick: IBmbOnEvent = getOnEvent(
  '',
  'buttonPress',
  eventTypeDescription,
);

const onButtonPress: IBmbOnEvent = getOnEvent(
  '',
  'buttonPress',
  eventTypeDescription,
);

export default {
  title: 'Components/Buttons/Action icon',
  component: BmbActionIconComponent,
  parameters: {
    controls: {
      exclude: [
        'getIcon',
        'handleClick',
        'handlePress',
        'isSVGTemplate',
        'handleImageNotFoundError',
        'customActionIcon',
        'isImage',
      ],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({
    name: 'action-icon',
    type: 'component',
    additional: 'interactive',
  })} to use icons as buttons to execute actions`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/componentes/action-icon/descripcion-general-FzB28S1H',
  },
)}
${getSpecialSpecifications(
  `${getAlertBlockquote(
    `
Please consider using this component to implement switching between two languages. Look for the example that uses toggle icon without a accent color.`,
    {
      title: RELEVANT_TITLE.configuration.replace(
        '<br/>',
        ' - Switching languages<br/>',
      ),
      blockquoteType: BlockquoteType.important,
      isRelevantTitle: true,
      isHeader: true,
    },
  )}`,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock(
  'BmbActionIconComponent',
  '',
  `${onButtonPress.handleExample}
  ${onButtonClick.handleExample}`,
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
    tooltipText: {
      control: {
        type: 'text',
      },
      description: `
Sets a tooltip base to be displayed when hovering the icon.
Please use it to provide additional details or context.

${getAlertBlockquote('Please remember that this must be a brief text.', { title: RELEVANT_TITLE.important, isRelevantTitle: true, blockquoteType: BlockquoteType.important })}
      `,
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(''),
        type: { summary: 'string (optional)' },
      },
    },
    isFill: DBmbIconParamDesc.isIconFill,
    toggleIconActive: {
      ...DBmbIconParamDesc.icon,
      description: DBmbIconParamDesc.icon.description
        .replace('icon', 'alternative icon')
        .concat(`<br/>${getModelDescription('toggleIconActive')}`),
        table: {
        ...DBmbIconParamDesc.icon.table,
        type: { summary: 'model<string> (optional)' },
      },
    },
    isToggleActive: {
      control: {
        type: 'boolean',
      },
      description: `
Displays the alternative icon when \`true\`.

${getAlertBlockquote(
  `
Please remember to set the alternative icon in \`toggleIconActive\` to complete the configuration of this property`,
  {
    title: RELEVANT_TITLE.important,
    blockquoteType: BlockquoteType.important,
    isRelevantTitle: true,
  },
)}.
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
      onButtonClick,
      `${ON_CLICK_DESCRIPTION}.<br/><br/>
This event toggles the value (\`true\` | \`false\`) of the \`isToggleActive\` property and, at same time, changes the displayed icon.
${configDetail}`,
    ),
    buttonPress: getOnClickParam(
      onButtonPress,
      ON_CLICK_DESCRIPTION.concat(configDetail),
    ),
    disabled: DBmbGenericParamDesc.disabled,
    imageNotFoundError: DBmbIconParamDesc.imageNotFoundError,
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

type Story = StoryObj<BmbActionIconComponent>;

export const Default: Story = {
  name: 'Default example',
};

export const ToggleAccentColorExample = {
  name: 'Toggle icon example (accent color)',
  args: {
    icon: 'zoom_out_map',
    toggleIconActive: 'zoom_in_map',
    iconSize: 24,
  },
};

export const ToggleExample = {
  name: 'Example of a toggle icon without accent color',
  args: {
    isAccentColor: false,
    icon: 'language_spanish',
    toggleIconActive: 'language_us',
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
