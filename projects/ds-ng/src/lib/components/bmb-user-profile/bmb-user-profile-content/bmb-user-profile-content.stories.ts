import { Meta, StoryObj } from '@storybook/angular';
import { BmbUserProfileContentComponent } from './bmb-user-profile-content.component';

export default {
  title: 'Internal/User profile content',
  component: BmbUserProfileContentComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbUserProfileContentComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbUserProfileContentComponent ],
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
  },
  args: {
    userInfo: {
      id: 'A00123456',
      fullName: 'Borrego Perez',
      profilePicture:
        'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/assets/images/placeholders/user-icon-test.svg',
    },
    anotherAccountLabel: 'Ingresar con otra cuenta',
    anotherAccountLink: '',
    anotherAccountTarget: '_blank',
  },
} as Meta<typeof BmbUserProfileContentComponent>;

type Story = StoryObj<BmbUserProfileContentComponent>;

export const Default: Story = {};
