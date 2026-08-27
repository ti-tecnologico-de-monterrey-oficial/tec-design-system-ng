import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { BmbPushNotificationItemComponent } from './bmb-push-notification-item/bmb-push-notification-item.component';
import { BmbNotificationService } from '../../services/old/notification/notification.service';
import { INotification } from './types';

export * from './types';

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

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
  private notificationSignal: BmbNotificationService = inject(BmbNotificationService);

  getNotifications() {
    return this.notificationSignal.getNotificationList();
  }

  closeNotification(notification: INotification) {
    if (notification.id) {
      this.notificationSignal.deleteNotification(notification.id);
    }
  }
}
