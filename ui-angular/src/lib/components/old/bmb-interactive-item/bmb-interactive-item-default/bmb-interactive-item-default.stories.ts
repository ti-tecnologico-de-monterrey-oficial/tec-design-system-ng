import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import {
  BlockquoteType,
  getActionMenuItemComponentDescription,
  getAlertBlockquote,
  RELEVANT_TITLE,
} from '../../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  DBmbItemActionMenu,
  getPropertyParamDesc,
} from '../../../utils/doc/parameterDescriptions';
import { BmbInteractiveItemDefaultComponent } from './bmb-interactive-item-default.component';

export default {
  title: 'Dev tools/Interactive item/Default (Profile switch)',
  component: BmbInteractiveItemDefaultComponent,
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
  selectorName: 'interactive-item-default',
  variantName: 'Profile switch menu - Default',
  componentName: 'BmbInteractiveItemDefaultComponent',
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
    itemTitle: DBmbItemActionMenu.label,
    isActive: getPropertyParamDesc('item active', {
      controlType: 'boolean',
      defaultSummary: false,
      additionalDescription: getAlertBlockquote(
        'The inactive state disables the item and the state value as a subtitle.',
        {
          title: RELEVANT_TITLE.important,
          blockquoteType: BlockquoteType.important,
        },
      ),
    }),
    getActionClick: DBmbItemActionMenu.action,
  },
  args: {
    icon: 'mobile_2',
    itemTitle: 'Title',
    getActionClick: () => {
      console.info('Action click');
    },
  },
} as Meta<typeof BmbInteractiveItemDefaultComponent>;

type Story = StoryObj<BmbInteractiveItemDefaultComponent>;

export const Default: Story = {};
