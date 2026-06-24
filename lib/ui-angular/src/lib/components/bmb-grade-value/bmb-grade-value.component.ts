import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
  computed,
} from '@angular/core';

import { IBmbContrast } from '../../types/colors';

import {
  getTruncatedScore,
  type IBmbGradeType,
} from '@ti-tecnologico-de-monterrey-oficial/core/component/grade-value';

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
  appearanceContrast = input<IBmbContrast>('default');
  type = input<IBmbGradeType>('main-grade');
  score = input<number | string | undefined>(0);

  truncatedScore = computed(() =>
    getTruncatedScore(this.score()),
  );
}