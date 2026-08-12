import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { getCounter } from '../../_shared/logic/components/notification-counter';
import type { IBmbNotificationCounterType } from '../../_shared/types/components/notification-counter';

export type { IBmbNotificationCounterType } from '../../_shared/types/components/notification-counter';

@Component({
  selector: 'bmb-notification-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-notification-counter.component.html',
  styleUrl: './bmb-notification-counter.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbNotificationCounterComponent {
  counter = input<number>();
  appearance = input<IBmbNotificationCounterType>('notification');

  getCounter(): string {
    return getCounter({
      counter: this.counter(),
      appearance: this.appearance(),
    });
  }
}
