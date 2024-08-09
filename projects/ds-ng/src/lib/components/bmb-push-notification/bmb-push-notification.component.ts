import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BmbPushNotificationItemComponent } from './bmb-push-notification-item/bmb-push-notification-item.component';
import { BmbNotificationService } from '../../services/notification.service';
import { INotification } from './types';

@Component({
  selector: 'bmb-push-notification',
  standalone: true,
  imports: [BmbPushNotificationItemComponent],
  templateUrl: './bmb-push-notification.component.html',
  styleUrl: './bmb-push-notification.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbPushNotificationComponent {
  constructor(
    private notificationSignal: BmbNotificationService,
  ) {}

  getNotifications() {
    return this.notificationSignal.getNotificationList();
  }

  closeNotification(notification: INotification) {
    if (notification.id) {
      this.notificationSignal.deleteNotification(notification.id);
    }
  }
}
