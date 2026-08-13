export const getClassNameByConditional = (
  mainClassName: string,
  conditional: any,
  newClassName: string,
): string[] => {
  const classes: string[] = [];

  if (evaluateConditional(conditional)) {
    return [...classes, `${mainClassName}-${newClassName}`];
  }
  return classes;
};

export const evaluateConditional = (conditional: any): boolean => {
  if (typeof conditional === 'boolean') return conditional;
  return !!conditional;
};
