// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=3716-50775
// source=ui-angular/src/lib/components/bmb-profile/bmb-profile.component.ts
// component=BmbProfileComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleHandleCloseSession(): void {
    console.info('handleCloseSession');
  }

  handleHandleCloseProfile(): void {
    console.info('handleCloseProfile');
  }

  handleOnRightClick(event: Parameters<BmbProfileComponent['onRightClick']['emit']>[0]): void {
    console.info('onRightClick', event);
  }

  handleHandleVersionBack(event: Parameters<BmbProfileComponent['handleVersionBack']['emit']>[0]): void {
    console.info('handleVersionBack', event);
  }

  handleGetRoleChange(): void {
    console.info('getRoleChange');
  }

  handleOnBack(event: Parameters<BmbProfileComponent['onBack']['emit']>[0]): void {
    console.info('onBack', event);
  }

  handleOnExpandClick(event: Parameters<BmbProfileComponent['onExpandClick']['emit']>[0]): void {
    console.info('onExpandClick', event);
  }

  standAloneData: IBmbUserData = {
    name: 'Paloma Araujo',
    userImg: 'https://picsum.photos/id/64/200/300',
    registration: 'A032132',
    email: 'mail@tec.mx',
  };

  studentData: IBmbStudentProfileData = {
    userData: {
      name: 'Paloma Araujo',
      userImg: 'https://picsum.photos/id/64/200/300',
      registration: 'A032132',
      email: 'mail@tec.mx',
    },
    period: 'AGO-DIC 24',
    campus: 'Monterrey',
    program: 'ARQ19',
    curp: 'xxxx0000xxxx0000xx',
    isExatec: false,
  };

  collaboratorData: IBmbCollaboratorProfileData = {
    userData: {
      name: 'Paloma Araujo',
      userImg: 'https://picsum.photos/id/64/200/300',
      registration: 'L0123456',
      email: 'mail@tec.mx',
    },
    enableRolSwitch: true,
    position: 'Desarrollador de Software',
    area: 'Dirección de Desarrollo-Techvolution 2.0',
    leader: {
      userData: {
        name: 'Arturo González Martínez',
        userImg: 'https://picsum.photos/id/64/200/300',
        email: 'mail@tec.mx',
      },
    },
    generalist: {
      userData: {
        name: 'Ana María Gutiérrez Pineda',
        userImg: 'https://picsum.photos/id/64/200/300',
        email: 'mail@tec.mx',
      },
    },
  };
}
</script>

<bmb-profile
  (handleCloseSession)="handleHandleCloseSession()"
  (handleCloseProfile)="handleHandleCloseProfile()"
  (onRightClick)="handleOnRightClick($event)"
  (handleVersionBack)="handleHandleVersionBack($event)"
  (getRoleChange)="handleGetRoleChange()"
  (onBack)="handleOnBack($event)"
  (onExpandClick)="handleOnExpandClick($event)"
  [isStandAlone]="true"
  [standAloneData]="standAloneData"
  [isStudent]="false"
  [studentData]="studentData"
  [collaboratorData]="collaboratorData"
  versionLabel="Versión 1.5.10"
  [isMobile]="false"
  [enableLangChange]="enableLangChange"
  idDigitalLink="https://www.example.com"
  campusAcessLink="https://www.example.com"
  tecServicesLink="https://www.example.com"
  [targetLinks]="targetLinks"
  versionBackText="Regresar a versión anterior mitec"
  [enableVersionBack]="true"
  [enableExpandButton]="true"
  currentRole="Colaborador"
  [isLoading]="false"
/>`,
  imports: [
    "import type { IBmbCollaboratorProfileData, IBmbStudentProfileData, IBmbUserData } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbProfileComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-profile',
}
