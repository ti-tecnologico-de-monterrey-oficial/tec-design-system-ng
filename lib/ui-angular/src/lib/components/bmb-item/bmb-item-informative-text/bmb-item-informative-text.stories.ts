import { Meta, StoryObj, componentWrapperDecorator } from '@storybook/angular';
import { getActionMenuItemComponentDescription } from '../../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  getPropertyParamDesc,
} from '../../../utils/doc/parameterDescriptions';
import { BmbItemInformativeTextComponent } from './bmb-item-informative-text.component';

export default {
  title: 'Dev tools/Item/Informative text',
  component: BmbItemInformativeTextComponent,
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
  selectorName: 'informative-text',
  variantName: 'informative text',
  componentName: 'BmbItemInformativeTextComponent',
})}
  `,
      },
    },
  },
  argTypes: {
    icon: DBmbIconParamDesc.icon,
    itemTitle: getPropertyParamDesc('the item', {
      summaryType: 'string (required)',
    }),
    supportText: getPropertyParamDesc('the item', {
      alternativePropName: 'support static text',
      summaryType: 'string (required)',
    }),
    supportTextLinkLabel: getPropertyParamDesc('the item', {
      alternativePropName: 'support label for the text link',
    }),
    supportTextLink: DBmbGenericParamDesc.link,
    supportTextTarget: DBmbGenericParamDesc.target,
  },
  args: {
    icon: 'mobile_3',
    itemTitle: 'Informative text. Non actionable',
    supportText: 'Support text',
    supportTextLinkLabel: 'Optional hyperlink text',
    supportTextLink: 'https://www.google.com.mx',
    supportTextTarget: '_blank',
  },
} as Meta<typeof BmbItemInformativeTextComponent>;

type Story = StoryObj<BmbItemInformativeTextComponent>;

export const Default: Story = {};
