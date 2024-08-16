import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BmbButtonDirective } from '../../../directives/button.directive';
import { BmbLoginOnboardingService } from '../bmb-login-onboarding.service';

@Component({
  selector: 'bmb-login-onboarding-login',
  standalone: true,
  imports: [BmbButtonDirective],
  templateUrl: './bmb-login-onboarding-login.component.html',
  styleUrl: './bmb-login-onboarding-login.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BmbLoginOnboardingLoginComponent {
  tecLogoImage: string = '../assets/images/tec-logo.svg';
  mitecImage: string = '../assets/images/logos-mitec/logo_mitec-vertical.svg';

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {}

  handleContinuePage(): void {
    this.loginOnboardingService.setActivePage( this.loginOnboardingService.getActivePage() + 1 );
  }
}
