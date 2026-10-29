import { getContainerButtonClassList } from './container-button';

describe('Container button shared behavior', () => {
  it('preserves combined modifiers and the square-without-icon condition', () => {
    expect(
      getContainerButtonClassList({
        square: true,
        small: true,
        state: 'disabled',
        alternative: true,
      }),
    ).toEqual([
      'bmb_container-button',
      'bmb_container-button-square',
      'bmb_container-button-square-no-icon',
      'bmb_container-button-small',
      'bmb_container-button-disabled',
      'bmb_container-button-alternative',
    ]);
    expect(
      getContainerButtonClassList({
        square: true,
        small: true,
        iconLeft: 'home',
        state: 'error',
      }),
    ).not.toContain('bmb_container-button-square-no-icon');
    expect(getContainerButtonClassList({})).toEqual(['bmb_container-button']);
  });
});
