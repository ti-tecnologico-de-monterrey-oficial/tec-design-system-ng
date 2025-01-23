import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbMobileTemplatesComponent } from '../bmb-mobile-templates/bmb-mobile-templates.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerButtonComponent } from '../bmb-container-button/bmb-container-button.component';
import { BmbThemeComponent } from '../bmb-theme/bmb-theme.component';
import { BmbButtonDirective } from '../../directives/button.directive';
import { IBmbProfileData, IBmbTargetLink } from '../../types';
import { BmbUserSummaryContentComponent } from '../bmb-user-summary/bmb-user-summary-content/bmb-user-summary-content.component';

@Component({
  selector: 'bmb-profile',
  standalone: true,
  imports: [
    BmbMobileTemplatesComponent,
    BmbUserSummaryContentComponent,
    BmbIconComponent,
    BmbContainerButtonComponent,
    BmbThemeComponent,
    BmbButtonDirective,
  ],
  templateUrl: './bmb-profile.component.html',
  styleUrl: './bmb-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbProfileComponent {
  userData = input.required<IBmbProfileData>();
  campusAcessLink = input<string>('');
  idDigitalLink = input<string>('');
  targetLinks = input<IBmbTargetLink>('_blank');
  handleCloseSession = output();
  handleCloseProfile = output();

  closeSession(): void {
    this.handleCloseSession.emit();
  }

  closeProfile(): void {
    this.handleCloseProfile.emit();
  }
}
