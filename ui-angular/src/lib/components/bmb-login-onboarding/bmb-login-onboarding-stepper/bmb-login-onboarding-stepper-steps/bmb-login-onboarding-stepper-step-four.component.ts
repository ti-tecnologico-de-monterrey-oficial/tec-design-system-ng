import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { BmbLoginOnboardingStepperStepComponent } from './bmb-login-onboarding-stepper-step.component';
import { BmbLoginOnboardingService } from '../../bmb-login-onboarding.service';
import { BmbNativeModalService } from '../../../../services/old/modal/native-modal.service';
import { IBmbNativeModal } from '../../../bmb-modal/bmb-modal.interface';
import { BmbTranslationsService } from '../../../../services/translations/translations.service';
import { TranslatePipe } from '../../../../pipes/translations';

@Component({
  selector: 'bmb-login-onboarding-stepper-step-four',
  standalone: true,
  imports: [BmbLoginOnboardingStepperStepComponent, TranslatePipe],
  template: `
    <bmb-login-onboarding-stepper-step
      [componentTitle]="'login_onboarding.stepper.step_four.title' | translate"
      [subtitle]="'login_onboarding.stepper.step_four.subtitle' | translate"
      [label]="'login_onboarding.stepper.step_four.label' | translate"
      [sublabel]="'login_onboarding.stepper.step_four.sublabel' | translate"
      [cancelBackLabel]="'login_onboarding.stepper.step_four.cancel' | translate"
      [continueLabel]="'login_onboarding.stepper.step_four.continue' | translate"
      (handleContinue)="handleContinue()"
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
  handleRequest = output<any>();
  handleContinuePage = output();

  modalId = signal<string | null>(null);

  private loginOnboardingService: BmbLoginOnboardingService = inject(BmbLoginOnboardingService);
  private modalService: BmbNativeModalService = inject(BmbNativeModalService);
  private readonly translationsService = inject(BmbTranslationsService);

  credentialExample = '../assets/images/placeholders/credential.svg';
  data: IBmbNativeModal = {
    title: this.translationsService.translate('login_onboarding.stepper.step_four.modal_title'),
    content: this.translationsService.translate('login_onboarding.stepper.step_four.modal_content'),
    size: 'large',
    actions: [
      {
        buttonName: 'aceptar',
        label: this.translationsService.translate('login_onboarding.stepper.step_four.modal_accept'),
        appearance: 'primary',
        action: () => {
          this._handleContinueStep();
          this.modalService.closeModal(this.modalId() as string);
        },
      },
    ],
  };

  openModalComponent(): void {
    this.modalId.set(this.modalService.openModal(this.data));
  }

  handleContinue(): void {
    this.openModalComponent();
  }

  _handleContinueStep(): void {
    this.loginOnboardingService.setIsLoading(true);
    this.handleRequest.emit({
      action: 'activate',
      callback: (result: boolean) => {
        if (result) {
          this.loginOnboardingService.setIsLoading(false);
          this.handleContinuePage.emit();
        }
      },
    });
  }
}
