import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { getActionMenuItemComponentDescription } from '../../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  DBmbItemActionMenu,
} from '../../../utils/doc/parameterDescriptions';
import { BmbItemHyperlinkComponent } from './bmb-item-hyperlink.component';

export default {
  title: 'Dev tools/Item/Hyperlink',
  component: BmbItemHyperlinkComponent,
  tags: ['!autodocs'],
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
${getActionMenuItemComponentDescription({
  selectorName: 'hyperlink',
  variantName: 'hyperlink',
  componentName: 'BmbItemHyperlinkComponent',
})}
  `,
      },
    },
  },
  argTypes: {
    icon: DBmbIconParamDesc.icon,
    label: DBmbItemActionMenu.label,
    value: {
      ...DBmbItemActionMenu.value,
      table: {
        ...DBmbItemActionMenu.value.table,
        type: {
          ...DBmbItemActionMenu.value.table.type,
          summary:
            DBmbItemActionMenu.value.table.type.summary.concat(' (required)'),
        },
      },
    },
    valueLink: {
      ...DBmbGenericParamDesc.link,
      table: {
        ...DBmbGenericParamDesc.link.table,
        type: {
          ...DBmbGenericParamDesc.link.table.type,
          summary:
            DBmbGenericParamDesc.link.table.type.summary.concat(' (required)'),
        },
      },
    },
    valueTarget: DBmbGenericParamDesc.target,
  },
  args: {
    icon: 'mail',
    label: 'Email',
    value: 'tecservices@servicios.tec.mx',
    valueLink: 'mailto:tecservices@servicios.tec.mx',
    valueTarget: '_self',
  },
} as Meta<typeof BmbItemHyperlinkComponent>;

type Story = StoryObj<BmbItemHyperlinkComponent>;

export const Default: Story = {};
