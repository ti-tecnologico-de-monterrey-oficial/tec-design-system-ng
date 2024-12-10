import {
  ChangeDetectionStrategy,
  Component,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbInputComponent } from '../../../bmb-input/bmb-input.component';
import { BmbLoginOnboardingStepperStepComponent } from './bmb-login-onboarding-stepper-step.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BmbLoginOnboardingService } from '../../bmb-login-onboarding.service';
import { BmbFormService } from '../../../../directives/bmb-form-control/bmb-form-control.service';

@Component({
  selector: 'bmb-login-onboarding-stepper-step-one',
  standalone: true,
  imports: [BmbLoginOnboardingStepperStepComponent, BmbInputComponent],
  template: `
    <bmb-login-onboarding-stepper-step
      title="Paso 1"
      subtitle="Ingresa con tu cuenta institucional"
      cancelBackLabel="Cancelar"
      continueLabel="Siguiente"
      [isContinueDisable]="isContinueDisable()"
      (handleContinue)="_handleContinueStep()"
    >
      <span class="bmb_login-onboarding-stepper-step-one-input">
        <bmb-input
          name="user"
          placeholder="Usuario"
          icon="account_circle"
          errorMessage="El usuario es requerido"
          appearance="normal"
          [disabled]="false"
          [isRequired]="true"
          (onBlur)="onSubmit()"
        />
      </span>
      <span class="bmb_login-onboarding-stepper-step-one-input">
        <bmb-input
          type="password"
          name="password"
          placeholder="Contraseña"
          icon="lock"
          errorMessage="La contraseña es requerida"
          appearance="normal"
          [disabled]="false"
          [isRequired]="true"
          (onBlur)="onSubmit()"
        />
      </span>
      <p class="bmb_login-onboarding-stepper-step-content-subcontent-sublabel">
        ¿Olvidaste tu contraseña?
      </p>
    </bmb-login-onboarding-stepper-step>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginOnboardingStepperStepOneComponent {
  isContinueDisable = model<boolean>(true);

  handleRequest = output<any>();
  handleContinueStep = output();

  constructor(
    private loginOnboardingService: BmbLoginOnboardingService,
    private formService: BmbFormService,
  ) {}

  onSubmit(): void {
    if (this.formService.getFormGroup().valid) {
      this.isContinueDisable.set(false);
      return;
    }
    this.isContinueDisable.set(true);
  }

  _handleContinueStep(): void {
    this.loginOnboardingService.setIsLoading(true);
    this.handleRequest.emit({
      data: this.formService.getFormGroup()['value'],
      action: 'auth',
      callback: (result: boolean) => {
        if (result) {
          this.loginOnboardingService.setUserInfo({
            id: this.formService.getFormControlByName('user').value,
            fullName: '',
            profilePicture: '',
          });
          this.loginOnboardingService.setIsLoading(false);
          this.handleContinueStep.emit();
        }
      },
    });
  }
}
