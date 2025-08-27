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
} from '../../projects/ds-ng/src/public-api';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AppComponent {
  private router = inject(Router);
  constructor(private modalService: BmbNativeModalService) {}
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<unknown>;

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
    ],
    [
      {
        id: 2,
        icon: 'list_alt_check',
        title: 'Forms',
        link: '/form-validator',
      },
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
    ],
  ];

  handleUserProfileClick(): void {
    const data: IBmbNativeModal = {
      title: 'User Profile',
      subtitle: 'This is your user profile modal',
      content: this.modalTemplate,
      size: 'medium',
      iconStyle: 'primary',
      actions: [
        {
          buttonName: 'Close',
          appearance: 'secondary-outlined',
          label: 'Close',
          icon: 'close',
          action: () => this.handleCloseModal.bind(this)(),
        },
      ],
      closeModalClicked: () => this.handleActionsCloseClick.bind(this)(event),
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

  handleAlertButtonClick(): void {
    this.router.navigate(['/alerts']);
  }

  handleActionsCloseClick(params: unknown): void {
    console.log('Close button clicked', params);
  }
}
