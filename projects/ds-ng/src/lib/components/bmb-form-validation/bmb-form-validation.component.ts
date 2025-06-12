import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  model,
  output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { BmbInputTagsComponent } from '../bmb-input-tags/bmb-input-tags.component';
import { handleValidity } from '../../utils/formControl';
import { BmbDatepickerComponent } from '../bmb-datepicker/bmb-datepicker.component';
import { BmbDateRangeComponent } from '../bmb-date-range/bmb-date-range.component';
import { BmbDropdownComponent } from '../bmb-dropdown/bmb-dropdown.component';
import { BmbInputPhoneNumberComponent } from '../bmb-input-phone-number/bmb-input-phone-number.component';
import { BmbCheckboxComponent } from '../bmb-checkbox/bmb-checkbox.component';
import { BmbRadialComponent } from '../bmb-radial/bmb-radial.component';

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
export class BmbFormValidationComponent implements AfterViewInit {
  formGroup = model<FormGroup>(new FormGroup({}));

  formGroupState = output<FormGroup>();
  @ContentChildren(BmbInputComponent) bmbInputs!: QueryList<BmbInputComponent>;
  @ContentChildren(BmbDropdownComponent)
  bmbDropdowns!: QueryList<BmbDropdownComponent>;
  @ContentChildren(BmbInputPhoneNumberComponent)
  bmbInputPhoneNumbers!: QueryList<BmbInputPhoneNumberComponent>;
  @ContentChildren(BmbInputTagsComponent)
  bmbInputTags!: QueryList<BmbInputTagsComponent>;
  @ContentChildren(BmbDatepickerComponent)
  bmbDatepickers!: QueryList<BmbDatepickerComponent>;
  @ContentChildren(BmbDateRangeComponent)
  bmbDateRanges!: QueryList<BmbDateRangeComponent>;
  @ContentChildren(BmbCheckboxComponent)
  bmbCheckboxes!: QueryList<BmbCheckboxComponent>;
  @ContentChildren(BmbRadialComponent)
  bmbRadials!: QueryList<BmbRadialComponent>;

  ngAfterViewInit(): void {
    this.addControls();
  }

  addControls(): void {
    this.bmbInputs.forEach((child) => {
      this.addControl(child.name(), child.control(), child.isControlNull);
    });
    this.bmbDropdowns.forEach((child) => {
      this.addControl(child.name(), child.control(), child.isControlNull);
    });
    this.bmbInputPhoneNumbers.forEach((child) => {
      this.addControl(child.name(), child.control(), child.isControlNull);
    });
    this.bmbInputTags.forEach((child) => {
      this.addControl(child.name(), child.control(), child.isControlNull);
    });
    this.bmbDatepickers.forEach((child) => {
      this.addControl(child.name(), child.control(), child.isControlNull);
    });
    this.bmbDateRanges.forEach((child) => {
      this.addControl(
        `${child.name()}_start`,
        child.controlStart(),
        child.isControlStartNull,
      );
      this.addControl(
        `${child.name()}_end`,
        child.controlEnd(),
        child.isControlEndNull,
      );
    });
    this.bmbCheckboxes.forEach((child) => {
      this.addControl(child.name(), child.control(), child.isControlNull);
    });
    this.bmbRadials.forEach((child) => {
        this.addControl(child.name(), child.control(), child.isControlNull);
    });
  }

  addControl(
    controlName: string,
    control: FormControl,
    isControlNull: boolean,
  ): void {
    if (!this.getFormControl(controlName)) {
      this.formGroup().addControl(controlName, control);
    } else {
      if (isControlNull) this.formGroup().setControl(controlName, control);
    }
  }

  onSubmit(): void {
    this.formGroup().updateValueAndValidity();
    this.formGroup().markAllAsTouched();
    this.updateErrorState();
    this.formGroupState.emit(this.formGroup());
  }

  updateErrorState() {
    Object.keys(this.formGroup().controls).forEach((field) => {
      const control = this.getFormControl(field);

      if (!!control) {
        handleValidity(control);
      }
    });
  }

  getFormControl(name: string): FormControl {
    return this.formGroup().get(name) as FormControl;
  }
}
