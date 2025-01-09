import {
  ChangeDetectionStrategy,
  Component,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BmbFormControlDirective } from '../../../public-api';

@Component({
  selector: 'bmb-form-validation',
  standalone: true,
  imports: [ReactiveFormsModule, BmbFormControlDirective],
  template: `
    <form
      bmbForm
      [formGroup]="formGroup"
      (formGroupState)="handleFormGroupState($event)"
    >
      <ng-content />
    </form>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbFormValidationComponent {
  formGroupState = output<FormGroup>();

  formGroup: FormGroup = new FormGroup({});

  handleFormGroupState(state: FormGroup): void {
    this.formGroup = state;
    this.formGroupState.emit(state);
  }
}
