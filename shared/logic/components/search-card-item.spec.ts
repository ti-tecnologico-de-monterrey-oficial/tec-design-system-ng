import { getSearchCardItemBoxClass } from './search-card-item';

describe('getSearchCardItemBoxClass', () => {
  it('should build the class name from the background color icon', () => {
    expect(getSearchCardItemBoxClass('white_primary')).toBe(
      'bmb_search-card-item-box-white_primary',
    );
  });
});
