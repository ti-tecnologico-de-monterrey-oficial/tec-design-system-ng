import { resolveTopBarImage } from './top-bar';

describe('top-bar', () => {
  it('should keep the current image when it is not empty', () => {
    expect(
      resolveTopBarImage('custom-image.svg', false, 'default.svg', 'mitec.svg'),
    ).toBe('custom-image.svg');
  });

  it('should keep the current image when it is not empty, regardless of mitec', () => {
    expect(
      resolveTopBarImage('custom-image.svg', true, 'default.svg', 'mitec.svg'),
    ).toBe('custom-image.svg');
  });

  it('should fall back to the mitec image when current is empty and mitec is true', () => {
    expect(resolveTopBarImage('', true, 'default.svg', 'mitec.svg')).toBe(
      'mitec.svg',
    );
  });

  it('should fall back to the default image when current is empty and mitec is false', () => {
    expect(resolveTopBarImage('', false, 'default.svg', 'mitec.svg')).toBe(
      'default.svg',
    );
  });
});
