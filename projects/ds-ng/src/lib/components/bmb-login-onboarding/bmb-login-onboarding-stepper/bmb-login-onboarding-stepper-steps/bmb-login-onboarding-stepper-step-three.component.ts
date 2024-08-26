import {
  ChangeDetectionStrategy,
  Component,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbLoginOnboardingStepperStepComponent } from './bmb-login-onboarding-stepper-step.component';
import { BmbLoginOnboardingService } from '../../bmb-login-onboarding.service';

@Component({
  selector: 'bmb-login-onboarding-stepper-step-three',
  standalone: true,
  imports: [BmbLoginOnboardingStepperStepComponent],
  template: `
    <bmb-login-onboarding-stepper-step
      title="Paso 3"
      subtitle="Registra tus datos biométricos"
      cancelBackLabel="Anterior"
      continueLabel="Siguiente"
      (handleContinue)="_handleContinueStep()"
    >
      <ng-content />
    </bmb-login-onboarding-stepper-step>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginOnboardingStepperStepThreeComponent {
  handleRequest = output<any>();
  handleContinueStep = output();

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {}

  _handleContinueStep(): void {
    this.loginOnboardingService.setIsLoading(true);
    this.handleRequest.emit({
      action: 'biometric',
      callback: (result: boolean) => {
        if (result) {
          this.loginOnboardingService.setIsLoading(false);
          this.handleContinueStep.emit();
        }
      },
    });
  }
}
