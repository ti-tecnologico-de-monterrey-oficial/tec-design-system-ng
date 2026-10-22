import { getGradesNavigationIndex, getMissingGradesMicroInputs, getGradesServiceHours, getGradesElements, getGradesDetailHeading, findGradesPeriodIndex } from './grades';
import type { IBmbGrades } from '../../types/components/grades';

describe('Grades shared behavior', () => {
  const classes = [
    { detail: { title: 'Math', subtitle: 'TC', score: 90 }, partials: [] },
  ];
  const grades: IBmbGrades[] = [
    {
      title: '2024',
      subtitle: 'Semesters',
      periods: [
        {
          detail: { title: 'Fall', subtitle: '', score: 90 },
          accreditedClasses: 3,
          periodAverage: 90,
          serviceHours: 0,
          classes,
        },
      ],
    },
  ];
  it('keeps navigation within the existing boundaries', () => {
    expect(getGradesNavigationIndex(0, -1, 2)).toBe(0);
    expect(getGradesNavigationIndex(1, 1, 2)).toBe(1);
    expect(getGradesNavigationIndex(0, 1, 2)).toBe(1);
    expect(getGradesNavigationIndex(1, -1, 2)).toBe(0);
  });
  it('preserves summary/detail selection and the zero-hours fallback', () => {
    expect(getGradesElements(grades, 0, 0, true)).toBe(classes);
    expect(getGradesElements(grades, 0, 0, false)).toBe(grades[0].periods);
    expect(getGradesDetailHeading(grades, 0, 0, false)).toBe('Semesters');
    expect(getGradesDetailHeading(grades, 0, 0, true)).toBe('Fall');
    expect(getGradesServiceHours(grades, 0, 0, true)).toBe(false);
    expect(findGradesPeriodIndex(grades, 0, 'missing')).toBe(-1);
  });
  it('preserves required micro fields and the deprecated title fallback', () => {
    expect(getMissingGradesMicroInputs({})).toEqual([
      'gradeTitle',
      'title',
      'accredited',
      'average',
      'summary',
    ]);
    expect(
      getMissingGradesMicroInputs({
        gradeTitle: 'Period',
        title: 'Legacy',
        accredited: {},
        average: {},
        summary: {},
      }),
    ).toEqual([]);
  });
});
