import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-step-progress-bar',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  templateUrl: './bmb-step-progress-bar.component.html',
  styleUrl: './bmb-step-progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbStepProgressBarComponent {
  @Input() activeStep: number = 0;
  @Input() totalSteps?: number = 0;
  @Input() size?: 'normal' | 'small' = 'normal';
  @Output() onStepPress: EventEmitter<number> = new EventEmitter<number>();

  getStepsArray(): number[] {
    return new Array(this.totalSteps || 0).fill(0).map((_, i) => i);
  }

  onStepClicked(index: number): void {
    this.activeStep = index;
    this.onStepPress.emit(index);
  }
}
