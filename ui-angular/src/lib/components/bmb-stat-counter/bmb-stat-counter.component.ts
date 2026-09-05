import {
  Component,
  input,
  output,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { getStatCounterStepsArray } from '../../_shared/logic/components/stat-counter';

@Component({
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  styleUrl: './bmb-stat-counter.component.scss',
  selector: 'bmb-stat-counter',
  templateUrl: './bmb-stat-counter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbStatCounterComponent {
  activeStep = input<number>(0);
  totalSteps = input<number>(0);

  onStepPress = output<number>();

  getStepsArray(): number[] {
    return getStatCounterStepsArray(this.totalSteps());
  }

  onStepClicked(index: number): void {
    this.onStepPress.emit(index);
  }
}
