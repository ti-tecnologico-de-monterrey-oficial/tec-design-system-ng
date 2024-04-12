import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'bmb-progress-circle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-progress-circle.component.html',
  styleUrl: './bmb-progress-circle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbProgressCircleComponent implements OnChanges {
  @Input() percentValue: number | null = 50;
  @Input() title?: string | null;
  @Input() valueLabel?: number | null;

  radius = 74;
  circunference = 2 * Math.PI * this.radius;
  dashoffset = 0;
  symbol = '%';

  constructor() {
    this.progress(0);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['percentValue']) {
      if (changes['percentValue'].currentValue > 100) {
        this.progress(100);
      } else {
        this.progress(changes['percentValue'].currentValue);
      }
    }
  }

  progress(value: number) {
    const progress = value / 100;
    this.dashoffset = -this.circunference * (1 - progress);
  }
}
