import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../../directives/button.directive';
import { BmbLoginOnboardingService } from '../bmb-login-onboarding.service';

@Component({
  selector: 'bmb-login-onboarding-logout',
  standalone: true,
  imports: [BmbButtonDirective],
  templateUrl: './bmb-login-onboarding-logout.component.html',
  styleUrl: './bmb-login-onboarding-logout.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginOnboardingLogoutComponent {
  checkCircleImage: string = '../assets/images/placeholders/check-circle.svg';

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {}

  handleContinuePage(): void {
    this.loginOnboardingService.setUserInfo({
      id: 'A00123456',
      fullName: 'Borrego Perez',
      profilePicture: '../assets/images/placeholders/user-icon-test.svg',
    });
    this.loginOnboardingService.setActivePage(
      this.loginOnboardingService.getActivePage() + 1,
    );
  }
}
