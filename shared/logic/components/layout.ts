export const getResponsiveClasses = <T extends object>(value: T, baseClassName: string) => {
  const classes: string[] = Object.entries(value as Record<string, string>).map(
    ([device, deviceValue]) => `${baseClassName}-flow-${device}-${deviceValue}`
  );
  return classes;
}
