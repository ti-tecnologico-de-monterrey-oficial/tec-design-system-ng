export interface ILogDeprecatedInput {
  name: string;
  hasValue: boolean;
}

export const logDeprecatedInput = (deprecatedInput: ILogDeprecatedInput, newInput: ILogDeprecatedInput | null) => {
  if (deprecatedInput.hasValue && (newInput !== null && !newInput.hasValue)) {
    console.warn(
      `The "${deprecatedInput.name}" input is deprecated and will be removed in future versions. Please use "${newInput.name}" instead.`,
    );
    return;
  }

  if (deprecatedInput.hasValue && (newInput === null)) {
    console.warn(
      `The "${deprecatedInput.name}" input is deprecated and will be removed in future versions. Check the documentation for more details.`,
    );
    return;
  }

  if (deprecatedInput.hasValue && newInput?.hasValue) {
    console.warn(
      `Please avoid using both "${deprecatedInput.name}" and "${newInput.name}" inputs at the same time. The "${deprecatedInput.name}" input is deprecated and will be removed in future versions. Please use "${newInput.name}" instead.`,
    );
  }
};
