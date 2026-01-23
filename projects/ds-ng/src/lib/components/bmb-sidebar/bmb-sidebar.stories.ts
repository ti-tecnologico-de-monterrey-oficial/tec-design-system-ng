import {
  Meta,
  StoryObj,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { BmbSidebarComponent } from './bmb-sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import { getDefaultValueControl } from '../../utils/doc/parameterDescriptions';

const LEVEL_DESCRIPTION = `${RELEVANT_TITLE.important}
There is a limit of two levels of nesting and the main list must have a maximum of two lists, the first has a limit of 5 elements and the second a limit of 3.`;
export default {
  title: 'Components/Menus/Sidebar',
  component: BmbSidebarComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RouterTestingModule],
    }),
    componentWrapperDecorator((story: string) => {
      return `<div style="height: 50vh;">
        ${story}
      </div>`;
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'ngOnInit',
          'checkIfFocusInsideSidebar',
          'checkToCloseSidebar',
          'closeSideBar',
          'getLink',
          'getMobileIcon',
          'onFocusIn',
          'onFocusOut',
          'toggleChildren',
          'toggleSidebar',
          'currentUrl',
          'hasSubmenu',
          'isActive',
          'isOpen',
          'selectedElement',
          'maxChildrenLevel',
          'clearSelectElement',
          'closeSidebar',
          'sideNav',
          'error',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'sidebar' })} to implement a vertical menu with links to navigate through the application.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/sidebar/descripcion-general-5sco6X1N' })}
${getSpecialSpecifications(` ###${LEVEL_DESCRIPTION}`)}
${getBasicExampleBlock(
  'BmbSidebarComponent',
  `import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'emprendedor',
    loadComponent: () => import('./emprendedor.component'),
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./pages/home/home.component'),
      },
      {
        path: 'vivencia',
        loadComponent: () => import('./pages/story/story.component'),
      },
    ],
  },
];

`,
  ` elements = [
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
  ];`,
)}
\`\`\`html
<bmb-sidebar [elements]="elements" />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    elements: {
      control: {
        type: 'object',
      },
      description: `
Sets the list of the elements, each containing a list of child elements.<br/><br/>
${LEVEL_DESCRIPTION}
      `,
      table: {
        type: {
          summary: 'SidebarElement[][]',
          detail: `SidebarElement {
          id: number;
          icon: string;
          title: string;
          link: string;
          target?: IBmbTargetLink;
          children?: SidebarElement[];
          isOpen?: boolean;
        }`,
        },
        category: 'Properties',
        defaultValue: {
          summary: '[]',
          detail: `elements:SidebarElement[][] = [
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
      ],
    ]`,
        },
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'Sets the title of the navigation sidebar for mobile.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl(),
      },
    },
    position: {
      control: {
        type: 'select',
      },
      options: ['left', 'right'],
      description: `
Sets the position of the sidebar.
${RELEVANT_TITLE.warning}
This property affected to web resolution only.
      `,
      table: {
        category: 'Properties',
        type: {
          summary: 'IPositionButtonMenu',
          detail: `IPositionButtonMenu = 'left' | 'right'`,
        },
        defaultValue: getDefaultValueControl('left'),
      },
    },
  },
  args: {
    elements: [
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
              target: '',
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
      ],
    ],
    title: 'Navegacion para mobiles',
    position: 'left',
  },
} as Meta<typeof BmbSidebarComponent>;

type Story = StoryObj<BmbSidebarComponent>;

export const Default: Story = {};
