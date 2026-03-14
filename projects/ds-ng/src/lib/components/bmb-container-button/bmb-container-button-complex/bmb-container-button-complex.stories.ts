import { Meta, StoryObj } from '@storybook/angular';
import { getContainerButtonComponentDescription } from '../../../utils/doc/utils';
import {
  DBmbContainerButton,
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  DBmbImageParamDesc,
} from '../../../utils/doc/parameterDescriptions';
import { BmbContainerButtonComplexComponent } from './bmb-container-button-complex.component';

export default {
  title: 'Components/Buttons/Container button complex',
  component: BmbContainerButtonComplexComponent,
  parameters: {
    docs: {
      controls: {
        exclude: ['handleClick', 'handleTrailingContent'],
      },
      description: {
        component: `
${getContainerButtonComponentDescription({
  selectorName: 'complex',
  variantName: 'complex',
  componentName: 'BmbContainerButtonComplexComponent',
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
    actionIconName: {
      ...DBmbContainerButton.rightIconName,
      table: {
        ...DBmbContainerButton.rightIconName.table,
        type: {
          summary:
            DBmbContainerButton.rightIconName.table.type.summary.concat(
              ' (required)',
            ),
        },
      },
    },
    actionIconImageAlt: DBmbImageParamDesc.alt,
    isDisabled: DBmbGenericParamDesc.disabled,
    isError: DBmbContainerButton.isError,
    getClickButton: DBmbContainerButton.getClickButton,
    getClickTrailingContent: DBmbContainerButton.getClickButton,
  },
  args: {
    componentTitle: 'Title container button',
    subtitle: 'sub title',
    leftIconName: 'chevron_left',
    iconImageAlt: '',
    actionIconName: 'right_panel_close',
    actionIconImageAlt: '',
    isDisabled: false,
    isError: false,
    getClickButton: () => {
      console.info('Container button clicked');
    },
    getClickTrailingContent: () => {
      console.info('Container trailing clicked');
    },
  },
} as Meta<typeof BmbContainerButtonComplexComponent>;

type Story = StoryObj<BmbContainerButtonComplexComponent>;

export const Default: Story = {};
