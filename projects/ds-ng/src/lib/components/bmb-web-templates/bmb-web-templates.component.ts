import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbTopBarComponent,
  IPositionButtonMenu,
  IUserInformation,
} from '../bmb-top-bar/bmb-top-bar.component';
import { BmbSidebarComponent } from '../bmb-sidebar/bmb-sidebar.component';
import { SidebarElement } from '../bmb-sidebar/bmb-sidebar.interface';
import { CommonModule } from '@angular/common';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';

export type IBmbTemplateName =
  | 'full-width-card'
  | 'justify-width-card'
  | 'single-column-card'
  | 'aside-first-card'
  | 'aside-light-card';

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
  titleLeftSlot = input<string>();
  titleRightSlot = input<string>();

  // top bar inputs
  positionButtonMenu = input<IPositionButtonMenu>('left');
  userInformation = input<IUserInformation | null>(null);
  hasLogoutButton = input<boolean>(true);
  image = input<string>('assets/images/tec-logo.svg');
  mobileImage = input<string>('assets/images/tec-logo-mob.svg');
  appName = input<string>('');
  appSubTitle = input<string>('');
  showLang = input<boolean>(false);
  lang = input<string>('es');
  mitec = input<boolean>(false);
  assignmentNotification = input<number>(0);
  alertNotification = input<number>(0);
  elements = input<SidebarElement[][]>();

  @ContentChild('bmbTemplateAside') asideContent!: TemplateRef<any>;
  @ContentChild('bmbTemplateMain') mainContent!: TemplateRef<any>;
  @ContentChild('singleColumnCard') singleColumnCard!: TemplateRef<any>;
  @ContentChild('asideFirstCard') asideFirstCard!: TemplateRef<any>;
  @ContentChild('asideLightCard') asideLightCard!: TemplateRef<any>;

  // side bar inputs

  // @Input() : number = 0;
  // @Input() :  = [];
  // @Input() title: string = 'Navigation';

  // @Output() logOut: EventEmitter<any> = new EventEmitter<any>();
  // @Output() onLangChange: EventEmitter<string> = new EventEmitter<string>();

  getSectionClass(): string[] {
    const classList = [
      'bmb_web-template',
      `bmb_web-template-${this.template()}`,
    ];

    return classList;
  }
}
