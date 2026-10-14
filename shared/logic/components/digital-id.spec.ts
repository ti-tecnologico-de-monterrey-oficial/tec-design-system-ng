import { getDigitalIdFullName } from './digital-id';

describe('digital-id', () => {
  it('should join the name and surname with a space', () => {
    expect(getDigitalIdFullName('Paola', 'Mendez')).toBe('Paola Mendez');
  });
});
