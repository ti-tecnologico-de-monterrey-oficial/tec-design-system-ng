import { Inject, Injectable, Optional, signal } from "@angular/core";
import { INotification } from "../components/bmb-push-notification/types";

export type NotificationPositionX = 'left' | 'right';
export type NotificationPositionY = 'top' | 'bottom';

@Injectable({
  providedIn: 'root'
})
export class BmbNotificationService {
  readonly notificationList = signal<INotification[]>([]);

  constructor(
    @Inject('positionX') @Optional() public positionX?: NotificationPositionX,
    @Inject('positionY') @Optional() public positionY?: NotificationPositionY,
  ) {
    this.positionX = positionX || 'right';
    this.positionY = positionY || 'top';
  }

  addNotification(notification: INotification) {
    const id = notification.id ?? self.crypto.randomUUID();

    this.notificationList.update((currentNotifications) => [
      ...currentNotifications,
      { ...notification, id },
    ]);

    setTimeout(() => { this.deleteNotification(id) }, (notification.delay || 5000));
  }

  deleteNotification(id: string) {
    console.log('delete');

    this.notificationList.update((currentNotifications) => currentNotifications.filter((notification) => notification.id !== id));
  }

  getNotificationList() {
    return this.notificationList();
  }
}
