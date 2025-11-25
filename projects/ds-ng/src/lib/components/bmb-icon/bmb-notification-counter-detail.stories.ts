import { Meta, StoryObj } from '@storybook/angular';
import { getPageStructureForFoundationStories } from '../../utils/doc/utils';
import { BmbIconComponent } from './bmb-icon.component';
import * as notificationCounter from '../bmb-notification-counter/bmb-notification-counter.stories';
import { DBmbIconParamDesc } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Foundations/Icon/Notification counter',
  component: BmbIconComponent,
  tags: ['!autodocs'],
  parameters: {
    docs: {
      page: () => getPageStructureForFoundationStories(),
      controls: {
        exclude: [
          'iconSvg',
          'isSVGTemplate',
          'loadIcon',
          'customIcon',
          'alt',
          'fontWeight',
          'icon',
          'size',
          'styleIcon',
          'styleIconGoogle',
          'isFill',
          'materialIcon',
          'getFontVariationSettings',
          'getImageStyles',
          'isImage',
          'ngOnInit',
        ],
      },
      description: {
        component: `${notificationCounter.default?.parameters?.['docs']?.description?.component!}`,
      },
    },
  },
  argTypes: {
    dotNotification: DBmbIconParamDesc.iconDotNotification,
  },
  args: {
    icon: 'notifications',
    size: 32,
    dotNotification: 7,
  },
} as Meta<typeof BmbIconComponent>;

type Story = StoryObj<BmbIconComponent>;

export const Default: Story = {};
