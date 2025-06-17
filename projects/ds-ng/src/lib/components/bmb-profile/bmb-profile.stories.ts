import { StoryObj, type Meta, type StoryFn } from '@storybook/angular';
import { BmbProfileComponent } from './bmb-profile.component';
import { attributes } from '../../utils/utils';
import { storiesLayoutHorizontal } from '../../utils/bambooLayout';

export default {
  title: 'Macro Componentes/Profile',
  component: BmbProfileComponent,
  decorators: [storiesLayoutHorizontal],
  parameters: {
    docs: {
      description: {
        component: `
Note: The theme toggle does not work correctly in Storybook. However, if you use it in the project, it functions without any issues.
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import {
  BmbProfileComponent,
} from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbProfileComponent ],
  templateUrl: '
  ',
  styleUrl: './component.scss',
})
export class AppComponent {
  handleCloseSession(){
    console.log("Close Sesion")
  }

  handleCloseProfile: () => {
    console.log('Close Profile')
  }
}

\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    isStandAlone: {
      name: 'Is stand alone',
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
      name: 'Stand alone data',
      control: 'object',
      description: `
Sets the stand alone data to display in the component.

    IBmbUserData {
      name: string;
      userImg: string;
      email: string;
      registration?: string;
    }
      `,
      table: {
        category: 'Properties',
        type: { summary: 'IBmbUserData' },
      },
    },
    isStudent: {
      name: 'Is student',
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
      name: 'Student data',
      control: 'object',
      description: `
Sets the student data to display in the component.

    IBmbStudentProfileData {
      userData: IBmbUserData;
      period: string;
      campus: string;
      program: string;
    }
      `,
      table: {
        category: 'Properties',
        type: { summary: 'IBmbStudentProfileData' },
      },
    },
    collaboratorData: {
      name: 'Collaborator data',
      control: 'object',
      description: `
Sets the collaborator data to display in the component.

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
      table: {
        category: 'Properties',
        type: { summary: 'IBmbCollaboratorProfileData' },
      },
    },
    versionLabel: {
      name: 'Version label',
      control: 'text',
      description: 'Sets the version label to display in the component',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    isMobile: {
      name: 'Is mobile',
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
      name: 'Enable lang change',
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
      name: 'Id Digital Link',
      control: 'text',
      description:
        'Sets the link to redirect when the **ID digital** button is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'string' },
        defaultValue: { summary: 'Ingresar' },
      },
    },
    campusAcessLink: {
      name: 'Campus Access Link',
      control: 'text',
      description:
        'Sets the link to redirect when the **Campus access** button is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'string' },
      },
    },
    tecServicesLink: {
      name: 'Tec services Link',
      control: 'text',
      description:
        'Sets the link to redirect when the **Tec services** button is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'string' },
        defaultValue: { summary: 'Ingresar' },
      },
    },
    targetLinks: {
      name: 'Target Links',
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
    handleCloseSession: {
      name: 'Handle Close Session',
      control: {
        type: '',
      },
      description:
        'Output function, returns a void signal to indicates that close session button was clicked',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    handleCloseProfile: {
      name: 'Handle Close Profile',
      control: {
        type: '',
      },
      description:
        'Output function, returns a void signal to indicates that close profile window button was clicked',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    handleLangChange: {
      name: 'Model lang status',
      control: null,
      description:
        'Output function, returns a string with the selected language. The default value is "es".',
      table: {
        category: 'Events',
        type: { summary: 'string' },
        defaultValue: { summary: 'es' },
      },
    },
    userData: {
      name: 'User Data',
      control: 'object',
      description: '',
      table: {
        category: 'Deprecated',
        type: { summary: 'object' },
      },
    },
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
    <!-- Instruction to users: This html is used for internal Storybook logic -->
    <div style="max-width: 560px; margin: 0 auto">
      <!-- Example of how you can use this component -->
      <bmb-profile
        ${attributes(args)}
      />
      <!-- End of the example -->
    </div>
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
    <!-- Instruction to users: This html is used for internal Storybook logic -->
    <div style="max-width: 560px; margin: 0 auto">
      <!-- Example of how you can use this component -->
      <bmb-profile
        ${attributes(args)}
      />
      <!-- End of the example -->
    </div>
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
    },
  },
  render: (args: any) => ({
    props: args,
    template: `
    <!-- Instruction to users: This html is used for internal Storybook logic -->
    <div style="max-width: 560px; margin: 0 auto">
      <!-- Example of how you can use this component -->
      <bmb-profile
        ${attributes(args)}
      />
      <!-- End of the example -->
    </div>
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
    <!-- Instruction to users: This html is used for internal Storybook logic -->
    <div style="max-width: 560px; margin: 0 auto">
      <!-- Example of how you can use this component -->
      <bmb-profile
        ${attributes(args)}
      />
      <!-- End of the example -->
    </div>
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
    <!-- Instruction to users: This html is used for internal Storybook logic -->
    <div style="max-width: 560px; margin: 0 auto">
      <!-- Example of how you can use this component -->
      <bmb-profile
        ${attributes(args)}
      />
      <!-- End of the example -->
    </div>
    `,
  }),
};
