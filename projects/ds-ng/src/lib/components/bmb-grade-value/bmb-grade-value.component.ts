import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';

export type IBmbGradeType = 'main-grade' | 'partial-grade';

@Component({
  selector: 'bmb-grade-value',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-grade-value.component.html',
  styleUrl: './bmb-grade-value.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbGradeValueComponent {
  type = input<IBmbGradeType>('main-grade');
  score = input<number | string | undefined>(0);
}
