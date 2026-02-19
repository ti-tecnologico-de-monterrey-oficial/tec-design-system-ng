import {
  componentWrapperDecorator,
  StoryObj,
  type Meta,
} from '@storybook/angular';
import { BmbIconItemComponent } from './bmb-icon-item.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import {
  DBmbIconParamDesc,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Visual labels/Icon item',
  component: BmbIconItemComponent,
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `<div style="max-width: 560px; margin: 0 auto">
          ${story}
        </div>`;
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'icon-item' })} o create elements to display information in two columns.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/icon-item/descripcion-general-F7c7dOy7' })}
${getBasicExampleBlock('BmbIconItemComponent')}
        `,
      },
    },
  },
  argTypes: {
    icon: {
      ...DBmbIconParamDesc.icon,
      description: DBmbIconParamDesc.icon.description.concat(
        '<br/><br/>Generally this icon will be displayed on the left.',
      ),
    },
    iconSize: DBmbIconParamDesc.iconSize,
    label: {
      control: { type: 'text' },
      description:
        'Sets the label for the item. This corresponds to the text shown on the left.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string (required)' },
      },
    },
    value: {
      control: { type: 'text' },
      description: `Sets the value for the item. This corresponds to the text shown on the right.`,
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string (required)' },
      },
    },
    showDivider: getPropertyParamDesc(
      '',
      'boolean',
      true,
      '',
      'Shows a divider at the bottom or the element when true.',
    ),
  },
  args: {
    icon: 'calendar_month',
    iconSize: 24,
    label: 'Semestre',
    value: 'Additional Info',
  },
} as Meta<typeof BmbIconItemComponent>;

type Story = StoryObj<BmbIconItemComponent>;

export const Default: Story = {};
