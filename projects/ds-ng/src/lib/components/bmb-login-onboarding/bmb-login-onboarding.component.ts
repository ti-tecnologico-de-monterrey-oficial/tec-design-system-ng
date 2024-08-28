import {
  ChangeDetectionStrategy,
  Component,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbLoginOnboardingLoginComponent } from './bmb-login-onboarding-login/bmb-login-onboarding-login.component';
import { BmbLoginOnboardingStepperComponent } from './bmb-login-onboarding-stepper/bmb-login-onboarding-stepper.component';
import { BmbLoginOnboardingService } from './bmb-login-onboarding.service';
import { BmbLoginOnboardingLogoutComponent } from './bmb-login-onboarding-logout/bmb-login-onboarding-logout.component';
import { BmbLoginOnboardingLoggedComponent } from './bmb-login-onboarding-logged/bmb-login-onboarding-logged.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-login-onboarding',
  standalone: true,
  imports: [
    BmbLoginOnboardingLoginComponent,
    BmbLoginOnboardingStepperComponent,
    BmbLoginOnboardingLogoutComponent,
    BmbLoginOnboardingLoggedComponent,
    BmbIconComponent,
  ],
  templateUrl: './bmb-login-onboarding.component.html',
  styleUrl: './bmb-login-onboarding.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginOnboardingComponent {
  handleRequest = output<any>();

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {}

  getIsLoading(): boolean {
    return this.loginOnboardingService.getIsLoading();
  }

  getActivePage(): number {
    return this.loginOnboardingService.getActivePage();
  }

  _handleRequest(event: unknown): void {
    this.handleRequest.emit(event);
  }

  handleContinuePage(): void {
    this.loginOnboardingService.setActivePage(
      this.loginOnboardingService.getActivePage() + 1,
    );
  }
}
