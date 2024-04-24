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
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  styleUrl: './bmb-stat-counter.component.scss',
  selector: 'bmb-stat-counter',
  templateUrl: './bmb-stat-counter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbStatCounterComponent {
  @Input() activeStep: number = 0;
  @Input() totalSteps?: number = 0;
  @Output() onStepPress: EventEmitter<number> = new EventEmitter<number>();

  getStepsArray(): number[] {
    return new Array(this.totalSteps || 0).fill(0).map((_, i) => i);
  }

  onStepClicked(index: number): void {
    this.activeStep = index;
    this.onStepPress.emit(index);
  }
}
