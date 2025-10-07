import { Meta, StoryObj } from '@storybook/angular';
import { BmbIconStatusComponent } from './bmb-icon-status.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  RELEVANT_TITLE_LEVEL,
} from '../../utils/doc/utils';
import {
  DBmbIconParamDesc,
  getAppearanceParam,
  SIMPLE_ICON_DESCRIPTION,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Status indicators/Status icon',
  component: BmbIconStatusComponent,
  parameters: {
    docs: {
      controls: { exclude: ['getClassName', 'getIconSize'] },
      description: {
        component: `
${getGeneralDescription({ content: `${getGeneralComponentDescription({ name: 'icon-status' })} a graphical message to be displayed after executing an action.`, generalDocLink: 'https://bamboo.tec.mx/latest/componentes/status-icon/descripcion-general-pht26G2A' })}
${getBasicExampleBlock('BmbIconStatusComponent')}
        `,
      },
    },
  },
  argTypes: {
    icon: {
      control: {
        type: 'text',
      },
      description: SIMPLE_ICON_DESCRIPTION,
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
        defaultValue: { summary: '' },
      },
    },
    statusAppearance: getAppearanceParam('the background of the icon', [
      '',
      'success',
      'event',
      'warning',
      'error',
    ]),
  },
  args: {
    icon: 'check',
    statusAppearance: 'success',
  },
} as Meta<typeof BmbIconStatusComponent>;

type Story = StoryObj<BmbIconStatusComponent>;

export const Default: Story = {};
