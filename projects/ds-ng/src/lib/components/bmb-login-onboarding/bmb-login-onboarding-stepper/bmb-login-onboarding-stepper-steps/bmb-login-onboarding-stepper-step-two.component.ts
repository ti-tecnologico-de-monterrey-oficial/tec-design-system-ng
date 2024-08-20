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
      (handleContinue)="_handleContinueStep()"
    >
      <bmb-totp
        instanceId="toTP"
        [maxCode]="maxCode"
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
  handleContinueStep = output();

  error: IBmbError = { codeError: false, errorMessage: '' };
  code: string = '';
  maxCode: number = 6;

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {}

  getCodeError(): boolean {
    return this.error && this.error.codeError;
  }

  getErrorMessage(): string {
    return this.error && this.error.errorMessage;
  }

  verifyCode(receivedCode: string): void {
    this.error = { codeError: false, errorMessage: '' };

    if (receivedCode.length === this.maxCode) {
      this.isContinueDisable.set(false);
      this.code = receivedCode;
    }
  }

  _handleContinueStep(): void {
    this.loginOnboardingService.setIsLoading(true);
    this.handleRequet.emit({
      data: this.code,
      action: 'toTP',
      callback: (result: boolean) => {
        this.loginOnboardingService.setIsLoading(false);

        if (result) {
          this.handleContinueStep.emit();
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
