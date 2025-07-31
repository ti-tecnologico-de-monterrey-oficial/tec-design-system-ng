import { Meta, StoryObj } from '@storybook/angular';
import { BmbButtonIconComponent } from './bmb-button-icon.component';
import { fn } from 'storybook/test';
import { action } from 'storybook/actions';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  IBmbOnEvent,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  getOnClickParam,
} from '../../utils/doc/parameterDescriptions';

const onEvent: IBmbOnEvent = getOnEvent('', 'onButtonClick');

export default {
  title: 'Components/Buttons/Button icon',
  component: BmbButtonIconComponent,
  parameters: {
    actions: { argTypesRegex: '^on.*' },
    docs: {
      controls: { exclude: ['handleClick', 'handlePress'] },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('button-icon')} to add compact buttons using icons without text.`, 'https://bamboo.tec.mx/latest/componentes/button-icon/descripcion-general-6GKyDzWU')}
${getSpecialSpecifications(`Recommended for representing quick and intuitive actions within limited spaces, such as toolbars, headers, cards.`)}
<br/>
${getBasicExampleBlock('BmbButtonIconComponent', '', onEvent.handleExample)}
        `,
      },
    },
  },
  argTypes: {
    idElement: DBmbGenericParamDesc.uniqueId,
    icon: DBmbIconParamDesc.icon,
    showContainer: {
      control: { type: 'boolean' },
      description: 'Sets the flag to show the container when true.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean (optional)' },
      },
    },
    isOutline: {
      control: { type: 'boolean' },
      description: `
Sets the appearance of the outline when true.

**Note:** Show container must also be true.
      `,
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean (optional)' },
      },
    },
    disabled: DBmbGenericParamDesc.disabled,
    active: {
      control: {
        type: 'boolean',
      },
      description:
        'Sets the active state of the button icon, this input is a model so you can detect a change in the state in the same place.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onButtonClick: getOnClickParam(onEvent),
  },
  args: {
    idElement: '',
    icon: 'send',
    showContainer: true,
    disabled: false,
    active: false,
    onButtonClick: action('on-click'),
  },
} as Meta<typeof BmbButtonIconComponent>;

type Story = StoryObj<BmbButtonIconComponent>;

export const Default: Story = {
  name: 'Container on, default variant example',
};

export const outlineExample = {
  name: 'Container on, outline variant example',
  args: {
    icon: 'thumb_down',
    isOutline: true,
  },
};

export const NoContainerExample = {
  name: 'No container variant example',
  args: {
    icon: 'help',
    showContainer: false,
  },
};

export const FilledForm: Story = {
  parameters: {
    skipDecorator: true,
  },
  decorators: [],
  play: async ({ canvas, userEvent }) => {
    // Starts querying from the component's root element
    await userEvent.hover(canvas.getAllByRole('button')[3]);
    await userEvent.click(canvas.getAllByRole('button')[3]);
  },
};
