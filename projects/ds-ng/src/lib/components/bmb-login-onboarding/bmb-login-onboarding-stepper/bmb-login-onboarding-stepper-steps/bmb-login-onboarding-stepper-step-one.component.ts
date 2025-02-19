import {
  ChangeDetectionStrategy,
  Component,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbLoginOnboardingStepperStepComponent } from './bmb-login-onboarding-stepper-step.component';
import { FormGroup } from '@angular/forms';
import { BmbLoginOnboardingService } from '../../bmb-login-onboarding.service';
import { BmbLoginContentComponent } from '../../../bmb-login/bmb-login-content/bmb-login-content.component';
import { IBmbLinkConfiguration } from '../../../../types';

@Component({
  selector: 'bmb-login-onboarding-stepper-step-one',
  standalone: true,
  imports: [BmbLoginOnboardingStepperStepComponent, BmbLoginContentComponent],
  template: `
    <bmb-login-onboarding-stepper-step
      title="Paso 1"
      subtitle="Ingresa con tu cuenta institucional"
      cancelBackLabel="Cancelar"
      continueLabel="Siguiente"
      [isContinueDisable]="!isEnabled"
      (handleContinue)="_handleContinueStep()"
    >
      <bmb-login-content
        [forgottenPasswordLabel]="getForgottenPassword().label"
        [forgottenPasswordLink]="getForgottenPassword().link"
        [forgottenPasswordTarget]="getForgottenPassword().target!"
        [(onContinue)]="isEnabled"
        (onFormGroup)="handleContinueForm($event)"
      />
    </bmb-login-onboarding-stepper-step>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginOnboardingStepperStepOneComponent {
  handleRequest = output<any>();
  handleContinueStep = output();

  userForm: FormGroup = new FormGroup({});
  isEnabled: boolean = false;

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {}

  getForgottenPassword(): IBmbLinkConfiguration {
    return this.loginOnboardingService.getLoginOnBoardingCustomization()
      .forgottenPassword;
  }

  handleContinueForm(event: FormGroup): void {
    this.userForm = event;
  }

  _handleContinueStep(): void {
    this.loginOnboardingService.setIsLoading(true);
    this.handleRequest.emit({
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
