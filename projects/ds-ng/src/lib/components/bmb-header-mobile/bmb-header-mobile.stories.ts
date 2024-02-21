import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbLogoComponent } from '../bmb-logo/bmb-logo.component';
import { BmbHeaderMobileComponent } from './bmb-header-mobile.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';

export default {
  title: 'Header Mobile',
  component: BmbHeaderMobileComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        BmbIconComponent,
        BmbContainerComponent,
        BmbUserImageComponent,
        BmbLogoComponent,
      ],
    }),
  ],
  argTypes: {
    text: {
      name: 'Text',
      control: {
        type: 'text',
      },
      description: 'The text of the header.',
      table: {
        type: { summary: 'string' },
      },
    },
    iconLeft: {
      name: 'Icon Left',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use the Material icons: https://fonts.google.com/icons. You should not use LOGO attribute if you want to use iconLeft.',
      table: {
        type: { summary: 'string' },
      },
    },
    iconRight: {
      name: 'Icon Right',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use the Material icons: https://fonts.google.com/icons. You should not use IMAGE attribute if you want to use iconRight.',
      table: {
        type: { summary: 'string' },
      },
    },
    iconRight2: {
      name: 'Icon Right 2',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use the Material icons: https://fonts.google.com/icons. You should not use IMAGE attribute if you want to use iconRight.',
      table: {
        type: { summary: 'string' },
      },
    },
    image: {
      name: 'Image source',
      control: {
        type: 'text',
      },
      description:
        'The source of the image you want to display can be in your application or in a URL. You should not use iconRight neither iconRight2 attribute if you want to use image.',
      table: {
        type: { summary: 'string' },
      },
    },
    altImage: {
      name: 'Image alt text',
      control: {
        type: 'text',
      },
      description:
        'The alternative text of image. For more information yoy can take a look at this page: https://www.w3.org/WAI/alt/.',
      table: {
        type: { summary: 'string' },
      },
    },
    logo: {
      name: 'Image source',
      control: {
        type: 'text',
      },
      description:
        'The source of the image you want to display can be in your application or in a URL. You should not use iconLeft  attribute if you want to use logo.',
      table: {
        type: { summary: 'string' },
      },
    },
    altLogo: {
      name: 'Image alt text',
      control: {
        type: 'text',
      },
      description:
        'The alternative text of image. For more information yoy can take a look at this page: https://www.w3.org/WAI/alt/.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    text: 'Text Header',
    iconLeft: 'chevron_left',
    iconRight: 'search',
    iconRight2: 'close',
    image:
      'https://i0.wp.com/gershenson.mx/wp-content/uploads/2020/08/logo-tec-de-monterrey-e1484853084274.png?ssl=1',
    altImage: 'Alt image description',
    logo: 'https://i0.wp.com/gershenson.mx/wp-content/uploads/2020/08/logo-tec-de-monterrey-e1484853084274.png?ssl=1',
    altLogo: 'Alt image description',
  },
} as Meta<typeof BmbHeaderMobileComponent>;

type Story = StoryObj<BmbHeaderMobileComponent>;

export const Default: Story = {};
