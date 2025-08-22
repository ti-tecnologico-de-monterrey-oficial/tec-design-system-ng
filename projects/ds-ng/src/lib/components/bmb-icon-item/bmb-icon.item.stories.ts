import {
  componentWrapperDecorator,
  moduleMetadata,
  StoryObj,
  type Meta,
} from '@storybook/angular';
import { BmbIconItemComponent } from './bmb-icon-item.component';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import { DBmbIconParamDesc } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Visual labels/Icon item',
  component: BmbIconItemComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbDividerComponent],
      providers: [],
    }),
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
${getGeneralDescription(`${getGeneralComponentDescription('icon-item')} o create elements to display information in two columns.`, 'https://bamboo.tec.mx/latest/componentes/icon-item/descripcion-general-F7c7dOy7')}
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
      table: {
        ...DBmbIconParamDesc.icon.table,
        type: { summary: 'string (required)' },
      },
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
      description: `Sets the value for the item. This corresponds to the text shown on the right.

You can pass plain text or valid HTML tags. If HTML is used, it will be safely rendered inside the component.`,
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string (required)' },
      },
    },
  },
  args: {
    icon: 'calendar_month',
    iconSize: 24,
    label: 'Semestre',
    value: `<a href="https://linkedin.com">Ir a enlace Linkedin</a>`,
  },
} as Meta<typeof BmbIconItemComponent>;

type Story = StoryObj<BmbIconItemComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <bmb-icon-item
        [icon]="icon"
        [iconSize]="iconSize"
        [label]="label"
        [value]="value"
      />
      <bmb-divider />
    `,
  }),
};
