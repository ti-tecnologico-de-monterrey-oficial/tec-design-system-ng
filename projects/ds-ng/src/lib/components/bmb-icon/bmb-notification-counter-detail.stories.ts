import { Meta, StoryObj } from '@storybook/angular';
import { getPageStructureForFoundationStories } from '../../utils/doc/utils';
import { BmbIconComponent } from './bmb-icon.component';

export default {
  title: 'Foundations/Icon/Notification counter',
  component: BmbIconComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => getPageStructureForFoundationStories(),
      controls: {
        exclude: [
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
        ],
      },
      description: {
        component: ``,
      },
    },
  },
  argTypes: {},
  args: {
    icon: 'notifications',
    size: 32,
    dotNotification: 7,
  },
} as Meta<typeof BmbIconComponent>;

type Story = StoryObj<BmbIconComponent>;

export const Default: Story = {};
