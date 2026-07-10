export const initializeCheckboxState = (
  checked: boolean | undefined,
  indeterminate: boolean | undefined,
): {
  checked: boolean;
  indeterminate: boolean;
} => {
  if (indeterminate) {
    return {
      checked: false,
      indeterminate: true,
    };
  }

  return {
    checked: !!checked,
    indeterminate: false,
  };
};

export const getCheckboxStateOnChange = (
  targetChecked: boolean,
  indeterminate: boolean,
): {
  checked: boolean;
  indeterminate: boolean;
} => {
  return {
    checked: targetChecked,
    indeterminate: indeterminate ? false : indeterminate,
  };
};

export const getCheckboxStateOnEnter = (
  checked: boolean,
  indeterminate: boolean,
): {
  checked: boolean;
  indeterminate: boolean;
} => {
  if (indeterminate) {
    return {
      checked: true,
      indeterminate: false,
    };
  }

  return {
    checked: !checked,
    indeterminate: false,
  };
};