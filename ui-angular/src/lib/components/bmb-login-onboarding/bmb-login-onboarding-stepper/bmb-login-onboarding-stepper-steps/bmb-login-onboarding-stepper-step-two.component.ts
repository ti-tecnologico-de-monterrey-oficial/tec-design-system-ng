import {
  ChangeDetectionStrategy,
  Component,
  output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { BmbLoginOnboardingStepperStepComponent } from './bmb-login-onboarding-stepper-step.component';
import { BmbTotpComponent } from '../../../bmb-totp/bmb-totp.component';
import { BmbLoginOnboardingService } from '../../bmb-login-onboarding.service';
import { IBmbError } from '../../../../_shared/types/utils';
import { BmbTranslationsService } from '../../../../services/translations/translations.service';
import { TranslatePipe } from '../../../../pipes/translations';

@Component({
  selector: 'bmb-login-onboarding-stepper-step-two',
  standalone: true,
  imports: [BmbLoginOnboardingStepperStepComponent, BmbTotpComponent, TranslatePipe],
  template: `
    <bmb-login-onboarding-stepper-step
      [componentTitle]="'login_onboarding.stepper.step_two.title' | translate"
      [subtitle]="'login_onboarding.stepper.step_two.subtitle' | translate"
      [label]="'login_onboarding.stepper.step_two.label' | translate"
      [sublabel]="'login_onboarding.stepper.step_two.sublabel' | translate"
      [cancelBackLabel]="'login_onboarding.stepper.step_two.cancel' | translate"
      [continueLabel]="'login_onboarding.stepper.step_two.continue' | translate"
      [isContinueDisable]="isContinueDisable"
      (handleContinue)="_handleContinueStep()"
    >
      <bmb-totp
        instanceId="toTP"
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
  handleRequest = output<any>();
  handleContinueStep = output();

  error: IBmbError = { codeError: false, errorMessage: '' };
  code = '';
  maxCode = 6;
  isContinueDisable = true;

  private loginOnboardingService: BmbLoginOnboardingService = inject(BmbLoginOnboardingService);
  private readonly translationsService = inject(BmbTranslationsService);

  getCodeError(): boolean {
    return this.error && this.error.codeError;
  }

  getErrorMessage(): string {
    return this.error && this.error.errorMessage;
  }

  verifyCode(receivedCode: string): void {
    this.error = { codeError: false, errorMessage: '' };

    if (receivedCode.length === this.maxCode) {
      this.isContinueDisable = false;
      this.code = receivedCode;
    }
  }

  _handleContinueStep(): void {
    this.loginOnboardingService.setIsLoading(true);
    this.handleRequest.emit({
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
          errorMessage: this.translationsService.translate('login_onboarding.stepper.step_two.invalid_code'),
        };
      },
    });
  }
}
