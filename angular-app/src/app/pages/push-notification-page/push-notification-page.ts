import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  BmbNotificationService,
  BmbPushNotificationComponent,
  type NotificationType,
} from 'ui-angular';

@Component({
  selector: 'app-push-notification-page',
  imports: [BmbPushNotificationComponent],
  templateUrl: './push-notification-page.html',
  styleUrl: './push-notification-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PushNotificationPage {
  private readonly notificationService = inject(BmbNotificationService);
  readonly types: NotificationType[] = [
    'tec',
    'success',
    'info',
    'neutral',
    'event',
    'error',
    'warning',
    'black',
  ];
  readonly icons = [
    'notifications',
    'check_circle',
    'info',
    'event',
    'error',
    'warning',
  ];

  readonly title = signal('Notificación Bamboo');
  readonly subTitle = signal('Actualización disponible');
  readonly content = signal(
    'Este mensaje permite validar la notificación y sus acciones.',
  );
  readonly icon = signal('notifications');
  readonly type = signal<NotificationType>('tec');
  readonly isFullColor = signal(false);
  readonly delay = signal(60000);
  readonly date = signal('Ahora');
  readonly appName = signal('Bamboo');
  readonly appIcon = signal('assets/images/tec-logo-mob.svg');
  readonly media = signal('');
  readonly userName = signal('Usuario Bamboo');
  readonly userAvatar = signal('/assets/doc/status.png');
  readonly userMail = signal('usuario@tec.mx');
  readonly enableDontAskAgain = signal(true);
  readonly lastEvent = signal('Sin interacciones');

  setDelay(value: string): void {
    const delay = Number(value);
    this.delay.set(Number.isFinite(delay) ? delay : 5000);
  }

  addNotification(): void {
    this.notificationService.addNotification({
      title: this.title(),
      subTitle: this.subTitle(),
      content: this.content(),
      icon: this.icon(),
      type: this.type(),
      isFullColor: this.isFullColor(),
      delay: this.delay(),
      date: this.date(),
      appName: this.appName(),
      appIcon: this.appIcon(),
      media: this.media(),
      userName: this.userName(),
      userAvatar: this.userAvatar(),
      userMail: this.userMail(),
      dontAskAgainEvent: this.enableDontAskAgain()
        ? (id) => this.lastEvent.set(`No volver a mostrar: ${id}`)
        : undefined,
      actions: [
        {
          title: 'Aceptar',
          action: (notification) =>
            this.lastEvent.set(`Aceptar: ${notification.title}`),
        },
        { title: 'Cerrar', action: 'close' },
      ],
    });
    this.lastEvent.set('Notificación agregada');
  }

  clearNotifications(): void {
    for (const notification of this.notificationService.getNotificationList()) {
      if (notification.id)
        this.notificationService.deleteNotification(notification.id, 0);
    }
    this.lastEvent.set('Notificaciones eliminadas');
  }
}
