import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  EnvironmentInjector,
  Inject,
  Injectable,
  Optional,
  signal,
} from '@angular/core';
import { INotification } from '../../components/bmb-push-notification/types';
import { getUUID } from '../../utils/utils';
import { BmbPortalComponent } from '../../components/bmb-portal/bmb-portal.component';

export type NotificationPositionX = 'left' | 'right';
export type NotificationPositionY = 'top' | 'bottom';

@Injectable({
  providedIn: 'root',
})
export class BmbNotificationService {
  readonly notificationList = signal<INotification[]>([]);
  private portalComponentRef: ComponentRef<BmbPortalComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector,
    @Inject('positionX') @Optional() public positionX?: NotificationPositionX,
    @Inject('positionY') @Optional() public positionY?: NotificationPositionY,
  ) {
    this.positionX = positionX || 'right';
    this.positionY = positionY || 'top';
  }

  private getOrCreatePortal(): BmbPortalComponent {
    if (this.portalComponentRef) {
      return this.portalComponentRef.instance;
    }

    const existingHost = document.querySelector('app-modal-host');
    if (existingHost) {
      const componentRef = this.appRef.components.find(
        (ref) => ref.instance instanceof BmbPortalComponent,
      );
      if (componentRef) {
        this.portalComponentRef = componentRef;
        return componentRef.instance;
      }
    }

    this.portalComponentRef = createComponent(BmbPortalComponent, {
      environmentInjector: this.environmentInjector,
    });

    this.appRef.attachView(this.portalComponentRef.hostView);

    const hostDomElem = (
      this.portalComponentRef.hostView as EmbeddedViewRef<any>
    ).rootNodes[0] as HTMLElement;
    document.body.appendChild(hostDomElem);
    return this.portalComponentRef.instance;
  }

  addNotification(notification: INotification) {
    const id = notification.id ?? getUUID();

    this.getOrCreatePortal();

    this.notificationList.update((currentNotifications) => [
      ...currentNotifications,
      { ...notification, id },
    ]);

    setTimeout(() => {
      this.deleteNotification(id);
    }, notification.delay || 5000);
  }

  deleteNotification(id: string, delay = 500) {
    const current = this.notificationList();
    const notification = current.find((n) => n.id === id);
    if (!notification) return;

    if (notification.component === 'toast') {
      this.notificationList.update((list) =>
        list.map((n) => (n.id === id ? { ...n, closing: true } : n)),
      );

      setTimeout(() => {
        this.notificationList.update((list) => list.filter((n) => n.id !== id));
      }, delay);
    } else {
      this.notificationList.update((list) => list.filter((n) => n.id !== id));
    }
  }

  getNotificationList() {
    return this.notificationList();
  }
}
