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

  handleUserProfileClick(event: MouseEvent): void {
    console.log('User profile clicked', event);
  }

  handleAlertButtonClick(): void {
    this.router.navigate(['/alerts']);
  }
}
