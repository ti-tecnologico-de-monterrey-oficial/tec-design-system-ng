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
      imports: [
        BmbIconComponent,
        BmbContainerComponent,
        BmbUserImageComponent,
        BmbLogoComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbHeaderMobileComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbHeaderMobileComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
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
    userImage: {
      name: 'User Image Source',
      control: {
        type: 'text',
      },
      description:
        'The source of the image to display, either from your application or a URL.',
      table: {
        type: { summary: 'string' },
      },
    },
    userAltImage: {
      name: 'User Image Alt Text',
      control: {
        type: 'text',
      },
      description:
        'The alternative text for the image. Refer to https://www.w3.org/WAI/alt/ for more information.',
      table: {
        type: { summary: 'string' },
      },
    },
    userLink: {
      name: 'User Link',
      control: {
        type: 'text',
      },
      description: 'The link for redirection to another page for user image.',
      table: {
        type: { summary: 'string' },
      },
    },
    userTarget: {
      name: 'User Target',
      control: {
        type: 'radio',
      },
      options: ['_blank', '_self', '_parent', '_top'],
      description:
        'The target attribute for the link. Refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a for more information.',
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
        'The source of the logo image to display, either from your application or a URL. Do not use the iconLeft attribute if you want to use a logo.',
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
    logoLink: {
      name: 'Logo Link',
      control: {
        type: 'text',
      },
      description: 'The link for redirection to another page for logo.',
      table: {
        type: { summary: 'string' },
      },
    },
    logoTarget: {
      name: 'Logo Target',
      control: {
        type: 'radio',
      },
      options: ['_blank', '_self', '_parent', '_top'],
      description:
        'The target attribute for the link. Refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a for more information.',
      table: {
        type: { summary: 'string' },
      },
    },
    onIconLeftClick: {
      name: 'On Icon Left Click',
      control: {
        type: '',
      },
      description:
        'This handler can be used when you have the left icon available and want to perform a specific interaction.',
      table: {
        type: { summary: '(onIconLeftClick)="yourFunction()"' },
      },
    },
    onIconRightClick: {
      name: 'On Icon Right Click',
      control: {
        type: '',
      },
      description:
        'This handler can be used when you have the right icon available and want to perform a specific interaction.',
      table: {
        type: { summary: '(onIconRightClick)="yourFunction()"' },
      },
    },
    onIconRight2Click: {
      name: 'On Icon Right 2 Click',
      control: {
        type: '',
      },
      description:
        'This handler can be used when you have the right icon 2 available and want to perform a specific interaction.',
      table: {
        type: { summary: '(onIconRight2Click)="yourFunction()"' },
      },
    },
  },
  args: {
    text: 'Text Header',
    iconLeft: 'chevron_left',
    iconRight: 'search',
    iconRight2: 'close',
    userImage:
      'https://i0.wp.com/gershenson.mx/wp-content/uploads/2020/08/logo-tec-de-monterrey-e1484853084274.png?ssl=1',
    userAltImage: 'Alt image description',
    userTarget: '_blank',
    userLink: 'https://www.youtube.com/',
    logo: 'https://i0.wp.com/gershenson.mx/wp-content/uploads/2020/08/logo-tec-de-monterrey-e1484853084274.png?ssl=1',
    altLogo: 'Alt logo description',
    logoLink: '_blank',
    logoTarget: 'https://www.youtube.com/',
    onIconLeftClick: () => {
      window.alert('Icon left clicked in Storybook');
    },
    onIconRightClick: () => {
      window.alert('Icon right clicked in Storybook');
    },
    onIconRight2Click: () => {
      window.alert('Icon right 2 clicked in Storybook');
    },
  },
} as Meta<typeof BmbHeaderMobileComponent>;

type Story = StoryObj<BmbHeaderMobileComponent>;

export const Default: Story = {};
