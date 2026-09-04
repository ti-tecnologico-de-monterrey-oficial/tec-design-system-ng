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
  BmbProjectionContentService,
  BmbNotificationCardComponent,
  IBmbDataAlert,
  BmbDropdownComponent,
  BmbSearchCardComponent,
  IBmbChatMessage,
  IBmbHomeCardChatMode,
  IBotType,
  IBmbSearchCardItemResult,
  BmbAIChatCardComponent,
  BmbAiChatBubbleComponent,
  IBmbActionHeader,
  IChatBarActions,
  BmbChatMessage,
  BmbChatBarComponent,
} from 'ui-angular';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { sidebarOptions } from './sidebarOptions';

import persons from './pages/form-validator-test/persons.json';
import services from './pages/form-validator-test/services.json';
import { BmbDelayProfileComponent } from './pages/bmb-delay-profile/bmb-delay-profile.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    BmbThemeComponent,
    BmbTopBarComponent,
    BmbSidebarComponent,
    BmbDropdownComponent,
    BmbSearchCardComponent,
    BmbAIChatCardComponent,
    BmbAiChatBubbleComponent,
    BmbChatBarComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class App {
  private router = inject(Router);
  private modalService = inject(BmbNativeModalService);
  private projectionService = inject(BmbProjectionContentService);

  private searchSubject = new Subject<string>();

  _isLoading = signal<boolean>(false);

  constructor() {
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

  routes: SidebarElement[][] = sidebarOptions;

  mode: IBmbHomeCardChatMode = 'compact';

  currentBot: IBotType = {
    name: 'TecBot',
    icon: 'bot_tecStandar',
  };

  handleSendMessage(value: unknown): void {
    console.info('handleSendMessage app', value);

    setTimeout(() => {
      console.info('handleSendMessage before', this._isLoading());
      this._isLoading.set(false);
      console.info('handleSendMessage value', this._isLoading());
    }, 2000);
  }

  handleUserProfileClick(event: MouseEvent): void {
    const targetRef = event.currentTarget as HTMLElement;
    const data = {
      title: 'User Profile',
      content: BmbDelayProfileComponent,
      targetRef,
    };

    this.projectionService.openContent(data);
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
          enableCustomHandlerClick: true,
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
    console.log('Help button clicked');
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

      setTimeout(() => {
        this.resultList.set([...filteredPersons, ...filteredServices]);
        this.isSearchLoading.set(false);
      }, 1000);
    }
  }

  handleSearchButtonClick(event: MouseEvent): void {
    this.projectionService.openContent({
      content: this.searchTemplate,
      // content: BmbSearchCardComponent,
      targetRef: event ? (event.currentTarget as HTMLElement) : null,
      showBackdrop: false,
    });

    // this.contentID.set(contentID);
  }

  message = signal<string>('Hello from AppComponent!');

  favorites: IBmbSearchCardItemResult[] = [
    {
      id: '1',
      isBookmarkActive: true,
      country_code: 'mx',
      type: 'service',
      name: 'Sooji (Semolina)',
      subtitle: 'Food - Baking',
      avatarOrIcon: 'https://robohash.org/quamitaquea.png?size=50x50&set=set1',
      backgroundColorIcon: 'white_primary',
    },
    {
      id: '2',
      isBookmarkActive: true,
      country_code: 'mx',
      type: 'service',
      name: 'Fitness Resistance Bands',
      subtitle: 'Fitness',
      avatarOrIcon: 'https://robohash.org/nemofugitqui.png?size=50x50&set=set1',
      backgroundColorIcon: 'white_primary',
    },
    {
      id: '3',
      isBookmarkActive: true,
      country_code: 'mx',
      type: 'service',
      name: 'Nutty Granola Clusters',
      subtitle: 'Food - Cereal',
      avatarOrIcon: 'home',
      backgroundColorIcon: 'creative_ripelemon',
    },
    {
      id: '4',
      isBookmarkActive: true,
      country_code: 'mx',
      type: 'service',
      name: 'Pet Grooming Brush',
      subtitle: 'Pets',
      avatarOrIcon:
        'https://robohash.org/deseruntconsecteturdignissimos.png?size=50x50&set=set1',
    },
    {
      id: '5',
      isBookmarkActive: true,
      country_code: 'mx',
      type: 'service',
      name: 'Frozen Chicken Nuggets',
      subtitle: 'Food - Frozen Foods',
      avatarOrIcon:
        'https://robohash.org/dolordistinctioquaerat.png?size=50x50&set=set1',
    },
  ];
  readonly headerActions: IBmbActionHeader[] = [
      {
        icon: 'chat_add_on',
        tooltipText: 'New chat',
        action: () => {
          console.info('New chat');
        },
      },
    ];

    readonly actionsList: IChatBarActions[] = [
      {
        name: 'Adjuntar archivo',
        label: 'Adjuntar archivo',
        icon: 'attach_file',
        action: () => {
          console.log('Adjuntar archivo');
        },
      },
    ];

    readonly messages: BmbChatMessage[] = [
      {
        id: '1',
        type: 'text',
        timestamp: new Date('2026-08-25T22:47:25.997Z'),
        isUser: true,
        userProfile: 'https://picsum.photos/id/64/200/300',
        content: { text: 'I need help with Angular signals.' },
      },
      {
        id: '2',
        type: 'options',
        timestamp: new Date('2026-08-25T01:28:13.313Z'),
        isUser: false,
        content: {
          text: 'Choose one option:',
          options: [
            { id: '1', label: 'Option for conversational text-based prompts 1' },
            { id: '2', label: 'Option for conversational text-based prompts 2' },
            { id: '3', label: 'Option for conversational text-based prompts 3' },
          ],
        },
      },
      {
        id: '3',
        type: 'text',
        timestamp: new Date('2026-08-25T22:47:25.997Z'),
        isUser: true,
        userProfile: 'https://picsum.photos/id/64/200/300',
        content: { text: 'I need help with Angular signals.' },
      },
      {
        id: '4',
        type: 'options',
        timestamp: new Date('2026-08-25T01:28:13.313Z'),
        isUser: false,
        content: {
          text: 'Choose one option:',
          options: [
            { id: '1', label: 'Option for conversational text-based prompts 1' },
            { id: '2', label: 'Option for conversational text-based prompts 2' },
            { id: '3', label: 'Option for conversational text-based prompts 3' },
          ],
        },
      },
      {
        id: '5',
        type: 'text',
        timestamp: new Date('2026-08-25T22:47:25.997Z'),
        isUser: true,
        userProfile: 'https://picsum.photos/id/64/200/300',
        content: { text: 'I need help with Angular signals.' },
      },
      {
        id: '6',
        type: 'options',
        timestamp: new Date('2026-08-25T01:28:13.313Z'),
        isUser: false,
        content: {
          text: 'Choose one option:',
          options: [
            { id: '1', label: 'Option for conversational text-based prompts 1' },
            { id: '2', label: 'Option for conversational text-based prompts 2' },
            { id: '3', label: 'Option for conversational text-based prompts 3' },
          ],
        },
      },
    ];
}
