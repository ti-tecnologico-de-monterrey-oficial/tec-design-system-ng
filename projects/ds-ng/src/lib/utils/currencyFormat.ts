export const currencyFormat = (amount: number): string => {
  return Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN'}).format(amount);
}
