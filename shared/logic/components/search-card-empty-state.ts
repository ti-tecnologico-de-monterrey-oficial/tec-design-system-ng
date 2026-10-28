export function getSearchCardEmptyStateTitleKey(inputHasValue: boolean): string {
  return inputHasValue
    ? 'search_card.empty_state.no_results_title'
    : 'search_card.empty_state.new_search_card_title';
}
