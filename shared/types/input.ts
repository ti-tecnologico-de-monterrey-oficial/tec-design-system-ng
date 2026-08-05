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