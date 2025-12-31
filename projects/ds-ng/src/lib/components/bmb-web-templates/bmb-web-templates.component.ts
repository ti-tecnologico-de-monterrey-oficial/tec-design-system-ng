import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbTopBarComponent,
  IUserInformation,
} from '../bmb-top-bar/bmb-top-bar.component';
import { BmbSidebarComponent } from '../bmb-sidebar/bmb-sidebar.component';
import { SidebarElement } from '../bmb-sidebar/bmb-sidebar.interface';
import { CommonModule } from '@angular/common';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { IBmbDataAlert } from '../bmb-alert-center/types';

export type IBmbTemplateName =
  | 'full-width-card'
  | 'justify-width-card'
  | 'single-column-card'
  | 'aside-first-card'
  | 'aside-light-card'
  | 'two-aside-card';

@Component({
  selector: 'bmb-web-templates',
  standalone: true,
  imports: [
    BmbTopBarComponent,
    BmbSidebarComponent,
    CommonModule,
    BmbDividerComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  templateUrl: './bmb-web-templates.component.html',
  styleUrl: './bmb-web-templates.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbWebTemplatesComponent {
  isFullScreen = input<boolean>(false);
  titleScreen = input<string>();
  subTitleScreen = input<string>();
  template = input<IBmbTemplateName>('full-width-card');
  titleMainSlot = input<string>();
  titleAsideSlot = input<string>();

  // top bar inputs
  topBarUserInformation = input<IUserInformation | null>(null);
  topBarHasLogoutButton = input<boolean>(true);
  topBarImage = input<string>('assets/images/tec-logo.svg');
  topBarMobileImage = input<string>('assets/images/tec-logo-mob.svg');
  topBarAppName = input<string>('');
  topBarAppSubTitle = input<string>('');
  topBarShowLang = input<boolean>(false);
  topBarLang = input<string>('es');
  topBarMitec = input<boolean>(false);
  topBarAssignmentNotification = input<string[]>([]);
  topBarAlertNotification = input<IBmbDataAlert[]>([]);

  topBarLogOut = output<any>();
  topBarOnLangChange = output<string>();

  // side bar inputs
  sideBarElements = input<SidebarElement[][]>([]);
  sideBarTitle = input<string>('');

  asideContent = contentChild<TemplateRef<any>>('bmbTemplateAside');
  mainContent = contentChild<TemplateRef<any>>('bmbTemplateMain');
  secondAsideContent = contentChild<TemplateRef<any>>('bmbTemplateSecondAside');
  singleColumnCard = contentChild<TemplateRef<any>>('singleColumnCard');
  asideFirstCard = contentChild<TemplateRef<any>>('asideFirstCard');
  asideLightCard = contentChild<TemplateRef<any>>('asideLightCard');
  twoAsideCard = contentChild<TemplateRef<any>>('twoAsideCard');

  getSectionClass(): string[] {
    const classList = [
      'bmb_web-template',
      `bmb_web-template-${this.template()}`,
    ];

    return classList;
  }

  handleLogOut(param: any): void {
    this.topBarLogOut.emit(param);
  }

  handleLangChange(lang: string): void {
    this.topBarOnLangChange.emit(lang);
  }
}
