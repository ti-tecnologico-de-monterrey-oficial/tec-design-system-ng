export interface IFormValidatorRadialSnapshot {
  name: string;
  value?: unknown;
  isControlNull: boolean;
  checked: boolean;
}
export function getUniqueRadialGroupNames(
  radials: IFormValidatorRadialSnapshot[],
): string[] {
  return radials.reduce((acc: string[], current) => {
    if (acc.includes(current.name)) return acc;
    return [...acc, current.name];
  }, []);
}

export function getRadialGroupIndexesByName(
  radials: IFormValidatorRadialSnapshot[],
  name: string,
): number[] {
  return radials.reduce((acc: number[], current, index) => {
    if (current.name === name) return [...acc, index];
    return acc;
  }, []);
}

export function isEveryRadialInGroupControlled(
  radials: IFormValidatorRadialSnapshot[],
  name: string,
): boolean {
  return radials
    .filter((radial) => radial.name === name)
    .every((radial) => !radial.isControlNull);
}

export function getCheckedRadialSnapshotValue(
  radials: IFormValidatorRadialSnapshot[],
  name: string,
): unknown {
  return radials
    .filter((radial) => radial.name === name)
    .find((radial) => radial.checked)?.value;
}
