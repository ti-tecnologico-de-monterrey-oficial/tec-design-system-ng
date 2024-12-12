import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BmbUserProfileService } from '../../services/user/profile.service';
import { BmbHeaderMitecComponent } from '../bmb-header-mitec/bmb-header-mitec.component';

@Component({
  selector: 'bmb-login',
  standalone: true,
  imports: [
    BmbHeaderMitecComponent,
    BmbInputComponent,
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
  buttonLabel = input<string>('Ingresar');

  onRequest = output<any>();
  onContinue = output();

  isContinueDisable: boolean = true;
  isLoading: boolean = false;

  userForm: FormGroup = new FormGroup({
    user: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });
  showErrors: { [key: string]: boolean } = {};

  constructor(private userProfileService: BmbUserProfileService) {}

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isContinueDisable = false;
      return;
    }
    this.userForm.markAllAsTouched();
    this.updateErrorState();
    this.isContinueDisable = true;
  }

  updateErrorState(): void {
    Object.keys(this.userForm.controls).forEach((field) => {
      const control = this.userForm.get(field);
      if (control instanceof FormControl) {
        this.showErrors[field] =
          control.invalid && (control.touched || control.dirty);
      }
    });
  }

  getFormControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
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
