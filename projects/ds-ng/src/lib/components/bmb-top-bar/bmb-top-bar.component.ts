import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnInit,
  output,
  input,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPositionButtonMenu, IUserInformation } from './types';
import { BmbTopBarUserSectionComponent } from './bmb-top-bar-user-section/bmb-top-bar-user-section.component';
import { IBmbDataAlert } from '../bmb-alert-center/types';

export { IPositionButtonMenu, IUserInformation } from './types';

@Component({
  selector: 'bmb-top-bar',
  standalone: true,
  imports: [CommonModule, BmbTopBarUserSectionComponent],
  templateUrl: './bmb-top-bar.component.html',
  styleUrl: './bmb-top-bar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTopBarComponent implements OnInit {
  userInformation = input<IUserInformation | null>(null);
  appName = input<string>('');
  appPowered = input<string>('');
  appSubTitle = input<string>('');
  lang = input<string>('es');
  mitec = input<boolean>(false);
  alertNotification = input<IBmbDataAlert[]>([]);
  showRoleButton = input<boolean>(false);
  showHelpButton = input<boolean>(false);

  positionButtonMenu = input<IPositionButtonMenu>('left'); // Deprecated
  hasLogoutButton = input<boolean>(true); // Deprecated
  showLang = input<boolean>(false); // Deprecated
  showUserName = input<boolean>(true); // Deprecated
  assignmentNotification = input<string[]>([]); // Deprecated

  image = model<string>('');
  mobileImage = model<string>('');

  helpButtonClick = output<MouseEvent>();
  userProfileClick = output<MouseEvent>();
  alertButtonClick = output<MouseEvent>();
  roleButtonClick = output<MouseEvent>();
  backToHomeClick = output<void>();

  logOut = output<any>(); // Deprecated
  onLangChange = output<string>(); // Deprecated

  showAnimation: boolean = true;
  imageDefault = 'assets/images/tec-logo.svg';
  mobileImageDefault = 'assets/images/tec-logo-mob.svg';
  mobileImageMitecDefault = 'assets/images/logos-mitec/logo_mitec.png';
  imageMitecDefault = 'assets/images/logos-mitec/logo_mitec-mob.svg';

  ngOnInit(): void {
    if (this.image() === '') {
      this.image.set(this.mitec() ? this.imageMitecDefault : this.imageDefault);
    }

    if (this.mobileImage() === '') {
      this.mobileImage.set(
        this.mitec() ? this.mobileImageMitecDefault : this.mobileImageDefault,
      );
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

  handleAlertClick(event: MouseEvent) {
    this.alertButtonClick.emit(event);
  }

  handleLangChange(lang: string): void {
    this.onLangChange.emit(lang);
  }

  handleHelpButtonClick(event: MouseEvent) {
    this.helpButtonClick.emit(event);
  }

  handleUserClick(event: MouseEvent) {
    this.userProfileClick.emit(event);
  }

  handleRoleChange(event: MouseEvent) {
    this.roleButtonClick.emit(event);
  }

  handleBackToHome(): void {
    this.backToHomeClick.emit();
  }
}
