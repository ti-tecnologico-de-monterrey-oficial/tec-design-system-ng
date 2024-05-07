import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbButtonDirective } from '../../directives/button.directive';
import { IPositionButtonMenu, IUserInformation } from './types';
import { BmbTopBarUserSectionComponent } from './bmb-top-bar-user-section/bmb-top-bar-user-section.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbSelectComponent } from '../bmb-select/bmb-select.component';
import { BmbSelectItemComponent } from '../bmb-select/bmb-select-item/bmb-select-item.component';

export { IPositionButtonMenu, IUserInformation } from './types';

@Component({
  selector: 'bmb-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    BmbButtonDirective,
    BmbTopBarUserSectionComponent,
    BmbIconComponent,
    BmbSelectComponent,
    BmbSelectItemComponent,
  ],
  templateUrl: './bmb-top-bar.component.html',
  styleUrl: './bmb-top-bar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTopBarComponent {
  @Input() positionButtonMenu: IPositionButtonMenu = 'left';
  @Input() userInformation: IUserInformation | null = null;
  @Input() hasLogoutButton: boolean = true;
  @Input() image: string = 'assets/images/tec-logo.svg';
  @Input() mobileImage: string = 'assets/images/tec-logo-mob.svg';
  @Input() appName: string = '';
  @Input() appSubTitle: string = '';
  @Input() showLang: boolean = false;
  @Input() lang: string = 'es';

  @Output() logOut: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLangChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild(TemplateRef) contentTemplate: TemplateRef<unknown> | null = null;

  isMobileMenuOpen: boolean = false;

  handleLogOutClick(event: Event) {
    this.logOut.emit(event);
  }

  handleMobileMenuClick() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  getMenuClasses(): string {
    if (this.isMobileMenuOpen) return 'bmb_top-bar-nav-open';
    return '';
  }

  getMenuButtonClasses(): string {
    if (this.isMobileMenuOpen) return 'bmb_top-bar-button-menu-open';
    return '';
  }

  getFlag(lang: string): string {
    switch (lang) {
      case 'es':
        return '/assets/images/lang-flags/mx.svg';
      case 'en':
        return `/assets/images/lang-flags/us.svg`;

      default:
        return '';
    }
  }

  getCountryName(lang: string): string {
    switch (lang) {
      case 'es':
        return 'Español';
      case 'en':
        return 'English';
      default:
        return '';
    }
  }

  handleLangChange(lang: string): void {
    this.onLangChange.emit(lang);
  }
}
