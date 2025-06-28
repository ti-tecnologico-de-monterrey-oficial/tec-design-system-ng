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
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { BmbInputTagsComponent } from '../bmb-input-tags/bmb-input-tags.component';
import { handleValidity, newFormControlByType } from '../../utils/formControl';
import { BmbDatepickerComponent } from '../bmb-datepicker/bmb-datepicker.component';
import { BmbDateRangeComponent } from '../bmb-date-range/bmb-date-range.component';
import { BmbDropdownComponent } from '../bmb-dropdown/bmb-dropdown.component';
import { BmbInputPhoneNumberComponent } from '../bmb-input-phone-number/bmb-input-phone-number.component';
import { BmbCheckboxComponent } from '../bmb-checkbox/bmb-checkbox.component';
import { BmbRadialComponent } from '../bmb-radial/bmb-radial.component';
import { BmbSwitchComponent } from '../bmb-switch/bmb-switch.component';

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

  @ContentChildren(BmbInputComponent, { descendants: true })
  bmbInputs!: QueryList<BmbInputComponent>;
  @ContentChildren(BmbDropdownComponent, { descendants: true })
  bmbDropdowns!: QueryList<BmbDropdownComponent>;
  @ContentChildren(BmbInputPhoneNumberComponent, { descendants: true })
  bmbInputPhoneNumbers!: QueryList<BmbInputPhoneNumberComponent>;
  @ContentChildren(BmbInputTagsComponent, { descendants: true })
  bmbInputTags!: QueryList<BmbInputTagsComponent>;
  @ContentChildren(BmbDatepickerComponent, { descendants: true })
  bmbDatepickers!: QueryList<BmbDatepickerComponent>;
  @ContentChildren(BmbDateRangeComponent, { descendants: true })
  bmbDateRanges!: QueryList<BmbDateRangeComponent>;
  @ContentChildren(BmbCheckboxComponent, { descendants: true })
  bmbCheckboxes!: QueryList<BmbCheckboxComponent>;
  @ContentChildren(BmbRadialComponent, { descendants: true })
  bmbRadials!: QueryList<BmbRadialComponent>;
  @ContentChildren(BmbSwitchComponent, { descendants: true })
  bmbSwitches!: QueryList<BmbSwitchComponent>;

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
      this.addControl(child.name(), child.control()!, child.isControlNull);
    });
    this.bmbSwitches.forEach((child) => {
      this.addControl(child.name(), child.control()!, child.isControlNull);
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

  addRadials(): void {
    const radialNames: string[] = this.bmbRadials.reduce(
      (acc: string[], currentElement: BmbRadialComponent) => {
        if (acc.includes(currentElement.name())) return acc;
        return [...acc, currentElement.name()];
      },
      [],
    );

    radialNames.forEach((name: string) => {
      const radialIndexWithSameName: number[] = this.bmbRadials.reduce(
        (acc: number[], currentElement: BmbRadialComponent, index) => {
          if (currentElement.name() === name) return [...acc, index];
          return acc;
        },
        [],
      );

      const radialControl: BmbRadialComponent = this.bmbRadials.get(
        radialIndexWithSameName[0],
      )!;

      if (
        this.bmbRadials
          .filter((element: BmbRadialComponent) => element.name() === name)
          .every(
            (elementSelected: BmbRadialComponent) =>
              !elementSelected.isControlNull,
          )
      ) {
        this.addControl(radialControl.name(), radialControl.control()!, false);
        return;
      }

      const value = this.bmbRadials
        .filter((element: BmbRadialComponent) => element.name() === name)
        ?.find((elementSelected: BmbRadialComponent) =>
          elementSelected.checked(),
        )
        ?.control()?.value!;

      radialControl.control()?.setValue(value);
      radialIndexWithSameName.slice(1).forEach((element) => {
        this.bmbRadials.get(element)?.control.set(radialControl.control());
      });

      this.addControl(radialControl.name(), radialControl.control()!, false);
    });
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
