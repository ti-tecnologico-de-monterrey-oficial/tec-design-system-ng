import { getTopBarItemActiveClass } from './top-bar-item';

describe('TopBarItem', () => {
  it('should create component', () => {
    expect(getTopBarItemActiveClass(true)).toBe('bmb_top-bar-item-active');
  });
});
