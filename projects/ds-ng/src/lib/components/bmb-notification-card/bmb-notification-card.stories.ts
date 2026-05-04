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
import {
  DBmbHomeCardParamDesc,
  DBmbIconParamDesc,
  getOnClickParam,
} from '../../utils/doc/parameterDescriptions';

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
          'badgeTabs',
          'parsedData',
          'selectedTab',
          'visibleAlert',
          'getEmptyStateData',
          'handleAlertSelected',
          'unreadAlerts',
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
    leftIcon: {
      ...DBmbHomeCardParamDesc.icon,
      description: DBmbIconParamDesc.icon.description.replace(
        'icon',
        'left header icon. If not provided, the interactive icon will not be rendered',
      ),
    },
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
    enableRowClick: {
      control: { type: 'boolean' },
      description:
        'Enables click interaction on each alert row. Show or hide the modal with the alert details when clicking on an alert.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    maxHeight: {
      control: { type: 'text' },
      description:
        'Sets the maximum height of the notification card. Accepts any valid CSS height value (e.g., "300px", "50dvh", "auto").',
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
    showAdvertisements: {
      control: { type: 'boolean' },
      description: 'Determines whether to show the advertisements tab',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    dateFormat: {
      control: { type: 'text' },
      description:
        'Sets the date format for displaying alert dates. Accepts any valid Luxon date format string or "iso" for ISO format.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'dd/MM/yyyy HH:mm' },
      },
    },
    emptyStateData: {
      control: { type: 'object' },
      description:
        'Sets the data for the empty state when there are no alerts to display',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbAlertEmptyState' },
        defaultValue: { summary: '{}' },
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
    enableCustomHandlerClick: {
      control: { type: 'boolean' },
      description:
        'When true, clicking on an alert will trigger the alertEvent output instead of showAlertDetail. This allows you to implement a custom behavior when an alert is clicked.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    enableRowClick: true,
    enableCustomHandlerClick: false,
    data: [
      {
        id: 10,
        title: 'Alerta 10',
        description: [
          { text: 'Descripción de la alerta 10', type: 'title' },
          {
            text: `<p>¿Real o engaño? ¡No caigas en el hishing!</p><p> * Por Fernando fillalobos</p><p> Martes 28 de octubre</p><p>• 9:00 a.m. (CTM)
</p><p>Redes sociales
Inteligentes: Protege tu vida personal. </p><p> * Por Javier Jardón</p><p> Martes 28 de octubre</p><p> o 10:00 a.m. (cTM)</p><p></p><p>Por
https://live.tec.mx/cbweek</p><p>¡Te esperamos!`,
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
    ],
    advertisements: [
      {
        id: 10,
        title: 'Alerta 10',
        description: [
          { text: 'Descripción de la alerta 10', type: 'title' },
          {
            text: `<p>¿Real o engaño? ¡No caigas en el hishing!</p><p> * Por Fernando fillalobos</p><p> Martes 28 de octubre</p><p>• 9:00 a.m. (CTM)
</p><p>Redes sociales
Inteligentes: Protege tu vida personal. </p><p> * Por Javier Jardón</p><p> Martes 28 de octubre</p><p> o 10:00 a.m. (cTM)</p><p></p><p>Por
https://live.tec.mx/cbweek</p><p>¡Te esperamos!`,
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
    ],
    showAdvertisements: true,
    dateFormat: 'dd/MM/yyyy HH:mm',
    hideExpandBtn: false,
    emptyStateData: {},
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

export const WithNoAdvertisements: Story = {
  args: {
    showAdvertisements: false,
  },
};
