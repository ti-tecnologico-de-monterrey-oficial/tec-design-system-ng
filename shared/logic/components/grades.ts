import type { IBmbGrades,
  IBmbGradesMicroOptions } from '../../types/components/grades';

export function getMissingGradesMicroInputs(
  options: IBmbGradesMicroOptions,
): string[] {
  const inputs: string[] = [];
  if (!options.gradeTitle) inputs.push('gradeTitle');
  if (!options.componentTitle && !options.title) inputs.push('title');
  if (!options.accredited) inputs.push('accredited');
  if (!options.average) inputs.push('average');
  if (!options.summary) inputs.push('summary');
  return inputs;
}
export function getGradesNavigationIndex(
  index: number,
  direction: -1 | 1,
  count: number,
): number {
  if (direction === -1) return index ? index - 1 : index;
  return index + 1 < count ? index + 1 : index;
}
export function findGradesPeriodIndex(
  grades: IBmbGrades[],
  gradeIndex: number,
  title: string,
): number {
  return grades[gradeIndex].periods.findIndex(
    (period) => period.detail.title === title,
  );
}

export function getGradesTitle(
  grades: IBmbGrades[],
  gradeIndex: number,
): string {
  return grades[gradeIndex]?.title;
}

export function getGradesDetailHeading(
  grades: IBmbGrades[],
  gradeIndex: number,
  periodIndex: number,
  showPrincipalDetail: boolean,
): string {
  const period = grades[gradeIndex]?.periods[periodIndex];
  if (showPrincipalDetail) return period.detail.title;
  return grades[gradeIndex]?.subtitle;
}

export function getGradesCalendarIcon(showPrincipalDetail: boolean): string {
  if (showPrincipalDetail) return 'calendar_month';
  return 'calendar_today';
}

export function getGradesAccreditedClasses(
  grades: IBmbGrades[],
  gradeIndex: number,
  periodIndex: number,
  showPrincipalDetail: boolean,
): number {
  const period = grades[gradeIndex].periods[periodIndex];
  if (showPrincipalDetail) return period.accreditedClasses;
  return 0;
}

export function getGradesPeriodAverage(
  grades: IBmbGrades[],
  gradeIndex: number,
  periodIndex: number,
  showPrincipalDetail: boolean,
): number {
  const period = grades[gradeIndex].periods[periodIndex];
  if (showPrincipalDetail) return period.periodAverage;
  return 0;
}

export function getGradesServiceHours(
  grades: IBmbGrades[],
  gradeIndex: number,
  periodIndex: number,
  showPrincipalDetail: boolean,
): number | boolean {
  if (grades[gradeIndex].periods[periodIndex].serviceHours) {
    const period = grades[gradeIndex].periods[periodIndex];
    if (showPrincipalDetail) return period.serviceHours ?? 0;
    return 0;
  }
  return false;
}

export function getGradesDetailTitle(element: any): string {
  return element.detail.title;
}

export function getGradesDetailSubtitle(element: any): string {
  return element.detail.subtitle;
}

export function getGradesDetailScore(element: any): string {
  return element.detail.score;
}

export function getGradesElements(
  grades: IBmbGrades[],
  gradeIndex: number,
  periodIndex: number,
  showPrincipalDetail: boolean,
): any {
  const periods = grades[gradeIndex]?.periods;
  if (showPrincipalDetail) return periods[periodIndex]?.classes;
  return periods;
}
