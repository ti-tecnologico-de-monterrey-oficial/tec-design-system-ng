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
  userTarget = input<string>('');

  logo = input<string>('');
  altLogo = input<string>('');
  logoLink = input<string>('');
  logoTarget = input<string>('');

  iconLeft = input<string>('');
  iconRight = input<string>('');
  iconRight2 = input<string>('');

  // Event handlers
  onIconLeftClick = output();
  onIconRightClick = output();
  onIconRight2Click = output();

  handleIconLeftClick(event: any): void {
    this.onIconLeftClick.emit(event);
  }

  handleIconRightClick(event: any): void {
    this.onIconRightClick.emit(event);
  }

  handleIconRight2Click(event: any): void {
    this.onIconRight2Click.emit(event);
  }
}
