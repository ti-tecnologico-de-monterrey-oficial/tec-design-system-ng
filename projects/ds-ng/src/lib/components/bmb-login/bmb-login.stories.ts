import { Meta, StoryObj } from '@storybook/angular';
import { BmbLoginComponent } from './bmb-login.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  getDefaultValueControl,
  getOnClickParam,
  getOnEventParam,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Organisms/Login layout web',
  component: BmbLoginComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'isEnabled',
          'isLoading',
          'userForm',
          'handleContinue',
          'handleFormGroup',
          'handleRememberMe',
          '',
          '',
          '',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'login', type: 'organism' })} to log in to the web platform. It includes fields for credentials and password recovery.`, { generalDocLink: 'https://bamboo.tec.mx/latest/organisms/login-layout-web/descripcion-general-uYEtF9vq' })}
${getBasicExampleBlock('BmbLoginComponent')}
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
        defaultValue: getDefaultValueControl('ESTUDIANTES'),
      },
    },
    forgottenPasswordLabel: {
      control: 'text',
      description: 'Sets the label to be displayed for *forgotten password.*',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl('¿Olvidaste tu contraseña?'),
      },
    },
    forgottenPasswordLink: {
      ...DBmbGenericParamDesc.link,
      description:
        'Sets the link for the option to log in with forgotten password.',
    },
    forgottenPasswordTarget: {
      ...DBmbGenericParamDesc.target,
      description: DBmbGenericParamDesc.target.description.concat(
        '<br/><br/>Corresponds to the `forgottenPasswordLink` link property.',
      ),
    },
    buttonLabel: {
      control: 'text',
      description: 'Sets the label for the continue button.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl('Ingresar'),
      },
    },
    actionHeaderLinks: {
      control: { type: 'object' },
      description: 'Sets the list of links for the header icons.',
      table: {
        category: 'Properties',
        defaultValue: {
          summary: '',
          detail: `
${RELEVANT_TITLE.example} Template:

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
        },
        type: {
          summary: 'IBmbActionHeaderLinks',
          detail: `
IBmbActionHeaderLinks {
  apple: IBmbLinkInfo;
  android: IBmbLinkInfo;
  twitter: IBmbLinkInfo;
  facebook: IBmbLinkInfo;
  instagram: IBmbLinkInfo;
  youtube: IBmbLinkInfo;
}

IBmbLinkInfo {
  link: string;
  target?: IBmbTargetLink;
}

IBmbTargetLink = '_blank' | '_parent' | '_self' | '_top'
            `,
        },
      },
    },
    onRequest: getOnEventParam(
      getOnEvent('', 'onRequest', 'unknown'),
      ` when a request is made, typically when the continue button is clicked.`,
      'other',
    ),
    onContinue: getOnEventParam(
      getOnEvent('', 'onContinue', 'void'),
      ` when the continue action is completed successfully.`,
      'other',
    ),
    showRememberMeCheckbox: {
      control: 'boolean',
      description: 'Shows remember me checkbox when true',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl(false),
      },
    },
    rememberMeCheckboxLabel: {
      control: 'text',
      description: 'Sets the label to be displayed for *remember me* checkbox.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl('Recordarme'),
      },
    },
    showLoginAsGuest: {
      control: 'boolean',
      description: 'Shows *log in as a guest* when true',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl('false'),
      },
    },
    loginAsGuestLabel: {
      control: 'text',
      description: 'Sets the label to be displayed for *log in as a guest*.',
      table: {
        category: 'Properties',
        type: { summary: 'string  (required)' },
        defaultValue: getDefaultValueControl('Entrar como invitado'),
      },
    },
    loginAsGuestLink: {
      ...DBmbGenericParamDesc.link,
      description: 'Sets the link for log in as a guest.',
    },
    loginAsGuestTarget: {
      ...DBmbGenericParamDesc.target,
      description: DBmbGenericParamDesc.target.description.concat(
        '<br/><br/>Corresponds to the `loginAsGuestLink` link property.',
      ),
    },
    onRememberMeChecked: getOnEventParam(
      getOnEvent('', 'onRememberMeChecked', 'unknown'),
      `when the state of the checkbox changes, such as when it is checked or unchecked.`,
      'other',
    ),
  },
  args: {
    headerLabel: '',
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
    onRememberMeChecked: () => {
      console.log('Remember me clicked');
    },
  },
} as Meta<typeof BmbLoginComponent>;

type Story = StoryObj<BmbLoginComponent>;

export const Default: Story = {};
