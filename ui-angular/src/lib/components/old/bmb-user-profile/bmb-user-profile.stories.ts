import { Meta, StoryObj } from '@storybook/angular';
import { BmbUserProfileComponent } from './bmb-user-profile.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  getTECParticularitiesMessage,
} from '../../utils/doc/utils';
import { DBmbGenericParamDesc } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Dev tools/User profile',
  component: BmbUserProfileComponent,
  tags: ['tec'],
  parameters: {
    docs: {
      controls: { exclude: ['isLoading', 'handleContinue'] },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ type: 'element' })} `, { generalDocLink: 'https://bamboo.tec.mx/latest/dev-tools/coleccion-de-componentes-uC69aq75' })}
${getSpecialSpecifications(getTECParticularitiesMessage('organism'), {
  showAdditionalBlockquote: true,
})}
${getBasicExampleBlock('')}
        `,
      },
    },
  },
  argTypes: {
    headerLabel: {
      control: 'text',
      description: 'Sets the label to be displayed in the header.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'ESTUDIANTES' },
      },
    },
    anotherAccountLabel: {
      control: 'text',
      description:
        'Sets the label for the option to log in with another account.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Ingresar con otra cuenta' },
      },
    },
    anotherAccountLink: DBmbGenericParamDesc.link,
    anotherAccountTarget: DBmbGenericParamDesc.target,
    buttonLabel: {
      control: 'text',
      description: 'Sets the label for the continue button.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Ingresar' },
      },
    },
    userInfo: {
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
    actionHeaderLinks: {
      control: { type: 'object' },
      description: `
Sets an object of IBmbActionHeaderLinks type.

    export interface IBmbActionHeaderLinks {
      apple: IBmbLinkInfo,
      android: IBmbLinkInfo,
      twitter: IBmbLinkInfo,
      facebook: IBmbLinkInfo,
      instagram: IBmbLinkInfo,
      youtube: IBmbLinkInfo,
    }

Template:

    actionHeaderLinks:IBmbActionHeaderLinks = {
      apple: {
        link: '',
        target: '',
      },
      android: {
        link: '',
        target: '',
      },
      twitter: {
        link: '',
        target: '',
      },
      facebook: {
        link: '',
        target: '',
      },
      instagram: {
        link: '',
        target: '',
      },
      youtube: {
        link: '',
        target: '',
      },
    },
      `,
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbActionHeaderLinks',
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
    headerLabel: '',
    userInfo: {
      id: '',
      fullName: '',
      profilePicture: '',
    },
    actionHeaderLinks: {
      apple: {
        link: '',
        target: '',
      },
      android: {
        link: '',
        target: '',
      },
      twitter: {
        link: '',
        target: '',
      },
      facebook: {
        link: '',
        target: '',
      },
      instagram: {
        link: '',
        target: '',
      },
      youtube: {
        link: '',
        target: '',
      },
    },
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
