import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { BmbLoginOnboardingLoginComponent } from './bmb-login-onboarding-login/bmb-login-onboarding-login.component';
import { BmbLoginOnboardingStepperComponent } from './bmb-login-onboarding-stepper/bmb-login-onboarding-stepper.component';
import { BmbLoginOnboardingService } from './bmb-login-onboarding.service';
import { BmbLoginOnboardingLogoutComponent } from './bmb-login-onboarding-logout/bmb-login-onboarding-logout.component';
import { BmbLoginOnboardingLoggedComponent } from './bmb-login-onboarding-logged/bmb-login-onboarding-logged.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { IBmbLinkConfiguration } from '../../_shared/types';
import { BmbTranslationsService } from '../../services/translations/translations.service';

export * from './types';

export interface IBmbLoginOnBoardingCustomization {
  anotherAccount: IBmbLinkConfiguration;
  forgottenPassword: IBmbLinkConfiguration;
}

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

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
export class BmbLoginOnboardingComponent implements OnInit {
  loginOnBoardingCustomization = input<IBmbLoginOnBoardingCustomization>({
    anotherAccount: {
      label: '',
      link: '',
    },
    forgottenPassword: {
      label: '',
      link: '',
    },
  });
  handleRequest = output<any>();

  private loginOnboardingService: BmbLoginOnboardingService = inject(BmbLoginOnboardingService);
  private translationService: BmbTranslationsService = inject(BmbTranslationsService);

  ngOnInit(): void {
    const anotherAccountLabel =
      this.loginOnBoardingCustomization().anotherAccount.label ||
      this.translationService.translate('login_onboarding.another_account');
    const forgottenPasswordLabel =
      this.loginOnBoardingCustomization().forgottenPassword.label ||
      this.translationService.translate('login_onboarding.forgot_password');

    this.loginOnboardingService.setLoginOnBoardingCustomization({
      anotherAccount: {
        ...this.loginOnBoardingCustomization().anotherAccount,
        label: anotherAccountLabel,
      },
      forgottenPassword: {
        ...this.loginOnBoardingCustomization().forgottenPassword,
        label: forgottenPasswordLabel,
      },
    });
  }

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
