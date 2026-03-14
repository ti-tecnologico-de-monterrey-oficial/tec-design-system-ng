import { Meta, StoryObj } from '@storybook/angular';
import { getContainerButtonComponentDescription } from '../../../utils/doc/utils';
import {
  DBmbContainerButton,
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  DBmbImageParamDesc,
  getPropertyParamDesc,
} from '../../../utils/doc/parameterDescriptions';
import { BmbContainerButtonDefaultComponent } from './bmb-container-button-default.component';

export default {
  title: 'Components/Buttons/Container button default',
  component: BmbContainerButtonDefaultComponent,
  parameters: {
    docs: {
      controls: {
        exclude: ['handleClick'],
      },
      description: {
        component: `
 ${getContainerButtonComponentDescription({
   selectorName: 'default',
   variantName: 'default',
   componentName: 'BmbContainerButtonDefaultComponent',
 })}
        `,
      },
    },
  },
  argTypes: {
    componentTitle: DBmbContainerButton.componentTitle,
    subtitle: DBmbContainerButton.subtitle,
    leftIconName: DBmbIconParamDesc.icon,
    iconImageAlt: DBmbImageParamDesc.alt,
    hideChevron: getPropertyParamDesc('right chevron hide', {
      controlType: 'boolean',
      defaultSummary: false,
    }),
    isDisabled: DBmbGenericParamDesc.disabled,
    isError: DBmbContainerButton.isError,
    getClickButton: DBmbContainerButton.getClickButton,
  },
  args: {
    componentTitle: 'Title container button',
    subtitle: 'sub title',
    leftIconName: 'chevron_left',
    iconImageAlt: '',
    isDisabled: false,
    isError: false,
    getClickButton: () => {
      console.log('Container button clicked');
    },
  },
} as Meta<typeof BmbContainerButtonDefaultComponent>;

type Story = StoryObj<BmbContainerButtonDefaultComponent>;

export const Default: Story = {};
