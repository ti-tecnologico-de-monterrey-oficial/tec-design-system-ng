import type { Meta, StoryObj } from '@storybook/angular';
import { BmbWebTemplatesComponent } from './bmb-web-templates.component';

export default {
  title: 'Macro Componentes/Web templates',
  component: BmbWebTemplatesComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbWebTemplatesComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbWebTemplatesComponent ],
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
    isFullScreen: {
      name: 'Is full screen',
      control: { type: 'boolean' },
      description: 'Set the full screen class.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    titleScreen: {
      name: 'Title screen',
      control: {
        type: 'text',
      },
      description: 'Set the title screen in the header.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    subTitleScreen: {
      name: 'Subtitle screen',
      control: {
        type: 'text',
      },
      description: 'Set the subtitle screen in the header.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    template: {
      name: 'Template',
      control: {
        type: 'select',
      },
      options: [
        'full-width-card',
        'justify-width-card',
        'single-column-card',
        'aside-first-card',
        'aside-light-card',
        'two-aside-card',
      ],
      description: 'Set template layut, depending of the template, it required to send the next templates: `#bmbTemplateAside`, `#bmbTemplateSecondAside` and `#bmbTemplateMain`.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbTemplateName' },
        defaultValue: { summary: 'full-width-card' },
      },
    },
    titleMainSlot: {
      name: 'Title main slot',
      control: {
        type: 'text',
      },
      description: 'Set the title text for the main slot.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    titleAsideSlot: {
      name: 'Title aside slot',
      control: {
        type: 'text',
      },
      description: 'Set the title text for the aside slot.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    topBarPositionButtonMenu: {
      name: 'Responsive menu button position',
      control: {
        type: 'radio',
      },
      options: ['left', 'right'],
      description: 'Set responsive menu button position.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'left' },
      },
    },
    topBarUserInformation: {
      value: null,
      control: false,
      table: {
        category: 'Properties',
        type: { summary: 'object' },
        defaultValue: { summary: 'null' },
      },
    },
    topBarHasLogoutButton: {
      name: 'Has logout button',
      control: { type: 'boolean' },
      description:
        'Shows the end session button, only works if the user information is provided.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    topBarImage: {
      name: 'TEC logo image',
      control: {
        type: 'text',
      },
      description: 'Replace the default logo.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    topBarMobileImage: {
      name: 'TEC logo image for low resolutions',
      control: {
        type: 'text',
      },
      description: 'Replace the default logo for low resolutions.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    topBarAppName: {
      name: 'App name',
      control: {
        type: 'text',
      },
      description: 'Set the App name.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    topBarAppSubTitle: {
      name: 'App sub-title',
      control: {
        type: 'text',
      },
      description: 'Set the App sub-title.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    topBarShowLang: {
      name: 'Lang selector',
      control: { type: 'boolean' },
      description: 'Shows the lang selector.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    topBarLang: {
      name: 'Language',
      control: {
        type: 'text',
      },
      description: 'Set the default language.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'es' },
      },
    },
    topBarMitec: {
      name: 'Mitec',
      control: {
        type: 'boolean',
      },
      description: 'Top Bar changes to the mitec version',
      table: {
        type: { summary: 'boolean' },
        category: 'Properties',
        defaultValue: { summary: false },
      },
    },
    topBarAssignmentNotification: {
      name: 'Assigment Notification',
      control: {
        type: 'number',
      },
      description: 'Set the number of notifications for the icon assignment',
      table: {
        type: { summary: 'number' },
        category: 'Properties',
      },
    },
    topBarAlertNotification: {
      name: 'Alert Notification',
      control: {
        type: 'number',
      },
      description: 'Set the number of notifications for the icon alert',
      table: {
        type: { summary: 'number' },
        category: 'Properties',
      },
    },
    topBarLogOut: {
      name: 'Logout event',
      control: false,
      description:
        'Function that is executed when the logout button is clicked.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    topBarOnLangChange:{
      name: 'Language change event',
      control: false,
      description: 'Function that is executed when the lang change.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    sideBarElements: {
      name: 'Elements',
      control: {
        type: 'object',
      },
      description:
        'An array of sidebar elements, each containing a list of child elements.',
      table: {
        type: { summary: 'SidebarElement[][]' },
        category: 'Properties',
        defaultValue: { summary: '[]' },
      },
    },
    sideBarTitle: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: 'The title of the navigation sidebar for mobile.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Navigation' },
      },
    },
  },
  args: {
    isFullScreen: false,
    titleScreen: '',
    subTitleScreen: '',
    template: 'full-width-card',
    titleMainSlot: '',
    titleAsideSlot: '',
    topBarPositionButtonMenu: 'left',
    topBarUserInformation: null,
    topBarHasLogoutButton: false,
    topBarImage: '',
    topBarMobileImage: '',
    topBarAppName: '',
    topBarAppSubTitle: '',
    topBarShowLang: false,
    topBarLang: 'es',
    topBarMitec: false,
    topBarLogOut: () => {
      alert('topBarLogOut');
    },
    topBarOnLangChange: () => {
      alert('topBarLogOut');
    },
    sideBarElements: [
      [
        {
          id: 1,
          icon: 'assignment_add',
          title: 'Elegir documentos',
          link: '/home',
        },
        {
          id: 2,
          icon: 'task',
          title: 'Agregar firmantes',
          link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
        },
        {
          id: 3,
          icon: 'note_alt',
          title: 'Crear envelope',
          link: '#contact',
          target: '_self',
        },
        {
          id: 4,
          icon: 'checklist_rtl',
          title: 'Estado de archivos anonimos',
          link: 'inicio',
          children: [
            {
              id: 4.1,
              icon: 'file_copy',
              title: 'Sub-item 1',
              link: '/emprendedor',
            },
            {
              id: 4.2,
              icon: 'file_copy',
              title: 'Sub-item 2',
              link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
            },
          ],
        },
        {
          id: 5,
          icon: 'account_box',
          title: 'Admin.usuariosusuariosusuarios',
          link: 'vivencia',
          children: [
            {
              id: 5.1,
              icon: 'file_copy',
              title: 'Sub-item 3',
              link: '/home',
            },
            {
              id: 5.2,
              icon: 'file_copy',
              title: 'Sub-item 4',
              link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
            },
          ],
        },
      ],
      [
        {
          id: 7,
          icon: 'account_box',
          title: 'Admin. usuarios',
          link: 'vivencia1',
        },
        {
          id: 8,
          icon: 'account_box',
          title: 'Admin. usuarios',
          link: 'vivencia2',
        },
        {
          id: 9,
          icon: 'account_box',
          title: 'Admin. usuarios',
          link: 'vivencia3',
        },
        {
          id: 10,
          icon: 'account_box',
          title: 'Hi',
          link: 'vivencia4',
        },
        {
          id: 11,
          icon: 'account_box',
          title: 'Hi',
          link: 'vivencia5',
        },
      ],
    ],
    sideBarTitle: 'Navigation',
  },
} as Meta<typeof BmbWebTemplatesComponent>;

type Story = StoryObj<BmbWebTemplatesComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
    <bmb-web-templates
      [topBarPositionButtonMenu]="topBarPositionButtonMenu"
      [topBarHasLogoutButton]="topBarHasLogoutButton"
      [topBarAppName]="topBarAppName"
      [topBarAppSubTitle]="topBarAppSubTitle"
      [topBarShowLang]="topBarShowLang"
      [isFullScreen]="isFullScreen"
      [titleScreen]="titleScreen"
      [subTitleScreen]="subTitleScreen"
      [titleMainSlot]="titleMainSlot"
      [titleAsideSlot]="titleAsideSlot"
      [template]="template"
      [sideBarElements]="sidebarElements"
      [sideBarTitle]="sideBarTitle"
    >
      <ng-template #bmbTemplateAside>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
          mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
          Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
          Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim.
          Nulla eleifend, leo at finibus volutpat, nulla metus eleifend lacus,
          ullamcorper dictum augue diam id erat. Donec ac fringilla elit. Aliquam
          sit amet luctus elit. Suspendisse ante tortor, euismod nec metus id,
          commodo sollicitudin massa. Aliquam magna nibh, semper eu vestibulum
          aliquam, aliquet gravida massa. Nullam vehicula, augue non aliquam
          posuere, enim urna blandit erat, et euismod enim nisi vel eros. Ut dictum
          egestas mi, faucibus iaculis lorem. Donec risus diam, maximus at varius
          rutrum, blandit quis augue. Sed consectetur massa ut auctor ultricies.
          Etiam fringilla venenatis nulla, gravida finibus nulla faucibus fringilla.
          Morbi luctus porta orci eu iaculis.
        </p>
      </ng-template>
      <ng-template #bmbTemplateSecondAside>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
          mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
          Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
          Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim.
          Nulla eleifend, leo at finibus volutpat, nulla metus eleifend lacus,
          ullamcorper dictum augue diam id erat. Donec ac fringilla elit. Aliquam
          sit amet luctus elit. Suspendisse ante tortor, euismod nec metus id,
          commodo sollicitudin massa. Aliquam magna nibh, semper eu vestibulum
          aliquam, aliquet gravida massa. Nullam vehicula, augue non aliquam
          posuere, enim urna blandit erat, et euismod enim nisi vel eros. Ut dictum
          egestas mi, faucibus iaculis lorem. Donec risus diam, maximus at varius
          rutrum, blandit quis augue. Sed consectetur massa ut auctor ultricies.
          Etiam fringilla venenatis nulla, gravida finibus nulla faucibus fringilla.
          Morbi luctus porta orci eu iaculis.
        </p>
      </ng-template>
      <ng-template #bmbTemplateMain>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo ante,
          mattis nec libero a, malesuada pellentesque sem. Aliquam erat volutpat.
          Nulla ut consequat turpis, id efficitur velit. Fusce vitae dolor leo.
          Praesent diam justo, consectetur in blandit ut, tincidunt vitae enim.
          Nulla eleifend, leo at finibus volutpat, nulla metus eleifend lacus,
          ullamcorper dictum augue diam id erat. Donec ac fringilla elit. Aliquam
          sit amet luctus elit. Suspendisse ante tortor, euismod nec metus id,
          commodo sollicitudin massa. Aliquam magna nibh, semper eu vestibulum
          aliquam, aliquet gravida massa. Nullam vehicula, augue non aliquam
          posuere, enim urna blandit erat, et euismod enim nisi vel eros. Ut dictum
          egestas mi, faucibus iaculis lorem. Donec risus diam, maximus at varius
          rutrum, blandit quis augue. Sed consectetur massa ut auctor ultricies.
          Etiam fringilla venenatis nulla, gravida finibus nulla faucibus fringilla.
          Morbi luctus porta orci eu iaculis.
        </p>
      </ng-template>
    </bmb-web-templates>
    `
  }),
};
