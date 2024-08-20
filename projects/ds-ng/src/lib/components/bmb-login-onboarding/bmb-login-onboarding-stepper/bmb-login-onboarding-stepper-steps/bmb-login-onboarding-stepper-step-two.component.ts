import {
  ChangeDetectionStrategy,
  Component,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbLoginOnboardingStepperStepComponent } from './bmb-login-onboarding-stepper-step.component';
import { BmbTotpComponent } from '../../../bmb-totp/bmb-totp.component';
import { BmbLoginOnboardingService } from '../../bmb-login-onboarding.service';
import { IBmbError } from '../../types';

@Component({
  selector: 'bmb-login-onboarding-stepper-step-two',
  standalone: true,
  imports: [BmbLoginOnboardingStepperStepComponent, BmbTotpComponent],
  template: `
    <bmb-login-onboarding-stepper-step
      title="Paso 2"
      subtitle="Ingresa tu ToTP"
      label="Recuerda que debes contar con la aplicación de identificación"
      sublabel="(Google/Microsoft Authenticator)"
      cancelBackLabel="Anterior "
      continueLabel="Siguiente"
      [isContinueDisable]="isContinueDisable()"
      (handleContinue)="handleTPCode()"
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginOnboardingStepperStepTwoComponent {
  isContinueDisable = model<boolean>(true);

  handleRequet = output<any>();

  error: IBmbError = { codeError: false, errorMessage: '' };
  code: string = '';

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {}

  getCodeError(): boolean {
    return this.error && this.error.codeError;
  }

  getErrorMessage(): string {
    return this.error && this.error.errorMessage;
  }

  verifyCode(receivedCode: string): void {
    this.error = { codeError: false, errorMessage: '' };

    if (receivedCode.length === 6) {
      this.isContinueDisable.set(false);
      this.code = receivedCode;
    }
  }

  handleTPCode(): void {
    this.loginOnboardingService.setIsLoading(true);
    this.handleRequet.emit({
      data: this.code,
      activeStep: this.loginOnboardingService.getActiveStep(),
      callback: (result: boolean) => {
        this.loginOnboardingService.setIsLoading(false);

        if (result) {
          this.loginOnboardingService.setActiveStep(
            this.loginOnboardingService.getActiveStep() + 1,
          );
          return;
        }

        this.error = {
          codeError: true,
          errorMessage: 'Código no válido, por favor intenta de nuevo',
        };
      },
    });
  }
}
