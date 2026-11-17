// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=109-37668
// source=ui-angular/src/lib/components/bmb-input/bmb-input.component.ts
// component=BmbInputComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  errorMessage: string | IBmbInputError = {
    required: 'Please enter the required data',
    jsonFormat: 'Please enter content in valid JSON format',
    minLength: 'Please enter at least 4 characters',
    pattern: 'Please enter only letters',
  };
}
</script>

<bmb-input
  type="text"
  name=""
  value=""
  appearance="normal"
  label="Input Label"
  tooltip="Tooltip example"
  icon="${getIcon('apps')}"
  placeholder="Placeholder"
  [disabled]="false"
  [isRequired]="true"
  helperMessage="Helper Message"
  [errorMessage]="errorMessage"
  [spellcheck]="false"
  [maxlength]="20"
  [minlength]="4"
  [max]="max"
  [min]="min"
  pattern="[A-Za-z]+"
  [showMaxTextLength]="true"
  [rows]="3"
  [jsonFormat]="false"
  [heightTextArea]="heightTextArea"
  [isClearable]="false"
  additionalAction="none"
  [control]="control"
/>`,
  imports: [
    "import type { IBmbInputError } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbInputComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-input',
  metadata: { nestable: true },
}
