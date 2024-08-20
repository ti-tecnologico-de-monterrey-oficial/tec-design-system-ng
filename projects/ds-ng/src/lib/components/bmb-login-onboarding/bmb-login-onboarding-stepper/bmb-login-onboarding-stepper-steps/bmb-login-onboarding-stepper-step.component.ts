import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../../../directives/button.directive';
import { BmbLoginOnboardingService } from '../../bmb-login-onboarding.service';

@Component({
  selector: 'bmb-login-onboarding-stepper-step',
  standalone: true,
  imports: [BmbButtonDirective],
  templateUrl: './bmb-login-onboarding-stepper-step.component.html',
  styleUrl: './bmb-login-onboarding-stepper-step.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginOnboardingStepperStepComponent {
  title = input.required<string>();
  subtitle = input<string>();
  label = input<string>();
  sublabel = input<string>();
  cancelBackLabel = input.required<string>();
  continueLabel = input.required<string>();

  isContinueDisable = model<boolean>();

  handleContinue = output<any>();

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {}

  getActiveStep(): number {
    return this.loginOnboardingService.getActiveStep();
  }

  handleCancelBackStept(): void {
    if (
      this.getActiveStep() &&
      this.getActiveStep() !== this.loginOnboardingService.getTotalSteps() - 1
    ) {
      this.loginOnboardingService.setActiveStep(this.getActiveStep() - 1);
      return;
    }

    this.loginOnboardingService.setActiveStep(0);
    this.loginOnboardingService.setActivePage(0);
  }

  handleContinueStep(event: unknown): void {
    this.handleContinue.emit(event);
  }
}
