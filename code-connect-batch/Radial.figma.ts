// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=108-32755
// source=ui-angular/src/lib/components/bmb-radial/bmb-radial.component.ts
// component=BmbRadialComponent
import figma from 'figma'
import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const checked = instance.getEnum('checked', { on: true, off: false })
const disabled = instance.getEnum('disabled', { on: true, off: false })

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleChange(event: Parameters<BmbRadialComponent['change']['emit']>[0]): void {
    console.info('change', event);
  }

  handleOnKeyDown(event: Parameters<BmbRadialComponent['onKeyDown']['emit']>[0]): void {
    console.info('onKeyDown', event);
  }

  control = new FormControl('');
}
</script>

<bmb-radial
  (change)="handleChange($event)"
  (onKeyDown)="handleOnKeyDown($event)"
  [checked]="${checked ?? false}"
  [disabled]="${disabled ?? false}"
  [required]="${instance.getBoolean('required') ?? false}"
  value="radio1"
  name="radio1"
  label="${escapeAttribute(instance.getBoolean('label_') ? instance.getString('label') ?? '' : '')}"
  labelPosition="${instance.getEnum('labelPosition', { before: 'before', after: 'after' }) ?? "after"}"
  [control]="control"
  errorMessage="${escapeAttribute(instance.getString("errorMessage") ?? "")}"
  helperMessage="${escapeAttribute(instance.getBoolean('helper Message') ? instance.getString('helperMessage') ?? '' : '')}"
/>`,
  imports: [
    "import { FormControl } from '@angular/forms'",
    "import { BmbRadialComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-radial',
  metadata: { nestable: true },
}
