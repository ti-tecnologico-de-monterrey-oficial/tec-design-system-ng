import {
  ChangeDetectionStrategy,
  Component,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbStepProgressBarComponent } from '../../bmb-step-progress-bar/bmb-step-progress-bar.component';
import { BmbLoginOnboardingStepperStepOneComponent } from './bmb-login-onboarding-stepper-steps/bmb-login-onboarding-stepper-step-one.component';
import { BmbLoginOnboardingStepperStepTwoComponent } from './bmb-login-onboarding-stepper-steps/bmb-login-onboarding-stepper-step-two.component';
import { BmbLoginOnboardingStepperStepThreeComponent } from './bmb-login-onboarding-stepper-steps/bmb-login-onboarding-stepper-step-three.component';
import { BmbLoginOnboardingStepperStepFourComponent } from './bmb-login-onboarding-stepper-steps/bmb-login-onboarding-stepper-step-four.component';
import { BmbLoginOnboardingService } from '../bmb-login-onboarding.service';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-login-onboarding-stepper',
  standalone: true,
  imports: [
    BmbStepProgressBarComponent,
    BmbLoginOnboardingStepperStepOneComponent,
    BmbLoginOnboardingStepperStepTwoComponent,
    BmbLoginOnboardingStepperStepThreeComponent,
    BmbLoginOnboardingStepperStepFourComponent,
    BmbIconComponent,
  ],
  templateUrl: './bmb-login-onboarding-stepper.component.html',
  styleUrl: './bmb-login-onboarding-stepper.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginOnboardingStepperComponent {
  handleRequet = output<any>();

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {
    this.loginOnboardingService.setTotalSteps(4);
  }

  getIsLoading(): boolean {
    return this.loginOnboardingService.getIsLoading();
  }

  getTotalSteps(): number {
    return this.loginOnboardingService.getTotalSteps();
  }

  getActiveStep(): number {
    return this.loginOnboardingService.getActiveStep();
  }

  handleContinuePage(): void {
    this.loginOnboardingService.setActivePage(
      this.loginOnboardingService.getActivePage() + 1,
    );
  }

  _handleRequet(event: unknown): void {
    this.handleRequet.emit(event);
  }
}
