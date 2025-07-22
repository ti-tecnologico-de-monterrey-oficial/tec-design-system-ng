import type { Meta, StoryObj } from '@storybook/angular';
import { BmbAlertCenterComponent } from './bmb-alert-center.component';

export default {
  title: 'Organisms/Alert center',
  component: BmbAlertCenterComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbAlertCenterComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbAlertCenterComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

## Scroll

If you want the component to handle the scroll, you should wrap it in a container with a defined height.

\`\`\`html
<div style="height: 100dvh;">
  <bmb-alert-center ... />
</div>
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    tabsName: {
      name: 'Tabs Name',
      control: {
        type: 'object',
      },
      description: 'Name of the tabs.',
      table: {
        category: 'Properties',
        type: { summary: 'string[]' },
        defaultValue: {
          summary: '["Todos", "No Leídos", "Favoritos", "Archivados"]',
        },
      },
    },
    dateFormat: {
      name: 'Date Format',
      control: {
        type: 'text',
      },
      description: 'Format of the dates.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'dd/MM/yyyy' },
      },
    },
    alerts: {
      name: 'Alerts',
      control: {
        type: 'object',
      },
      description: 'List of alerts **(required)**.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbDataAlert[]' },
      },
    },
    onChangeAlertStatus: {
      name: 'Change Alert Status',
      action: 'onChangeAlertStatus',
      description: 'Event emitted when the status of an alert changes.',
      table: {
        category: 'Events',
        type: { summary: 'IBmbDataAlertsOutput' },
      },
    },
    alertEvent: {
      name: 'Alert Event',
      action: 'alertEvent',
      description: 'Event emitted when an alert is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'IBmbDataAlert' },
      },
    },
    advertisements: {
      name: 'Advertisements',
      control: {
        type: 'IBmbDataAlert[]',
      },
      description:
        'Set information that the component will show on the ads tab',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbDataAlert[]' },
        defaultValue: { summary: `[]` },
      },
    },
    showAlertDetail: {
      name: 'Show Alert Detail',
      description: 'Event emitted to show alert details.',
      table: {
        category: 'Events',
        type: { summary: 'IBmbDataAlertsParsed' },
      },
    },
    hideTabs: {
      name: 'Hide Tabs',
      control: {
        type: 'boolean',
      },
      description: 'Hide tabs.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    emptyState: {
      name: 'Empty State',
      control: {
        type: 'boolean',
      },
      description: 'Show empty State.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    emptyStateData: {
      name: 'Empty State Data',
      control: { type: 'object' },
      table: {
        category: 'Properties',
        type: { summary: 'IBmbAlertEmptyState' },
      },
      description: 'Configuration object for the empty state display.',
    },
  },
  args: {
    tabsName: [
      { title: 'Notificaciones', isMobile: true, isDesktop: true },
      { title: 'No leídos', isMobile: false, isDesktop: true },
      { title: 'Favoritos', isMobile: false, isDesktop: true },
      { title: 'Archivados', isMobile: false, isDesktop: true },
      { title: 'Anuncios', isMobile: true, isDesktop: true },
    ],
    dateFormat: 'dd/MM/yyyy',
    alerts: [
      {
        id: 10,
        title: 'Alerta 10',
        description: [
          { text: 'Descripción de la alerta 10', type: 'title' },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
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
          { text: 'Descripción de la alerta 10', type: 'title' },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
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
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
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
        id: 40,
        title: 'Alerta 40',
        description: [
          { text: 'Descripción de la alerta 10', type: 'title' },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
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
    advertisements: [
      {
        id: 10,
        title: 'Alerta 10',
        description: [
          { text: 'Descripción de la alerta 10', type: 'title' },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
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
          { text: 'Descripción de la alerta 10', type: 'title' },
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
          {
            text: 'Descripción de la alerta 10 link',
            type: 'image',
            href: 'https://picsum.photos/id/28/200',
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
          { text: 'Descripción de la alerta 10 paragraph', type: 'paragraph' },
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
            href: 'https://picsum.photos/id/24/200',
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
    onChangeAlertStatus: (event: any) => {
      console.log('onChangeAlertStatus', event);
    },
    alertEvent: (event: any) => {
      console.log('alertEvent', event);
    },
    showAlertDetail: (event: any) => {
      console.log('showAlertDetail', event);
    },
    hideTabs: false,
    emptyState: false,
    emptyStateData: '',
  },
} as Meta<typeof BmbAlertCenterComponent>;

type Story = StoryObj<BmbAlertCenterComponent>;

export const Default: Story = {};

export const HideTabs = {
  args: {
    hideTabs: true,
  },
};

export const EmptyStateLarge = {
  args: {
    alerts: [],
    advertisements: [],
    tabsName: [],
    dateFormat: '',
    emptyState: true,
    emptyStateData: {
      primaryText: 'No hay notificaciones',
      secondaryText: 'Vuelve a intentarlo más tarde.',
      tertiaryText: 'Si el problema persiste, contacta soporte.',
      buttonText: 'Ir al inicio',
      size: 'large',
      showButton: true,
      onClick: () => {
        alert('Botón del Empty State clickeado');
      },
    },
  },
};

export const EmptyStateMedium = {
  args: {
    alerts: [],
    advertisements: [],
    tabsName: [],
    dateFormat: '',
    emptyState: true,
    emptyStateData: {
      primaryText: 'No hay notificaciones',
      secondaryText: 'Vuelve a intentarlo más tarde.',
      tertiaryText: 'Si el problema persiste, contacta soporte.',
      buttonText: 'Ir al inicio',
      size: 'medium',
      showButton: true,
      onClick: () => {
        alert('Botón del Empty State clickeado');
      },
    },
  },
};

export const EmptyStateSmall = {
  args: {
    alerts: [],
    advertisements: [],
    tabsName: [],
    dateFormat: '',
    emptyState: true,
    emptyStateData: {
      primaryText: 'No hay notificaciones',
      secondaryText: 'Vuelve a intentarlo más tarde.',
      tertiaryText: 'Si el problema persiste, contacta soporte.',
      buttonText: 'Ir al inicio',
      size: 'small',
      showButton: true,
      onClick: () => {
        alert('Botón del Empty State clickeado');
      },
    },
  },
};
