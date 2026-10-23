import { ChangeDetectionStrategy,
  Component,
  input,
  model,
  OnInit,
  output,
  ViewEncapsulation } from '@angular/core';
import { BmbMobileTemplatesComponent } from '../bmb-mobile-templates/bmb-mobile-templates.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerButtonComponent } from '../bmb-container-button/bmb-container-button.component';
import { BmbThemeComponent } from '../bmb-theme/bmb-theme.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { IBmbCollaboratorProfileData,
  IBmbProfileData,
  IBmbStudentProfileData,
  IBmbTargetLink,
  IBmbUserData } from '../../_shared/types';
import { BmbUserSummaryContentComponent } from '../bmb-user-summary/bmb-user-summary-content/bmb-user-summary-content.component';
import { CommonModule } from '@angular/common';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import { mapLegacyProfileData,
  assertProfileInputs,
  validateProfileOptions,
  getProfileUserData } from '../../_shared/logic/components/profile';
import { BmbIconItemComponent } from '../bmb-icon-item/bmb-icon-item.component';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { BmbRadialComponent } from '../bmb-radial/bmb-radial.component';
import { FormControl } from '@angular/forms';
import { TranslatePipe } from '../../pipes/translations';
import { BmbCheckExternalLinkButtonComponent } from '../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { BmbCardComponent, BmbCardContentComponent } from '../bmb-card/bmb-card.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { BmbLoaderComponent } from '../bmb-loader/bmb-loader.component';

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

@Component({
  selector: 'bmb-profile',
  standalone: true,
  imports: [
    CommonModule,
    BmbMobileTemplatesComponent,
    BmbUserSummaryContentComponent,
    BmbIconItemComponent,
    BmbDividerComponent,
    BmbIconComponent,
    BmbContainerButtonComponent,
    BmbThemeComponent,
    BmbButtonDirective,
    BmbHomeCardComponent,
    BmbRadialComponent,
    BmbCheckExternalLinkButtonComponent,
    TranslatePipe,
    BmbCardComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbUserImageComponent,
    BmbCardContentComponent,
    BmbLoaderComponent,
  ],
  templateUrl: './bmb-profile.component.html',
  styleUrl: './bmb-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbProfileComponent implements OnInit {
  testId = input<string>('profile-change-role-button');
  backButtonTestId = input<string>('profile-back-to-previous-version-button');
  userData = input<IBmbProfileData>(); //Deprecated
  isStandAlone = input<boolean>(false);
  standAloneData = input<IBmbUserData>();
  isStudent = input<boolean>(true);
  studentData = input<IBmbStudentProfileData>();
  collaboratorData = input<IBmbCollaboratorProfileData>();
  isMobile = input<boolean>(true);
  idDigitalLink = input<string>('');
  campusAcessLink = input<string>('');
  tecServicesLink = input<string>('');
  targetLinks = input<IBmbTargetLink>('_blank');
  versionLabel = input<string>('');
  versionBackText = input<string>('');
  enableLangChange = input<boolean>(false);
  enableVersionBack = input<boolean>(false);
  enableExpandButton = input<boolean>(true);
  currentRole = input<string>('');
  isLoading = input<boolean>(false);

  handleLangChange = model<string>();

  handleCloseSession = output();
  handleCloseProfile = output();
  onRightClick = output<Event>();
  handleVersionBack = output<Event>();
  getRoleChange = output<void>();

  handleCollaboratorClick = output<IBmbUserData>(); //Deprecated

  onBack = output<Event>();
  onExpandClick = output<Event>();
  isExpanded = model<boolean>(false);

  _studentData: IBmbStudentProfileData = {
    userData: {
      name: '',
      userImg: '',
      email: '',
      registration: '',
    },
    period: '',
    campus: '',
    program: '',
    curp: '',
    linkedin: '',
    isExatec: false,
  };

  langFormControl = new FormControl('es');

  ngOnInit() {
    const legacyData = this.userData();
    this._studentData = legacyData
      ? mapLegacyProfileData(legacyData)
      : this.studentData()!;
    validateProfileOptions({
      isStandAlone: this.isStandAlone(),
      isStudent: this.isStudent(),
      isMobile: this.isMobile(),
      standAloneData: this.standAloneData(),
      studentData: this.studentData(),
      collaboratorData: this.collaboratorData(),
      idDigitalLink: this.idDigitalLink(),
      campusAcessLink: this.campusAcessLink(),
      tecServicesLink: this.tecServicesLink(),
      versionLabel: this.versionLabel(),
    });
  }
  throwErrors(inputs: string[], profileName: string, condition: string): void {
    assertProfileInputs(inputs, profileName, condition);
  }
  getUserData(): IBmbUserData {
    return getProfileUserData(
      {
        isStandAlone: this.isStandAlone(),
        isStudent: this.isStudent(),
        isMobile: this.isMobile(),
        standAloneData: this.standAloneData(),
        studentData: this.studentData(),
        collaboratorData: this.collaboratorData(),
        idDigitalLink: this.idDigitalLink(),
        campusAcessLink: this.campusAcessLink(),
        tecServicesLink: this.tecServicesLink(),
        versionLabel: this.versionLabel(),
      },
      this._studentData,
    );
  }

  closeSession(): void {
    this.handleCloseSession.emit();
  }

  closeProfile(): void {
    this.handleCloseProfile.emit();
  }

  handleButtonClick(data: IBmbUserData | undefined): void {
    // if (data) this.handleCollaboratorClick.emit(data);
  }

  handleRadial(newValue: string): void {
    this.langFormControl.setValue(newValue);
    this.handleLangChange.set(newValue);
  }

  handleBack(event: any): void {
    this.onBack.emit(event);
  }

  handleExpand(event: any): void {
    this.onExpandClick.emit(event);
  }

  handleRight(event: Event): void {
    this.onRightClick.emit(event);
  }

  handleBackClick(event: Event): void {
    this.handleVersionBack.emit(event);
  }

  handleRoleSwitch(): void {
    this.getRoleChange.emit();
  }
}
