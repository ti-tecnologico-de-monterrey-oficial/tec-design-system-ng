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
  headerLabel = input<string>();
  forgottenPasswordLabel = input<string>('¿Olvidaste tu contraseña?');
  forgottenPasswordLink = input<string>('');
  forgottenPasswordTarget = input<IBmbTargetLink>('_blank');
  buttonLabel = input<string>('Ingresar');
  actionHeaders = input<IBmbActionHeader[]>([
    {
      icon: '../assets/images/social-icons/icon_Apple.svg',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-login--documentation',
      action: () => {},
    },
    {
      icon: '../assets/images/social-icons/icon_Android.svg',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-login--documentation',
      action: () => {},
    },
    {
      icon: '../assets/images/social-icons/icon_Twitter.svg',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-login--documentation',
      action: () => {},
    },
    {
      icon: '../assets/images/social-icons/icon_Facebook.svg',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-login--documentation',
      action: () => {},
    },
    {
      icon: '../assets/images/social-icons/icon_Instagram.svg',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-login--documentation',
      action: () => {},
    },
    {
      icon: '../assets/images/social-icons/icon_Youtube.svg',
      link: 'https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/macro-componentes-login--documentation',
      action: () => {},
    },
  ]);

  onRequest = output<any>();
  onContinue = output();

  isContinueDisable: boolean = true;
  isLoading: boolean = false;

  userForm: FormGroup = new FormGroup({});

  constructor(private userProfileService: BmbUserProfileService) {}

  handleContinueForm(event: FormGroup): void {
    this.userForm = event;
    this.isContinueDisable = !this.userForm.valid;
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
}
