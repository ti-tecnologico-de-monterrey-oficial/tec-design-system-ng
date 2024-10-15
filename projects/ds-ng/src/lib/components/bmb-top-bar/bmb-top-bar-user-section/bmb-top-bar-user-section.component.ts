import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { BmbUserImageComponent } from '../../bmb-user-image/bmb-user-image.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { IUserInformation, IPositionButtonMenu } from '../types';
import { IBmbNotificationCardData } from '../../bmb-notification-card/types';
import { CommonModule } from '@angular/common';
import { BmbNotificationCardComponent } from '../../bmb-notification-card/bmb-notification-card.component';

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
  @Input() notificationNotification: IBmbNotificationCardData | null = null;

  isOpenNotifications: boolean = false;

  @HostListener('focusout')
  protected onFocusOut(): void {
    this.closeNotifications();
  }

  openNotifications() {
    this.isOpenNotifications = true;
  }

  closeNotifications() {
    this.isOpenNotifications = false;
  }

  totalNotifications(): number {
    const seenNotifications = this.notificationNotification!.seen.length;
    const newNotifications = this.notificationNotification!.new.length;
    const allNotifications = this.notificationNotification!.all.length;
    return seenNotifications + newNotifications + allNotifications;
  }
}
