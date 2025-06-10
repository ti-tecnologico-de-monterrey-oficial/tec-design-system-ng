import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { BmbNotificationService } from '../../services/notification.service';
import { INotification } from '../bmb-push-notification/types';
import { BmbPushNotificationItemComponent } from '../bmb-push-notification/bmb-push-notification-item/bmb-push-notification-item.component';
import { BmbToastComponent } from '../bmb-toast/bmb-toast.component';
import { CommonModule } from '@angular/common';
import { BmbNoticeCardComponent } from '../bmb-notice-card/bmb-notice-card.component';

@Component({
  selector: 'bmb-portal',
  standalone: true,
  imports: [
    BmbPushNotificationItemComponent,
    BmbToastComponent,
    BmbNoticeCardComponent,
    CommonModule,
  ],
  templateUrl: './bmb-portal.component.html',
  styleUrl: './bmb-portal.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbPortalComponent {
  constructor(private notificationSignal: BmbNotificationService) {}

  getNotifications() {
    return this.notificationSignal.getNotificationList();
  }

  closeNotification(notification: INotification) {
    if (notification.id) {
      this.notificationSignal.deleteNotification(notification.id);
    }
  }

  getNotificationPosition() {
    return this.notificationSignal.positionX;
  }
}
