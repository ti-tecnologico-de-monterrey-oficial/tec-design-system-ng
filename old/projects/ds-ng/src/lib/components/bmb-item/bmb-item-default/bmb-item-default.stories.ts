import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { getActionMenuItemComponentDescription } from '../../../utils/doc/utils';
import {
  DBmbIconParamDesc,
  DBmbItemActionMenu,
} from '../../../utils/doc/parameterDescriptions';
import { BmbItemDefaultComponent } from './bmb-item-default.component';

export default {
  title: 'Dev tools/Item/Default',
  component: BmbItemDefaultComponent,
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
  selectorName: 'default',
  variantName: 'default',
  componentName: 'BmbItemDefaultComponent',
})}
  `,
      },
    },
  },
  argTypes: {
    icon: DBmbIconParamDesc.icon,
    label: DBmbItemActionMenu.label,
    value: DBmbItemActionMenu.value,
  },
  args: {
    label: 'Name',
    icon: 'info',
    value: 'Pedro Perez',
  },
} as Meta<typeof BmbItemDefaultComponent>;

type Story = StoryObj<BmbItemDefaultComponent>;

export const Default: Story = {};
