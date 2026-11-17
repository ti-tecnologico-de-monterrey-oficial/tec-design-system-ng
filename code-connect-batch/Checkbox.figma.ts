// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=108-32761
// source=ui-angular/src/lib/components/bmb-checkbox/bmb-checkbox.component.ts
// component=BmbCheckboxComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-checkbox
  [checked]="false"
  [disabled]="false"
  [required]="false"
  [indeterminate]="false"
  value=""
  name=""
  label="Contrato profesor cátedra Biología marina CCM.pdf"
  labelPosition="after"
  [control]="control"
  errorMessage=""
  helperMessage=""
/>`,
  imports: [
    "import { BmbCheckboxComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-checkbox',
  metadata: { nestable: true },
}
