import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  OnChanges,
  input,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

export type IBmbProgressBarVariations = 'info' | 'warning' | 'error';
export type IBmbTarget = '_blank' | '_parent' | '_self' | '_top';
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
export class BmbProgressBarComponent implements OnChanges {
  type = input<IBmbProgressBarTypes>('simple');
  totalCount = input<number>(0);
  counter = input<number>(0);
  title = input<string>('');
  appearance = input<IBmbProgressBarVariations>('info');
  textLink = input<string>('');
  href = input<string>('');
  target = input<IBmbTarget>('_blank');

  progress: number = 0;

  ngOnChanges() {
    this.verifyPercentage();
  }

  verifyPercentage(): void {
    this.progress = (this.counter() / this.totalCount()) * 100;
    if (this.progress < 0) {
      this.progress = 0;
    }

    if (this.progress > 100) {
      this.progress = 100;
    }
  }
}
