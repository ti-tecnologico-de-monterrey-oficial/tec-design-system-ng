import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { getActionMenuItemComponentDescription } from '../../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  DBmbItemActionMenu,
} from '../../../utils/doc/parameterDescriptions';
import { BmbInteractiveItemTextButtonComponent } from './bmb-interactive-item-text-button.component';

export default {
  title: 'Dev tools/Interactive item/Text button',
  component: BmbInteractiveItemTextButtonComponent,
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
  selectorName: 'interactive-item-text-button',
  variantName: 'Text button - Interactive item',
  componentName: 'BmbInteractiveItemTextButtonComponent',
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
    isDisabled: DBmbGenericParamDesc.disabled,
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
} as Meta<typeof BmbInteractiveItemTextButtonComponent>;

type Story = StoryObj<BmbInteractiveItemTextButtonComponent>;

export const Default: Story = {};
