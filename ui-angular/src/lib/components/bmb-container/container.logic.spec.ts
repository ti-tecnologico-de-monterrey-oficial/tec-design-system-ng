import { getContainerClasses } from '../../_shared/logic/components/container';

describe('container logic', () => {
  it('builds the base and appearance classes', () => {
    expect(
      getContainerClasses({
        appearance: 'primary-header',
        isHidden: false,
      }),
    ).toEqual(['bmb_container', 'bmb_container-primary-header']);
  });

  it('returns only the hidden class when hidden', () => {
    expect(
      getContainerClasses({
        appearance: 'primary-container',
        isHidden: true,
      }),
    ).toEqual(['bmb_container-hidden']);
  });
});
