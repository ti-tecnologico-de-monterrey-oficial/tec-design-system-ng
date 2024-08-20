import {
  ChangeDetectionStrategy,
  Component,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../../directives/button.directive';
import { BmbUserSummaryComponent } from '../../bmb-user-summary/bmb-user-summary.component';
import { BmbLoginOnboardingService } from '../bmb-login-onboarding.service';
import { IBmbUserInfo } from '../types';

@Component({
  selector: 'bmb-login-onboarding-logged',
  standalone: true,
  imports: [BmbButtonDirective, BmbUserSummaryComponent],
  templateUrl: './bmb-login-onboarding-logged.component.html',
  styleUrl: './bmb-login-onboarding-logged.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginOnboardingLoggedComponent {
  handleRequet = output<any>();

  tecLogoImage: string = '../assets/images/tec-logo.svg';
  mitecImage: string = '../assets/images/logos-mitec/logo_mitec-vertical.svg';

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {}

  getUserInfo(): IBmbUserInfo {
    return this.loginOnboardingService.userInfo();
  }

  _handleContinue(): void {
    this.loginOnboardingService.setIsLoading(true);
    this.handleRequet.emit({
      action: 'init',
      callback: () => {
        this.loginOnboardingService.setIsLoading(false);
      },
    });
  }
}
