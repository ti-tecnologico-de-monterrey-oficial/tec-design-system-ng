import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { DateTime } from 'luxon';
import {
  BmbNotificationCardComponent,
  BmbNotificationCardModalComponent,
  type IBmbDataAlert,
  type IBmbDataAlertsParsed,
} from 'ui-angular';

const NOTIFICATIONS: IBmbDataAlert[] = [
  {
    id: 1,
    title: 'Actualización académica',
    description: [
      { text: 'Actualización académica', type: 'title' },
      {
        text: 'Tu información académica está lista para revisión.',
        type: 'paragraph',
      },
    ],
    date: '02/09/2026 09:30',
    time: '09:30',
    type: 'info',
    isRead: false,
    isFavorite: true,
    isArchived: false,
  },
  {
    id: 2,
    title: 'Actividad completada',
    description: [
      { text: 'Actividad completada correctamente.', type: 'paragraph' },
    ],
    date: '01/09/2026 16:15',
    time: '16:15',
    type: 'success',
    isRead: true,
    isFavorite: false,
    isArchived: false,
  },
];

const ADVERTISEMENTS: IBmbDataAlert[] = [
  {
    id: 'ad-1',
    title: 'Evento institucional',
    description: [
      { text: 'Consulta los detalles del próximo evento.', type: 'paragraph' },
    ],
    date: '03/09/2026 12:00',
    time: '12:00',
    type: 'event',
    isRead: false,
    isFavorite: false,
    isArchived: false,
  },
];

@Component({
  selector: 'app-notification-card-page',
  imports: [BmbNotificationCardComponent, BmbNotificationCardModalComponent],
  templateUrl: './notification-card-page.html',
  styleUrl: './notification-card-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCardPage {
  readonly iconOptions = ['', 'notifications', 'campaign', 'info', 'event'];
  readonly notifications = signal(NOTIFICATIONS);
  readonly advertisements = signal(ADVERTISEMENTS);
  readonly hideExpandBtn = signal(false);
  readonly maxHeight = signal('480px');
  readonly enableRowClick = signal(true);
  readonly dateFormat = signal('dd/MM/yyyy HH:mm');
  readonly showAdvertisements = signal(true);
  readonly leftIcon = signal('notifications');
  readonly enableCustomHandlerClick = signal(false);
  readonly componentTitle = signal('Notification card');
  readonly useEmptyState = signal(false);
  readonly lastEvent = signal('Sin interacciones');
  readonly selectedAlert = computed<IBmbDataAlertsParsed>(() => ({
    ...this.notifications()[0],
    pDate: DateTime.fromFormat(
      this.notifications()[0].date,
      'dd/MM/yyyy HH:mm',
    ),
  }));

  readonly visibleNotifications = computed(() =>
    this.useEmptyState() ? [] : this.notifications(),
  );

  recordAlert(prefix: string, alert: IBmbDataAlert): void {
    this.lastEvent.set(`${prefix}: ${alert.title}`);
  }

  recordExpand(): void {
    this.lastEvent.set('onExpandClick');
  }
}
