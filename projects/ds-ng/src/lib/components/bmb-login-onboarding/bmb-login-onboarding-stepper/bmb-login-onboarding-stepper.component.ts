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

@Component({
  selector: 'bmb-login-onboarding-stepper',
  standalone: true,
  imports: [
    BmbStepProgressBarComponent,
    BmbLoginOnboardingStepperStepOneComponent,
    BmbLoginOnboardingStepperStepTwoComponent,
    BmbLoginOnboardingStepperStepThreeComponent,
    BmbLoginOnboardingStepperStepFourComponent,
  ],
  templateUrl: './bmb-login-onboarding-stepper.component.html',
  styleUrl: './bmb-login-onboarding-stepper.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginOnboardingStepperComponent {
  handleContinuePage = output();
  handleRequet = output<any>();

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {
    this.loginOnboardingService.setTotalSteps(4);
  }

  getTotalSteps(): number {
    return this.loginOnboardingService.getTotalSteps();
  }

  getActiveStep(): number {
    return this.loginOnboardingService.getActiveStep();
  }

  _handleContinuePage(): void {
    this.handleContinuePage.emit();
  }

  _handleRequet(event: unknown): void {
    this.handleRequet.emit(event);
  }

  handleContinueStep(): void {
    this.loginOnboardingService.setActiveStep(
      this.loginOnboardingService.getActiveStep() + 1,
    );
  }
}
