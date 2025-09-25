import { CommonModule } from '@angular/common';
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
    const _counter: string =
      this.counter()! > 99 ? '99+' : this.counter()?.toString()!;

    if (this.appearance() === 'plain') return `(${_counter})`;
    return `${_counter}`;
  }
}
