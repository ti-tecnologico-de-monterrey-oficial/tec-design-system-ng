import * as Core from './form-validator-core';

import { FormControl, FormGroup } from '@angular/forms';
import { handleValidity } from '../formControl';

interface IFormValidatorRadialSnapshot {
  name: string;
  control: FormControl | null;
  isControlNull: boolean;
  checked: boolean;
}

export function getFormValidatorControl(
  formGroup: FormGroup,
  name: string,
): FormControl {
  return formGroup.get(name) as FormControl;
}

export function resolveFormValidatorControl(
  formGroup: FormGroup,
  controlName: string,
  control: FormControl,
  isControlNull: boolean,
): void {
  if (!getFormValidatorControl(formGroup, controlName)) {
    formGroup.addControl(controlName, control);
    return;
  }

  if (isControlNull) formGroup.setControl(controlName, control);
}

export function updateFormValidatorErrorState(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach((field) => {
    const control = getFormValidatorControl(formGroup, field);

    if (!!control) {
      handleValidity(control);
    }
  });
}

import { getCheckedRadialSnapshotValue } from './form-validator-core';
export function getCheckedRadialValue(
  radials: IFormValidatorRadialSnapshot[],
  name: string,
): unknown {
  return getCheckedRadialSnapshotValue(
    radials.map((radial) => ({ ...radial, value: radial.control?.value })),
    name,
  );
}

export function getUniqueRadialGroupNames(
  radials: IFormValidatorRadialSnapshot[],
): string[] {
  return Core.getUniqueRadialGroupNames(radials);
}

export function getRadialGroupIndexesByName(
  radials: IFormValidatorRadialSnapshot[],
  name: string,
): number[] {
  return Core.getRadialGroupIndexesByName(radials, name);
}

export function isEveryRadialInGroupControlled(
  radials: IFormValidatorRadialSnapshot[],
  name: string,
): boolean {
  return Core.isEveryRadialInGroupControlled(radials, name);
}
