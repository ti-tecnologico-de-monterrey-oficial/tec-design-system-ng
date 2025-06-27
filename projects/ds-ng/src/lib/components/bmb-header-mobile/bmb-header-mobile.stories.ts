import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbLogoComponent } from '../bmb-logo/bmb-logo.component';
import { BmbHeaderMobileComponent } from './bmb-header-mobile.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';

export default {
  title: 'Components/Containers/Header mobile',
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
    iconRight: {
      name: 'Icon Right',
      control: { type: 'text' },
      description:
        'This property is deprecated and will be removed in future versions.',
      table: {
        category: 'Deprecated',
      },
    },
    iconRight2: {
      name: 'Icon Right 2',
      control: { type: 'text' },
      description:
        'This property is deprecated and will be removed in future versions.',
      table: {
        category: 'Deprecated',
      },
    },
    text: {
      name: 'Text',
      control: {
        type: 'text',
      },
      description: 'The text of the header.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    trailingIcon: {
      name: 'Trailing Action Icon',
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons. Do not use the image property if you want to use an iconRight.',
      table: {
        category: 'Properties',
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
        category: 'Properties',
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
        category: 'Properties',
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
        category: 'Events',
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
        category: 'Events',
        type: { summary: 'IBmbTargetLink' },
        defaultValue: { summary: '_blank' },
      },
    },
    logo: {
      name: 'Logo Source',
      control: {
        type: 'text',
      },
      description:
        'The source of the logo image to display, either from your application or a URL. Do not use the iconLeft property if you want to use a logo.',
      table: {
        category: 'Properties',
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
        category: 'Properties',
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
        category: 'Events',
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
        category: 'Events',
        type: { summary: 'IBmbTargetLink' },
        defaultValue: { summary: '_blank' },
      },
    },
    onTrailingIconClick: {
      name: 'On Trailing Icon Click',
      control: {
        type: '',
      },
      description:
        'This handler can be used when you have the Trailing Icon available and want to perform a specific interaction.',
      table: {
        category: 'Events',
        type: { summary: '(onTrailingIconClick)="yourFunction()"' },
      },
    },
  },
  args: {
    trailingIcon: 'notifications',
    userImage:
      'https://i0.wp.com/gershenson.mx/wp-content/uploads/2020/08/logo-tec-de-monterrey-e1484853084274.png?ssl=1',
    userAltImage: 'Alt image description',
    userLink: 'https://www.youtube.com/',
    userTarget: '_blank',
    logo: 'https://i0.wp.com/gershenson.mx/wp-content/uploads/2020/08/logo-tec-de-monterrey-e1484853084274.png?ssl=1',
    altLogo: 'Alt logo description',
    logoLink: '',
    logoTarget: 'https://www.youtube.com/',
    onTrailingIconClick: () => {
      window.alert('Trailing Icon clicked in Storybook');
    },
    text: 'Title',
  },
} as Meta<typeof BmbHeaderMobileComponent>;

type Story = StoryObj<BmbHeaderMobileComponent>;

export const Default: Story = {};
