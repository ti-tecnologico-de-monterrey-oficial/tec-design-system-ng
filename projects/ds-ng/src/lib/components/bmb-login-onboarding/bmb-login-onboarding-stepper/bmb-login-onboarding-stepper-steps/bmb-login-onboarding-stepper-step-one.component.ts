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
      (handleRequetAuthorization)="handleAuth($event)"
    >
      <span class="bmb_login-onboarding-stepper-step-one-input">
        <bmb-input
          placeholder="Usuario"
          icon="account_circle"
          errorMessage="El usuario es requerido"
          appearance="normal"
          [disabled]="false"
          [isRequired]="true"
          [control]="getFormControl('user')"
          [showError]="showErrors['user']"
          (isBlur)="onSubmit()"
        />
      </span>
      <span class="bmb_login-onboarding-stepper-step-one-input">
        <bmb-input
          type="password"
          placeholder="Contraseña"
          icon="lock"
          errorMessage="La contraseña es requerida"
          appearance="normal"
          [disabled]="false"
          [isRequired]="true"
          [control]="getFormControl('password')"
          [showError]="showErrors['password']"
          (isBlur)="onSubmit()"
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
  handleRequetAuthorization = output<any>();

  isContinueDisable = model<boolean>(true);

  userForm: FormGroup = new FormGroup({
    user: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });
  showErrors: { [key: string]: boolean } = {};

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {}

  handleAuth(event: unknown) {
    this.handleRequetAuthorization.emit(event);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.loginOnboardingService.setAuthenticateInfo(this.userForm.value);
      this.isContinueDisable.set(false);
      return;
    }
    this.userForm.markAllAsTouched();
    this.updateErrorState();
    this.isContinueDisable.set(true);
  }

  updateErrorState(): void {
    Object.keys(this.userForm.controls).forEach((field) => {
      const control = this.userForm.get(field);
      if (control instanceof FormControl) {
        this.showErrors[field] =
          control.invalid && (control.touched || control.dirty);
      }
    });
  }

  getFormControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
  }
}
