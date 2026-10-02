import { getDividerClasses } from '../../_shared/logic/components/divider';

describe('divider logic', () => {
  it('uses the simple horizontal defaults when options are omitted', () => {
    expect(getDividerClasses({})).toEqual([
      'bmb_divider',
      'bmb_divider-simple',
      'bmb_divider-horizontal',
    ]);
  });

  it('builds the base, type, and horizontal orientation classes', () => {
    expect(
      getDividerClasses({
        type: 'dashed',
        orientation: 'horizontal',
        removeMargin: false,
      }),
    ).toEqual(['bmb_divider', 'bmb_divider-dashed', 'bmb_divider-horizontal']);
  });

  it('adds the no-margin class when requested', () => {
    expect(
      getDividerClasses({
        type: 'dotted',
        orientation: 'horizontal',
        removeMargin: true,
      }),
    ).toEqual([
      'bmb_divider',
      'bmb_divider-dotted',
      'bmb_divider-horizontal',
      'bmb_divider-no-margin',
    ]);
  });

  it('combines vertical orientation, type, and no-margin classes', () => {
    expect(
      getDividerClasses({
        type: 'dashed',
        orientation: 'vertical',
        removeMargin: true,
      }),
    ).toEqual([
      'bmb_divider',
      'bmb_divider-dashed',
      'bmb_divider-vertical',
      'bmb_divider-no-margin',
    ]);
  });

  it('does not add the no-margin class when explicitly disabled', () => {
    expect(
      getDividerClasses({
        type: 'simple',
        orientation: 'vertical',
        removeMargin: false,
      }),
    ).not.toContain('bmb_divider-no-margin');
  });
});
