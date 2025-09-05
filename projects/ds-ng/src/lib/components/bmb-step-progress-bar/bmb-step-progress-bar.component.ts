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
}
