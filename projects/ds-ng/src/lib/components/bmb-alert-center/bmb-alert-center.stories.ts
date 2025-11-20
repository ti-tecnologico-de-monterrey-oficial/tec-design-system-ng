import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { BmbAlertCenterComponent } from './bmb-alert-center.component';
import { BmbAlertCenterService } from './bmb-alert-center.service';
import {
  getAlertCenterServiceDocumentation,
  getBasicExampleBlock,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  getDefaultValueControl,
  getOnEventParam,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

class mockService {
  getAlerts() {
    return [
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
    ];
  }
  getLoadingState() {
    return false;
  }
  getAdvertisements() {
    return [
      {
        id: 10,
        title: 'Alerta 10',
        description: [
          {
            text: `<p>¿Real o engaño? ¡No caigas en el hishing!</p><p> * Por Fernando fillalobos</p><p> Martes 28 de octubre</p><p>• 9:00 a.m. (CTM)
</p><p>Redes sociales
Inteligentes: Protege tu vida personal. </p><p> * Por Javier Jardón</p><p> Martes 28 de octubre</p><p> o 10:00 a.m. (cTM)</p><p></p><p>Por
https://live.tec.mx/cbweek</p><p>¡Te esperamos!`,
            type: 'html',
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
    ];
  }
}

class mockLoadingService {
  getAlerts() {
    return [];
  }
  getLoadingState() {
    return true;
  }
  getAdvertisements() {
    return [];
  }
}

export default {
  title: 'Organisms/Alert center',
  component: BmbAlertCenterComponent,
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `<div style="height: 500px;">
        ${story}
      </div>`;
    }),
    moduleMetadata({
      providers: [{ provide: BmbAlertCenterService, useClass: mockService }],
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'advertisementsList',
          'alertList',
          'eventsInCategories',
          'isLoading',
          'isLoading',
          'now',
          'orderedEvents',
          'selectedAlert',
          'tabs',
          'visibleAlert',
          'handleAlertEvent',
          'handleChangeAlertStatus',
          'handleCloseDetail',
          'handleNavigationBarEvents',
          'handleShowAlert',
          'orderCategories',
          'orderEvents',
          'container',
          'detailContent',
          'navigationBarEvents',
        ],
      },
      description: {
        component: `
${getGeneralDescription('`bmb-alert-center` is an organism designed to centralize and display all important alerts and notifications that require users attention.', { generalDocLink: 'https://bamboo.tec.mx/latest/organismos/alert-center/descripcion-general-ws9A3oYS' })}
${getSpecialSpecifications(`
  > ###Configuration
  > Add the \`BmbAlertCenterService\` to your App providers:
  >
  > \`\`\`javascript
  providers: [
    provideRouter(routes),
    importProvidersFrom([BmbAlertCenterService, ...]),
  ],
  > \`\`\`
  >
  > ---
  >
  > ###Alert center service methods
  >
  > ####Alerts
  >
  > #####Set notifications
  >
  > \`\`\`typescript
  setAlerts(alerts: IBmbDataAlert[]);
  > \`\`\`
  >
  > This method sets the alerts to be displayed in the alert center replacing whether existing alerts.
  >
  > #####Update notifications
  >
  > \`\`\`typescript
  updateAlerts(alertList: IBmbDataAlert[]);
  > \`\`\`
  >
  > This method updates the existing alerts with the provided list. If an alert with the same ID exists, it will be updated; otherwise, it will remain unchanged.
  >
  > #####Add notifications
  >
  > \`\`\`typescript
  addAlerts(alerts: IBmbDataAlert[]);
  > \`\`\`
  >
  > This method adds new alerts to the existing list of alerts without replacing them.
  >
  > #####Get notifications
  >
  > \`\`\`typescript
  getAlerts(): IBmbDataAlert[];
  > \`\`\`
  >
  > This method retrieves the current list of alerts.
  >
  > ---
  >
  > ####Advertisements
  >
  > #####Set advertisements
  >
  > \`\`\`typescript
  setAdvertisements(ads: IBmbDataAdvertisement[]);
  > \`\`\`
  >
  > This method sets the advertisements to be displayed in the alert center replacing whether existing advertisements.
  >
  > #####Update advertisements
  >
  > \`\`\`typescript
  updateAdvertisements(adList: IBmbDataAdvertisement[]);
  > \`\`\`
  >
  > This method updates the existing advertisements with the provided list. If an advertisement with the same ID exists, it will be updated; otherwise, it will remain unchanged.
  >
  > #####Add advertisements
  >
  > \`\`\`typescript
  addAdvertisements(ads: IBmbDataAdvertisement[]);
  > \`\`\`
  >
  > This method adds new advertisements to the existing list of advertisements without replacing them.
  >
  > #####Get advertisements
  >
  > \`\`\`typescript
  getAdvertisements(): IBmbDataAdvertisement[];
  > \`\`\`
  >
  > This method retrieves the current list of advertisements.
  >
  > ---
  >
  > ####Loading state
  >
  > #####Set loading state
  >
  > \`\`\`typescript
  setLoadingState(loading: boolean = false);
  > \`\`\`
  >
  > This method sets the loading state.
  >
  > #####Get loading state
  >
  > \`\`\`typescript
  getLoadingState(): boolean;
  > \`\`\`
  >
  > This method retrieves the current loading state.
  > ### Scroll
  If you want the component to handle the scroll, you should wrap it in a container with a defined height.
  >
  > \`\`\`html
  <div style="height: 100dvh;">
   <bmb-alert-center ... />
  </div>
  > \`\`\`
`)}

${getAlertCenterServiceDocumentation()}
${getBasicExampleBlock('BmbAlertCenterComponent')}

        `,
      },
    },
  },
  argTypes: {
    selectedTab: {
      control: {
        type: 'number',
      },
      description:
        'Sets the selected tab number. This is a ***model***, in such a way the selected tab number will automatically update every time whether tab is clicked.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: {
          summary: 0,
        },
      },
    },
    tabsName: {
      control: {
        type: 'object',
      },
      description:
        'Sets the tabs name, also you can hide tabs for mobile or desktop.',
      table: {
        category: 'Properties',
        type: { summary: 'string[] | IBmbAlertCenterTabConfig[]' },
        defaultValue: getDefaultValueControl(
          '["Todos", "No Leídos", "Favoritos", "Archivados"]',
        ),
      },
    },
    dateFormat: {
      control: {
        type: 'text',
      },
      description: 'Sets the format of the dates.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl('dd/MM/yyyy'),
      },
    },
    alerts: {
      ...DBmbGenericParamDesc.deprecated,
      description: DBmbGenericParamDesc.deprecated.description.concat(
        `<br/><br/>${RELEVANT_TITLE.note}Use bmbAlertCenterService.getAlerts() instead.`,
      ),
    },
    onChangeAlertStatus: getOnEventParam(
      getOnEvent(
        'the status of an alert',
        'onChangeAlertStatus',
        'IBmbDataAlertsOutput',
      ),
    ),
    alertEvent: getOnEventParam(
      getOnEvent('an alert is clicked', 'alertEvent', 'IBmbDataAlert'),
    ),
    closeAlertDetail: getOnEventParam(
      getOnEvent(
        'the alert detail is closed (mobile only)',
        'closeAlertDetail',
        'IBmbDataAlert',
      ),
    ),
    advertisements: {
      ...DBmbGenericParamDesc.deprecated,
      description: DBmbGenericParamDesc.deprecated.description.concat(
        `<br/><br/>${RELEVANT_TITLE.note}Use bmbAlertCenterService.addAdvertisements() instead.`,
      ),
    },
    showAlertDetail: getOnEventParam(
      getOnEvent(
        'show alert details is selected',
        'showAlertDetail',
        'IBmbDataAlert',
      ),
    ),
    hideTabs: getPropertyParamDesc('hide tabs', 'boolean'),
    emptyStateData: {
      control: { type: 'object' },
      table: {
        category: 'Properties',
        type: { summary: 'IBmbAlertEmptyState' },
        defaultValue: getDefaultValueControl(`{
    primaryText: 'No tienes notificaciones para mostrar',
    secondaryText: '',
    tertiaryText: '',
    buttonText: '',
    size: 'large',
    showButton: false,
  }`),
      },
      description: 'Sets the configuration object for the empty state display.',
    },
    showMobileVersion: {
      control: { type: 'boolean' },
      description: 'Shows the mobile version of the alert center.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl('false'),
      },
    },
    enableMultipleSelection: {
      control: { type: 'boolean' },
      description: 'Enables multiple selection of alerts.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl('true'),
      },
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
    onChangeAlertStatus: (event: any) => {
      console.log('onChangeAlertStatus', event);
    },
    alertEvent: (event: any) => {
      console.log('alertEvent', event);
    },
    showAlertDetail: (event: any) => {
      console.log('showAlertDetail', event);
    },
    closeAlertDetail: (event: any) => {
      console.log('closeAlertDetail', event);
    },
    hideTabs: false,
    emptyStateData: '',
    enableMultipleSelection: true,
    showMobileVersion: false,
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
  decorators: [
    moduleMetadata({
      providers: [{ provide: BmbAlertCenterService }],
    }),
  ],
  args: {
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
  decorators: [
    moduleMetadata({
      providers: [{ provide: BmbAlertCenterService }],
    }),
  ],
  args: {
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
  decorators: [
    moduleMetadata({
      providers: [{ provide: BmbAlertCenterService }],
    }),
  ],
  args: {
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

export const LoadingState = {
  decorators: [
    moduleMetadata({
      providers: [
        { provide: BmbAlertCenterService, useClass: mockLoadingService },
      ],
    }),
  ],
  args: {
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
