import { Meta, StoryObj } from '@storybook/angular';
import { getContainerButtonComponentDescription } from '../../../utils/doc/utils';
import {
  DBmbContainerButton,
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  DBmbImageParamDesc,
  getPropertyParamDesc,
} from '../../../utils/doc/parameterDescriptions';
import { BmbContainerButtonSquareComponent } from './bmb-container-button-square.component';

export default {
  title: 'Components/Buttons/Container button square',
  component: BmbContainerButtonSquareComponent,
  tags: ['!autodocs'],
  parameters: {
    docs: {
      controls: {
        exclude: ['handleClick'],
      },
      description: {
        component: `
${getContainerButtonComponentDescription({
  selectorName: 'square',
  variantName: 'square',
  componentName: 'BmbContainerButtonSquareComponent',
})}
        `,
      },
    },
  },
  argTypes: {
    componentTitle: DBmbContainerButton.componentTitle,
    subtitle: DBmbContainerButton.subtitle,
    iconName: DBmbIconParamDesc.icon,
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
    componentTitle: 'Title',
    subtitle: 'sub title',
    iconName: 'home',
    iconImageAlt: '',
    hideChevron: false,
    isDisable: false,
    isError: false,
    getClickButton: () => {
      console.log('Container button clicked');
    },
  },
} as Meta<typeof BmbContainerButtonSquareComponent>;

type Story = StoryObj<BmbContainerButtonSquareComponent>;

export const Default: Story = {};
