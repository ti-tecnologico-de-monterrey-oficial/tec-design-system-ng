import {
  componentWrapperDecorator,
  moduleMetadata,
  StoryObj,
  type Meta,
} from '@storybook/angular';
import { BmbProfileComponent } from './bmb-profile.component';
import {
  attributes,
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  IBmbOnEvent,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  getOnClickParam,
} from '../../utils/doc/parameterDescriptions';

const onCloseSession: IBmbOnEvent = getOnEvent(
    '',
    'handleCloseSession',
    'void',
  ),
  onCloseProfile: IBmbOnEvent = getOnEvent('', 'handleCloseProfile', 'void');

export default {
  title: 'Components/Containers/Profile card',
  component: BmbProfileComponent,
  decorators: [
    moduleMetadata({
      imports: [],
      providers: [],
    }),
    componentWrapperDecorator((story: string) => {
      return `<div style="max-width: 560px; margin: 0 auto">
          ${story}
        </div>`;
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          '_studentData',
          'langFormControl',
          'closeProfile',
          'closeSession',
          'getUserData',
          'handleButtonClick',
          'handleRadial',
          'ngOnInit',
          'throwErrors',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'profile' })} to display a profile for students or collaborators, supporting both mobile and desktop views.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/profile-card/descripcion-general-Ka3x81s0' })}
${getSpecialSpecifications(getAlertBlockquote(
        `The theme toggle does not work correctly in Storybook. However, if you use it in the project, it functions without whether issues.`,
        {
          title: '###'.concat(RELEVANT_TITLE.note),
          blockquoteType: BlockquoteType.note,
        },
      ),{showAdditionalBlockquote: true})}
${getBasicExampleBlock(
  'BmbProfileComponent',
  '',
  `${onCloseSession.handleExample}
  ${onCloseProfile.handleExample}`,
)}
        `,
      },
    },
  },
  argTypes: {
    isStandAlone: {
      control: { type: 'boolean' },
      description:
        'When true the profile should be adapted to the stand alone view. When false, the profile must be adapted to be displayed on mobile devices or the web.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    standAloneData: {
      control: 'object',
      description: `
Sets the stand alone data to display in the component.
      `,
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbUserData',
          detail: `
IBmbUserData {
  name: string;
  userImg: string;
  email: string;
  registration?: string;
}

          `,
        },
      },
    },
    isStudent: {
      control: { type: 'boolean' },
      description:
        'When true, the profile will display the content or data of a student. When false, the profile will display the content or data of a collaborator.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    studentData: {
      control: 'object',
      description: `
Sets the student data to display in the component.

Display logic:
- If isExatec is true and linkedin is provided, the LinkedIn profile is shown.
- If isExatec is false and curp is provided, the CURP is shown.
      `,
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbStudentProfileData',
          detail: `
IBmbStudentProfileData {
  userData: IBmbUserData;
  period: string;
  campus: string;
  program: string;
  curp: string;
  linkedin: string;
  isExatec: boolean;
}

          `,
        },
      },
    },
    collaboratorData: {
      control: 'object',
      description: `
Sets the collaborator data to display in the component.


      `,
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbCollaboratorProfileData',
          detail: `
IBmbCollaboratorProfileData {
  userData: IBmbUserData;
  position: string;
  area: string;
  leader: IBmbHierarchyProfileData;
  generalist: IBmbHierarchyProfileData;
}

IBmbHierarchyProfileData {
  userData: IBmbUserData;
  hierarchyLink: string;
  hierarchyTarget: IBmbTargetLink;
}

          `,
        },
      },
    },
    versionLabel: {
      control: 'text',
      description: 'Sets the version label to display in the component',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    isMobile: {
      control: { type: 'boolean' },
      description:
        'When true the profile should be adapted to the mobile view. When false, the profile should be adapted to display the web view. Web or mobile view can only be displayed when not stand alone.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    enableLangChange: {
      control: { type: 'boolean' },
      description:
        'When true, the component will display the language change button.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    idDigitalLink: {
      control: 'text',
      description:
        'Sets the link to redirect when the **ID digital** button is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    campusAcessLink: {
      control: 'text',
      description:
        'Sets the link to redirect when the **Campus access** button is clicked.',
      table: {
        category: 'Events',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    tecServicesLink: {
      control: 'text',
      description:
        'Sets the link to redirect when the **Tec services** button is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    targetLinks: {
      control: 'radio',
      options: ['_blank', '_parent', '_self', '_top'],
      description:
        'The target attribute for the link. Refer to https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a for more information.',
      table: {
        category: 'Events',
        type: { summary: 'IBmbTargetLink' },
        defaultValue: { summary: '_blank' },
      },
    },
    handleCloseSession: getOnClickParam(onCloseSession),
    handleCloseProfile: getOnClickParam(
      onCloseProfile,
      `, returns a void signal to indicates that close profile window button was clicked`,
    ),
    handleLangChange: getOnClickParam(
      getOnEvent('string', 'handleLangChange'),
      `, returns a string with the selected language. The default value is ***es***.`,
    ),
    handleCollaboratorClick: getOnClickParam(
      getOnEvent('', 'handleLangChange', 'IBmbUserData'),
    ),
    userData: DBmbGenericParamDesc.deprecated,
  },
  args: {
    handleCloseSession: () => {
      console.log('Close session');
    },
  },
} as Meta<typeof BmbProfileComponent>;

type Story = StoryObj<BmbProfileComponent>;

export const Default = {
  name: 'Example of Stand alone variant',
  args: {
    isStandAlone: true,
    standAloneData: {
      name: 'Paloma Araujo',
      userImg: 'https://picsum.photos/id/64/200/300',
      registration: 'A032132',
      email: 'mail@tec.mx',
    },
  },
  render: (args: any) => ({
    props: args,
    template: `
      <bmb-profile
        ${attributes(args)}
      />
    `,
  }),
};

export const StudentMobileExample = {
  name: 'Example of Student (mobile) variant',
  args: {
    studentData: {
      userData: {
        name: 'Paloma Araujo',
        userImg: 'https://picsum.photos/id/64/200/300',
        registration: 'A032132',
        email: 'mail@tec.mx',
      },
      period: 'AGO-DIC 24',
      campus: 'Monterrey',
      program: 'ARQ19',
      curp: 'xxxx0000xxxx0000xx',
      isExatec: false,
    },
    campusAcessLink: 'https://www.example.com',
    idDigitalLink: 'https://www.example.com',
    tecServicesLink: 'https://www.example.com',
    targetLinks: '_blank',
    versionLabel: 'Versión 1.5.10',
    handleCloseProfile: () => {
      console.log('Close Profile');
    },
  },
  render: (args: any) => ({
    props: args,
    template: `
      <bmb-profile
        ${attributes(args)}
      />
    `,
  }),
};

export const StudentWebExample = {
  name: 'Example of Student (web) variant',
  argTypes: {
    handleCloseProfile: {
      control: false,
    },
  },
  args: {
    isMobile: false,
    studentData: {
      userData: {
        name: 'Paloma Araujo',
        userImg: 'https://picsum.photos/id/64/200/300',
        registration: 'A032132',
        email: 'mail@tec.mx',
      },
      period: 'AGO-DIC 24',
      campus: 'Monterrey',
      program: 'ARQ19',
      curp: 'xxxx0000xxxx0000xx',
      linkedin:
        '<a href="https://linkedin.com" target="_blank" rel="noopener">Ir a LinkedIn</a>',
      isExatec: true,
    },
  },
  render: (args: any) => ({
    props: args,
    template: `
      <bmb-profile
        [isMobile]="isMobile"
        [studentData]="studentData"
      />
    `,
  }),
};

export const CollaboratorMobileExample = {
  name: 'Example of Collaborator (mobile) variant',
  args: {
    isStudent: false,
    collaboratorData: {
      userData: {
        name: 'Paloma Araujo',
        userImg: 'https://picsum.photos/id/64/200/300',
        registration: 'L0123456',
        email: 'mail@tec.mx',
      },
      position: 'Desarrollador de Software',
      area: 'Dirección de Desarrollo-Techvolution 2.0',
      leader: {
        userData: {
          name: 'Arturo González Martínez',
          userImg: 'https://picsum.photos/id/64/200/300',
          email: 'mail@tec.mx',
        },
      },
      generalist: {
        userData: {
          name: 'Ana María Gutiérrez Pineda',
          userImg: 'https://picsum.photos/id/64/200/300',
          email: 'mail@tec.mx',
        },
      },
    },
    campusAcessLink: 'https://www.example.com',
    idDigitalLink: 'https://www.example.com',
    tecServicesLink: 'https://www.example.com',
    targetLinks: '_blank',
    versionLabel: 'Versión 1.5.10',
    handleCloseProfile: () => {
      console.log('Close Profile');
    },
  },
  render: (args: any) => ({
    props: args,
    template: `
      <bmb-profile
        ${attributes(args)}
      />
    `,
  }),
};

export const CollaboratorWebExample = {
  name: 'Example of Collaborator (web) variant',
  argTypes: {
    handleCloseProfile: {
      control: false,
    },
  },
  args: {
    isStudent: false,
    isMobile: false,
    collaboratorData: {
      userData: {
        name: 'Paloma Araujo',
        userImg: 'https://picsum.photos/id/64/200/300',
        registration: 'L0123456',
        email: 'mail@tec.mx',
      },
      position: 'Desarrollador de Software',
      area: 'Dirección de Desarrollo-Techvolution 2.0',
      leader: {
        userData: {
          name: 'Arturo González Martínez',
          userImg: 'https://picsum.photos/id/64/200/300',
          email: 'mail@tec.mx',
        },
        hierarchyLink: 'https://www.example.com',
        hierarchyTarget: '_blank',
      },
      generalist: {
        userData: {
          name: 'Ana María Gutiérrez Pineda',
          userImg: 'https://picsum.photos/id/64/200/300',
          email: 'mail@tec.mx',
        },
        hierarchyLink: 'https://www.example.com',
        hierarchyTarget: '_blank',
      },
    },
  },
  render: (args: any) => ({
    props: args,
    template: `
      <bmb-profile
        ${attributes(args)}
      />
    `,
  }),
};
