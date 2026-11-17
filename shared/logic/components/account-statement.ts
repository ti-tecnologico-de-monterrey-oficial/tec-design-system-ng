import { DateTime } from 'luxon';
import { IAccountStatementPaymentResolution } from '../../types/components/account-statement';

export function getAccountStatementFormattedDate(
  date: string | undefined,
  format: string,
): string {
  if (!date) return '';
  const formatDate = DateTime.fromFormat(date, format);
  return formatDate.toLocaleString({
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function getAccountStatementProgressPercent(
  counter: number,
  totalCount: number,
): number {
  return (100 * counter) / totalCount;
}

export function isAccountStatementCustomAmountSelected(
  value: string,
): boolean {
  return value === 'modalOtherAmountInput';
}

export function resolveAccountStatementPaymentAmount(
  isEnableCustomAmount: boolean,
  isFormValid: boolean,
  formAmountValue: number,
  totalCount: number,
  counter: number,
  maxAmount: number,
): IAccountStatementPaymentResolution {
  if (!isEnableCustomAmount) {
    return { amount: totalCount - counter, hasError: false };
  }
  if (isFormValid && formAmountValue > 0 && formAmountValue <= maxAmount) {
    return { amount: formAmountValue, hasError: false };
  }
  return { amount: null, hasError: true };
}
