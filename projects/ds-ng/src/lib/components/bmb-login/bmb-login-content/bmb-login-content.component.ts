import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbInputComponent } from '../../bmb-input/bmb-input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BmbTextLinkComponent } from '../../bmb-text-link/bmb-text-link.component';
import { IBmbTargetLink } from '../../../types';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';

@Component({
  selector: 'bmb-login-content',
  standalone: true,
  imports: [BmbInputComponent, BmbCheckboxComponent, BmbTextLinkComponent],
  templateUrl: './bmb-login-content.component.html',
  styleUrl: './bmb-login-content.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbLoginContentComponent {
  forgottenPasswordLabel = input.required<string>();
  forgottenPasswordLink = input<string>('');
  forgottenPasswordTarget = input<IBmbTargetLink>('_blank');
  showRememberMeCheckbox = input<boolean>(false);
  rememberMeCheckboxLabel = input<string>('Recordarme');
  onContinue = model<boolean>();

  onFormGroup = output<FormGroup>();
  onRememberMeChecked = output<Event>();

  userForm: FormGroup = new FormGroup({
    user: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });
  showErrors: { [key: string]: boolean } = {};

  onSubmit(): void {
    this.onFormGroup.emit(this.userForm);
    this.onContinue.set(this.userForm.valid);
    this.userForm.markAllAsTouched();
    this.updateErrorState();
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

  handleRememberMe(event: Event): void {
    this.onRememberMeChecked.emit(event);
  }
}
