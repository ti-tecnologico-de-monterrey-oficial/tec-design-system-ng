import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/button.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-digital-id',
  standalone: true,
  imports: [
    CommonModule,
    BmbUserImageComponent,
    BmbIconComponent,
    BmbButtonDirective,
  ],
  templateUrl: './bmb-digital-id.component.html',
  styleUrl: './bmb-digital-id.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDigitalIdComponent {
  name = input.required<string>();
  surname = input.required<string>();
  registration = input.required<string>();
  campus = input.required<string>();
  career = input.required<string>();
  role = input.required<string>();
  textButton = input<string>();
  icon = input<string>('qr_code_scanner');
  imgProfile = input.required<string>();
  imgBackground = input.required<string>();
  hideButton = input<boolean>(false);

  logoSrc = 'assets/images/tec-logo.svg';

  close = output<void>();
  access = output<void>();

  closeDigitalId() {
    this.close.emit();
  }

  clickAccess() {
    this.access.emit();
  }
}
