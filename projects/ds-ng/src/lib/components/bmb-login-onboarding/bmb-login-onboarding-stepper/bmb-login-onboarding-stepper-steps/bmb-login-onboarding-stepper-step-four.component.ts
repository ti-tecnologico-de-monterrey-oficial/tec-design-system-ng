import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { BmbLoginOnboardingStepperStepComponent } from './bmb-login-onboarding-stepper-step.component';
import { BmbLoginOnboardingService } from '../../bmb-login-onboarding.service';
import { BmbNativeModalService } from '../../../../services/native-modal.service';
import { IBmbNativeModal } from '../../../bmb-modal/bmb-modal.interface';

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

  credentialExample: string = '../assets/images/placeholders/credential.svg';
  data: IBmbNativeModal = {
    title: 'Entrada a campus',
    content: 'Podrás cambiar esta configuración en cualquier momento',
    size: 'large',
    actions: [
      {
        buttonName: 'aceptar',
        label: 'Aceptar',
        appearance: 'primary',
        action: () => {
          this._handleContinueStep();
          this.modalService.closeModal(this.modalId() as string);
        },
      },
    ],
  };

  constructor(
    private loginOnboardingService: BmbLoginOnboardingService,
    private modalService: BmbNativeModalService,
  ) {}

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
