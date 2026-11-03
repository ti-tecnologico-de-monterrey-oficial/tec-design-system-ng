// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=284-80432
// source=ui-angular/src/lib/components/bmb-top-bar/bmb-top-bar.component.ts
// component=BmbTopBarComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  userInformation: IUserInformation | null = null;

  alertNotification: IBmbDataAlert[] = [
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
}
</script>

<bmb-top-bar
  [userInformation]="userInformation"
  image=""
  mobileImage=""
  appName=""
  appPowered="Powered x Bamboo Design"
  [mitec]="false"
  [alertNotification]="alertNotification"
  [allowSidebarForMobile]="true"
  [showHelpButton]="false"
  getLogoLink=""
  getLogoTarget="_blank"
  [showSearchButton]="false"
/>`,
  imports: [
    "import type { IBmbDataAlert, IUserInformation } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbTopBarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-top-bar',
}
