import type { IBmbProfileData,
  IBmbStudentProfileData,
  IBmbUserData } from '../../types/utils';
import type { IBmbProfileOptions } from '../../types/components/profile';
// Kept local to avoid importing the Angular form utilities in ../utils.
function buildErrorMessage(inputs: string[]): string {
  const listing = inputs
    .map(
      (input, index) =>
        input +
        (index === inputs.length - 2
          ? ' and '
          : index < inputs.length - 1
            ? ', '
            : ''),
    )
    .join('');
  return inputs.length
    ? '"' + listing + '" input' + (inputs.length > 1 ? 's are' : ' is')
    : listing;
}
export function mapLegacyProfileData(
  data: IBmbProfileData,
): IBmbStudentProfileData {
  return {
    userData: {
      name: data.name,
      userImg: data.userImg,
      email: data.mail,
      registration: data.matricula,
    },
    period: data.period,
    campus: data.campus,
    program: data.program,
    curp: data.curp,
    linkedin: data.linkedin,
    isExatec: data.isExatec,
  };
}
export function assertProfileInputs(
  inputs: string[],
  profileName: string,
  condition: string,
): void {
  if (inputs.length) {
    throw new Error(`
        The ${buildErrorMessage(inputs)} required when "${profileName}" is ${condition}.
        `);
  }
}
export function validateProfileOptions(options: IBmbProfileOptions): void {
  const inputs: string[] = [];
  if (options.isStandAlone) {
    if (!options.standAloneData) inputs.push('standAloneData');
    assertProfileInputs(inputs, 'isStandAlone', 'true');
    return;
  }
  if (options.isStudent) {
    if (!options.studentData) inputs.push('studentData');
    assertProfileInputs(inputs, 'isStudent', 'true');
  } else {
    if (!options.collaboratorData) inputs.push('collaboratorData');
    assertProfileInputs(inputs, 'isStudent', 'false');
  }
  if (options.isMobile) {
    if (!options.idDigitalLink) inputs.push('idDigitalLink');
    if (!options.campusAcessLink) inputs.push('campusAcessLink');
    if (!options.tecServicesLink) inputs.push('tecServicesLink');
    if (!options.versionLabel) inputs.push('versionLabel');
    assertProfileInputs(inputs, 'isMobile', 'true');
  }
}
export function getProfileUserData(
  options: IBmbProfileOptions,
  studentData: IBmbStudentProfileData | undefined,
): IBmbUserData {
  if (options.isStandAlone) return options.standAloneData!;
  if (options.isStudent) return studentData?.userData!;
  return options.collaboratorData?.userData!;
}
