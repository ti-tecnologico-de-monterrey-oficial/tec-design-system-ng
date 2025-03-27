import { Meta, StoryObj } from '@storybook/angular';
import { BmbUserProfileComponent } from './bmb-user-profile.component';

export default {
  title: 'Macro Componentes/User profile',
  component: BmbUserProfileComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbUserProfileComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbUserProfileComponent ],
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
    headerLabel: {
      name: 'Header label',
      control: 'text',
      description: 'Sets the label to be displayed in the header.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'ESTUDIANTES' },
      },
    },
    anotherAccountLabel: {
      name: 'Another account label',
      control: 'text',
      description:
        'Sets the label for the option to log in with another account.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Ingresar con otra cuenta' },
      },
    },
    anotherAccountLink: {
      name: 'Another account link',
      control: 'text',
      description:
        'Sets the link for the option to log in with another account.',
      table: {
        category: 'Events',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    anotherAccountTarget: {
      name: 'Another account target',
      control: {
        type: 'radio',
      },
      options: ['_blank', '_parent', '_self', '_top'],
      description:
        'Sets the target for the option to log in with another account.',
      table: {
        category: 'Events',
        type: { summary: 'IBmbTargetLink' },
        defaultValue: { summary: '_blank' },
      },
    },
    buttonLabel: {
      name: 'Button label',
      control: 'text',
      description: 'Sets the label for the continue button.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Ingresar' },
      },
    },
    userInfo: {
      name: 'User info',
      control: 'object',
      description: `Sets an object containing user information, such as profile picture, full name, and user ID. This input is required.
      IBmbUserInfo = {
        id: string;
        fullName: string;
        profilePicture: string;
      }
      `,
      table: {
        type: { summary: 'IBmbUserInfo (required)' },
        category: 'Properties',
      },
    },
    actionHeaders: {
      name: 'Action header',
      control: { type: 'object' },
      description: `
Sets an array of IBmbActionHeader objects, default value is an empty array.

    export interface IBmbActionHeader {
      icon: IBmbHeaderSocialIcons | string;
      alt?: string;
      iconSize?: number;
      iconActiveToggle?: string;
      isToggleActive?: boolean;
      isAccentColor?: boolean;
      link?: string;
      target?: IBmbTargetLink;
      action: () => void;
    }

    export type IBmbHeaderSocialIcons =
    | 'apple_svg'
    | 'android_svg'
    | 'twitter_svg'
    | 'facebook_svg'
    | 'instagram_svg'
    | 'youtube_svg'
    | 'whatsapp_svg';
      `,
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
        type: {
          summary: 'IBmbActionHeader[]',
        },
      },
    },
    onRequest: {
      name: 'On Request',
      control: {
        type: '',
      },
      description:
        'Emits an event when a request is made, typically when the continue button is clicked.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    onContinue: {
      name: 'On Continue',
      control: {
        type: '',
      },
      description:
        'Emits an event when the continue action is completed successfully.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  args: {
    userInfo: {
      id: '',
      fullName: '',
      profilePicture: '',
    },
    actionHeaders: [
      {
        icon: '',
        alt: '',
        link: '',
      },
    ],
    onRequest: () => {
      console.log('On request');
    },
    onContinue: () => {
      console.log('On continue');
    },
  },
} as Meta<typeof BmbUserProfileComponent>;

type Story = StoryObj<BmbUserProfileComponent>;

export const Default: Story = {};

export const Example = {
  name: 'Example with the structures of the userInfo and actionHeaders objects',
  args: {
    userInfo: {
      id: 'A00123456',
      fullName: 'Borrego Perez',
      profilePicture:
        'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/assets/images/placeholders/user-icon-test.svg',
    },
    actionHeaders: [
      {
        icon: 'apple_svg',
        alt: 'apple social icon',
        link: 'https://www.example.com',
      },
      {
        icon: 'android_svg',
        alt: 'android social icon',
        link: 'https://www.example.com',
      },
      {
        icon: 'twitter_svg',
        alt: 'witter social icon',
        link: 'https://www.example.com',
      },
      {
        icon: 'facebook_svg',
        alt: 'facebook social icon',
        link: 'https://www.example.com',
      },
      {
        icon: 'instagram_svg',
        alt: 'instagram social icon',
        link: 'https://www.example.com',
      },
      {
        icon: 'youtube_svg',
        alt: 'youtube social icon',
        link: 'https://www.example.com',
      },
    ],
  },
};
