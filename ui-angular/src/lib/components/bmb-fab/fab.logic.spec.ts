import {
  getFabClassName,
  getFabIconName,
  isFabActiveState,
  toggleFabActive,
} from '../../_shared/logic/components/fab';

describe('FAB logic', () => {
  it('resolves active state from the public inputs', () => {
    expect(
      isFabActiveState({ mitec: false, type: 'normal', size: 'large' }),
    ).toBe(true);
    expect(
      isFabActiveState({ mitec: true, type: 'normal', size: 'large' }),
    ).toBe(false);
  });

  it('builds classes and icons for every variant', () => {
    expect(
      getFabClassName({ mitec: false, type: 'normal', size: 'small' }),
    ).toBe('bmb_fab-main bmb_fab-main-small');
    expect(getFabClassName({ mitec: true, type: 'normal', size: 'large' })).toBe(
      'bmb_fab-mitec-button',
    );
    expect(
      getFabIconName({ icon: '', activeState: true, isActive: false }),
    ).toBe('apps');
    expect(
      getFabIconName({ icon: 'add', activeState: true, isActive: true }),
    ).toBe('close');
  });

  it('toggles the active value without changing its type', () => {
    expect(toggleFabActive(false)).toBe(true);
    expect(toggleFabActive(true)).toBe(false);
  });
});
