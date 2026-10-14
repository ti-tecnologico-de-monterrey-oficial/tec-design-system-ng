import { FormControl } from '@angular/forms';
import {
  buildPhoneNumberControlValue,
  buildPhoneNumberErrorMessage,
  findPhoneNumberCountry,
  getPhoneNumberCountryCode,
  getPhoneNumberCountryLada,
  getPhoneNumberCountryLength,
  getPhoneNumberCountryOptions,
  getPhoneNumberValidationResult,
  getPhoneNumberWithoutLada,
} from './input-phone-number';

const allCountryCodes = [
  { country: 'México', country_code: 'MX', lada: '+52', length: 10 },
  { country: 'Estados Unidos', country_code: 'US', lada: '+1', length: 10 },
];

describe('input-phone-number logic', () => {
  describe('findPhoneNumberCountry', () => {
    it('should find a country by its lowercased code', () => {
      expect(findPhoneNumberCountry(allCountryCodes, 'mx')).toEqual(
        allCountryCodes[0],
      );
    });

    it('should return undefined when the code does not exist', () => {
      expect(findPhoneNumberCountry(allCountryCodes, 'zz')).toBeUndefined();
    });
  });

  describe('getPhoneNumberCountryCode', () => {
    it('should return the lowercased country code when found', () => {
      expect(getPhoneNumberCountryCode(allCountryCodes, 'mx')).toBe('mx');
    });

    it('should return an empty string when not found', () => {
      expect(getPhoneNumberCountryCode(allCountryCodes, 'zz')).toBe('');
    });
  });

  describe('getPhoneNumberCountryLada', () => {
    it('should return the lada when found', () => {
      expect(getPhoneNumberCountryLada(allCountryCodes, 'us')).toBe('+1');
    });

    it('should return an empty string when not found', () => {
      expect(getPhoneNumberCountryLada(allCountryCodes, 'zz')).toBe('');
    });
  });

  describe('getPhoneNumberCountryLength', () => {
    it('should return the length when found', () => {
      expect(getPhoneNumberCountryLength(allCountryCodes, 'us')).toBe(10);
    });

    it('should return 0 when not found', () => {
      expect(getPhoneNumberCountryLength(allCountryCodes, 'zz')).toBe(0);
    });
  });

  describe('getPhoneNumberWithoutLada', () => {
    it('should strip the lada from the control value when present', () => {
      expect(
        getPhoneNumberWithoutLada('+525512345678', '', '+52'),
      ).toBe('5512345678');
    });

    it('should fall back to the component value when the control value is empty', () => {
      expect(getPhoneNumberWithoutLada('', '+525512345678', '+52')).toBe(
        '5512345678',
      );
    });
  });

  describe('buildPhoneNumberControlValue', () => {
    it('should combine lada and phone number when both are present', () => {
      expect(buildPhoneNumberControlValue('+52', '5512345678')).toBe(
        '+525512345678',
      );
    });

    it('should return null when the lada is missing', () => {
      expect(buildPhoneNumberControlValue('', '5512345678')).toBeNull();
    });

    it('should return null when the phone number is missing', () => {
      expect(buildPhoneNumberControlValue('+52', '')).toBeNull();
    });
  });

  describe('getPhoneNumberCountryOptions', () => {
    it('should return all countries as options when onlyCountries is empty', () => {
      expect(getPhoneNumberCountryOptions(allCountryCodes, [])).toEqual([
        { name: 'México (+52)', value: 'mx', selectedText: '+52', icon: 'flag' },
        {
          name: 'Estados Unidos (+1)',
          value: 'us',
          selectedText: '+1',
          icon: 'flag',
        },
      ]);
    });

    it('should filter options by onlyCountries', () => {
      expect(getPhoneNumberCountryOptions(allCountryCodes, ['mx'])).toEqual([
        { name: 'México (+52)', value: 'mx', selectedText: '+52', icon: 'flag' },
      ]);
    });
  });

  describe('buildPhoneNumberErrorMessage', () => {
    it('should return the base messages when there is no errorMessage', () => {
      const result = buildPhoneNumberErrorMessage('', 10, '');

      expect(result.pattern).toBeTruthy();
      expect(result.minLength).toContain('10');
      expect(result.required).toBeUndefined();
    });

    it('should set the required message when errorMessage is a string', () => {
      const result = buildPhoneNumberErrorMessage('Required field', 10, '');

      expect(result.required).toBe('Required field');
      expect(result.pattern).toBeTruthy();
      expect(result.minLength).toBeTruthy();
    });

    it('should merge the errorMessage object when it is not a string', () => {
      const result = buildPhoneNumberErrorMessage(
        { required: 'Custom required', min: 'Custom min' },
        10,
        'Custom validation message',
      );

      expect(result.required).toBe('Custom required');
      expect(result.min).toBe('Custom min');
      expect(result.pattern).toBeTruthy();
      expect(result.minLength).toBeTruthy();
      expect(result.customValidation).toBe('Custom validation message');
    });
  });

  describe('getPhoneNumberValidationResult', () => {
    const control = new FormControl('');

    it('should return no errors when the value is empty', () => {
      expect(
        getPhoneNumberValidationResult(
          '',
          false,
          false,
          '+52',
          10,
          undefined,
          control,
          '',
        ),
      ).toEqual({ errors: null });
    });

    it('should return a pattern error when the phone control has a pattern error', () => {
      expect(
        getPhoneNumberValidationResult(
          '123',
          true,
          false,
          '+52',
          10,
          undefined,
          control,
          '',
        ),
      ).toEqual({ errors: { pattern: true } });
    });

    it('should return a minlength error when the phone control has a length error', () => {
      expect(
        getPhoneNumberValidationResult(
          '123',
          false,
          true,
          '+52',
          10,
          undefined,
          control,
          '',
        ),
      ).toEqual({ errors: { minlength: true } });
    });

    it('should return a customValidation error when the value does not match the expected pattern', () => {
      expect(
        getPhoneNumberValidationResult(
          '123',
          false,
          false,
          '+52',
          10,
          undefined,
          control,
          '',
        ),
      ).toEqual({
        errors: { customValidation: true },
        message:
          'Por favor ingresa un número de teléfono válido, verifica si la lada es correcta.',
      });
    });

    it('should return no errors when the value matches the pattern and there is no custom validation', () => {
      expect(
        getPhoneNumberValidationResult(
          '+525512345678',
          false,
          false,
          '+52',
          10,
          undefined,
          control,
          '',
        ),
      ).toEqual({ errors: null, message: '' });
    });

    it('should run the custom validation function when provided', () => {
      const customValidation = jest.fn().mockReturnValue({ customValidation: true });

      const result = getPhoneNumberValidationResult(
        '+525512345678',
        false,
        false,
        '+52',
        10,
        customValidation,
        control,
        { customValidation: 'Custom message' },
      );

      expect(customValidation).toHaveBeenCalledWith(control);
      expect(result.errors).toEqual({ customValidation: true });
      expect(result.message).toBe('Custom message');
    });
  });
});
