import type { Meta, StoryObj } from '@storybook/angular';
import { BmbLogoComponent } from './bmb-logo.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbImageParamDesc,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Dev tools/Logo',
  component: BmbLogoComponent,
  parameters: {
    docs: {
      controls: {
        exclude: ['handleClick', 'getClasses', 'handleKeyPress', 'handlePress'],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'logo', type: 'element' })} the institutional logo to be displayed`, 'https://bamboo.tec.mx/latest/dev-tools/coleccion-de-componentes-uC69aq75')}
${getBasicExampleBlock('BmbLogoComponent')}
        `,
      },
    },
  },
  argTypes: {
    image: DBmbImageParamDesc.image,
    altImage: DBmbImageParamDesc.alt,
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'medium', 'large'],
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
      description:
        'Sets the size of the user image, affecting its visual size.',
    },
    buttonName: getPropertyParamDesc(
      'logo',
      'text',
      'logo_button',
      '',
      '',
      'name',
    ),
    link: DBmbGenericParamDesc.linkOrButton,
    target: DBmbGenericParamDesc.target,
    buttonClick: DBmbGenericParamDesc.onButtonClick,
    buttonKeyPress: DBmbGenericParamDesc.onButtonClick,
    buttonPress: DBmbGenericParamDesc.onButtonPress,
  },
  args: {
    image:
      'https://i0.wp.com/gershenson.mx/wp-content/uploads/2020/08/logo-tec-de-monterrey-e1484853084274.png?ssl=1',
    altImage: 'Alt image description',
    size: 'small',
    target: '_blank',
    link: 'https://www.youtube.com/',
  },
} as Meta<typeof BmbLogoComponent>;

type Story = StoryObj<BmbLogoComponent>;

export const Default: Story = {};
