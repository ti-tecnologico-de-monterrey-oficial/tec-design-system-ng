import {
  IBmbAlertColors,
  IBmbBaseColors,
  IBmbCreativeBaseColors,
  IBmbCreativeUseColors,
  IBmbmitecBaseColors,
  IBmbMitecInstitutionalColors,
  IBmbSemanticBaseColors,
  IBmbSemanticColors,
} from './foundations/colors/color-type';

export type IBmbColor =
  | IBmbBaseColors
  | IBmbmitecBaseColors
  | IBmbCreativeBaseColors
  | IBmbSemanticBaseColors
  | IBmbSemanticColors
  | IBmbMitecInstitutionalColors
  | IBmbCreativeUseColors
  | IBmbAlertColors;

export type IBmbContrast = 'default' | 'primary' | 'alternative' | 'solid';

export type IBmbColorSemantics =
  | 'success-primary'
  | 'success-light'
  | 'success-thin'
  | 'success-primary-alternative'
  | 'success-tint-alternative'
  | 'warning-primary'
  | 'warning-light'
  | 'warning-tint'
  | 'warning-primary-alternative'
  | 'error-primary'
  | 'error-light'
  | 'error-tint'
  | 'info-primary'
  | 'info-light'
  | 'info-tint'
  | 'branding-primary'
  | 'branding-tint'
  | 'branding-tint'
  | 'alert-primary'
  | 'alert-light'
  | 'alert-tint';
