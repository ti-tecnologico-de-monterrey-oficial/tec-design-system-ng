export function filterCardRuleMatches(
  when: Record<string, any>,
  values: Record<string, any>,
): boolean {
  return Object.entries(when).every(([k, v]) => values[k] === v);
}

export function getFilterCardClearAllResetValue(
  controlType: string | undefined,
  isMultiSelect: boolean | undefined,
): boolean | string | string[] {
  if (
    controlType === 'checkbox' ||
    controlType === 'switch' ||
    controlType === 'tag'
  ) {
    return false;
  }

  return isMultiSelect ? [] : '';
}

export function getFilterCardControlResetValue(
  controlType: string | undefined,
  isMultiSelect: boolean | undefined,
): boolean | string | string[] {
  switch (controlType) {
    case 'checkbox':
    case 'switch':
    case 'tag':
      return false;
    case 'dropdown':
      return isMultiSelect ? [] : '';
    default:
      return '';
  }
}
