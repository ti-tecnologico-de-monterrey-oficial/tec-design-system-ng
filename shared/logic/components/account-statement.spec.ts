import {
  getAccountStatementFormattedDate,
  getAccountStatementProgressPercent,
  isAccountStatementCustomAmountSelected,
  resolveAccountStatementPaymentAmount,
} from './account-statement';

describe('getAccountStatementFormattedDate', () => {
  it('should return an empty string when no date is given', () => {
    expect(getAccountStatementFormattedDate(undefined, 'yyyy-MM-dd')).toBe(
      '',
    );
  });

  it('should format the given date', () => {
    expect(
      getAccountStatementFormattedDate('2024-01-15', 'yyyy-MM-dd'),
    ).toBe('15 ene 2024');
  });
});

describe('getAccountStatementProgressPercent', () => {
  it('should calculate the percentage of progress', () => {
    expect(getAccountStatementProgressPercent(50, 100)).toBe(50);
  });
});

describe('isAccountStatementCustomAmountSelected', () => {
  it('should return true for modalOtherAmountInput', () => {
    expect(isAccountStatementCustomAmountSelected('modalOtherAmountInput')).toBe(
      true,
    );
  });

  it('should return false for any other value', () => {
    expect(isAccountStatementCustomAmountSelected('other')).toBe(false);
  });
});

describe('resolveAccountStatementPaymentAmount', () => {
  it('should resolve the fixed amount when custom amount is disabled', () => {
    expect(
      resolveAccountStatementPaymentAmount(false, true, 0, 100, 40, 60),
    ).toEqual({ amount: 60, hasError: false });
  });

  it('should resolve the custom amount when valid', () => {
    expect(
      resolveAccountStatementPaymentAmount(true, true, 30, 100, 40, 60),
    ).toEqual({ amount: 30, hasError: false });
  });

  it('should return an error when the custom amount exceeds maxAmount', () => {
    expect(
      resolveAccountStatementPaymentAmount(true, true, 100, 100, 40, 60),
    ).toEqual({ amount: null, hasError: true });
  });

  it('should return an error when the custom amount is not positive', () => {
    expect(
      resolveAccountStatementPaymentAmount(true, true, 0, 100, 40, 60),
    ).toEqual({ amount: null, hasError: true });
  });

  it('should return an error when the form is invalid', () => {
    expect(
      resolveAccountStatementPaymentAmount(true, false, 30, 100, 40, 60),
    ).toEqual({ amount: null, hasError: true });
  });
});
