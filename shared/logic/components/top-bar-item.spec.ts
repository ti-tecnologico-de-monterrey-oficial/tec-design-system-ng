import { getTopBarItemActiveClass } from './top-bar-item';

describe('getTopBarItemActiveClass', () => {
  it('should return the active class when the item is active', () => {
    expect(getTopBarItemActiveClass(true)).toBe('bmb_top-bar-item-active');
  });

  it('should return an empty class when the item is inactive', () => {
    expect(getTopBarItemActiveClass(false)).toBe('');
  });
});
