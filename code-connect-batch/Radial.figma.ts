// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=108-32755
// source=ui-angular/src/lib/components/bmb-radial/bmb-radial.component.ts
// component=BmbRadialComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-radial
  [checked]="false"
  [disabled]="false"
  [required]="false"
  value="radio1"
  name="radio1"
  label="Contract for teacher CCM.pdf"
  labelPosition="after"
  [control]="control"
  errorMessage=""
  helperMessage=""
/>`,
  imports: [
    "import { BmbRadialComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-radial',
  metadata: { nestable: true },
}
