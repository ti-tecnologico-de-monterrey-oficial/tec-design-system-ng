import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { getActionMenuItemComponentDescription } from '../../utils/doc/utils';
import {
  DBmbIconParamDesc,
  DBmbItemActionMenu,
} from '../../utils/doc/parameterDescriptions';
import { BmbInteractiveItemComponent } from './bmb-interactive-item.component';

export default {
  title: 'Dev tools/Item/Interactive',
  component: BmbInteractiveItemComponent,
  tags: ['!autodocs'],
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `<div style="max-width: 560px; margin: 0 auto">
        ${story}
      </div>`;
    }),
  ],
  parameters: {
    controls: { exclude: ['handleActionClick'] },
    docs: {
      description: {
        component: `
${getActionMenuItemComponentDescription({
  selectorName: 'interactive-item',
  variantName: 'interactive item',
  componentName: 'BmbItemDefaultComponent',
})}
  `,
      },
    },
  },
  argTypes: {
    icon: {
      ...DBmbIconParamDesc.icon,
      table: {
        ...DBmbIconParamDesc.icon.table,
        type: {
          ...DBmbIconParamDesc.icon.table.type,
          summary:
            DBmbIconParamDesc.icon.table.type.summary.concat(' (required)'),
        },
      },
    },
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
    getActionClick: DBmbItemActionMenu.action,
  },
  args: {
    icon: 'mobile_2',
    label: 'Title',
    value: 'info',
    getActionClick: () => {
      console.info('Action click');
    },
  },
} as Meta<typeof BmbInteractiveItemComponent>;

type Story = StoryObj<BmbInteractiveItemComponent>;

export const Default: Story = {};
