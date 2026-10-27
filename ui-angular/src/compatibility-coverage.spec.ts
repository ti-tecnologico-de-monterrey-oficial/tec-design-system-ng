import {
  FormControl,
  FormGroup,
  Validators,
  type ValidatorFn,
} from '@angular/forms';
import {
  showError,
  newFormControlByType,
  assignNewFormControl,
  handleValidity,
} from './lib/_shared/logic/formControl';
import {
  getCustomValidation,
  getUUID,
  handleImageNotFoundError,
} from './lib/_shared/logic/utils';
import { getDatepickerValidationResult } from './lib/_shared/logic/components/datepicker';
import { getPhoneNumberValidationResult } from './lib/_shared/logic/components/input-phone-number';
import {
  getFormValidatorControl,
  resolveFormValidatorControl,
  updateFormValidatorErrorState,
  getCheckedRadialValue,
  getUniqueRadialGroupNames,
  getRadialGroupIndexesByName,
  isEveryRadialInGroupControlled,
} from './lib/_shared/logic/components/form-validator';
import {
  addInputValidatorValue,
  configureInputValidatorControl,
  getInputValidatorValidatorError,
  getInputValidatorIsFieldRequired,
  getInputValidatorErrorMessage,
  getInputValidatorClasses,
  getInputValidatorErrorType,
} from './lib/_shared/logic/components/input-validator';
import {
  buildTotpControlsMap,
  getTotpCodeIndexes,
  isTotpNavigationKey,
  joinTotpCode,
  parseTotpInputIndex,
} from './lib/_shared/logic/components/totp';

describe('Angular compatibility coverage', () => {
  it('keeps browser utility exports usable through the compatibility entry point', () => {
    const descriptor = Object.getOwnPropertyDescriptor(
      window.crypto,
      'randomUUID',
    );
    const uuid = '00000000-0000-4000-8000-000000000000';
    Object.defineProperty(window.crypto, 'randomUUID', {
      configurable: true,
      value: () => uuid,
    });
    const error = jest.spyOn(console, 'error').mockImplementation();
    try {
      expect(getUUID()).toBe(uuid);
      const image = document.createElement('img');
      image.src = '/missing.png';
      const event = new Event('error');
      image.dispatchEvent(event);
      handleImageNotFoundError('missing', event);
      expect(image.src).toContain('broken-image.jpg');
      expect(error).toHaveBeenCalledWith('Image not found error:', 'missing');
    } finally {
      error.mockRestore();
      if (descriptor)
        Object.defineProperty(window.crypto, 'randomUUID', descriptor);
      else Reflect.deleteProperty(window.crypto, 'randomUUID');
    }
  });

  it('preserves input class and error lookup exports', () => {
    expect(
      getInputValidatorClasses({
        type: 'radio',
        className: 'bmb_input',
        labelPosition: 'left',
      }),
    ).toBe('bmb_input-direction-left');
    expect(
      getInputValidatorErrorType(
        { required: 'Required' },
        'required',
        'fallback',
      ),
    ).toBe('Required');
    expect(getInputValidatorErrorType({}, 'required', 'fallback')).toBe(
      'fallback',
    );
  });

  it('keeps TOTP navigation, indexing and joining helpers available', () => {
    expect(getTotpCodeIndexes(3)).toEqual([0, 1, 2]);
    expect(isTotpNavigationKey('Tab')).toBe(true);
    expect(isTotpNavigationKey('a')).toBe(false);
    expect(parseTotpInputIndex('code_2')).toBe(2);
    expect(parseTotpInputIndex('code')).toBe(-1);
    expect(joinTotpCode({ first: '0', second: 'A' })).toBe('0A');
  });
  const configure = (
    control: FormControl | undefined,
    overrides: Partial<
      Parameters<typeof configureInputValidatorControl>[0]
    > = {},
  ) =>
    configureInputValidatorControl({
      control,
      type: 'text',
      value: '',
      checked: false,
      isRequired: false,
      min: 0,
      max: 0,
      minLength: 0,
      pattern: '',
      isJsonFormat: false,
      customValidation: [],
      isDisabled: false,
      ...overrides,
    });

  it('creates the existing initial values for every input family', () => {
    for (const type of [
      'radio',
      'checkbox',
      'phone',
      'number',
      'switch',
    ] as const)
      expect(newFormControlByType(type).value).toBeNull();
    expect(newFormControlByType().value).toBe('');
    expect(newFormControlByType('file').value).toBeNull();
    expect(newFormControlByType('file', true).value).toEqual([null]);
    expect(newFormControlByType('file', true).value).not.toBe(
      newFormControlByType('file', true).value,
    );
  });

  it('creates a replacement only for a missing control and preserves warning behavior', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation();
    try {
      expect(assignNewFormControl('name', new FormControl('kept'))).toBeNull();
      expect(
        assignNewFormControl('name', null as unknown as FormControl)?.value,
      ).toBe('');
      expect(
        assignNewFormControl(
          'file',
          undefined as unknown as FormControl,
          'file',
          true,
        )?.value,
      ).toEqual([null]);
      expect(warn).toHaveBeenCalledTimes(2);
    } finally {
      warn.mockRestore();
    }
  });

  it('updates validity before marking touched and shows errors only after interaction', () => {
    const control = new FormControl('', Validators.required);
    const order: string[] = [];
    const update = jest
      .spyOn(control, 'updateValueAndValidity')
      .mockImplementation(() => {
        order.push('validity');
      });
    const touch = jest
      .spyOn(control, 'markAsTouched')
      .mockImplementation(() => {
        order.push('touched');
      });
    handleValidity(control);
    expect(order).toEqual(['validity', 'touched']);
    update.mockRestore();
    touch.mockRestore();
    expect(showError(control)).toBe(false);
    control.markAsTouched();
    expect(showError(control)).toBe(true);
    control.setValue('valid');
    expect(showError(control)).toBe(false);
  });

  it('preserves group registration, replacement and validation of existing fields', () => {
    const original = new FormControl('original');
    const group = new FormGroup<Record<string, FormControl>>({ original });
    const replacement = new FormControl('replacement');
    resolveFormValidatorControl(group, 'added', replacement, false);
    expect(getFormValidatorControl(group, 'added')).toBe(replacement);
    resolveFormValidatorControl(group, 'original', replacement, false);
    expect(group.get('original')).toBe(original);
    resolveFormValidatorControl(group, 'original', replacement, true);
    expect(group.get('original')).toBe(replacement);
    updateFormValidatorErrorState(group);
    expect(replacement.touched).toBe(true);
    (group.controls as Record<string, FormControl | null>).missing = null;
    expect(() => updateFormValidatorErrorState(group)).not.toThrow();
  });

  it('keeps radio grouping order and reads the checked control value', () => {
    const radials = [
      {
        name: 'a',
        control: new FormControl('first'),
        isControlNull: false,
        checked: false,
      },
      { name: 'b', control: null, isControlNull: true, checked: true },
      {
        name: 'a',
        control: new FormControl('selected'),
        isControlNull: false,
        checked: true,
      },
    ];
    expect(getUniqueRadialGroupNames(radials)).toEqual(['a', 'b']);
    expect(getRadialGroupIndexesByName(radials, 'a')).toEqual([0, 2]);
    expect(isEveryRadialInGroupControlled(radials, 'a')).toBe(true);
    expect(isEveryRadialInGroupControlled(radials, 'b')).toBe(false);
    expect(getCheckedRadialValue(radials, 'a')).toBe('selected');
    expect(getCheckedRadialValue(radials, 'b')).toBeUndefined();
    expect(getCheckedRadialValue(radials, 'missing')).toBeUndefined();
  });

  it('passes the original control to custom validators and propagates their errors', () => {
    const control = new FormControl('15/06/2024');
    const validate = jest.fn(() => ({ customValidation: true }));
    expect(getCustomValidation(validate, control)).toEqual({
      customValidation: true,
    });
    expect(
      getCustomValidation(undefined as unknown as ValidatorFn, control),
    ).toBeNull();
    expect(
      getDatepickerValidationResult(
        control.value!,
        'dd/MM/yyyy',
        validate,
        control,
        { customValidation: 'invalid date' },
      ),
    ).toEqual({ errors: { customValidation: true }, message: 'invalid date' });
    expect(validate).toHaveBeenCalledWith(control);
    expect(
      getPhoneNumberValidationResult(
        '+521234567890',
        false,
        false,
        '+52',
        10,
        validate,
        control,
        { customValidation: 'invalid phone' },
      ),
    ).toEqual({ errors: { customValidation: true }, message: 'invalid phone' });
  });

  it('builds required single-character TOTP controls', () => {
    expect(buildTotpControlsMap('code', 0)).toEqual({});
    const controls = buildTotpControlsMap('code', 2);
    expect(Object.keys(controls)).toEqual(['name_code_0', 'name_code_1']);
    const control = controls.name_code_0;
    expect(control.hasError('required')).toBe(true);
    control.setValue('A');
    expect(control.valid).toBe(true);
    control.setValue('12');
    expect(control.hasError('pattern')).toBe(true);
  });

  it('returns JSON validation errors without rejecting empty values or other formats', () => {
    const json = getInputValidatorValidatorError('jsonValidation');
    expect(json(new FormControl(''))).toBeNull();
    expect(json(new FormControl('{}'))).toBeNull();
    expect(json(new FormControl('invalid'))).toEqual({ invalidJson: true });
    expect(
      getInputValidatorValidatorError('other')(new FormControl('value')),
    ).toBeNull();
    const custom: ValidatorFn = () => ({ custom: true });
    expect(getInputValidatorValidatorError(custom)).toBe(custom);
  });

  it.each([
    ['checkbox', 'option', true, 'option'],
    ['radio', '', true, true],
    ['checkbox', 'option', false, 'original'],
    ['switch', 'ignored', true, true],
    ['switch', 'ignored', false, 'original'],
    ['text', 'updated', false, 'updated'],
    ['text', '', false, 'original'],
  ])(
    'assigns %s values while preserving checked and empty-value rules',
    (type, value, checked, expected) => {
      const control = new FormControl('original');
      addInputValidatorValue(
        control,
        type as string,
        value,
        checked as boolean,
      );
      expect(control.value).toBe(expected);
    },
  );

  it('configures built-in validators, initializes a value and enables the field', () => {
    const control = new FormControl('');
    configure(control, {
      value: 'ab',
      isRequired: true,
      min: 5,
      max: 10,
      minLength: 3,
      pattern: '[a-z]+',
    });
    expect(control.value).toBe('ab');
    control.updateValueAndValidity();
    expect(control.hasValidator(Validators.required)).toBe(true);
    expect(control.hasError('minlength')).toBe(true);
    control.setValue('4');
    expect(control.hasError('min')).toBe(true);
    control.setValue('11');
    expect(control.hasError('max')).toBe(true);
    expect(control.hasError('pattern')).toBe(true);
    expect(control.enabled).toBe(true);
    configure(control, { value: 'replacement', isRequired: true });
    expect(control.value).toBe('11');
  });

  it('supports email, JSON, single and multiple custom validators and disabled state', () => {
    const control = new FormControl('invalid');
    const single: ValidatorFn = () => ({ single: true });
    configure(control, {
      type: 'email',
      isJsonFormat: true,
      customValidation: single,
    });
    control.updateValueAndValidity();
    expect(control.hasError('email')).toBe(true);
    expect(control.hasError('invalidJson')).toBe(true);
    expect(control.hasError('single')).toBe(true);
    configure(control, {
      type: 'email',
      customValidation: [() => ({ multiple: true })],
      isDisabled: true,
    });
    expect(control.disabled).toBe(true);
    control.enable();
    expect(control.hasError('multiple')).toBe(true);
    configure(control, {
      customValidation: undefined as unknown as ValidatorFn,
    });
    expect(control.enabled).toBe(true);
    expect(() => configure(undefined)).not.toThrow();
    configure(new FormControl(null), { type: 'checkbox', checked: true });
  });

  it('safely skips all validator registration and disabling when no control exists', () => {
    const validate = jest.fn(() => ({ customValidation: true }));

    expect(() =>
      configure(undefined, {
        type: 'email',
        isRequired: true,
        min: 1,
        max: 10,
        minLength: 2,
        pattern: '[a-z]+',
        isJsonFormat: true,
        customValidation: validate,
        isDisabled: true,
      }),
    ).not.toThrow();
    expect(validate).not.toHaveBeenCalled();
  });

  it('resolves required status from an existing validator or the input flag', () => {
    expect(
      getInputValidatorIsFieldRequired({
        control: new FormControl('', Validators.required),
        isRequired: false,
      }),
    ).toBe(true);
    expect(
      getInputValidatorIsFieldRequired({
        control: undefined,
        isRequired: true,
      }),
    ).toBe(true);
    expect(
      getInputValidatorIsFieldRequired({
        control: new FormControl(''),
        isRequired: false,
      }),
    ).toBe(false);
  });

  it('preserves explicit messages and the priority of each recognized error', () => {
    const control = new FormControl('');
    const options = {
      control,
      errorMessage: '',
      pattern: '[a-z]+',
      min: 1,
      max: 10,
      minLength: 2,
      maxLength: 5,
      label: 'Name',
    };
    for (const key of [
      'pattern',
      'min',
      'max',
      'minlength',
      'maxlength',
      'required',
      'invalidJson',
      'customValidation',
    ]) {
      control.setErrors({ [key]: true });
      const messages = {
        pattern: 'pattern',
        min: 'min',
        max: 'max',
        minLength: 'minlength',
        maxLength: 'maxlength',
        required: 'required',
        jsonFormat: 'invalidJson',
        customValidation: 'customValidation',
      };
      expect(
        getInputValidatorErrorMessage({ ...options, errorMessage: messages }),
      ).toBe(key);
    }
    control.setErrors({ pattern: true, required: true });
    expect(
      getInputValidatorErrorMessage({
        ...options,
        errorMessage: { pattern: 'first', required: 'second' },
      }),
    ).toBe('first');
    expect(
      getInputValidatorErrorMessage({ ...options, errorMessage: 'explicit' }),
    ).toBe('explicit');
    control.setErrors(null);
    expect(getInputValidatorErrorMessage(options)).toBe('');
    expect(
      getInputValidatorErrorMessage({ ...options, control: undefined }),
    ).toBe('');
  });
});
