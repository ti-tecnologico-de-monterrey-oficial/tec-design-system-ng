import { Meta, StoryObj } from '@storybook/angular';
import {
  colorList,
  getContainerButtonComponentDescription,
  getOnEvent,
} from '../../../utils/doc/utils';
import {
  DBmbContainerButton,
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  DBmbImageParamDesc,
  getAppearanceParam,
  getOnClickParam,
  getPropertyParamDesc,
} from '../../../utils/doc/parameterDescriptions';
import { BmbContainerButtonComplexAlternativeComponent } from './bmb-container-button-complex-alternative.component';

export default {
  title: 'Components/Buttons/Container button/Alternative',
  component: BmbContainerButtonComplexAlternativeComponent,
  tags: ['!autodocs'],
  parameters: {
    docs: {
      controls: {
        exclude: ['handleClick', 'handleClickBookmark'],
      },
      description: {
        component: `
 ${getContainerButtonComponentDescription({
   selectorName: 'complex-alternative',
   variantName: 'complex alternative',
   componentName: 'BmbContainerButtonComplexAlternativeComponent',
 })}
        `,
      },
    },
  },
  argTypes: {
    componentTitle: DBmbContainerButton.componentTitle,
    subtitle: DBmbContainerButton.subtitle,
    leftIconName: {
      ...DBmbIconParamDesc.icon,
      table: {
        ...DBmbIconParamDesc.icon.table,
        type: {
          summary:
            DBmbIconParamDesc.icon.table.type.summary.concat(' (required)'),
        },
      },
    },
    iconImageAlt: DBmbImageParamDesc.alt,
    leftIconBoxColor: getAppearanceParam(
      'the box color of the left icon',
      [...colorList],
      'red',
    ),
    isBookmarkActive: getPropertyParamDesc('book mark', {
      controlType: 'boolean',
      defaultSummary: false,
    }),
    isDisabled: DBmbGenericParamDesc.disabled,
    isError: DBmbContainerButton.isError,
    getClickButton: DBmbContainerButton.getClickButton,
    getClickBookmark: getOnClickParam(
      getOnEvent('book mark active', 'getClickBookmark'),
    ),
  },
  args: {
    componentTitle: 'Title container button',
    subtitle: 'sub title',
    leftIconName: 'menu_open',
    leftIconBoxColor: 'general-contrasts-main-selection',
    iconImageAlt: '',
    isBookmarkActive: false,
    isDisabled: false,
    isError: false,
    getClickButton: () => {
      console.info('Container button clicked');
    },
    getClickBookmark: () => {
      console.info('Container bok mark clicked');
    },
  },
} as Meta<typeof BmbContainerButtonComplexAlternativeComponent>;

type Story = StoryObj<BmbContainerButtonComplexAlternativeComponent>;

export const Default: Story = {};
