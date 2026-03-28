import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { getActionMenuItemComponentDescription } from '../../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  DBmbItemActionMenu,
} from '../../../utils/doc/parameterDescriptions';
import { BmbItemActionsComponent } from './bmb-item-actions.component';

export default {
  title: 'Dev tools/Item/Actions',
  component: BmbItemActionsComponent,
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
  selectorName: 'actions',
  variantName: 'actions',
  componentName: 'BmbItemActionsComponent',
})}
  `,
      },
    },
  },
  argTypes: {
    icon: DBmbIconParamDesc.icon,
    label: DBmbItemActionMenu.label,
    isDisabled: DBmbGenericParamDesc.disabled,
    getActionClick: DBmbItemActionMenu.action,
  },
  args: {
    icon: 'mobile_2',
    label: 'Title',
    getActionClick: () => {
      console.info('Action click');
    },
  },
} as Meta<typeof BmbItemActionsComponent>;

type Story = StoryObj<BmbItemActionsComponent>;

export const Default: Story = {};
