import type { IBmbDropdownItem } from '../../types/components/dropdown';
import type {
  IBmbOptionRule,
  IBmbVisibilityRule,
} from '../../types/components/filter-card';

export function getFilterCardVisibility(
  rules: IBmbVisibilityRule[],
  values: Record<string, any>,
): Map<string, boolean> | null {
  if (!rules.length) return null;
  const map = new Map<string, boolean>();
  for (const rule of rules) {
    if (matchesFilterCardRule(rule.when, values)) {
      rule.show?.forEach((id) => map.set(id, true));
      rule.hide?.forEach((id) => map.set(id, false));
    }
  }
  return map;
}

export function getFilterCardOptions(
  rules: IBmbOptionRule[],
  values: Record<string, any>,
): Map<string, string[] | IBmbDropdownItem[]> {
  const map = new Map<string, string[] | IBmbDropdownItem[]>();
  for (const rule of rules) {
    if (matchesFilterCardRule(rule.when, values))
      map.set(rule.target, rule.options);
  }
  return map;
}

export function getFilterCardSubmission(
  storedValues: Record<string, any>,
  values: Record<string, any>,
): Record<string, any> {
  const formData: Record<string, any> = {};
  Object.keys(storedValues).forEach((key) => {
    const stored = storedValues[key];
    if (
      stored.checked &&
      ['checkbox', 'tag', 'radial', 'switch'].includes(stored.type)
    ) {
      formData[key] = stored;
    } else if (stored.type === 'dropdown') {
      const currentValue = values[key];
      if (
        Array.isArray(currentValue) ? currentValue.length > 0 : !!currentValue
      ) {
        formData[key] = { ...stored, value: currentValue };
      }
    }
  });
  if (values['search']) formData['search'] = values['search'];
  return formData;
}

export function matchesFilterCardRule(
  when: Record<string, any>,
  values: Record<string, any>,
): boolean {
  return Object.entries(when).every(([k, v]) => values[k] === v);
}

export function filterCardRuleMatches(
  when: Record<string, any>,
  values: Record<string, any>,
): boolean {
  return matchesFilterCardRule(when, values);
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
