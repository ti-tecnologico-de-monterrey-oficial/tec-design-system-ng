import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { getContainerButtonComponentDescription } from '../../../utils/doc/utils';
import {
  DBmbBadgeType,
  DBmbContainerButton,
  DBmbGenericParamDesc,
  DBmbIconParamDesc,
  DBmbImageParamDesc,
} from '../../../utils/doc/parameterDescriptions';
import { BmbContainerButtonBadgeComponent } from './bmb-container-button-badge.component';
import { IBmbBadgeInfo } from '../../../types';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbTitleComponent } from '../../bmb-title/bmb-title.component';
import { CommonModule } from '@angular/common';

export default {
  title: 'Components/Buttons/Container button/Badge',
  component: BmbContainerButtonBadgeComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BmbIconComponent,
        BmbTitleComponent,
        BmbBadgeComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: ['handleClick'],
      },
      description: {
        component: `
${getContainerButtonComponentDescription({
  selectorName: 'badge',
  variantName: 'badge',
  componentName: 'BmbContainerButtonBadgeComponent',
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
    badge: {
      ...DBmbBadgeType.badge,
      table: {
        ...DBmbBadgeType.badge.table,
        category: 'Properties',
        type: {
          summary: DBmbBadgeType.badge.table.type.summary.concat('(required)'),
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
    rightIconImageAlt: DBmbImageParamDesc.alt,
    isDisabled: DBmbGenericParamDesc.disabled,
    isError: DBmbContainerButton.isError,
    getClickButton: DBmbContainerButton.getClickButton,
  },
  args: {
    componentTitle: 'Title container button',
    subtitle: 'sub title',
    leftIconName: 'chevron_left',
    iconImageAlt: '',
    badge: {
      appearance: 'normal',
      text: 'Normal',
      container: false,
    } as IBmbBadgeInfo,
    rightIconName: 'chevron_right',
    rightIconImageAlt: '',
    isDisabled: false,
    isError: false,
    getClickButton: () => {
      console.log('Container button clicked');
    },
  },
} as Meta<typeof BmbContainerButtonBadgeComponent>;

type Story = StoryObj<BmbContainerButtonBadgeComponent>;

export const Default: Story = {};
