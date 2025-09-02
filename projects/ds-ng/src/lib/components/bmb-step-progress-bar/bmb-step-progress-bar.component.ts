import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  TemplateRef,
  output,
  model,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

/**
 * Component that displays a step progress bar, supporting horizontal, vertical, and step-panel layouts.
 * Allows navigation between steps, emits events on step changes, and supports customization of labels and templates.
 *
 * @example
 * <bmb-step-progress-bar
 *   [totalSteps]="5"
 *   [activeStep]="2"
 *   [labelSteps]="['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']"
 *   (onStepPress)="handleStepPress($event)">
 * </bmb-step-progress-bar>
 *
 * @property activeStep - The currently active step (zero-based index).
 * @property totalSteps - The total number of steps in the progress bar.
 * @property size - The size of the progress bar ('normal', 'default', 'small', or 'medium').
 * @property freeze - If true, disables interaction with the steps.
 * @property type - The layout type of the progress bar ('horizontal', 'vertical', or 'step-panel').
 * @property labelSteps - Array of labels for each step.
 * @property labelComplete - Label for completed steps.
 * @property labelIncomplete - Label for incomplete steps.
 * @property stepTemplates - Array of custom templates for each step.
 *
 * @event onStepPress - Emits the index of the step when a step is pressed.
 * @event onStepPanelPress - Emits the index when a step panel is pressed.
 * @event next - Emits when the "next" action is triggered.
 * @event back - Emits when the "back" action is triggered.
 * @event finish - Emits when the "finish" action is triggered.
 *
 * @method getStepsArray - Returns an array of step indices based on totalSteps.
 * @method onStepPanelClicked - Handles click events on step panels, emits onStepPanelPress if not frozen.
 * @method onStepClicked - Handles click events on steps, updates activeStep and emits onStepPress if not frozen.
 * @method goNext - Emits the next event.
 * @method goBack - Emits the back event.
 * @method complete - Emits the finish event.
 */
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
  activeStep = model<number>(0);
  totalSteps = input<number>(0);
  size = input<'normal' | 'default' | 'small' | 'medium'>('normal');
  freeze = input<boolean>(false);
  type = input<'horizontal' | 'vertical' | 'step-panel'>('vertical');
  labelSteps = input<string[]>([]);
  labelComplete = input<string>('Completo');
  labelIncomplete = input<string>('Pendiente');
  stepTemplates = input<TemplateRef<any>[]>([]);

  onStepPress = output<number>();
  onStepPanelPress = output<number>();
  next = output<void>();
  back = output<void>();
  finish = output<void>();

  getStepsArray(): number[] {
    return new Array(this.totalSteps() || 0).fill(0).map((_, i) => i);
  }

  onStepPanelClicked(index: number): void {
    if (!this.freeze()) {
      this.onStepPanelPress.emit(index);
    }
  }

  onStepClicked(index: number): void {
    if (!this.freeze()) {
      this.activeStep.set(index);
      this.onStepPress.emit(index);
    }
  }

  goNext() {
    this.next.emit();
  }

  goBack() {
    this.back.emit();
  }

  complete() {
    this.finish.emit();
  }
}
