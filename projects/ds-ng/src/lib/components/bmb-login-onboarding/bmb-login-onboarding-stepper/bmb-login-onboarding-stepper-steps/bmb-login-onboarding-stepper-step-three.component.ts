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
      (handleContinue)="_handleRequet()"
    >
      <ng-content />
    </bmb-login-onboarding-stepper-step>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginOnboardingStepperStepThreeComponent {
  handleRequet = output<any>();

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {}

  _handleRequet(): void {
    this.loginOnboardingService.setIsLoading(true);
    this.handleRequet.emit({
      activeStep: this.loginOnboardingService.getActiveStep(),
      callback: (result: boolean) => {
        if (result) {
          this.loginOnboardingService.setIsLoading(false);
          this.loginOnboardingService.setActiveStep(
            this.loginOnboardingService.getActiveStep() + 1,
          );
        }
      },
    });
  }
}
