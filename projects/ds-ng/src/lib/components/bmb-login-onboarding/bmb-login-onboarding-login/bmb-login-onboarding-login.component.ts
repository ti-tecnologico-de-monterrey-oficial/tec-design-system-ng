import {
  ChangeDetectionStrategy,
  Component,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../../directives/button.directive';

@Component({
  selector: 'bmb-login-onboarding-login',
  standalone: true,
  imports: [BmbButtonDirective],
  templateUrl: './bmb-login-onboarding-login.component.html',
  styleUrl: './bmb-login-onboarding-login.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginOnboardingLoginComponent {
  handleContinuePage = output();

  tecLogoImage: string = '../assets/images/tec-logo.svg';
  mitecImage: string = '../assets/images/logos-mitec/logo_mitec-vertical.svg';

  _handleContinuePage(): void {
    this.handleContinuePage.emit();
  }
}
