// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=3480-60843
// source=ui-angular/src/lib/components/bmb-login-onboarding/bmb-login-onboarding.component.ts
// component=BmbLoginOnboardingComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  loginOnBoardingCustomization: IBmbLoginOnBoardingCustomization = {
    anotherAccount: { label: '', link: '' },
    forgottenPassword: { label: '', link: '' },
  };
}
</script>

<bmb-login-onboarding
  [loginOnBoardingCustomization]="loginOnBoardingCustomization"
/>`,
  imports: [
    "import type { IBmbLoginOnBoardingCustomization } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbLoginOnboardingComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-login-onboarding',
}
