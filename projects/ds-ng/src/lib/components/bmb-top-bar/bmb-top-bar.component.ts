import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
  OnInit,
  output,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPositionButtonMenu, IUserInformation } from './types';
import { BmbTopBarUserSectionComponent } from './bmb-top-bar-user-section/bmb-top-bar-user-section.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbSelectComponent } from '../bmb-select/bmb-select.component';
import { BmbSelectItemComponent } from '../bmb-select/bmb-select-item/bmb-select-item.component';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { IBmbDataAlert } from '../bmb-alert-center/types';

export { IPositionButtonMenu, IUserInformation } from './types';

@Component({
  selector: 'bmb-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    BmbTopBarUserSectionComponent,
    BmbIconComponent,
    BmbSelectComponent,
    BmbSelectItemComponent,
    BmbUserImageComponent,
  ],
  templateUrl: './bmb-top-bar.component.html',
  styleUrl: './bmb-top-bar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTopBarComponent implements OnInit {

  @Input() userInformation: IUserInformation | null = null;
  @Input() image: string = '';
  @Input() mobileImage: string = '';
  @Input() appName: string = '';
  @Input() appSubTitle: string = '';
  @Input() lang: string = 'es';
  @Input() mitec: boolean = false;
  @Input() alertNotification: IBmbDataAlert[] = [];
  @Input() showQualtrics: boolean = false;
  @Input() showRoleButton: boolean = false;

  @Input() positionButtonMenu: IPositionButtonMenu = 'left'; // Deprecated
  @Input() hasLogoutButton: boolean = true; // Deprecated
  @Input() showLang: boolean = false; // Deprecated
  @Input() showUserName: boolean = true; // Deprecated
  @Input() assignmentNotification: string[] = []; // Deprecated

  logOut = output<any>(); // Deprecated
  onLangChange = output<string>(); // Deprecated
  helpButtonClick = output<void>();
  userProfileClick = output<void>();
  qualtricsButtonClick = output<void>();
  alertButtonClick = output<void>();
  roleButtonClick = output<void>();

  // @ViewChild(TemplateRef) contentTemplate: TemplateRef<unknown> | null = null;

  // isMobileMenuOpen: boolean = false;
  showAnimation: boolean = true;
  imageDefault = 'assets/images/tec-logo.svg';
  mobileImageDefault = 'assets/images/tec-logo-mob.svg';
  mobileImageMitecDefault = 'assets/images/logos-mitec/logo_mitec.png';
  imageMitecDefault = 'assets/images/logos-mitec/logo_mitec-mob.svg';

  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event): void {
  //   this.windowWidth = window.innerWidth;
  //   this.isMobileMenuOpen =
  //     this.windowWidth > 1000 ? false : this.isMobileMenuOpen;
  // }

  ngOnInit(): void {
    if (this.image == '') {
      this.image = this.mitec ? this.imageMitecDefault : this.imageDefault;
    }

    if (this.mobileImage == '') {
      this.mobileImage = this.mitec
        ? this.mobileImageMitecDefault
        : this.mobileImageDefault;
    }

    const hasBeenViewed = localStorage.getItem('bmbTopBarViewed');
    if (hasBeenViewed) {
      this.showAnimation = false;
    } else {
      this.showAnimation = true;
      localStorage.setItem('bmbTopBarViewed', 'true');
    }
  }

  handleLogOutClick(event: Event) {
    this.logOut.emit(event);
  }

  handleAlertClick() {
    this.alertButtonClick.emit();
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

  handleHelpButtonClick() {
    this.helpButtonClick.emit();
  }

  handleUserClick() {
    this.userProfileClick.emit();
  }

  handleQualtricsClick() {
    this.qualtricsButtonClick.emit();
  }

  handleRoleChange() {
    this.roleButtonClick.emit();
  }
}
