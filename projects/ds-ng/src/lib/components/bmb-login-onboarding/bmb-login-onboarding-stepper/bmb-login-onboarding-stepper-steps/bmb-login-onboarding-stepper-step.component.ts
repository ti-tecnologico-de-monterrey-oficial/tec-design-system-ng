import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../../../directives/bmb-button/button.directive';
import { BmbLoginOnboardingService } from '../../bmb-login-onboarding.service';
import { logDeprecatedInput } from '../../../../utils/logDeprecatedInput';

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
  subtitle = input<string>();
  label = input<string>();
  sublabel = input<string>();
  cancelBackLabel = input.required<string>();
  continueLabel = input.required<string>();
  isContinueDisable = input<boolean>();
  componentTitle = input.required<string>(); // once title is removed, this should be required

  title = input<string>(); // deprecated

  handleContinue = output<any>();

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );

      if (!deprecatedTitle && !newTitle) {
        throw new Error(
          'The "componentTitle" input is required. Please provide a value for it.',
        );
      }
    });
  }

  getActiveStep(): number {
    return this.loginOnboardingService.getActiveStep();
  }

  handleCancelBackStep(): void {
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
