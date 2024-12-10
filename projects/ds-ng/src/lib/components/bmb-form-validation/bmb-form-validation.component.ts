import {
  ChangeDetectionStrategy,
  Component,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BmbFormService } from '../../directives/bmb-form-control/bmb-form-control.service';
import { BmbFormControlDirective } from '../../../public-api';

@Component({
  selector: 'bmb-form-validation',
  standalone: true,
  imports: [ReactiveFormsModule, BmbFormControlDirective],
  template: `
    <form
      bmbForm
      (formGroupState)="handleFormGroupState($event)"
      [formGroup]="getForm()"
      (ngSubmit)="(this)"
    >
      <ng-content />
    </form>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbFormValidationComponent {
  formGroupState = output<FormGroup>();

  constructor(private formService: BmbFormService) {}

  getForm(): FormGroup {
    return this.formService.getFormGroup();
  }

  handleFormGroupState(state: FormGroup) {
    this.formGroupState.emit(state);
  }
}
