import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbMobileTemplatesComponent } from '../bmb-mobile-templates/bmb-mobile-templates.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbContainerButtonComponent } from '../bmb-container-button/bmb-container-button.component';
import { BmbThemeComponent } from '../bmb-theme/bmb-theme.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import {
  IBmbCollaboratorProfileData,
  IBmbProfileData,
  IBmbStudentProfileData,
  IBmbTargetLink,
  IBmbUserData,
} from '../../types';
import { BmbUserSummaryContentComponent } from '../bmb-user-summary/bmb-user-summary-content/bmb-user-summary-content.component';
import { CommonModule } from '@angular/common';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import { buildErrorMessage } from '../../utils/utils';
import { BmbIconItemComponent } from '../bmb-icon-item/bmb-icon-item.component';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';

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
  ],
  templateUrl: './bmb-profile.component.html',
  styleUrl: './bmb-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbProfileComponent implements OnInit, AfterViewInit {
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

  handleCloseSession = output();
  handleCloseProfile = output();
  handleCollaboratorClick = output<IBmbUserData>();

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
  };

  ngAfterViewInit(): void {
    //to avoid breaking code from previous versions
    if (this.userData()) {
      const _userData: IBmbUserData = {
        name: this.userData()?.name!,
        userImg: this.userData()?.userImg!,
        email: this.userData()?.mail!,
        registration: this.userData()?.matricula!,
      };

      this._studentData = {
        userData: _userData,
        period: this.userData()?.period!,
        campus: this.userData()?.campus!,
        program: this.userData()?.program!,
      };
    } else {
      this._studentData = this.studentData()!;
    }
  }

  ngOnInit() {
    let inputs: string[] = [];

    if (this.isStandAlone()) {
      if (!this.standAloneData()) inputs.push('standAloneData');
      this.throwErrors(inputs, 'isStandAlone', 'true');
    }

    if (this.isStudent()) {
      if (!this.studentData()) inputs.push('studentData');
      this.throwErrors(inputs, 'isStudent', 'true');
    } else {
      if (!this.collaboratorData()) inputs.push('collaboratorData');
      this.throwErrors(inputs, 'isStudent', 'false');
    }

    if (this.isMobile() && !this.isStandAlone()) {
      if (!this.idDigitalLink()) inputs.push('idDigitalLink');
      if (!this.campusAcessLink()) inputs.push('campusAcessLink');
      if (!this.tecServicesLink()) inputs.push('tecServicesLink');
      if (!this.versionLabel()) inputs.push('versionLabel');
      this.throwErrors(inputs, 'isMobile', 'true');
    }
  }

  throwErrors(inputs: string[], profileName: string, condition: string): void {
    if (inputs.length) {
      throw new Error(
        `
        The ${buildErrorMessage(inputs)} required when "${profileName}" is ${condition}.
        `,
      );
    }
  }

  getUserData(): IBmbUserData {
    if (this.isStandAlone()) return this.standAloneData()!;
    if (this.isStudent()) {
      return this._studentData?.userData!;
    } else {
      return this.collaboratorData()?.userData!;
    }
  }

  closeSession(): void {
    this.handleCloseSession.emit();
  }

  closeProfile(): void {
    this.handleCloseProfile.emit();
  }

  handleButtonClick(data: IBmbUserData | undefined): void {
    if(data) this.handleCollaboratorClick.emit(data);
  }
}
