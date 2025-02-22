import { Component, input, output } from '@angular/core';
import { BmbImageComponent } from '../bmb-image/bmb-image.component';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbLogoComponent } from '../bmb-logo/bmb-logo.component';

@Component({
  selector: 'bmb-digital-id',
  standalone: true,
  imports: [BmbImageComponent, BmbUserImageComponent, BmbIconComponent, BmbButtonDirective, BmbLogoComponent],
  templateUrl: './bmb-digital-id.component.html',
  styleUrl: './bmb-digital-id.component.scss'
})
export class BmbDigitalIdComponent {

  name = input.required<string>();
  matricula = input.required<string>();
  career = input.required<string>();
  role = input.required<string>();
  textButton = input.required<string>();
  icon = input<string>('qr_code_scanner');
  imgProfile = input.required<string>();
  imgBackground = input.required<string>();

  logoSrc = 'assets/images/tec-logo.svg';
  

  close = output<void>();
  access = output<void>();

  closeDigitalId(){
    this.close.emit()
  }

  clickAccess(){
    this.access.emit()
  }
}
