import {
  ChangeDetectionStrategy,
  Component,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { BmbLoginOnboardingService } from '../bmb-login-onboarding.service';
import { IBmbLinkConfiguration, IBmbUserInfo } from '../../../types';
import { BmbUserProfileContentComponent } from '../../bmb-user-profile/bmb-user-profile-content/bmb-user-profile-content.component';
import { BmbMitecLogoAnimationComponent } from '../../bmb-mitec-logo-animation/bmb-mitec-logo-animation.component';

@Component({
  selector: 'bmb-login-onboarding-logged',
  standalone: true,
  imports: [
    BmbButtonDirective,
    BmbUserProfileContentComponent,
    BmbMitecLogoAnimationComponent,
  ],
  templateUrl: './bmb-login-onboarding-logged.component.html',
  styleUrl: './bmb-login-onboarding-logged.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginOnboardingLoggedComponent {
  handleRequest = output<any>();

  tecLogoImage: string = '../assets/images/tec-logo.svg';

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
