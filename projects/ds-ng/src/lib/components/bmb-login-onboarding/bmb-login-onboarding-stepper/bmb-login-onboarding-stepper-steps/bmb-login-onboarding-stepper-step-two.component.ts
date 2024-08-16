import { ChangeDetectionStrategy, Component, model, ViewEncapsulation } from '@angular/core';
import { BmbLoginOnboardingStepperStepComponent } from './bmb-login-onboarding-stepper-step.component';
import { BmbTotpComponent } from '../../../bmb-totp/bmb-totp.component';
import { BmbLoginOnboardingService } from '../../bmb-login-onboarding.service';
import { IBmbError } from '../../types';

@Component({
  selector: 'bmb-login-onboarding-stepper-step-two',
  standalone: true,
  imports: [
    BmbLoginOnboardingStepperStepComponent,
    BmbTotpComponent,
  ],
  template: `
    <bmb-login-onboarding-stepper-step
      title="Paso 2"
      subtitle="Ingresa tu ToTP"
      label="Recuerda que debes contar con la aplicación de identificación"
      sublabel="(Google/Microsoft Authenticator)"
      cancelBackLabel="Anterior "
      continueLabel="Siguiente"
      [isContinueDisable]="isContinueDisable()"
    >
      <bmb-totp
        instanceId="toTP"
        [maxCode]="6"
        [codeError]="getCodeError()"
        [errorMessage]="getErrorMessage()"
        (handleSubmit)="verifyCode($event)"
      />
    </bmb-login-onboarding-stepper-step>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BmbLoginOnboardingStepperStepTwoComponent {
  isContinueDisable = model<boolean>(true);

  error: IBmbError = {  codeError: false, errorMessage: '' };

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {}

  getCodeError(): boolean {
    return this.error && this.error.codeError;
  }

  getErrorMessage(): string {
    return this.error && this.error.errorMessage;
  }

  verifyCode(receivedCode: string) {
    this.isContinueDisable.set(true);

    if (receivedCode === '') {
      this.error = {
        codeError: true,
        errorMessage: 'Por favor llena todos los campos correctamente',
      };
      return;
    }

    if (receivedCode !== this.loginOnboardingService.getCorrectCode()) {
      this.error = {
        codeError: true,
        errorMessage: 'Código no válido, por favor intenta de nuevo',
      };
      return;
    }

    this.isContinueDisable.set(false);
    this.error = { codeError: false, errorMessage: '' };
  }
}
