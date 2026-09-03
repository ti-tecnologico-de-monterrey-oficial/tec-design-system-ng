export interface IBmbInputError {
  required?: string;
  min?: string;
  max?: string;
  minLength?: string;
  maxLength?: string;
  pattern?: string;
  jsonFormat?: string;
  customValidation?: string;
}
export type IBmbAlignTooltip = 'above' | 'below' | 'left' | 'right'; // Deprecated
export type IBmbJustifyTooltip = 'centered' | 'before' | 'after'; // Deprecated
export interface IBmbInputTooltipPosition {
  align: IBmbAlignTooltip;
  justify: IBmbJustifyTooltip;
}
export type IBmbInputType = 'text' | 'password' | 'number' | 'text-area';
export type IBmbInputAppearance = 'main' | 'normal' | 'simple';
export type IBmbAdditionalAction = 'copy' | 'showHide' | 'none';
export type IBmbInputValType =
  | 'radio'
  | 'checkbox'
  | 'email'
  | 'phone'
  | 'switch'
  | 'file';
