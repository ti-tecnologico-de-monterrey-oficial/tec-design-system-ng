import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { BmbButtonDirective } from '../../directives/old/bmb-button/button.directive';
import { FormGroup } from '@angular/forms';
import { BmbUserProfileService } from '../../services/old/user/profile.service';
import {
  BmbHeaderMitecComponent,
  IBmbActionHeaderLinks,
} from '../bmb-header-mitec/bmb-header-mitec.component';
import { IBmbTargetLink } from '../../_shared/types';
import { BmbLoginContentComponent } from './bmb-login-content/bmb-login-content.component';
import { TranslatePipe } from '../../pipes/translations';

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

@Component({
  selector: 'bmb-login',
  standalone: true,
  imports: [
    BmbHeaderMitecComponent,
    BmbLoginContentComponent,
    BmbButtonDirective,
    TranslatePipe,
  ],
  templateUrl: './bmb-login.component.html',
  styleUrl: './bmb-login.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginComponent {
  headerLabel = input<string>();
  forgottenPasswordLabel = input<string>();
  forgottenPasswordLink = input<string>('');
  forgottenPasswordTarget = input<IBmbTargetLink>('_blank');
  showRememberMeCheckbox = input<boolean>(false);
  rememberMeCheckboxLabel = input<string>();
  showLoginAsGuest = input<boolean>(false);
  loginAsGuestLabel = input<string>();
  loginAsGuestLink = input<string>('');
  loginAsGuestTarget = input<IBmbTargetLink>('_blank');
  buttonLabel = input<string>();
  actionHeaderLinks = input<IBmbActionHeaderLinks>();

  onRequest = output<any>();
  onContinue = output();
  onRememberMeChecked = output<any>();

  isEnabled = false;
  isLoading = false;
  userForm: FormGroup = new FormGroup({});

  private userProfileService: BmbUserProfileService = inject(BmbUserProfileService);

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
