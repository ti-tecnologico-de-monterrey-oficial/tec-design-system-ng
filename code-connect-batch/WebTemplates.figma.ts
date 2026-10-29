// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=523-207773
// source=ui-angular/src/lib/components/bmb-web-templates/bmb-web-templates.component.ts
// component=BmbWebTemplatesComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  topBarUserInformation: IUserInformation | null = null;

  topBarAlertNotification: IBmbDataAlert[] = [
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
  ];

  sideBarElements: SidebarElement[][] = [
    [
      {
        id: 1,
        icon: ${getIcon('assignment_add', 'typescript')},
        title: 'Elegir documentos',
        link: '/home',
      },
      {
        id: 2,
        icon: ${getIcon('task', 'typescript')},
        title: 'Agregar firmantes',
        link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
      },
      {
        id: 3,
        icon: ${getIcon('note_alt', 'typescript')},
        title: 'Crear envelope',
        link: '#contact',
        target: '_self',
      },
      {
        id: 4,
        icon: ${getIcon('checklist_rtl', 'typescript')},
        title: 'Estado de archivos anonimos',
        link: 'inicio',
        children: [
          {
            id: 4.1,
            icon: ${getIcon('file_copy', 'typescript')},
            title: 'Sub-item 1',
            link: '/emprendedor',
          },
          {
            id: 4.2,
            icon: ${getIcon('file_copy', 'typescript')},
            title: 'Sub-item 2',
            link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
          },
        ],
      },
      {
        id: 5,
        icon: ${getIcon('account_box', 'typescript')},
        title: 'Admin.usuariosusuariosusuarios',
        link: 'vivencia',
        children: [
          { id: 5.1, icon: ${getIcon('file_copy', 'typescript')}, title: 'Sub-item 3', link: '/home' },
          {
            id: 5.2,
            icon: ${getIcon('file_copy', 'typescript')},
            title: 'Sub-item 4',
            link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
          },
        ],
      },
    ],
    [
      {
        id: 7,
        icon: ${getIcon('account_box', 'typescript')},
        title: 'Admin. usuarios',
        link: 'vivencia1',
      },
      {
        id: 8,
        icon: ${getIcon('account_box', 'typescript')},
        title: 'Admin. usuarios',
        link: 'vivencia2',
      },
      {
        id: 9,
        icon: ${getIcon('account_box', 'typescript')},
        title: 'Admin. usuarios',
        link: 'vivencia3',
      },
      { id: 10, icon: ${getIcon('account_box', 'typescript')}, title: 'Hi', link: 'vivencia4' },
      { id: 11, icon: ${getIcon('account_box', 'typescript')}, title: 'Hi', link: 'vivencia5' },
    ],
  ];
}
</script>

<bmb-web-templates
  [isFullScreen]="false"
  titleScreen=""
  subTitleScreen=""
  template="full-width-card"
  titleMainSlot=""
  titleAsideSlot=""
  [topBarUserInformation]="topBarUserInformation"
  topBarImage=""
  topBarMobileImage=""
  topBarAppName=""
  topBarAppSubTitle=""
  topBarLang="es"
  [topBarMitec]="false"
  [topBarAlertNotification]="topBarAlertNotification"
  [sideBarElements]="sideBarElements"
  sideBarTitle="Navigation"
/>`,
  imports: [
    "import type { IBmbDataAlert, IUserInformation, SidebarElement } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbWebTemplatesComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-web-templates',
}
