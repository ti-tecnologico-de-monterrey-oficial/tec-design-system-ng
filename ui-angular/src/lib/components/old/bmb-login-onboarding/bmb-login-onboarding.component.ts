import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbLoginOnboardingLoginComponent } from './bmb-login-onboarding-login/bmb-login-onboarding-login.component';
import { BmbLoginOnboardingStepperComponent } from './bmb-login-onboarding-stepper/bmb-login-onboarding-stepper.component';
import { BmbLoginOnboardingService } from './bmb-login-onboarding.service';
import { BmbLoginOnboardingLogoutComponent } from './bmb-login-onboarding-logout/bmb-login-onboarding-logout.component';
import { BmbLoginOnboardingLoggedComponent } from './bmb-login-onboarding-logged/bmb-login-onboarding-logged.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { IBmbLinkConfiguration } from '../../types';
import { BmbTranslationsService } from '../../services/translations/translations.service';

export interface IBmbLoginOnBoardingCustomization {
  anotherAccount: IBmbLinkConfiguration;
  forgottenPassword: IBmbLinkConfiguration;
}

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

  constructor(
    private loginOnboardingService: BmbLoginOnboardingService,
    private translationService: BmbTranslationsService,
  ) {}

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
