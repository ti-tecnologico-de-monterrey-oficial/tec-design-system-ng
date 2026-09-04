import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbNotificationCounterComponent,
  type IBmbNotificationCounterType,
} from 'ui-angular';

@Component({
  selector: 'app-notification-counter-page',
  imports: [BmbNotificationCounterComponent],
  templateUrl: './notification-counter-page.html',
  styleUrl: './notification-counter-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationCounterPage {
  readonly appearances: IBmbNotificationCounterType[] = [
    'notification',
    'plain',
  ];
  readonly counter = signal(7);
  readonly appearance = signal<IBmbNotificationCounterType>('notification');

  setCounter(value: number): void {
    this.counter.set(value);
  }

  setAppearance(value: IBmbNotificationCounterType): void {
    this.appearance.set(value);
  }
}
