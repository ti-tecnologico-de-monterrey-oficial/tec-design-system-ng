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
      (handleContinue)="_handleContinueStep()"
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
  isContinueDisable = model<boolean>(true);

  handleRequet = output<any>();
  handleContinueStep = output();

  userForm: FormGroup = new FormGroup({
    user: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });
  showErrors: { [key: string]: boolean } = {};

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {}

  onSubmit(): void {
    if (this.userForm.valid) {
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

  _handleContinueStep(): void {
    this.loginOnboardingService.setIsLoading(true);
    this.handleRequet.emit({
      data: this.userForm['value'],
      action: 'auth',
      callback: (result: boolean) => {
        if (result) {
          this.loginOnboardingService.setUserInfo({
            id: this.userForm.value['user'],
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
