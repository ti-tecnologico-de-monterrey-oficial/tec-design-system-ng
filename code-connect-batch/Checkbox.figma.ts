// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=108-32761
// source=ui-angular/src/lib/components/bmb-checkbox/bmb-checkbox.component.ts
// component=BmbCheckboxComponent
import figma from 'figma'

const instance = figma.selectedInstance
const mode = instance.getEnum('Mode', {
  Active: 'active',
  Inactive: 'inactive',
  Indeterminate: 'indeterminate',
})
const disabled = instance.getEnum('State', {
  Hovered: false,
  Enabled: false,
  Focused: false,
  Disabled: true,
})

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleChange(event: Parameters<BmbCheckboxComponent['change']['emit']>[0]): void {
    console.info('change', event);
  }
}
</script>

<bmb-checkbox
  (change)="handleChange($event)"
  [checked]="${mode === 'active'}"
  [disabled]="${disabled ?? false}"
  [required]="false"
  [indeterminate]="${mode === 'indeterminate'}"
  value=""
  name=""
  label="Contrato profesor cátedra Biología marina CCM.pdf"
  labelPosition="after"
  errorMessage=""
  helperMessage=""
/>`,
  imports: [
    "import { BmbCheckboxComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-checkbox',
  metadata: { nestable: true },
}
