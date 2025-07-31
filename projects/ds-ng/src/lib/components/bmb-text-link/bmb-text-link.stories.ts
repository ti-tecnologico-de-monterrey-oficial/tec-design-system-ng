import type { Meta, StoryObj } from '@storybook/angular';
import { BmbTextLinkComponent } from './bmb-text-link.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Buttons/Text link',
  component: BmbTextLinkComponent,
  parameters: {
    docs: {
      controls: { exclude: ['getClasses', 'getPositionClass'] },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('BmbTextLinkComponent')} navigation on the page or other pages`, 'https://bamboo.tec.mx/latest/componentes/text-link/descripcion-general-S0iBFwud')}
${getBasicExampleBlock('')}
        `,
      },
    },
  },
  argTypes: {
    textLink: {
      name: 'Text Link',
      control: {
        type: 'text',
      },
      description: 'Sets the label to display on the component.',
      table: {
        category: 'Events',
        type: { summary: 'string (required)' },
      },
    },
    textLinkStyle: {
      control: {
        type: 'radio',
      },
      options: ['icon', 'underlined'],
      description:
        'Sets the text link, this has two styles, with icon or an underlined link, it can be changed with this property',
      table: {
        category: 'Properties',
        type: { summary: 'radio' },
        defaultValue: { summary: 'icon' },
      },
    },
    target: DBmbGenericParamDesc.target,
    icon: {
      ...DBmbIconParamDesc.icon,
      table: {
        ...DBmbIconParamDesc.icon.table,
        defaultValue: { summary: 'arrow_forward' },
      },
    },
    iconPosition: {
      control: {
        type: 'radio',
      },
      options: ['left', 'right'],
      description: 'Sets the position of the icon in the link.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'right' },
      },
    },
    link: DBmbGenericParamDesc.link,
    disabled: DBmbGenericParamDesc.disabled,
  },
  args: {
    textLink: 'Test text',
    link: 'https://www.youtube.com',
    textLinkStyle: 'icon',
    target: '_blank',
    icon: 'arrow_forward',
    iconPosition: 'right',
    disabled: false,
  },
} as Meta<typeof BmbTextLinkComponent>;

type Story = StoryObj<BmbTextLinkComponent>;

export const IconPositionRightExample: Story = {
  name: 'Example of an icon positioned on the right',
};

export const IconPositionLeftExample = {
  name: 'Example of an icon positioned on the left',
  args: {
    iconPosition: 'left',
  },
};

export const UnderlinedExample = {
  name: 'Underlined example',
  args: {
    textLinkStyle: 'underlined',
  },
};

export const DisableExample = {
  name: 'Disable example',
  args: {
    disabled: true,
  },
};
