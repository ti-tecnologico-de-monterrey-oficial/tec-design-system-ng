// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=100-30139
// source=ui-angular/src/lib/components/bmb-totp/bmb-totp.component.ts
// component=BmbTotpComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-totp
  componentTitle="TOTP"
  subtitle="(Time-based One-time Password)"
  instanceId="first"
  [codeError]="false"
  errorMessage="Invalid Code. Please try again."
  helperText="Helper text"
  [showButton]="false"
  buttonText="Verify"
  [disableButton]="false"
/>`,
  imports: [
    "import { BmbTotpComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-totp',
  metadata: { nestable: true },
}
