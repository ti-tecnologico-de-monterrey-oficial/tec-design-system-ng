import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {
  BmbPortalComponent,
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
    BmbPortalComponent,
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

  routes: SidebarElement[][] = [
    [
      {
        id: 1,
        icon: 'home',
        title: 'Home',
        link: '/home',
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
    ],
  ];

  handleUserProfileClick(): void {
    const data: IBmbNativeModal = {
      title: 'User Profile',
      subtitle: 'This is your user profile modal',
      content: 'More information about the user profile.',
    };
    this.modalService.openModal(data);
  }

  handleAlertButtonClick(): void {
    this.router.navigate(['/alerts']);
  }
}
