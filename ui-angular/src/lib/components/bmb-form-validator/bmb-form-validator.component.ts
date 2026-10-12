import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { BmbInputTagsComponent } from '../bmb-input-tags/bmb-input-tags.component';
import { BmbDatepickerComponent } from '../bmb-datepicker/bmb-datepicker.component';
import { BmbDateRangeComponent } from '../bmb-date-range/bmb-date-range.component';
import { BmbDropdownComponent } from '../bmb-dropdown/bmb-dropdown.component';
import { BmbInputPhoneNumberComponent } from '../bmb-input-phone-number/bmb-input-phone-number.component';
import { BmbCheckboxComponent } from '../bmb-checkbox/bmb-checkbox.component';
import { BmbRadialComponent } from '../bmb-radial/bmb-radial.component';
import { BmbSwitchComponent } from '../bmb-switch/bmb-switch.component';
import {
  getCheckedRadialValue,
  getFormValidatorControl,
  getRadialGroupIndexesByName,
  getUniqueRadialGroupNames,
  isEveryRadialInGroupControlled,
  resolveFormValidatorControl,
  updateFormValidatorErrorState,
} from '../../_shared/logic/components/form-validator';

@Component({
  selector: 'bmb-form-validator',
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
export class BmbFormValidatorComponent implements AfterViewInit {
  formGroup = model<FormGroup>(new FormGroup({}));

  formGroupState = output<FormGroup>();

  bmbInputs = contentChildren(BmbInputComponent, { descendants: true });
  bmbDropdowns = contentChildren(BmbDropdownComponent, {
    descendants: true,
  });
  bmbInputPhoneNumbers = contentChildren(BmbInputPhoneNumberComponent, {
    descendants: true,
  });
  bmbInputTags = contentChildren(BmbInputTagsComponent, {
    descendants: true,
  });
  bmbDatepickers = contentChildren(BmbDatepickerComponent, {
    descendants: true,
  });
  bmbDateRanges = contentChildren(BmbDateRangeComponent, {
    descendants: true,
  });
  bmbCheckboxes = contentChildren(BmbCheckboxComponent, {
    descendants: true,
  });
  bmbRadials = contentChildren(BmbRadialComponent, { descendants: true });
  bmbSwitches = contentChildren(BmbSwitchComponent, { descendants: true });

  ngAfterViewInit(): void {
    this.addControls();
  }

  addControls(): void {
    this.bmbInputs().forEach((child) => {
      this.addControl(child.name(), child.control(), child.isControlNull);
    });
    this.bmbDropdowns().forEach((child) => {
      this.addControl(child.name(), child.control(), child.isControlNull);
    });
    this.bmbInputPhoneNumbers().forEach((child) => {
      this.addControl(child.name(), child.control(), child.isControlNull);
    });
    this.bmbInputTags().forEach((child) => {
      this.addControl(child.name(), child.control(), child.isControlNull);
    });
    this.bmbDatepickers().forEach((child) => {
      this.addControl(child.name(), child.control(), child.isControlNull);
    });
    this.bmbDateRanges().forEach((child) => {
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
    this.bmbCheckboxes().forEach((child) => {
      this.addControl(child.name(), child.control(), child.isControlNull);
    });
    this.bmbRadials().forEach((child) => {
      this.addControl(child.name(), child.control()!, child.isControlNull);
    });
    this.bmbSwitches().forEach((child) => {
      this.addControl(child.name(), child.control()!, child.isControlNull);
    });
  }

  addControl(
    controlName: string,
    control: FormControl,
    isControlNull: boolean,
  ): void {
    resolveFormValidatorControl(
      this.formGroup(),
      controlName,
      control,
      isControlNull,
    );
  }

  addRadials(): void {
    const radialSnapshots = this.bmbRadials().map((radial) => ({
      name: radial.name(),
      control: radial.control(),
      isControlNull: radial.isControlNull,
      checked: radial.checked(),
    }));

    const radialNames = getUniqueRadialGroupNames(radialSnapshots);

    radialNames.forEach((name: string) => {
      const radialIndexWithSameName = getRadialGroupIndexesByName(
        radialSnapshots,
        name,
      );

      const radialControl: BmbRadialComponent =
        this.bmbRadials()[radialIndexWithSameName[0]]!;

      if (isEveryRadialInGroupControlled(radialSnapshots, name)) {
        this.addControl(radialControl.name(), radialControl.control()!, false);
        return;
      }

      const value = getCheckedRadialValue(radialSnapshots, name);

      radialControl.control()?.setValue(value);
      radialIndexWithSameName.slice(1).forEach((element) => {
        this.bmbRadials()[element]?.control.set(radialControl.control());
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
    updateFormValidatorErrorState(this.formGroup());
  }

  getFormControl(name: string): FormControl {
    return getFormValidatorControl(this.formGroup(), name);
  }
}
