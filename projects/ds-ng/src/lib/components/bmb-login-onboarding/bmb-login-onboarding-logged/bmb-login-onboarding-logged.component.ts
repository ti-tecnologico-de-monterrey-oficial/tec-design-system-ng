import {
  ChangeDetectionStrategy,
  Component,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../../directives/button.directive';
import { BmbLoginOnboardingService } from '../bmb-login-onboarding.service';
import { IBmbLinkConfiguration, IBmbUserInfo } from '../../../types';
import { BmbUserProfileContentComponent } from '../../bmb-user-profile/bmb-user-profile-content/bmb-user-profile-content.component';

@Component({
  selector: 'bmb-login-onboarding-logged',
  standalone: true,
  imports: [BmbButtonDirective, BmbUserProfileContentComponent],
  templateUrl: './bmb-login-onboarding-logged.component.html',
  styleUrl: './bmb-login-onboarding-logged.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginOnboardingLoggedComponent {
  handleRequest = output<any>();

  tecLogoImage: string = '../assets/images/tec-logo.svg';
  mitecImage: string = '../assets/images/logos-mitec/logo_mitec-vertical.svg';

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {}

  getUserInfo(): IBmbUserInfo {
    return this.loginOnboardingService.userInfo();
  }

  getAnotherAccount(): IBmbLinkConfiguration {
    return this.loginOnboardingService.getLoginOnBoardingCustomization()
      .anotherAccount;
  }

  _handleContinue(): void {
    this.loginOnboardingService.setIsLoading(true);
    this.handleRequest.emit({
      action: 'init',
      callback: () => {
        this.loginOnboardingService.setIsLoading(false);
      },
    });
  }
}
