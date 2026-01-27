import type { Meta, StoryObj } from '@storybook/angular';
import { BmbTopBarComponent } from './bmb-top-bar.component';
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
} from '../../utils/doc/parameterDescriptions';

const getShowButton = (name: string) => {
  return {
    control: { type: 'boolean' },
    description: `
Shows the ${name} button when true and mitec version is active.
      `,
    table: {
      category: 'Properties',
      type: { summary: 'boolean' },
      defaultValue: getDefaultValueControl(false),
    },
  };
};
export default {
  title: 'Components/Menus/Top bar',
  component: BmbTopBarComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'ngOnInit',
          'getCountryName',
          'handleAlertClick',
          'handleBackToHome',
          'handleHelpButtonClick',
          'handleLangChange',
          'handleLogOutClick',
          'handleRoleChange',
          'handleUserClick',
          'imageDefault',
          'imageMitecDefault',
          'mobileImageDefault',
          'mobileImageMitecDefault',
          'showAnimation',
          'showUserName',
          'getNoMobileResolutionSize',
          'handleSearchChange',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'top-bar' })} to display user information, notifications, and various action buttons.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/top-bar/descripcion-general-WczOiPOw' })}
${getBasicExampleBlock('BmbTopBarComponent')}
        `,
      },
    },
  },
  argTypes: {
    userInformation: {
      value: null,
      control: 'object',
      table: {
        category: 'Properties',
        type: {
          summary: 'IUserInformation',
          detail: `IUserInformation {
  name: string;
  image: string;
  role: string;
}`,
        },
        defaultValue: false,
      },
    },
    image: {
      control: {
        type: 'text',
      },
      description: 'Sets the app logo.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl(),
      },
    },
    mobileImage: {
      control: {
        type: 'text',
      },
      description: 'Sets the app logo for low resolutions.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl(),
      },
    },
    appName: {
      control: {
        type: 'text',
      },
      description: 'Sets the App name.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl(),
      },
    },
    appPowered: {
      name: 'App Powered',
      control: {
        type: 'text',
      },
      description: 'Sets the Powered x Bamboo Design text (is optional).',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl(),
      },
    },
    lang: {
      control: {
        type: 'text',
      },
      description: 'Sets the default language.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl('es'),
      },
    },
    mitec: {
      control: {
        type: 'boolean',
      },
      description: 'Switches to the mitec top bar version.',
      table: {
        type: { summary: 'boolean' },
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
      },
    },
    alertNotification: {
      control: {
        type: 'object',
      },
      description: 'Sets the notifications for the top bar in the alert icon',
      table: {
        type: {
          summary: 'IBmbDataAlert[]',
          detail: `IBmbDataAlert {
          id: number | string;
          title: string;
          description: IBmbDataAlertDetails[];
          date: string;
          isRead: boolean;
          time: string;
          tags?: IBmbAlertTag[];
          type: string;
          isFavorite: boolean;
          isArchived: boolean;
        }`,
        },
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
      },
    },
    allowSidebarForMobile: {
      control: {
        type: 'boolean',
      },
      description: `
Adjusts the contents of the **Top bar** when true.

The Top bar header content shifts to the left, this allows the sidebar to be displayed in the mobile header.

${RELEVANT_TITLE.note}
The setting applies only to mobile.
      `,
      table: {
        type: { summary: 'boolean' },
        category: 'Properties',
        defaultValue: getDefaultValueControl(true),
      },
    },
    helpButtonClick: getOnClickParam(getOnEvent('help', 'helpButtonClick')),
    userProfileClick: getOnClickParam(
      getOnEvent('user profile', 'userProfileClick'),
    ),
    showHelpButton: getShowButton('help'),
    alertButtonClick: getOnClickParam(getOnEvent('alert', 'alertButtonClick')),
    positionButtonMenu: DBmbGenericParamDesc.deprecated,
    roleButtonClick: getOnClickParam(getOnEvent('role', 'roleButtonClick')),
    showRoleButton: getShowButton('role'),
    searchButtonClick: getOnClickParam(
      getOnEvent('search', 'searchButtonClick'),
    ),
    showSearchButton: getShowButton('search'),
    backToHomeClick: getOnClickParam(
      getOnEvent('back to home', 'backToHomeClick', 'void'),
    ),
    onLangChange: getOnClickParam(getOnEvent('language', 'onLangChange')),
    logOut: DBmbGenericParamDesc.deprecated,
    assignmentNotification: DBmbGenericParamDesc.deprecated,
    appSubTitle: DBmbGenericParamDesc.deprecated,
    hasLogoutButton: DBmbGenericParamDesc.deprecated,
    showLang: DBmbGenericParamDesc.deprecated,
  },
  args: {
    appPowered: 'Powered x Bamboo Design',
    userInformation: null,
    lang: 'es',
    mitec: false,
    showRoleButton: false,
    showSearchButton: false,
    showHelpButton: false,
    backToHomeClick: () => {
      console.log('Back to home clicked');
    },
    helpButtonClick: () => {
      console.log('helpButtonClick clicked');
    },
    alertButtonClick: () => {
      console.log('alertButtonClick clicked');
    },
    roleButtonClick: () => {
      console.log('roleButtonClick clicked');
    },
    searchButtonClick: () => {
      console.log('searchButtonClick clicked');
    },
    userProfileClick: () => {
      console.log('userProfileClick clicked');
    },
  },
} as Meta<typeof BmbTopBarComponent>;

type Story = StoryObj<BmbTopBarComponent>;

export const Default: Story = {};

export const StandaloneWithTitle: Story = {
  name: 'Standalone with title',
  args: {
    appName: 'TecTest',
    appPowered: 'Powered x Bamboo Design',
  },
};

export const StandaloneWithUserInformation: Story = {
  name: 'Standalone with user information',
  args: {
    appName: 'TecTest',
    appPowered: 'Powered x Bamboo Design',
    userInformation: {
      name: 'Santiago Hernández',
      image: 'https://picsum.photos/id/64/200/300',
      role: 'Alumno',
    },
  },
};

export const StandAloneWHelpButton: Story = {
  args: {
    userInformation: {
      name: 'Santiago Hernández',
      image: 'https://picsum.photos/id/64/200/300',
      role: 'Alumno',
    },
    showHelpButton: true,
    appName: 'TecTest',
    appPowered: 'Powered x Bamboo Design',
  },

  name: 'Standalone with user information and help button',
};

export const Mitec: Story = {
  name: 'Mitec default',
  args: {
    mitec: true,
  },
};

export const MitecWithUserInformation: Story = {
  name: 'Mitec with user information',
  args: {
    mitec: true,
    userInformation: {
      name: 'Santiago Hernández',
      image: 'https://picsum.photos/id/64/200/300',
      role: 'Alumno',
    },
    alertNotification: undefined,
  },
};

export const MitecWithUserInformationWithRoleChange: Story = {
  name: 'Mitec with user information with role change',
  args: {
    mitec: true,
    userInformation: {
      name: 'Santiago Hernández',
      image: 'https://picsum.photos/id/64/200/300',
      role: 'Alumno',
    },
    showRoleButton: true,
    alertNotification: [
      {
        id: 10,
        title: 'Alerta 10',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'title',
          },
          {
            text: 'Descripción de la alerta 10 paragraph',
            type: 'paragraph',
          },
          {
            text: 'Descripción de la alerta 10',
            type: 'button',
            variant: 'primary',
          },
        ],
        date: '19/11/2024',
        isRead: false,
        time: '12:00',
        tags: [
          {
            text: 'tag1',
            color: 'info',
          },
          {
            text: 'tag2',
            color: 'brand',
          },
        ],
        type: 'tipo 1',
        isFavorite: true,
        isArchived: false,
      },
      {
        id: 1,
        title: 'Alerta 1',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'title',
          },
          {
            text: 'Descripción de la alerta 10 paragraph',
            type: 'paragraph',
          },
          {
            text: 'Descripción de la alerta 10 link',
            type: 'link',
            href: 'https://www.google.com',
          },
          {
            text: 'Descripción de la alerta 10',
            type: 'button',
            variant: 'secondary-filled',
          },
        ],
        date: '01/11/2024',
        isRead: false,
        time: '12:00',
        type: 'tipo 1',
        isFavorite: true,
        isArchived: false,
      },
      {
        id: 2,
        title: 'Alerta 2',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'title',
          },
          {
            text: 'Descripción de la alerta 10 paragraph',
            type: 'paragraph',
          },
          {
            text: 'Descripción de la alerta 10 link',
            type: 'image',
            href: 'https://picsum.photos/id/25/200',
          },
        ],
        date: '19/11/2024',
        isRead: true,
        time: '15:00',
        type: 'tipo 2',
        isFavorite: false,
        isArchived: true,
      },
      {
        id: 3,
        title: 'Alerta 3',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'paragraph',
            style: 'bold',
          },
          {
            text: 'Descripción de la alerta 10 paragraph',
            type: 'paragraph',
          },
        ],
        date: '18/11/2024',
        isRead: false,
        time: '12:00',
        type: 'tipo 1',
        isFavorite: false,
        isArchived: false,
      },
      {
        id: 4,
        title: 'Alerta 4',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'paragraph',
            style: 'bold',
          },
          {
            text: 'Descripción de la alerta 10 paragraph',
            type: 'paragraph',
          },
        ],
        date: '02/11/2024',
        isRead: true,
        time: '12:00',
        type: 'tipo 3',
        isFavorite: false,
        isArchived: false,
      },
      {
        id: 4,
        title: 'Alerta 40',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'title',
          },
          {
            text: 'Descripción de la alerta 10 paragraph',
            type: 'paragraph',
          },
          {
            text: 'Descripción de la alerta 10 link',
            type: 'image',
            href: 'https://picsum.photos/id/26/200',
          },
        ],
        date: '02/01/2024',
        isRead: true,
        time: '12:00',
        type: 'tipo 1',
        isFavorite: false,
        isArchived: false,
      },
    ],
  },
};

export const MitecWithUserInformationWithSearch: Story = {
  name: 'Mitec with user information with search',
  args: {
    mitec: true,
    userInformation: {
      name: 'Santiago Hernández',
      image: 'https://picsum.photos/id/64/200/300',
      role: 'Alumno',
    },
    showRoleButton: true,
    showSearchButton: true,
    alertNotification: [
      {
        id: 10,
        title: 'Alerta 10',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'title',
          },
          {
            text: 'Descripción de la alerta 10 paragraph',
            type: 'paragraph',
          },
          {
            text: 'Descripción de la alerta 10',
            type: 'button',
            variant: 'primary',
          },
        ],
        date: '19/11/2024',
        isRead: false,
        time: '12:00',
        tags: [
          {
            text: 'tag1',
            color: 'info',
          },
          {
            text: 'tag2',
            color: 'brand',
          },
        ],
        type: 'tipo 1',
        isFavorite: true,
        isArchived: false,
      },
      {
        id: 1,
        title: 'Alerta 1',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'title',
          },
          {
            text: 'Descripción de la alerta 10 paragraph',
            type: 'paragraph',
          },
          {
            text: 'Descripción de la alerta 10 link',
            type: 'link',
            href: 'https://www.google.com',
          },
          {
            text: 'Descripción de la alerta 10',
            type: 'button',
            variant: 'secondary-filled',
          },
        ],
        date: '01/11/2024',
        isRead: false,
        time: '12:00',
        type: 'tipo 1',
        isFavorite: true,
        isArchived: false,
      },
      {
        id: 2,
        title: 'Alerta 2',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'title',
          },
          {
            text: 'Descripción de la alerta 10 paragraph',
            type: 'paragraph',
          },
          {
            text: 'Descripción de la alerta 10 link',
            type: 'image',
            href: 'https://picsum.photos/id/25/200',
          },
        ],
        date: '19/11/2024',
        isRead: true,
        time: '15:00',
        type: 'tipo 2',
        isFavorite: false,
        isArchived: true,
      },
      {
        id: 3,
        title: 'Alerta 3',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'paragraph',
            style: 'bold',
          },
          {
            text: 'Descripción de la alerta 10 paragraph',
            type: 'paragraph',
          },
        ],
        date: '18/11/2024',
        isRead: false,
        time: '12:00',
        type: 'tipo 1',
        isFavorite: false,
        isArchived: false,
      },
      {
        id: 4,
        title: 'Alerta 4',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'paragraph',
            style: 'bold',
          },
          {
            text: 'Descripción de la alerta 10 paragraph',
            type: 'paragraph',
          },
        ],
        date: '02/11/2024',
        isRead: true,
        time: '12:00',
        type: 'tipo 3',
        isFavorite: false,
        isArchived: false,
      },
      {
        id: 4,
        title: 'Alerta 40',
        description: [
          {
            text: 'Descripción de la alerta 10',
            type: 'title',
          },
          {
            text: 'Descripción de la alerta 10 paragraph',
            type: 'paragraph',
          },
          {
            text: 'Descripción de la alerta 10 link',
            type: 'image',
            href: 'https://picsum.photos/id/26/200',
          },
        ],
        date: '02/01/2024',
        isRead: true,
        time: '12:00',
        type: 'tipo 1',
        isFavorite: false,
        isArchived: false,
      },
    ],
  },
};
