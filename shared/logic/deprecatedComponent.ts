export interface ILogDeprecatedComponent {
  componentName: string;
  selector: string;
}

export const deprecatedComponentLog = (
  deprecatedComponentName: ILogDeprecatedComponent,
  correctComponentName: ILogDeprecatedComponent | null,
) => {
  console.warn(
    `Please avoid using "${deprecatedComponentName.componentName}(${deprecatedComponentName.selector})" because is deprecated this will not be maintainable and will be removed in future versions.`.concat(
      correctComponentName
        ? ` Please use "${correctComponentName?.componentName}(${correctComponentName?.selector})" instead.`
        : '',
    ),
  );
};
