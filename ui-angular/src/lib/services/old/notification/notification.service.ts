import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  EnvironmentInjector,
  inject,
  Injector,
  Injectable,
  ProviderToken,
  signal,
} from '@angular/core';
import { INotification } from '../../../components/bmb-push-notification/types';
import { getUUID } from '../../../_shared/logic/utils';
import { BmbPortalComponent } from '../../../components/bmb-portal/bmb-portal.component';

export type NotificationPositionX = 'left' | 'right';
export type NotificationPositionY = 'top' | 'bottom';

@Injectable({
  providedIn: 'root',
})
export class BmbNotificationService {
  readonly notificationList = signal<INotification[]>([]);
  private portalComponentRef: ComponentRef<BmbPortalComponent> | null = null;

  private readonly appRef: ApplicationRef = inject(ApplicationRef);
  private readonly environmentInjector: EnvironmentInjector = inject(EnvironmentInjector);
  private readonly injector: Injector = inject(Injector);
  public readonly positionX: NotificationPositionX =
    this.injector.get<NotificationPositionX>(
      'positionX' as unknown as ProviderToken<NotificationPositionX>,
      'right',
    );
  public readonly positionY: NotificationPositionY =
    this.injector.get<NotificationPositionY>(
      'positionY' as unknown as ProviderToken<NotificationPositionY>,
      'top',
    );

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
      this.portalComponentRef.hostView as EmbeddedViewRef<unknown>
    ).rootNodes[0] as HTMLElement;
    document.body.appendChild(hostDomElem);
    return this.portalComponentRef.instance;
  }

  addNotification(notification: INotification) {
    const id = notification.id ?? getUUID();

    this.getOrCreatePortal();

    this.notificationList.update((currentNotifications) => [
      ...currentNotifications,
      { position: 'top-right', ...notification, id },
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
