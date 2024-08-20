import {
  ChangeDetectionStrategy,
  Component,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbLoginOnboardingStepperStepComponent } from './bmb-login-onboarding-stepper-step.component';
import { BmbLoginOnboardingService } from '../../bmb-login-onboarding.service';
import { ModalDataConfig } from '../../../bmb-modal/bmb-modal.interface';
import { MatDialog } from '@angular/material/dialog';
import { BmbModalComponent } from '../../../bmb-modal/bmb-modal.component';

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
  handleRequet = output<any>();

  credentialExample: string = '../assets/images/placeholders/credential.svg';
  data: ModalDataConfig = {
    title: 'Entrada a campus',
    subtitle: '',
    content: 'Podrás cambiar esta configuración en cualquier momento',
    size: 'large',
    type: 'action',
    alertStyle: 'success',
    primaryBtnLabel: 'Aceptar',
  };

  constructor(
    private loginOnboardingService: BmbLoginOnboardingService,
    private matDialog: MatDialog,
  ) {}

  openModalComponent(): void {
    this.matDialog.open(BmbModalComponent, { data: this.data });
    this.matDialog.afterAllClosed.subscribe(() => {
      this._handleRequet();
    });
  }

  handleContinue(): void {
    this.openModalComponent();
  }

  _handleRequet(): void {
    this.loginOnboardingService.setIsLoading(true);
    this.handleRequet.emit({
      activeStep: this.loginOnboardingService.getActiveStep(),
      callback: (result: boolean) => {
        if (result) {
          this.loginOnboardingService.setIsLoading(false);
          this.loginOnboardingService.setActiveStep(
            this.loginOnboardingService.getActiveStep() + 1,
          );
          this.loginOnboardingService.setActivePage(
            this.loginOnboardingService.getActivePage() + 1,
          );
        }
      },
    });
  }
}
