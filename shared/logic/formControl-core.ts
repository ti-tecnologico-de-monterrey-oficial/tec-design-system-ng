import type { IBmbInputType, IBmbInputValType } from '../types/input';
export interface FieldState {
  invalid: boolean;
  touched: boolean;
  dirty: boolean;
}
export const showError = (control: FieldState | null | undefined): boolean => {
  return (control?.invalid && (control?.touched || control?.dirty)) || false;
};

export function getInitialFieldValue(
  type: IBmbInputType | IBmbInputValType = 'text',
  isMultipleFile = false,
): string | null | null[] {
  if (['radio', 'checkbox', 'phone', 'number', 'switch'].includes(type))
    return null;
  if (type === 'file') return isMultipleFile ? [null] : null;
  return '';
}
