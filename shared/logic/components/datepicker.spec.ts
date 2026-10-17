import { FormControl } from '@angular/forms';
import {
  buildDatepickerErrorMessage,
  getDatepickerValidationResult,
  parseDatepickerDate,
} from './datepicker';

describe('datepicker', () => {
  describe('getDatepickerValidationResult', () => {
    it('should return no errors when the value is empty', () => {
      expect(
        getDatepickerValidationResult(
          '',
          'dd/MM/yyyy',
          undefined,
          new FormControl(),
          '',
        ),
      ).toEqual({ errors: null });
    });

    it('should return a custom validation error when the date does not match the format', () => {
      const result = getDatepickerValidationResult(
        'not-a-date',
        'dd/MM/yyyy',
        undefined,
        new FormControl(),
        '',
      );

      expect(result.errors).toEqual({ customValidation: true });
      expect(result.message).toBe(
        'Por favor ingresa la fecha con formato dd/MM/yyyy',
      );
    });

    it('should run the custom validation when the date is valid', () => {
      const control = new FormControl('15/06/2024');
      const result = getDatepickerValidationResult(
        '15/06/2024',
        'dd/MM/yyyy',
        undefined,
        control,
        '',
      );

      expect(result.errors).toBeNull();
      expect(result.message).toBe('');
    });
  });

  describe('buildDatepickerErrorMessage', () => {
    it('should use the default required message when none is provided', () => {
      const result = buildDatepickerErrorMessage(
        undefined,
        'Fecha de nacimiento',
        '',
        '',
      );

      expect(result.required).toBe(
        'Por favor ingresa la fecha de Fecha de nacimiento',
      );
    });

    it('should use the provided required field message', () => {
      const result = buildDatepickerErrorMessage(
        'Campo obligatorio',
        'Fecha de nacimiento',
        '',
        '',
      );

      expect(result.required).toBe('Campo obligatorio');
    });

    it('should merge in a custom errorMessage object when it is set', () => {
      const result = buildDatepickerErrorMessage(undefined, 'Fecha', '', {
        required: 'Custom required',
      });

      expect(result.required).toBe('Custom required');
    });

    it('should fall back to the default required message when the custom errorMessage object has none', () => {
      const result = buildDatepickerErrorMessage(undefined, 'Fecha', '', {
        pattern: 'Custom pattern',
      });

      expect(result.required).toBe('Por favor ingresa la fecha de Fecha');
    });
  });

  describe('parseDatepickerDate', () => {
    it('should return a DateTime for a valid date', () => {
      const result = parseDatepickerDate('15/06/2024', 'dd/MM/yyyy');
      expect(result?.isValid).toBe(true);
    });

    it('should return null for an invalid date', () => {
      expect(parseDatepickerDate('not-a-date', 'dd/MM/yyyy')).toBeNull();
    });
  });
});
