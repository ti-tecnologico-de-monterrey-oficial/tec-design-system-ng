import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { getActionMenuItemComponentDescription } from '../../../utils/doc/utils';

import { BmbInteractiveItemChevronComponent } from './bmb-interactive-item-chevron.component';
import {
  DBmbGenericParamDesc,
  DBmbItemActionMenu,
  getPropertyParamDesc,
} from '../../../utils/doc/parameterDescriptions';

export default {
  title: 'Dev tools/Item/Chevron',
  component: BmbInteractiveItemChevronComponent,
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
  selectorName: 'interactive-item-chevron',
  variantName: 'Chevron - Interactive item',
  componentName: 'BmbInteractiveItemChevronComponent',
})}
  `,
      },
    },
  },
  argTypes: {
    itemTitle: DBmbItemActionMenu.label,
    itemSubtitle: getPropertyParamDesc('the item', {
      alternativePropName: 'subtitle',
      summaryType: 'string (required)',
    }),
    isDisabled: DBmbGenericParamDesc.disabled,
    getActionClick: DBmbItemActionMenu.action,
  },
  args: {
    itemTitle: 'Title',
    itemSubtitle: 'Subtitle',
    getActionClick: () => {
      console.info('Action click');
    },
  },
} as Meta<typeof BmbInteractiveItemChevronComponent>;

type Story = StoryObj<BmbInteractiveItemChevronComponent>;

export const Default: Story = {};
