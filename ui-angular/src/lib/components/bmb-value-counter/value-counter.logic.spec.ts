import {
  formatValueCounter,
  splitValueCounter,
} from '../../_shared/logic/components/value-counter';

describe('value counter logic', () => {
  it('should format progress and total with the default formatter', () => {
    expect(formatValueCounter('4', '10')).toBe('4/10');
  });

  it('should split values using a custom separator', () => {
    expect(splitValueCounter('$4:$10', ':')).toEqual({
      progress: '$4',
      total: '$10',
    });
  });

  it('should preserve text without a separator as the total', () => {
    expect(splitValueCounter('Disponible')).toEqual({
      progress: '',
      total: 'Disponible',
    });
  });
});
