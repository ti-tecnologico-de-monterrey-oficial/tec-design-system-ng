import { getDividerClasses } from '../../_shared/logic/components/divider';

describe('divider logic', () => {
  it('builds the base and type classes without an empty class', () => {
    expect(getDividerClasses({ type: 'dashed', removeMargin: false })).toEqual([
      'bmb_divider',
      'bmb_divider-dashed',
    ]);
  });

  it('adds the no-margin class when requested', () => {
    expect(getDividerClasses({ type: 'dotted', removeMargin: true })).toEqual([
      'bmb_divider',
      'bmb_divider-dotted',
      'bmb_divider-no-margin',
    ]);
  });
});
