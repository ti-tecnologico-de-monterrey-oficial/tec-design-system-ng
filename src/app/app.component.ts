import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {
  BmbThemeComponent,
  BmbTopBarComponent,
  BmbSidebarComponent,
  SidebarElement,
  BmbNativeModalService,
  IBmbNativeModal,
  BmbProjectionContentService,
  BmbNotificationCardComponent,
  IBmbDataAlert,
  ModalDataConfig,
  BmbModalComponent,
  BmbDropdownComponent,
  BmbSearchCardComponent,
  BmbHomeCardChatComponent,
  IBmbChatMessage,
  IBmbHomeCardChatMode,
  IBotType,
  IBmbSearchCardItemResult,
} from '../../projects/ds-ng/src/public-api';
import { MatDialog } from '@angular/material/dialog';
import { TestComponentComponent } from './components/test-component/test-component.component';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import persons from './pages/form-validator-test/persons.json';
import services from './pages/form-validator-test/services.json';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  imports: [
    RouterModule,
    BmbThemeComponent,
    BmbTopBarComponent,
    BmbSidebarComponent,
    BmbDropdownComponent,
    BmbHomeCardChatComponent,
    BmbSearchCardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AppComponent {
  private router = inject(Router);
  private searchSubject = new Subject<string>();

  constructor(
    private modalService: BmbNativeModalService,
    private projectionService: BmbProjectionContentService,
    private matDialog: MatDialog,
    private contentProjected: BmbProjectionContentService,
  ) {
    this.searchSubject
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((searchTerm) => {
        const searchLower = searchTerm.toLowerCase();

        const filteredPersons = persons
          .filter((person) => person.name?.toLowerCase().includes(searchLower))
          .map((person) => ({
            ...person,
            id: person.id.toString(),
            type: person.type as 'person' | 'service',
          }));

        const filteredServices = services
          .filter((service) =>
            service.name?.toLowerCase().includes(searchLower),
          )
          .map((service) => ({
            ...service,
            id: service.id.toString(),
            type: service.type as 'person' | 'service',
          }));

        this.resultList.set([...filteredPersons, ...filteredServices]);
        this.isSearchLoading.set(false);
      });
  }

  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<unknown>;
  @ViewChild('modalLTSTemplate') modalLTSTemplate!: TemplateRef<any>;
  @ViewChild('searchTemplate') searchTemplate!: TemplateRef<any>;
  modalId = signal<string | null>(null);
  isTheModalOpen = computed(() => {
    if (!this.modalId()) return false;

    return this.modalService.checkIfModalExists(this.modalId() as string);
  });

  routes: SidebarElement[][] = [
    [
      {
        id: 1,
        icon: 'home',
        title: 'Home',
        link: '/home',
      },
      {
        id: 2,
        icon: 'calendar_today',
        title: 'Calendar',
        link: '/calendar',
      },
      {
        id: 8,
        icon: 'table_chart',
        title: 'Tables',
        link: '',
        children: [
          {
            id: 1,
            icon: 'table',
            title: 'Table Lite',
            link: '/table-lite',
          },
          {
            id: 2,
            icon: 'table',
            title: 'Table LTS',
            link: '/table-lts',
          },
          {
            id: 3,
            icon: 'table',
            title: 'Table HTML',
            link: '/table-html',
          },
        ],
      },
      {
        id: 4,
        icon: 'reorder',
        title: 'Inputs',
        link: '',
        children: [
          {
            id: 1,
            icon: 'list_alt_check',
            title: 'Forms',
            link: '/form-validator',
          },
          {
            id: 2,
            icon: 'dropdown',
            title: 'Dropdown',
            link: '/dropdown',
          },
          {
            id: 3,
            icon: 'upload_file',
            title: 'Dropzone',
            link: '/dropzone',
          },
        ],
      },
    ],
    [
      {
        id: 5,
        icon: 'responsive_layout',
        title: 'Layouts',
        link: '',
        children: [
          {
            id: 5,
            icon: 'align_flex_center',
            title: 'Flex',
            link: '/flex',
          },
          {
            id: 6,
            icon: 'calendar_view_month',
            title: 'Column sys',
            link: '/col-sys',
          },
          {
            id: 7,
            icon: 'layers',
            title: 'Modals',
            link: '/modals',
          }
        ],
      },
      {
        id: 6,
        icon: 'step',
        title: 'Indicators',
        link: '',
        children: [
          {
            id: 2,
            icon: 'page_control',
            title: 'Multi Dot Paginator',
            link: '/multi-dot-paginator',
          },
          {
            id: 2,
            icon: 'steppers',
            title: 'Step progress bar',
            link: '/step-progress-bar',
          },
          {
            id: 3,
            icon: 'sound_detection_loud_sound',
            title: 'TEC sound',
            link: '/tec-sound',
          },
        ],
      },
      {
        id: 7,
        icon: 'account_circle',
        title: 'Profile',
        link: '/profile',
        children: [
          {
            id: 1,
            icon: 'person',
            title: 'Identity',
            link: '/identity',
          },
          {
            id: 2,
            icon: 'notifications',
            title: 'Alerts',
            link: '/alerts',
          },
          {
            id: 3,
            icon: 'dashboard_2',
            title: 'Dashboard activity',
            link: '/dashboard-indicators',
          },
        ],
      },
      { id: 8, icon: 'app_registration', title: 'Colors', link: '/colors' },
    ],
  ];

  mode: IBmbHomeCardChatMode = 'compact';

  currentBot: IBotType = {
    name: 'TecBot',
    icon: 'bot_tecStandar',
  };
  messages: IBmbChatMessage[] = [
    {
      type: 'text',
      content: { text: 'Hola, ¿cómo estás? En que puedo ayudarte' },
      isUserMessage: false,
      time: new Date('2025-02-19T14:31:00'),
    },
    {
      type: 'text',
      content: {
        text: 'Hola, me gustaria un pequeño resumen de la festividad del dia de la bandera en México',
      },
      userProfile: 'https://picsum.photos/id/64/200/301',
      isUserMessage: true,
      time: new Date('2025-02-19T14:32:00'),
    },
    {
      type: 'text',
      content: {
        text: 'El Día de la Bandera en México se celebra el 24 de febrero de cada año. Esta fecha conmemora la adopción de la bandera actual en 1821, tras la independencia del país. Es un día para rendir homenaje a los símbolos patrios y a la historia de México, destacando la importancia de la unidad y el orgullo nacional. En este día se realizan ceremonias cívicas y militares en todo el país.',
      },
      userProfile: 'https://picsum.photos/id/64/200/301',
      isUserMessage: false,
      time: new Date('2025-02-19T14:33:00'),
    },
    {
      type: 'text',
      content: { text: 'Gracias.' },
      userProfile: 'https://picsum.photos/id/64/200/301',
      isUserMessage: true,
      time: new Date('2025-02-19T14:34:00'),
    },
  ];

  handleUserProfileClick(): void {
    const data: IBmbNativeModal = {
      title: 'User Profile',
      content: TestComponentComponent,
      inputContext: {
        testValue: 'This value is passed from the modal input context',
      },
    };
    this.modalId.set(this.modalService.openModal(data));
  }

  handleCloseModal(): void {
    const randomBoolean = Math.random() > 0.5;
    console.log('Modal closed', randomBoolean);
    if (randomBoolean) {
      this.modalService.closeModal(this.modalId() as string);
    } else {
      this.modalService.openModal({
        title: 'The random is false',
        content: "This why the modal wasn't closed",
        size: 'x-small',
        iconStyle: 'warning',
      });
    }
  }

  handleAlertButtonClick(event: MouseEvent): void {
    const isMobile = window.innerWidth < 1001;
    const targetRef = isMobile ? null : (event.currentTarget as HTMLElement);

    if (isMobile) {
      this.projectionService.closeContent();
      this.router.navigate(['/alerts']);
    } else {
      this.projectionService.openContent({
        content: BmbNotificationCardComponent,
        targetRef,
        mode: 'partial',
        fixSizeToRef: false,
        inputContext: {
          data: [
            {
              id: 10,
              title: 'Alerta 10',
              description: [
                { text: 'Descripción de la alerta 10', type: 'title' },
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
                { text: 'Descripción de la alerta 10', type: 'title' },
                {
                  text: 'Descripción de la alerta 10 paragraph',
                  type: 'paragraph',
                },
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
                { text: 'Descripción de la alerta 10', type: 'title' },
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
                { text: 'Descripción de la alerta 10', type: 'title' },
                {
                  text: 'Descripción de la alerta 10 paragraph',
                  type: 'paragraph',
                },
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
                { text: 'Descripción de la alerta 10', type: 'title' },
                {
                  text: 'Descripción de la alerta 10 paragraph',
                  type: 'paragraph',
                },
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
        },
        outputContext: {
          alertEvent: (event: IBmbDataAlert) => {
            console.log(
              'Alert clicked from projected notification card',
              event,
            );
            this.projectionService.closeContent();
          },
          showAlertDetail: (alert: IBmbDataAlert) => {
            console.log('Show alert detail clicked', alert);
            this.projectionService.closeContent();
          },
          closeAlertDetail: (alert: IBmbDataAlert) => {
            console.log('Close alert detail clicked', alert);
            this.projectionService.closeContent();
          },
          onExpandClick: (alert: IBmbDataAlert) => {
            console.log('Expand alert clicked', alert);
            this.projectionService.closeContent();
          },
        },
      });
    }
  }

  handleActionsCloseClick(params: unknown): void {
    console.log('Close button clicked', params);
  }

  handleHelpButtonClick(): void {
    const modalData: ModalDataConfig = {
      title: 'My Modal',
      content: this.modalLTSTemplate,
      primaryBtnLabel: 'Ok',
      secondaryBtnLabel: 'Cancel',
      hidePrimaryButton: false,
      hideSecondaryButton: true,
    };

    this.matDialog.open(BmbModalComponent, { data: modalData });
  }

  resultList = signal<IBmbSearchCardItemResult[]>([]);
  isSearchLoading = signal<boolean>(false);

  handleServiceClick(service: IBmbSearchCardItemResult): void {
    console.log('Service clicked:', service);
  }

  handleSearchChange(searchTerm: string): void {
    if (searchTerm) {
      this.isSearchLoading.set(true);
      console.log('Search term:', searchTerm);
      // this.searchSubject.next(searchTerm);}
      const searchLower = searchTerm.toLowerCase();

      const filteredPersons = persons
        .filter((person) => person.name?.toLowerCase().includes(searchLower))
        .map((person) => ({
          ...person,
          id: person.id.toString(),
          type: person.type as 'person' | 'service',
        }));

      const filteredServices = services
        .filter((service) => service.name?.toLowerCase().includes(searchLower))
        .map((service) => ({
          ...service,
          id: service.id.toString(),
          type: service.type as 'person' | 'service',
        }));

      console.log([...filteredPersons, ...filteredServices]);

      this.resultList.set([...filteredPersons, ...filteredServices]);
      this.isSearchLoading.set(false);
    }
  }

  handleSearchButtonClick(event: MouseEvent): void {
    console.log('Search button clicked');

    const contentID = this.projectionService.openContent({
      // content: this.searchTemplate,
      content: BmbSearchCardComponent,
      targetRef: event.currentTarget as HTMLElement,
      showBackdrop: false,
      inputContext: {
        title: 'Search',
        inputPlaceholder: 'Type to search...',
        results: this.resultList(),
        isLoading: this.isSearchLoading(),
      },
      outputContext: {
        triggerSearch: (value: string) => {
          this.handleSearchChange(value);
        },
        searchItemClick: (event: IBmbSearchCardItemResult) => {
          this.handleServiceClick(event);
        },
      },
    });

    // this.contentID.set(contentID);
  }

  message = signal<string>('Hello from AppComponent!');
}
