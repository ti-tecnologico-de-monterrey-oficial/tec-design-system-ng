// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=108-32808
// source=ui-angular/src/lib/components/bmb-switch/bmb-switch.component.ts
// component=BmbSwitchComponent
import figma from 'figma'

const instance = figma.selectedInstance
const isChecked = instance.getEnum('Selected', {
  Active: true,
  Inactive: false,
})

const disabled = instance.getBoolean('disabled')

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleChange(event: Parameters<BmbSwitchComponent['change']['emit']>[0]): void {
    console.info('change', event);
  }
}
</script>

<bmb-switch
  (change)="handleChange($event)"
  [isChecked]="${isChecked ?? false}"
  [disabled]="${disabled ?? false}"
  name="testName"
/>`,
  imports: [
    "import { BmbSwitchComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-switch',
  metadata: { nestable: true },
}
