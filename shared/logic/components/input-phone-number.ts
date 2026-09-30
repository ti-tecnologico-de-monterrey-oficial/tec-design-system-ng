import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { getCustomValidation, getCustomValidationMessage } from '../utils';
import { IBmbCountryCode } from '../../types/components/input-phone-number';
import { IBmbDropdownItem, IBmbInputError } from '../../types';

export const findPhoneNumberCountry = (
  allCountryCodes: IBmbCountryCode[],
  value: string,
): IBmbCountryCode | undefined =>
  allCountryCodes.find(
    ({ country_code }) => country_code.toLocaleLowerCase() === value,
  );

export const getPhoneNumberCountryCode = (
  allCountryCodes: IBmbCountryCode[],
  value: string,
): string => {
  const selectedCountry = findPhoneNumberCountry(allCountryCodes, value);

  return selectedCountry ? selectedCountry.country_code.toLocaleLowerCase() : '';
};

export const getPhoneNumberCountryLada = (
  allCountryCodes: IBmbCountryCode[],
  value: string,
): string => {
  const selectedCountry = findPhoneNumberCountry(allCountryCodes, value);

  return selectedCountry ? selectedCountry.lada : '';
};

export const getPhoneNumberCountryLength = (
  allCountryCodes: IBmbCountryCode[],
  value: string,
): number => {
  const selectedCountry = findPhoneNumberCountry(allCountryCodes, value);

  return selectedCountry ? selectedCountry.length : 0;
};

export const getPhoneNumberWithoutLada = (
  controlValue: string,
  componentValue: string,
  lada: string,
): string => {
  const value = controlValue || componentValue;

  return value.replace(lada, '');
};

export const buildPhoneNumberControlValue = (
  lada: string,
  phoneNumber: string,
): string | null => (!!lada && !!phoneNumber ? lada + phoneNumber : null);

export const getPhoneNumberCountryOptions = (
  allCountryCodes: IBmbCountryCode[],
  onlyCountries: string[],
): IBmbDropdownItem[] => {
  const mapToOption = ({
    country,
    lada,
    country_code,
  }: IBmbCountryCode): IBmbDropdownItem => ({
    name: `${country} (${lada})`,
    value: country_code.toLocaleLowerCase(),
    selectedText: lada,
    icon: 'flag',
  });

  if (onlyCountries.length) {
    const lowerCaseCountries = onlyCountries.map((country) =>
      country.toLocaleLowerCase(),
    );

    return allCountryCodes
      .filter(({ country_code }) =>
        lowerCaseCountries.includes(country_code.toLocaleLowerCase()),
      )
      .map(mapToOption);
  }

  return allCountryCodes.map(mapToOption);
};

export const buildPhoneNumberErrorMessage = (
  errorMessage: string | IBmbInputError,
  countryLength: number,
  customValidationMessage: string,
): IBmbInputError => {
  const pattern = 'Por favor ingresa sólo caracteres numéricos';
  const minLength = `Por favor ingresa ${countryLength} caracteres numéricos`;

  if (errorMessage) {
    if (typeof errorMessage === 'string') {
      return {
        required: errorMessage.toString(),
        pattern,
        minLength,
        customValidation: customValidationMessage,
      };
    }

    return {
      pattern,
      minLength,
      ...errorMessage,
      customValidation: customValidationMessage,
    };
  }

  return { pattern, minLength, customValidation: customValidationMessage };
};

export const getPhoneNumberValidationResult = (
  value: string,
  hasPatternError: boolean,
  hasLengthOrMinLengthError: boolean,
  lada: string,
  length: number,
  customValidation: ValidatorFn | undefined,
  control: FormControl,
  errorMessage: string | IBmbInputError,
): { errors: ValidationErrors | null; message?: string } => {
  if (!value) return { errors: null };

  if (hasPatternError) return { errors: { pattern: true } };

  if (hasLengthOrMinLengthError) return { errors: { minlength: true } };

  const regExp = new RegExp(`^\\${lada}\\d{${length}}$`);

  if (!regExp.test(value)) {
    return {
      errors: { customValidation: true },
      message:
        'Por favor ingresa un número de teléfono válido, verifica si la lada es correcta.',
    };
  }

  const result = getCustomValidation(customValidation!, control);

  return { errors: result, message: getCustomValidationMessage(result, errorMessage) };
};
