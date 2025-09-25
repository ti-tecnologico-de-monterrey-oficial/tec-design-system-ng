import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';

export type IBmbNotificationCounterType = 'notification' | 'plain';

@Component({
  selector: 'bmb-notification-counter',
  standalone: true,
  imports: [],
  templateUrl: './bmb-notification-counter.component.html',
  styleUrl: './bmb-notification-counter.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbNotificationCounterComponent {
  counter = input<number>();
  appearance = input<IBmbNotificationCounterType>('notification');
}
