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
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons. Do not use the logo attribute if you want to use an iconLeft.',
      table: {
        type: { summary: 'string' },
      },
    },
    iconRight: {
      name: 'Icon Right',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons. Do not use the image attribute if you want to use an iconRight.',
      table: {
        type: { summary: 'string' },
      },
    },
    iconRight2: {
      name: 'Icon Right 2',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons. Do not use the image attribute if you want to use an iconRight2',
      table: {
        type: { summary: 'string' },
      },
    },
    image: {
      name: 'Image Source',
      control: {
        type: 'text',
      },
      description:
        'The source of the image to display, either from your application or a URL.',
      table: {
        type: { summary: 'string' },
      },
    },
    altImage: {
      name: 'Image Alt Text',
      control: {
        type: 'text',
      },
      description:
        'The alternative text for the image. Refer to https://www.w3.org/WAI/alt/ for more information.',
      table: {
        type: { summary: 'string' },
      },
    },
    logo: {
      name: 'Logo Source',
      control: {
        type: 'text',
      },
      description:
        'The source of the logo image to display, either from your application or a URL.',
      table: {
        type: { summary: 'string' },
      },
    },
    altLogo: {
      name: 'Logo Alt Text',
      control: {
        type: 'text',
      },
      description:
        'The alternative text for the logo image. Refer to https://www.w3.org/WAI/alt/ for more information.',
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
    altLogo: 'Alt logo description',
  },
} as Meta<typeof BmbHeaderMobileComponent>;

type Story = StoryObj<BmbHeaderMobileComponent>;

export const Default: Story = {};
