// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=106-31504
// source=ui-angular/src/lib/components/bmb-notification-card/bmb-notification-card.component.ts
// component=BmbNotificationCardComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  data: IBmbDataAlert[] = [
    {
      id: 10,
      title: 'Alerta 10',
      description: [
        { text: 'Descripción de la alerta 10', type: 'title' },
        {
          text: '<p>¿Real o engaño? ¡No caigas en el hishing!</p><p> * Por Fernando fillalobos</p><p> Martes 28 de octubre</p><p>• 9:00 a.m. (CTM)\\\\n</p><p>Redes sociales\\\\nInteligentes: Protege tu vida personal. </p><p> * Por Javier Jardón</p><p> Martes 28 de octubre</p><p> o 10:00 a.m. (cTM)</p><p></p><p>Por\\\\nhttps://live.tec.mx/cbweek</p><p>¡Te esperamos!',
          type: 'html',
        },
        {
          text: 'Descripción de la alerta 10',
          type: 'button',
          variant: 'primary',
        },
      ],
      date: '09/04/2026 12:10',
      isRead: false,
      time: '12:00',
      tags: [
        { text: 'tag1', color: 'info' },
        { text: 'tag2', color: 'brand' },
      ],
      type: 'tipo 1',
      isFavorite: true,
      isArchived: false,
    },
    {
      id: 1,
      title: 'Alerta 1',
      description: [
        { text: 'Descripción de la alerta 10', type: 'title' },
        { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
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
      date: '31/03/2026 12:00',
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
        { text: 'Descripción de la alerta 10', type: 'title' },
        { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
        {
          text: 'Descripción de la alerta 10 link',
          type: 'image',
          href: 'https://picsum.photos/id/24/200',
        },
      ],
      date: '05/04/2026 15:00',
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
        { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
      ],
      date: '18/11/2024 15:00',
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
        { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
      ],
      date: '02/11/2024 12:00',
      isRead: true,
      time: '12:00',
      type: 'tipo 3',
      isFavorite: false,
      isArchived: false,
    },
    {
      id: 40,
      title: 'Alerta 40',
      description: [
        { text: 'Descripción de la alerta 10', type: 'title' },
        { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
        {
          text: 'Descripción de la alerta 10 link',
          type: 'image',
          href: 'https://picsum.photos/id/25/200',
        },
      ],
      date: '02/01/2024 12:00',
      isRead: true,
      time: '12:00',
      type: 'tipo 1',
      isFavorite: false,
      isArchived: false,
    },
  ];

  advertisements: IBmbDataAlert[] = [
    {
      id: 10,
      title: 'Alerta 10',
      description: [
        { text: 'Descripción de la alerta 10', type: 'title' },
        {
          text: '<p>¿Real o engaño? ¡No caigas en el hishing!</p><p> * Por Fernando fillalobos</p><p> Martes 28 de octubre</p><p>• 9:00 a.m. (CTM)\\\\n</p><p>Redes sociales\\\\nInteligentes: Protege tu vida personal. </p><p> * Por Javier Jardón</p><p> Martes 28 de octubre</p><p> o 10:00 a.m. (cTM)</p><p></p><p>Por\\\\nhttps://live.tec.mx/cbweek</p><p>¡Te esperamos!',
          type: 'html',
        },
        {
          text: 'Descripción de la alerta 10',
          type: 'button',
          variant: 'primary',
        },
      ],
      date: '26/01/2025 12:00',
      isRead: false,
      time: '12:00',
      tags: [
        { text: 'tag1', color: 'info' },
        { text: 'tag2', color: 'brand' },
      ],
      type: 'tipo 1',
      isFavorite: true,
      isArchived: false,
    },
    {
      id: 1,
      title: 'Alerta 1',
      description: [
        { text: 'Descripción de la alerta 10', type: 'title' },
        { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
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
      date: '01/11/2024 12:00',
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
        { text: 'Descripción de la alerta 10', type: 'title' },
        { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
        {
          text: 'Descripción de la alerta 10 link',
          type: 'image',
          href: 'https://picsum.photos/id/26/200',
        },
      ],
      date: '19/11/2024 15:00',
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
        { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
      ],
      date: '18/11/2024 12:00',
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
        { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
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
        { text: 'Descripción de la alerta 10', type: 'title' },
        { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
        {
          text: 'Descripción de la alerta 10 link',
          type: 'image',
          href: 'https://picsum.photos/id/28/200',
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

  emptyStateData: IBmbAlertEmptyState = {
    primaryText: 'No hay notificaciones',
    secondaryText: 'Vuelve a intentarlo más tarde.',
    tertiaryText: 'Si el problema persiste, contacta soporte.',
    buttonText: 'Ir al inicio',
    size: 'large',
    showButton: true,
  };
}
</script>

<bmb-notification-card
  leftIcon="${getIcon('')}"
  [data]="data"
  [advertisements]="advertisements"
  [hideExpandBtn]="false"
  [enableRowClick]="true"
  maxHeight="auto"
  [showAdvertisements]="true"
  dateFormat="dd/MM/yyyy HH:mm"
  [emptyStateData]="emptyStateData"
  [enableSwipe]="enableSwipe"
  componentTitle="My Notifications"
/>`,
  imports: [
    "import type { IBmbAlertEmptyState, IBmbDataAlert } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbNotificationCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-notification-card',
}
