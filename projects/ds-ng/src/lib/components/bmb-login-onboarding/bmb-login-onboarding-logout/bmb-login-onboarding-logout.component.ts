import {
  ChangeDetectionStrategy,
  Component,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../../directives/button.directive';
import { BmbLoginOnboardingService } from '../bmb-login-onboarding.service';
import { IBmbUserInfo } from '../types';

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
  handleRequet = output<any>();
  handleContinuePage = output();

  checkCircleImage: string = '../assets/images/placeholders/check-circle.svg';

  constructor(private loginOnboardingService: BmbLoginOnboardingService) {}

  _handleContinuePage(): void {
    this.loginOnboardingService.setIsLoading(true);
    this.handleRequet.emit({
      data: this.loginOnboardingService.getUserInfo()['id'],
      action: 'getUserInfo',
      callback: (result: IBmbUserInfo) => {
        if (result) {
          this.loginOnboardingService.setUserInfo(result);
          this.loginOnboardingService.setIsLoading(false);
          this.handleContinuePage.emit();
        }
      },
    });
  }
}
