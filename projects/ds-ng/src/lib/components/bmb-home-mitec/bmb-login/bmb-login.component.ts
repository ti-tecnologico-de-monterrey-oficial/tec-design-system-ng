import {
  ChangeDetectionStrategy,
  Component,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbButtonDirective } from '../../../directives/button.directive';
import { BmbInputComponent } from '../../bmb-input/bmb-input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bmb-login',
  standalone: true,
  imports: [BmbButtonDirective, BmbInputComponent],
  templateUrl: './bmb-login.component.html',
  styleUrl: './bmb-login.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginComponent {
  handleContinuePage = output();

  tecLogoImage: string = '../assets/images/tec-logo.svg';
  mitecImage: string = '../assets/images/logos-mitec/logo_mitec-vertical.svg';

  userForm: FormGroup = new FormGroup({
    user: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });
  showErrors: { [key: string]: boolean } = {};

  // constructor(private loginOnboardingService: BmbLoginOnboardingService) {}

  onSubmit(): void {
    if (this.userForm.valid) {
      // this.isContinueDisable.set(false);
      return;
    }
    this.userForm.markAllAsTouched();
    this.updateErrorState();
    // this.isContinueDisable.set(true);
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

  _handleContinueStep(): void {
    // this.loginOnboardingService.setIsLoading(true);
    // this.handleRequest.emit({
    //   data: this.userForm['value'],
    //   action: 'auth',
    //   callback: (result: boolean) => {
    //     if (result) {
    //       this.loginOnboardingService.setUserInfo({
    //         id: this.userForm.value['user'],
    //         fullName: '',
    //         profilePicture: '',
    //       });
    //       this.loginOnboardingService.setIsLoading(false);
    //       this.handleContinueStep.emit();
    //     }
    //   },
    // });
  }
}
