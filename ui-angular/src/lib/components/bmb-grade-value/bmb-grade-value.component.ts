import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
  computed,
} from '@angular/core';
import { truncateGradeValue } from '../../_shared/logic';
import type { IBmbContrast } from '../../_shared/types/colors';
import type { IBmbGradeType } from '../../_shared/types/components/grade-value';

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

  truncatedScore = computed(() => {
    return truncateGradeValue(this.score());
  });
}
