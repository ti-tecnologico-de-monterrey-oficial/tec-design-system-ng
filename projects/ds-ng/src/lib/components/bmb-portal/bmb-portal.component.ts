import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BmbNotificationService } from '../../services/notification.service';
import { BmbModalService } from '../../services/modal.service';
import { INotification } from '../bmb-push-notification/types';
import { BmbPushNotificationItemComponent } from '../bmb-push-notification/bmb-push-notification-item/bmb-push-notification-item.component';
import { BmbToastComponent } from '../bmb-toast/bmb-toast.component';
import { BmbModalComponent } from '../bmb-modal/bmb-modal.component';

@Component({
  selector: 'bmb-portal',
  standalone: true,
  imports: [
    BmbPushNotificationItemComponent,
    BmbToastComponent,
    BmbModalComponent,
  ],
  templateUrl: './bmb-portal.component.html',
  styleUrl: './bmb-portal.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbPortalComponent {
  constructor(
    private notificationSignal: BmbNotificationService,
    private modalSignal: BmbModalService,
  ) {}

  getNotifications() {
    return this.notificationSignal.getNotificationList();
  }

  getModals() {
    return this.modalSignal.getModalList();
  }

  closeNotification(notification: INotification) {
    if (notification.id) {
      this.notificationSignal.deleteNotification(notification.id);
    }
  }
}
