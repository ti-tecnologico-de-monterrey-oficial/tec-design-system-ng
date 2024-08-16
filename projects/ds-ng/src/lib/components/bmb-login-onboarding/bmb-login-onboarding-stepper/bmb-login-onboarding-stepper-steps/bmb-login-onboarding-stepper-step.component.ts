import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../../../directives/button.directive';
import { BmbLoginOnboardingService } from '../../bmb-login-onboarding.service';
import { MatDialog } from '@angular/material/dialog';
import { BmbModalComponent } from '../../../bmb-modal/bmb-modal.component';
import { ModalDataConfig } from '../../../bmb-modal/bmb-modal.interface';

@Component({
  selector: 'bmb-login-onboarding-stepper-step',
  standalone: true,
  imports: [BmbButtonDirective],
  templateUrl: './bmb-login-onboarding-stepper-step.component.html',
  styleUrl: './bmb-login-onboarding-stepper-step.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginOnboardingStepperStepComponent {
  title = input.required<string>();
  subtitle = input<string>();
  label = input<string>();
  sublabel = input<string>();
  cancelBackLabel = input.required<string>();
  continueLabel = input.required<string>();

  isContinueDisable = model<boolean>();

  totalSteps: number = 0;
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
  ) {
    this.totalSteps = this.loginOnboardingService.getTotalSteps();
  }

  openModalComponent(): void {
    this.matDialog.open(BmbModalComponent, { data: this.data });
  }

  getActiveStep(): number {
    return this.loginOnboardingService.getActiveStep();
  }

  handleCancelBackStept(): void {
    if (this.getActiveStep() && this.getActiveStep() !== this.totalSteps - 1) {
      this.loginOnboardingService.setActiveStep(this.getActiveStep() - 1);
    }
  }

  handleContinueStep(): void {
    if (this.getActiveStep() === this.totalSteps - 1) {
      this.openModalComponent();
      this.matDialog.afterAllClosed.subscribe(() => {
        this.loginOnboardingService.setActivePage(
          this.loginOnboardingService.getActivePage() + 1,
        );
      });
    }

    // this.loginOnboardingService.setIsLoading(true);

    this.loginOnboardingService.setActiveStep(this.getActiveStep() + 1);
  }
}
