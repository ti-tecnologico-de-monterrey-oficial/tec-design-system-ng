import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  model,
  OnInit,
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
export class BmbFormValidationComponent implements AfterViewInit, OnInit {
  formGroup = model<FormGroup>(new FormGroup({}));

  formGroupState = output<FormGroup>();

  constructor(
    private ivs: BmbInputValidationService,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    this.addControls();
  }

  ngAfterViewInit(): void {
    this.addControls();
  }

  addControls(): void {
    const inputs = this.el.nativeElement.querySelectorAll('form')[0].childNodes;

    inputs.forEach((input: any) => {
      try {
        const controlName = this.getInputAttribute(input, 'name');
        const inputValidation = input?.querySelectorAll(
          'bmb-input-validation',
        )[0];
        const type = this.getInputAttribute(inputValidation, 'type');

        if (!!controlName && !!type) {
          let control = this.getFormControl(controlName);

          if (!control) {
            control =
              this.getFormControlService(controlName) ||
              this.ivs.newFormControlByType(type);
            this.formGroup().addControl(controlName, control);
          }

          this.ivs.setFormControl(control, type, controlName);
        }
      } catch (e) {
        console.info('form-val catch', input);
      }
    });
  }

  onSubmit() {
    this.formGroup().markAllAsTouched();
    this.formGroup().updateValueAndValidity();
    this.updateErrorState();
    this.formGroupState.emit(this.formGroup());
  }

  updateErrorState() {
    Object.keys(this.formGroup().controls).forEach((field) => {
      const control = this.getFormControl(field);

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
      input.parentElement.getAttribute(attributeName) ||
      input.parentElement.getAttribute(`ng-reflect-${attributeName}`) ||
      ''
    );
  }

  getFormControlService(name: string): FormControl {
    return this.ivs.getFormControlByName(name);
  }

  getFormControl(name: string): FormControl {
    return this.formGroup().get(name) as FormControl;
  }
}
