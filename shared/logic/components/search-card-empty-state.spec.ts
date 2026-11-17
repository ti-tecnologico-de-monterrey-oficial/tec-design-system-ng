import { getSearchCardEmptyStateTitleKey } from './search-card-empty-state';

describe('getSearchCardEmptyStateTitleKey', () => {
  it('should return the no-results key when there is an input value', () => {
    expect(getSearchCardEmptyStateTitleKey(true)).toBe(
      'search_card.empty_state.no_results_title',
    );
  });

  it('should return the new-search key when there is no input value', () => {
    expect(getSearchCardEmptyStateTitleKey(false)).toBe(
      'search_card.empty_state.new_search_card_title',
    );
  });
});
