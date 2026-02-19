import { CommonModule } from '@angular/common';
import {
  Component,
  contentChild,
  effect,
  input,
  OnInit,
  output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbButtonAction } from '../../types';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card/bmb-card.component';
import { BmbContainerButtonComponent } from '../bmb-container-button/bmb-container-button.component';
import { BmbLoginOnboardingComponent } from '../bmb-login-onboarding/bmb-login-onboarding.component';
import { BmbCalendarComponent } from '../bmb-calendar/bmb-calendar.component';
import {
  BmbExternalLinkComponent,
  IBmbMenuEvent,
} from '../bmb-external-link/bmb-external-link.component';
import { IBmbFooterEvent } from '../bmb-bottom-navigation-bar/bmb-bottom-navigation-bar.component';
import { BmbInnerHeaderComponent } from '../bmb-inner-header/bmb-inner-header.component';
import { IBmbTargetLink } from '../../types';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';

export type IBmbMobileTemplateName =
  | 'single-header'
  | 'header-with-footer'
  | 'card-header-with-footer'
  | 'header-with-button-list'
  | 'header-with-card-list'
  | 'login'
  | 'calendar'
  | 'external-link';

export interface IBmbMobileTemplateButton {
  title: string;
  iconLeft: string;
  subtitle?: string;
  target?: IBmbTargetLink;
  link?: string;
  onButton?: () => void;
}

@Component({
  selector: 'bmb-mobile-templates',
  standalone: true,
  imports: [
    CommonModule,
    BmbButtonDirective,
    BmbCardComponent,
    BmbCardContentComponent,
    BmbContainerButtonComponent,
    BmbLoginOnboardingComponent,
    BmbCalendarComponent,
    BmbExternalLinkComponent,
    BmbInnerHeaderComponent,
  ],
  templateUrl: './bmb-mobile-templates.component.html',
  styleUrl: './bmb-mobile-templates.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BmbMobileTemplatesComponent implements OnInit {
  template = input<IBmbMobileTemplateName>('single-header');
  footerActions = input<IBmbButtonAction[]>([]);
  buttonList = input<IBmbMobileTemplateButton[]>([]);
  headerIconRight = input<string>('');
  calendarTimezone = input<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  clientTimezone = input<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  lang = input<string>('es-MX');
  currentDate = input<string>('');
  externalLinkSubtitle = input<string>('');

  onHeaderLeftClick = output<any>();
  onHeaderRightClick = output<any>();
  loginHandleRequest = output<any>();
  onDateChange = output<any>();
  externalLinkOnClose = output<unknown>();
  externalLinkMenuEvent = output<IBmbMenuEvent>();
  externalLinkFooterEvent = output<IBmbFooterEvent>();
  componentTitle = input<string>();

  title = input<string>(); // deprecated

  mainContent = contentChild<TemplateRef<any>>('bmbTemplateMain');
  height: number = 0;

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle }
      );
    });
  }

  ngOnInit() {
    this.height = window.innerHeight;
  }

  getSectionClass(): string[] {
    const classList = [
      'bmb_mobile-template',
      `bmb_mobile-template-${this.template()}`,
    ];

    return classList;
  }

  handleLeftClick(event: any): void {
    this.onHeaderLeftClick.emit(event);
  }

  handleRightClick(event: any): void {
    this.onHeaderRightClick.emit(event);
  }

  handleAction(action: IBmbButtonAction) {
    action.action();
  }

  handleLoginRequest(event: any) {
    this.loginHandleRequest.emit(event);
  }

  handleClose(event: unknown) {
    this.externalLinkOnClose.emit(event);
  }

  handleMenuEvent(event: IBmbMenuEvent) {
    this.externalLinkMenuEvent.emit(event);
  }

  handleFooterEvent(event: IBmbFooterEvent) {
    this.externalLinkFooterEvent.emit(event);
  }
}
