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

export function getUniqueRadialGroupNames(
  radials: IFormValidatorRadialSnapshot[],
): string[] {
  return radials.reduce((acc: string[], current) => {
    if (acc.includes(current.name)) return acc;
    return [...acc, current.name];
  }, []);
}

export function getRadialGroupIndexesByName(
  radials: IFormValidatorRadialSnapshot[],
  name: string,
): number[] {
  return radials.reduce((acc: number[], current, index) => {
    if (current.name === name) return [...acc, index];
    return acc;
  }, []);
}

export function isEveryRadialInGroupControlled(
  radials: IFormValidatorRadialSnapshot[],
  name: string,
): boolean {
  return radials
    .filter((radial) => radial.name === name)
    .every((radial) => !radial.isControlNull);
}

export function getCheckedRadialValue(
  radials: IFormValidatorRadialSnapshot[],
  name: string,
): unknown {
  return radials
    .filter((radial) => radial.name === name)
    .find((radial) => radial.checked)?.control?.value;
}
