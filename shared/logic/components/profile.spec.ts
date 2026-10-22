import { mapLegacyProfileData, validateProfileOptions, getProfileUserData, assertProfileInputs } from './profile';
import type { IBmbProfileOptions } from '../../types/components/profile';

describe('Profile shared behavior', () => {
  const user = {
    name: 'Paloma',
    userImg: '',
    email: 'mail@tec.mx',
    registration: 'A032132',
  };
  const student = {
    userData: user,
    period: 'Fall',
    campus: 'Monterrey',
    program: 'ARQ19',
  };
  const options: IBmbProfileOptions = {
    isStandAlone: false,
    isStudent: true,
    isMobile: false,
    studentData: student,
  };
  it('maps legacy names and registration without changing optional values', () => {
    expect(
      mapLegacyProfileData({
        name: user.name,
        userImg: '',
        mail: user.email,
        matricula: 'A032132',
        period: 'Fall',
        campus: 'Monterrey',
        program: 'ARQ19',
      }),
    ).toEqual({
      ...student,
      curp: undefined,
      linkedin: undefined,
      isExatec: undefined,
    });
  });
  it('preserves standalone validation priority and user identity', () => {
    expect(() =>
      validateProfileOptions({ ...options, isStandAlone: true }),
    ).toThrow('standAloneData');
    expect(() =>
      validateProfileOptions({
        ...options,
        isStandAlone: true,
        standAloneData: user,
        isMobile: true,
      }),
    ).not.toThrow();
    expect(getProfileUserData(options, student)).toBe(user);
    expect(
      getProfileUserData(
        { ...options, isStandAlone: true, standAloneData: user },
        undefined,
      ),
    ).toBe(user);
  });
  it('keeps mobile requirements, grammar and deprecated-input validation behavior', () => {
    expect(() =>
      validateProfileOptions({ ...options, isMobile: true }),
    ).toThrow(
      '"idDigitalLink, campusAcessLink, tecServicesLink and versionLabel" inputs are',
    );
    expect(() =>
      validateProfileOptions({ ...options, studentData: undefined }),
    ).toThrow('"studentData" input is');
    expect(() => assertProfileInputs([], 'isStudent', 'true')).not.toThrow();
  });
});
