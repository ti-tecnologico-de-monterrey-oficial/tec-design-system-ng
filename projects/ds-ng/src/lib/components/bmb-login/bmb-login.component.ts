import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../directives/button.directive';
import { FormGroup } from '@angular/forms';
import { BmbUserProfileService } from '../../services/user/profile.service';
import { BmbHeaderMitecComponent } from '../bmb-header-mitec/bmb-header-mitec.component';
import { IBmbActionHeader, IBmbTargetLink } from '../../types';
import { BmbLoginContentComponent } from './bmb-login-content/bmb-login-content.component';

@Component({
  selector: 'bmb-login',
  standalone: true,
  imports: [
    BmbHeaderMitecComponent,
    BmbLoginContentComponent,
    BmbButtonDirective,
  ],
  templateUrl: './bmb-login.component.html',
  styleUrl: './bmb-login.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginComponent {
  headerLabel = input<string>(); //Deprecated
  forgottenPasswordLabel = input<string>('¿Olvidaste tu contraseña?');
  forgottenPasswordLink = input<string>('');
  forgottenPasswordTarget = input<IBmbTargetLink>('_blank');
  showRememberMeCheckbox = input<boolean>(false);
  rememberMeCheckboxLabel = input<string>('Recordarme');
  showLoginAsGuest = input<boolean>(false);
  loginAsGuestLabel = input<string>('Entrar como invitado');
  loginAsGuestLink = input<string>('');
  loginAsGuestTarget = input<IBmbTargetLink>('_blank');
  buttonLabel = input<string>('Ingresar');
  actionHeaders = input<IBmbActionHeader[]>([
    {
      icon: '../assets/images/social-icons/icon_Apple.svg',
      alt: 'icon Apple',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-login--documentation',
      action: () => {},
    },
    {
      icon: '../assets/images/social-icons/icon_Android.svg',
      alt: 'icon Android',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-login--documentation',
      action: () => {},
    },
    {
      icon: '../assets/images/social-icons/icon_Twitter.svg',
      alt: 'icon Android',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-login--documentation',
      action: () => {},
    },
    {
      icon: '../assets/images/social-icons/icon_Facebook.svg',
      alt: 'icon Twitter',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-login--documentation',
      action: () => {},
    },
    {
      icon: '../assets/images/social-icons/icon_Instagram.svg',
      alt: 'icon Instagram',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-login--documentation',
      action: () => {},
    },
    {
      icon: '../assets/images/social-icons/icon_Youtube.svg',
      alt: 'icon Youtube',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-login--documentation',
      action: () => {},
    },
  ]);

  onRequest = output<any>();
  onContinue = output();
  onRememberMeChecked = output<any>();

  isEnabled: boolean = false;
  isLoading: boolean = false;
  userForm: FormGroup = new FormGroup({});

  constructor(private userProfileService: BmbUserProfileService) {}

  handleFormGroup(event: FormGroup): void {
    this.userForm = event;
  }

  handleContinue(): void {
    this.isLoading = true;
    this.onRequest.emit({
      data: this.userForm['value'],
      action: 'auth',
      callback: (result: boolean) => {
        if (result) {
          this.userProfileService.setUserInfo({
            id: this.userForm.value['user'],
            fullName: '',
            profilePicture: '',
          });
          this.isLoading = false;
          this.onContinue.emit();
        }
      },
    });
  }

  handleRememberMe(event: any): void {
    this.onRememberMeChecked.emit(event);
  }
}
