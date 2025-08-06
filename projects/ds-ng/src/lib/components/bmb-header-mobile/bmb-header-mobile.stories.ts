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
      control: { type: 'text' },
      description:
        'This property is deprecated and will be removed in future versions.',
      table: {
        category: 'Deprecated',
      },
    },
    iconRight2: {
      control: { type: 'text' },
      description:
        'This property is deprecated and will be removed in future versions.',
      table: {
        category: 'Deprecated',
      },
    },
    text: {
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
      control: { type: 'text' },
      description:
        'Name of the icon to use. Please use Material icons: https://fonts.google.com/icons. Do not use the image property if you want to use an iconRight.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    userImage: {
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
    onLogoClick: {
      control: {
        type: '',
      },
      description:
        'This handler can be used when you have the Logo available and want to perform a specific interaction.',
      table: {
        category: 'Events',
        type: { summary: '(onLogoClick)="yourFunction()"' },
      },
    },
    trailingIconNotifications: {
      control: {
        type: 'number',
      },
      description:
        'The number of notifications to display on the trailing icon.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
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
    logoTarget: '_blank',
    trailingIconNotifications: 0,
    onTrailingIconClick: () => {
      window.alert('Trailing Icon clicked in Storybook');
    },
    onLogoClick: () => {
      window.alert('Logo clicked in Storybook');
    },
    onUserImageClick: () => {
      window.alert('User Image clicked in Storybook');
    },
    text: 'Title',
  },
} as Meta<typeof BmbHeaderMobileComponent>;

type Story = StoryObj<BmbHeaderMobileComponent>;

export const Default: Story = {};
