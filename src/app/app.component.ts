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
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
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
} from '../../projects/ds-ng/src/public-api';
import { MatDialog } from '@angular/material/dialog';
import { TestComponentComponent } from './components/test-component/test-component.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  imports: [
    RouterModule,
    BmbThemeComponent,
    BmbTopBarComponent,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbSidebarComponent,
    BmbDropdownComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AppComponent {
  private router = inject(Router);
  constructor(
    private modalService: BmbNativeModalService,
    private projectionService: BmbProjectionContentService,
    private matDialog: MatDialog,
  ) {}

  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<unknown>;
  @ViewChild('modalLTSTemplate') modalLTSTemplate!: TemplateRef<any>;

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
        id: 5,
        icon: 'calendar_today',
        title: 'Calendar',
        link: '/calendar',
      },
      {
        id: 6,
        icon: 'table_chart',
        title: 'Table Lite',
        link: '/table-lite',
      },
      {
        id: 2,
        icon: 'list_alt_check',
        title: 'Forms',
        link: '/form-validator',
      },
    ],
    [
      {
        id: 3,
        icon: 'align_flex_center',
        title: 'Flex',
        link: '/flex',
      },
      {
        id: 4,
        icon: 'dropdown',
        title: 'Dropdown',
        link: '/dropdown',
      },
      {
        id: 7,
        icon: 'page_control',
        title: 'Multi Dot Paginator',
        link: '/multi-dot-paginator',
      },
      {
        id: 8,
        icon: 'account_circle',
        title: 'Profile',
        link: '/profile',
        children: [
          {
            id: 9,
            icon: 'person',
            title: 'Identity',
            link: '/identity',
          },
          {
            id: 10,
            icon: 'notifications',
            title: 'Alerts',
            link: '/alerts',
          },
        ],
      },
    ],
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
      hideSecondaryButton: true
    };

    this.matDialog.open(BmbModalComponent, { data: modalData });
  }
}
