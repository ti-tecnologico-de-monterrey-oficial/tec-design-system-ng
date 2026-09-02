import { IBmbContrast } from '../../types/colors';

export function isInvoiceValueNegative(value: string): boolean {
  const isNegative = value.trim().startsWith('-');
  const number = parseFloat(value.replace(/[^\d.-]/g, ''));
  return isNegative || number < 0;
}

export function getInvoiceComponentClasses(
  appearanceContrast: IBmbContrast,
): string[] {
  const classes: string[] = ['bmb_invoice'];

  if (appearanceContrast === 'primary') {
    classes.push('bmb_invoice-primary');
  }

  if (appearanceContrast === 'alternative') {
    classes.push('bmb_invoice-alternative');
  }

  return classes;
}
