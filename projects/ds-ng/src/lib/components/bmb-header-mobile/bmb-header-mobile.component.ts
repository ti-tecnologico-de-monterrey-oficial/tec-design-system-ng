import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerComponent } from '../bmb-container/bmb-container.component';
import { BmbLogoComponent } from '../bmb-logo/bmb-logo.component';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { IBmbTargetLink } from '../../types';
@Component({
  selector: 'bmb-header-mobile',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbLogoComponent,
    BmbContainerComponent,
    BmbUserImageComponent,
  ],
  styleUrl: './bmb-header-mobile.component.scss',
  templateUrl: './bmb-header-mobile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbHeaderMobileComponent {
  text = input.required<string>();
  userImage = input<string>('');
  userAltImage = input<string>('');
  userLink = input<string>('');
  userTarget = input<IBmbTargetLink>('_self');

  logo = input<string>('');
  altLogo = input<string>('');
  logoLink = input<string>('');
  logoTarget = input<IBmbTargetLink>('_self');

  trailingIcon = input<string>('');

  // Event handlers
  onTrailingIconClick = output<any>();
  onLogoClick = output<any>();
  onUserImageClick = output<any>();

  handleTrailingIconClick(event: any): void {
    this.onTrailingIconClick.emit(event);
  }

  handleLogoClick(event: any): void {
    this.onLogoClick.emit(event);
  }

  handleUserImageClick(event: any): void {
    this.onUserImageClick.emit(event);
  }
}
