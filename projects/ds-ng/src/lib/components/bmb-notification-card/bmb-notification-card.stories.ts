import type { Meta, StoryObj } from '@storybook/angular';
import { BmbNotificationCardComponent } from './bmb-notification-card.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import { getOnClickParam } from '../../utils/doc/parameterDescriptions';

const typeDetail: string = `
event: IBmbDataAlert

IBmbDataAlert {
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
}

IBmbAlertTag {
  text: string;
  color: IBbmBgAppearance;
}

IBmbDataAlertDetails {
  text: string;
  style?: 'normal' | 'bold' | 'italic' | 'underline';
  href?: string;
  type: 'paragraph' | 'image' | 'video' | 'link' | 'button' | 'title';
  variant?: IButtonAppearance;
  event?: (id: string | number) => void;
}

IButtonAppearance =
  | 'primary'
  | 'secondary-filled'
  | 'secondary-outlined'
  | 'destructive'
  | 'transparent';
`;

export default {
  title: 'Components/Containers/Notification card',
  component: BmbNotificationCardComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'handleAlertEvent',
          'newAlerts',
          'ngOnInit',
          'onDotPress',
          'setActiveTab',
          'setSize',
          'activeData',
          'activeDot',
          'activeTab',
          'expanded',
          'tabsConfig',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'notification-card' })} to display notifications and advertisements in a card format, supporting features like tabbed navigation, badge counts for unread alerts, and event handling for interactions.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/notification-card/descripcion-general-8uCIey7b' })}
${getSpecialSpecifications(` ### ${RELEVANT_TITLE.note}
When you click on fullscreen icon, in Storybook doesn’t look the best due to the many elements, but in your project, it should display correctly.
`)}
${getBasicExampleBlock(
  'BmbNotificationCardComponent',
  '',
  `  data: IBmbNotificationCardData = {
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
    };

    //Add your code`,
)}

        `,
      },
    },
  },
  argTypes: {
    data: {
      control: {
        type: 'object',
      },
      description: 'Sets information that the component will show',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbDataAlert[]', detail: typeDetail },
        defaultValue: { summary: `{}` },
      },
    },
    advertisements: {
      control: {
        type: 'object',
      },
      description:
        'Sets information that the component will show on the advertisement tab',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbDataAlert[]', detail: typeDetail },
        defaultValue: { summary: `[]` },
      },
    },
    hideExpandBtn: {
      control: { type: 'boolean' },
      description: 'Hides the expand button when true',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxHeight: {
      control: { type: 'text' },
      description:
        'Sets the maximum height of the notification card. Accepts any valid CSS height value (e.g., "300px", "50vh", "auto").',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'auto' },
      },
    },
    alertEvent: {
      control: false,
      description: 'Emits when an alert is triggered',
      table: {
        category: 'Events',
        type: { summary: 'alertEvent($event)', detail: typeDetail },
      },
    },
    showAlertDetail: {
      control: false,
      description: 'Emits when the alert detail is requested',
      table: {
        category: 'Events',
        type: { summary: 'showAlertDetail($event)', detail: typeDetail },
      },
    },
    closeAlertDetail: {
      control: false,
      description: 'Emits when the alert detail is closed',
      table: {
        category: 'Events',
        type: { summary: 'closeAlertDetail($event)', detail: typeDetail },
      },
    },
    onExpandClick: getOnClickParam(getOnEvent('', 'onExpandClick', 'void')),
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
    alertEvent: () => {
      console.log('alertEvent');
    },
    closeAlertDetail: () => {
      console.log('closeAlertDetail');
    },
    showAlertDetail: () => {
      console.log('showAlertDetail');
    },
    onExpandClick: () => {
      console.log('onExpandClick');
    },
    maxHeight: 'auto',
  },
} as Meta<typeof BmbNotificationCardComponent>;

type Story = StoryObj<BmbNotificationCardComponent>;

export const Default: Story = {};
