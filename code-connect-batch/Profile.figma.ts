// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=3716-50775
// source=ui-angular/src/lib/components/bmb-profile/bmb-profile.component.ts
// component=BmbProfileComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
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
  [isStandAlone]="isStandAlone"
  [standAloneData]="standAloneData"
  [isStudent]="isStudent"
  [studentData]="studentData"
  [collaboratorData]="collaboratorData"
  [versionLabel]="versionLabel"
  [isMobile]="isMobile"
  [enableLangChange]="enableLangChange"
  [idDigitalLink]="idDigitalLink"
  [campusAcessLink]="campusAcessLink"
  [tecServicesLink]="tecServicesLink"
  [targetLinks]="targetLinks"
  [versionBackText]="versionBackText"
  [enableVersionBack]="enableVersionBack"
  [enableExpandButton]="true"
  [currentRole]="currentRole"
  [isLoading]="false"
/>`,
  imports: [
    "import type { IBmbCollaboratorProfileData, IBmbStudentProfileData, IBmbUserData } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbProfileComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-profile',
}
