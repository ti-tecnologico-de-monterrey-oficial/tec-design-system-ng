import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbHeaderSectionComponent } from '../bmb-header-section/bmb-header-section.component';

export interface IBbmHeader {}

@Component({
  selector: 'bmb-evaluation-rubric',
  standalone: true,
  imports: [BmbHeaderSectionComponent],
  templateUrl: './bmb-evaluation-rubric.component.html',
  styleUrl: './bmb-evaluation-rubric.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbEvaluationRubricComponent {
  title = input<string>('');
  icon = input<string>('');
  rightIcon = input<string>('');

  onClickRight = output<any>();
}
