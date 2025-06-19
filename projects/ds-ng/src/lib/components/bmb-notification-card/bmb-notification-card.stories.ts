import type { Meta, StoryObj } from '@storybook/angular';
import { BmbNotificationCardComponent } from './bmb-notification-card.component';
import { storiesLayoutHorizontal } from '../../utils/bambooLayout';

export default {
  title: 'Components/Containers/Cards/Notification',
  component: BmbNotificationCardComponent,
  decorators: [storiesLayoutHorizontal],
  parameters: {
    docs: {
      description: {
        component: `Note: When you click on fullscreen icon, in Storybook doesn’t look the best due to the many elements, but in your project, it should display correctly.

Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbNotificationCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbNotificationCardComponent, IBmbNotificationCardData ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})

export class AppComponent {
    data: IBmbNotificationCardData = {
        new: [
            {
                description: 'Descripcion Corta',
                time: '4d 12h'
            },
        ],
        all: [
            {
                description: 'Descripcion Corta',
                time: '4d 12h'
            },
            {
                description: 'Descripcion Corta',
                time: '4d 12h'
            },
        ],
        seen: [
            {
                description: 'Descripcion Corta',
                time: '4d 12h'
            },
            {
                description: 'Descripcion Corta',
                time: '4d 12h'
            },
            {
                description: 'Descripcion Corta',
                time: '4d 12h'
            },
        ]
    },
}
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    data: {
      name: 'Data Source',
      control: {
        type: 'object',
      },
      description: 'Set information that the component will show',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbDataAlert[]' },
        defaultValue: { summary: `{}` },
      },
    },
    advertisements: {
      name: 'Advertisements',
      control: {
        type: 'object',
      },
      description:
        'Set information that the component will show on the advertisement tab',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbDataAlert[]' },
        defaultValue: { summary: `[]` },
      },
    },
  },
  args: {
    data: [
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
            href: 'https://picsum.photos/id/24/200',
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
            href: 'https://picsum.photos/id/25/200',
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
            href: 'https://picsum.photos/id/26/200',
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
    ],
  },
} as Meta<typeof BmbNotificationCardComponent>;

type Story = StoryObj<BmbNotificationCardComponent>;

export const Default: Story = {};
