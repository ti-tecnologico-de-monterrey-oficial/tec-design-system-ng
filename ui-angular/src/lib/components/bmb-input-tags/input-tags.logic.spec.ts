import {
  buildInputTagsOptions,
  getSelectedInputTags,
  parseInputTagsValue,
} from '../../_shared/logic/components/input-tags';

describe('input tags logic', () => {
  it('splits and trims comma separated values', () => {
    expect(parseInputTagsValue('a, b,c')).toEqual(['a', 'b', 'c']);
    expect(parseInputTagsValue('single')).toEqual(['single']);
  });

  it('filters the items whose value is included in the control value', () => {
    const items = [
      { icon: '', text: 'One', value: '1' },
      { icon: '', text: 'Two', value: '2' },
      { icon: '', text: 'Three', value: '3' },
    ];

    expect(getSelectedInputTags(items, ['1', '3'])).toEqual([
      items[0],
      items[2],
    ]);
    expect(getSelectedInputTags(items, [])).toEqual([]);
  });

  it('adds a new string option keeping uniqueness', () => {
    const result = buildInputTagsOptions(['a', 'b'], 'a', 'uuid-1');
    expect(result).toEqual(['a', 'b']);

    const result2 = buildInputTagsOptions(['a', 'b'], 'c', 'uuid-1');
    expect(result2).toEqual(['a', 'b', 'c']);
  });

  it('adds a new dropdown item option', () => {
    const result = buildInputTagsOptions(
      [{ name: 'a', value: 'a' }],
      'b',
      'uuid-1',
    );

    expect(result).toEqual([
      { name: 'a', value: 'a' },
      { name: 'b', value: 'b', selectedText: 'b', id: 'uuid-1' },
    ]);
  });
});
