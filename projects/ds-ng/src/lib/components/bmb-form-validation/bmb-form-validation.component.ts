import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbInputValidationService } from '../bmb-input/bmb-input-validation/bmb-input-validation.service';

@Component({
  selector: 'bmb-form-validation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="formGroup()" (ngSubmit)="onSubmit()">
      <ng-content />
    </form>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbFormValidationComponent {
  formGroup = model<FormGroup>(new FormGroup({}));

  formGroupState = output<FormGroup>();

  constructor(
    private ivs: BmbInputValidationService,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    const inputs = this.el.nativeElement.querySelectorAll(
      'bmb-input-validation',
    );

    inputs.forEach((input: any) => {
      const type = input.getAttribute('type');
      const controlName = this.getInputAttribute(input, 'name');

      const control = this.getFormControl(controlName);

      if (!control) {
        const control = this.ivs.newFormControlByType(type);
        this.formGroup().addControl(controlName, control);
        this.ivs.setFormControl(control, type, controlName);
      }
    });
  }

  onSubmit() {
    this.formGroup().updateValueAndValidity();
    this.updateErrorState();
    this.formGroupState.emit(this.formGroup());
  }

  updateErrorState() {
    const invalidInputs = this.el.nativeElement.querySelectorAll('.ng-invalid');

    invalidInputs.forEach((input: any) => {
      const controlName = this.getInputAttribute(input, 'name');
      const control = this.getFormControl(controlName);

      if (control) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });
  }

  getInputAttribute(input: any, attributeName: string): string {
    return (
      input.getAttribute(attributeName) ||
      input.getAttribute(`ng-reflect-${attributeName}`) ||
      input.parentElement.getAttribute(`ng-reflect-${attributeName}`) ||
      ''
    );
  }

  getFormControl(name: string): FormControl {
    return this.formGroup().get(name) as FormControl;
  }
}
