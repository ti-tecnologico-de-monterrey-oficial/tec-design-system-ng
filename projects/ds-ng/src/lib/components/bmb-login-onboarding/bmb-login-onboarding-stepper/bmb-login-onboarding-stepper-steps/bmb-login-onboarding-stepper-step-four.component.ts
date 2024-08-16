import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BmbLoginOnboardingStepperStepComponent } from './bmb-login-onboarding-stepper-step.component';

@Component({
  selector: 'bmb-login-onboarding-stepper-step-four',
  standalone: true,
  imports: [BmbLoginOnboardingStepperStepComponent],
  template: `
    <bmb-login-onboarding-stepper-step
      title="Paso 4"
      subtitle="Activa tu entrada a Campus"
      label="Con esta funcionalidad tu ID Digital te permitirá ingresar al campus automáticamente."
      sublabel="(Siempre podrás utilizar tu ID Digital manualmente y podrás cambiar esta configuración)"
      cancelBackLabel="No, gracias"
      continueLabel="Activar"
    >
      <section>
        <img alt="Credential example" [src]="credentialExample" />
      </section>
    </bmb-login-onboarding-stepper-step>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginOnboardingStepperStepFourComponent {
  credentialExample: string = '../assets/images/placeholders/credential.svg';
}
