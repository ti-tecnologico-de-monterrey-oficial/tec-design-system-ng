import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  OnChanges,
  input,
  signal,
  computed,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { IBmbTargetLink } from '../../types';

export type IBmbProgressBarVariations = 'info' | 'warning' | 'error';
export type IBmbProgressBarTypes = 'simple' | 'counter' | 'container';

@Component({
  selector: 'bmb-progress-bar',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  templateUrl: './bmb-progress-bar.component.html',
  styleUrl: './bmb-progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbProgressBarComponent {
  type = input<IBmbProgressBarTypes>('simple');
  totalCount = input<number>(0);
  counter = input<number>(0);
  title = input<string>('');
  appearance = input<IBmbProgressBarVariations>('info');
  textLink = input<string>('');
  href = input<string>('');
  target = input<IBmbTargetLink>('_blank');
  textFormat = input<((counter: string, total: string) => string) | null>(null);

  progressValue = computed(() => {
    const numberProgress = ((this.counter() / this.totalCount()) * 100);
    let newProgress = numberProgress.toFixed(2);
    if (numberProgress < 0) newProgress = '0';
    if (numberProgress > 100) newProgress = '100';

    return newProgress;
  });

  getFormattedText(): string {
    if (this.textFormat() !== null) {
      return this.textFormat()!(this.counter().toString(), this.totalCount().toString());
    }

    return `${this.counter()}/${this.totalCount()}`;
  }
}
