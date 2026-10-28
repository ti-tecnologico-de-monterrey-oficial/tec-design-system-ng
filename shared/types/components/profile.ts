import type { IBmbProfileData,
  IBmbStudentProfileData,
  IBmbCollaboratorProfileData,
  IBmbUserData } from '../utils';
export interface IBmbProfileOptions {
  userData?: IBmbProfileData;
  studentData?: IBmbStudentProfileData;
  collaboratorData?: IBmbCollaboratorProfileData;
  standAloneData?: IBmbUserData;
  isStandAlone: boolean;
  isStudent: boolean;
  isMobile: boolean;
  idDigitalLink?: string;
  campusAcessLink?: string;
  tecServicesLink?: string;
  versionLabel?: string;
}
