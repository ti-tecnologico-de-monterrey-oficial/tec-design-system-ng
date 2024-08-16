import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BmbLoginOnboardingStepperStepComponent } from './bmb-login-onboarding-stepper-step.component';

@Component({
  selector: 'bmb-login-onboarding-stepper-step-three',
  standalone: true,
  imports: [
    BmbLoginOnboardingStepperStepComponent,
  ],
  template: `
    <bmb-login-onboarding-stepper-step
          title="Paso 3"
          subtitle="Registra tus datos biométricos"
          cancelBackLabel="Anterior"
          continueLabel="Siguiente"
        >
        </bmb-login-onboarding-stepper-step>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BmbLoginOnboardingStepperStepThreeComponent {

}
