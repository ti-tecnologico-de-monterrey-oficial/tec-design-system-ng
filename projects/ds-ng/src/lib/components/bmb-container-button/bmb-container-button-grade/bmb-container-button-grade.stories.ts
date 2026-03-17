import { Meta, StoryObj } from '@storybook/angular';
import { getContainerButtonComponentDescription } from '../../../utils/doc/utils';
import {
  DBmbContainerButton,
  DBmbGenericParamDesc,
  DBmbGradeValue,
  DBmbImageParamDesc,
} from '../../../utils/doc/parameterDescriptions';
import { BmbContainerButtonGradeComponent } from './bmb-container-button-grade.component';

export default {
  title: 'Components/Buttons/Container button/Grade',
  component: BmbContainerButtonGradeComponent,
  tags: ['!autodocs'],
  parameters: {
    docs: {
      controls: {
        exclude: ['handleClick'],
      },
      description: {
        component: `
 ${getContainerButtonComponentDescription({
   selectorName: 'grade',
   variantName: 'grade',
   componentName: 'BmbContainerButtonGradeComponent',
 })}
        `,
      },
    },
  },
  argTypes: {
    componentTitle: DBmbContainerButton.componentTitle,
    subtitle: DBmbContainerButton.subtitle,
    score: {
      ...DBmbGradeValue.score,
      table: {
        ...DBmbGradeValue.score.table,
        type: {
          summary:
            DBmbGradeValue.score.table.type.summary.concat(' (required)'),
        },
      },
    },
    rightIconName: {
      ...DBmbContainerButton.rightIconName,
      table: {
        ...DBmbContainerButton.rightIconName.table,
        type: {
          summary:
            DBmbContainerButton.rightIconName.table.type.summary.concat(
              '(required)',
            ),
        },
      },
    },
    iconImageAlt: DBmbImageParamDesc.alt,
    isDisabled: DBmbGenericParamDesc.disabled,
    isError: DBmbContainerButton.isError,
    getClickButton: DBmbContainerButton.getClickButton,
  },
  args: {
    componentTitle: 'Title container button',
    subtitle: 'sub title',
    score: 'A',
    rightIconName: 'chevron_right',
    iconImageAlt: '',
    isDisabled: false,
    isError: false,
    getClickButton: () => {
      console.log('Container button clicked');
    },
  },
} as Meta<typeof BmbContainerButtonGradeComponent>;

type Story = StoryObj<BmbContainerButtonGradeComponent>;

export const Default: Story = {};
