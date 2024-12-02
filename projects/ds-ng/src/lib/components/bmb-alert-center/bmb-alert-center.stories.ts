import type { Meta, StoryObj } from '@storybook/angular';
import { BmbAlertCenterComponent } from './bmb-alert-center.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';

const appearanceOptions: IBbmBgAppearance[] = [
  'normal',
  'strong',
  'success',
  'info',
  'warning',
  'error',
  'brand',
  'background',
  'disabled',
  'mitec_blue',
  'mitec_red',
  'mitec_green',
  'mitec_orange',
  'mitec_light_green',
  'mitec_purple',
];

export default {
  title: 'Macro Componentes/Alert center',
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
  },
  args: {
    tabsName: ['Todos', 'No Leídos', 'Favoritos', 'Archivados'],
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
            href: 'https://picsum.photos/200',
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
            href: 'https://picsum.photos/200',
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
  },
} as Meta<typeof BmbAlertCenterComponent>;

type Story = StoryObj<BmbAlertCenterComponent>;

export const Default: Story = {};
