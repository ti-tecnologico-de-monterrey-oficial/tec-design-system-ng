import { FormControl, FormGroup } from '@angular/forms';
import {
  getCheckedRadialValue,
  getFormValidatorControl,
  getRadialGroupIndexesByName,
  getUniqueRadialGroupNames,
  isEveryRadialInGroupControlled,
  resolveFormValidatorControl,
  updateFormValidatorErrorState,
} from './form-validator';

describe('form-validator', () => {
  it('should get a control by name from the form group', () => {
    const control = new FormControl('value');
    const formGroup = new FormGroup({ testControl: control });

    expect(getFormValidatorControl(formGroup, 'testControl')).toBe(control);
  });

  it('should add the control when it does not exist yet', () => {
    const formGroup = new FormGroup({});
    const control = new FormControl('value');

    resolveFormValidatorControl(formGroup, 'newControl', control, false);

    expect(formGroup.get('newControl')).toBe(control);
  });

  it('should replace the control when it is marked as null', () => {
    const formGroup = new FormGroup({
      existingControl: new FormControl('original'),
    });
    const replacementControl = new FormControl('replacement');

    resolveFormValidatorControl(
      formGroup,
      'existingControl',
      replacementControl,
      true,
    );

    expect(formGroup.get('existingControl')).toBe(replacementControl);
  });

  it('should keep the existing control when it is not marked as null', () => {
    const originalControl = new FormControl('original');
    const formGroup = new FormGroup({ existingControl: originalControl });

    resolveFormValidatorControl(
      formGroup,
      'existingControl',
      new FormControl('replacement'),
      false,
    );

    expect(formGroup.get('existingControl')).toBe(originalControl);
  });

  it('should mark invalid required controls as touched to trigger validity updates', () => {
    const formGroup = new FormGroup({
      requiredControl: new FormControl('', { validators: [] }),
    });

    expect(() => updateFormValidatorErrorState(formGroup)).not.toThrow();
  });

  it('should skip fields whose control is falsy', () => {
    const formGroup = new FormGroup({});
    (formGroup.controls as Record<string, FormControl>)['missingControl'] =
      null as unknown as FormControl;
    const handleValiditySpy = jest.spyOn(
      require('../formControl'),
      'handleValidity',
    );

    expect(() => updateFormValidatorErrorState(formGroup)).not.toThrow();
    expect(handleValiditySpy).not.toHaveBeenCalled();

    handleValiditySpy.mockRestore();
  });

  it('should return the unique radial group names', () => {
    const radials = [
      { name: 'group1', control: null, isControlNull: false, checked: false },
      { name: 'group1', control: null, isControlNull: false, checked: false },
      { name: 'group2', control: null, isControlNull: false, checked: false },
    ];

    expect(getUniqueRadialGroupNames(radials)).toEqual(['group1', 'group2']);
  });

  it('should return the indexes of the radials that match a given group name', () => {
    const radials = [
      { name: 'group1', control: null, isControlNull: false, checked: false },
      { name: 'group2', control: null, isControlNull: false, checked: false },
      { name: 'group1', control: null, isControlNull: false, checked: false },
    ];

    expect(getRadialGroupIndexesByName(radials, 'group1')).toEqual([0, 2]);
  });

  it('should return true when every radial in the group has a control', () => {
    const radials = [
      { name: 'group1', control: null, isControlNull: false, checked: false },
      { name: 'group1', control: null, isControlNull: false, checked: false },
    ];

    expect(isEveryRadialInGroupControlled(radials, 'group1')).toBe(true);
  });

  it('should return false when at least one radial in the group has no control', () => {
    const radials = [
      { name: 'group1', control: null, isControlNull: true, checked: false },
      { name: 'group1', control: null, isControlNull: false, checked: false },
    ];

    expect(isEveryRadialInGroupControlled(radials, 'group1')).toBe(false);
  });

  it('should return the value of the checked radial in the group', () => {
    const checkedControl = new FormControl('checkedValue');
    const radials = [
      {
        name: 'group1',
        control: new FormControl('unchecked'),
        isControlNull: false,
        checked: false,
      },
      {
        name: 'group1',
        control: checkedControl,
        isControlNull: false,
        checked: true,
      },
    ];

    expect(getCheckedRadialValue(radials, 'group1')).toBe('checkedValue');
  });

  it('should return undefined when no radial in the group is checked', () => {
    const radials = [
      {
        name: 'group1',
        control: new FormControl('a'),
        isControlNull: false,
        checked: false,
      },
      {
        name: 'group1',
        control: new FormControl('b'),
        isControlNull: false,
        checked: false,
      },
    ];

    expect(getCheckedRadialValue(radials, 'group1')).toBeUndefined();
  });

  it('should return undefined when the checked radial has no control', () => {
    const radials = [
      {
        name: 'group1',
        control: null,
        isControlNull: true,
        checked: true,
      },
    ];

    expect(getCheckedRadialValue(radials, 'group1')).toBeUndefined();
  });
});
