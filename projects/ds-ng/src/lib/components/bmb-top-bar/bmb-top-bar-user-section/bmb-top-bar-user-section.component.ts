import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostListener,
  output,
} from '@angular/core';
import { BmbUserImageComponent } from '../../bmb-user-image/bmb-user-image.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { IUserInformation } from '../types';
import { IBmbNotificationCardData } from '../../bmb-notification-card/types';
import { CommonModule } from '@angular/common';
import { BmbNotificationCardComponent } from '../../bmb-notification-card/bmb-notification-card.component';
import { IBmbDataAlert } from '../../bmb-alert-center/types';

@Component({
  selector: 'bmb-top-bar-user-section',
  standalone: true,
  imports: [
    CommonModule,
    BmbUserImageComponent,
    BmbIconComponent,
    BmbNotificationCardComponent,
  ],
  templateUrl: './bmb-top-bar-user-section.component.html',
  styleUrl: './bmb-top-bar-user-section.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTopBarUserSectionComponent {
  @Input() userInformation: IUserInformation = {
    image: '',
    name: '',
    role: '',
  };

  @Input() mitec: boolean = false;
  @Input() assignmentNotification: string[] = [];
  @Input() notificationNotification: IBmbDataAlert[] = [];

  helpButtonClick = output<void>();
  userClick = output<void>();

  isOpenNotifications: boolean = false;
  dialogPosition: { top: string; left: string } | null = {
    top: '0px',
    left: '0px',
  };
  windowWidth = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.windowWidth = window.innerWidth;
    this.isOpenNotifications = false;
  }

  openNotifications(event: MouseEvent) {
    const { clientX, clientY } = event;
    const offsetX = this.windowWidth < 1000 ? 300 : -40;

    this.dialogPosition = {
      top: `${clientY}px`,
      left: `${((clientX + offsetX) / this.windowWidth) * 100}%`,
    };
    this.isOpenNotifications = this.isOpenNotifications ? false : true;
  }

  closeNotifications() {
    this.isOpenNotifications = false;
  }

  totalNotifications(): number {
    return this.notificationNotification.length;
  }

  handleHelpButtonClick() {
    this.helpButtonClick.emit();
  }

  handleUserClick() {
    this.userClick.emit();
  }
}
