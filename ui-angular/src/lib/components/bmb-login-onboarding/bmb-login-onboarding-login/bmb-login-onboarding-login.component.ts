import {
  ChangeDetectionStrategy,
  Component,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { BmbMitecLogoAnimationComponent } from '../../bmb-mitec-logo-animation/bmb-mitec-logo-animation.component';
import { TranslatePipe } from '../../../pipes/translations';

@Component({
  selector: 'bmb-login-onboarding-login',
  standalone: true,
  imports: [BmbButtonDirective, BmbMitecLogoAnimationComponent, TranslatePipe],
  templateUrl: './bmb-login-onboarding-login.component.html',
  styleUrl: './bmb-login-onboarding-login.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginOnboardingLoginComponent {
  handleContinuePage = output();

  tecLogoImage = '../assets/images/tec-logo.svg';

  _handleContinuePage(): void {
    this.handleContinuePage.emit();
  }
}
