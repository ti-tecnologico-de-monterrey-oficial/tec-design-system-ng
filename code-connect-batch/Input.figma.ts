// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=109-37668
// source=ui-angular/src/lib/components/bmb-input/bmb-input.component.ts
// component=BmbInputComponent
import figma from 'figma'
import { getIcon } from './icon-image'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const appearance = instance.getEnum('appearance', {
  main: 'main',
  normal: 'normal',
  simple: 'simple',
})
const type = instance.getEnum('type', {
  text: 'text',
  password: 'password',
  number: 'number',
  'text-area': 'text-area',
})

const disabled = instance.getEnum('State', {
  Enabled: false,
  Hovered: false,
  Focused: false,
  Error: false,
  Disabled: true,
})
const value = instance.getString('value')

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleIsFocus(event: Parameters<BmbInputComponent['isFocus']['emit']>[0]): void {
    console.info('isFocus', event);
  }

  handleIsBlur(event: Parameters<BmbInputComponent['isBlur']['emit']>[0]): void {
    console.info('isBlur', event);
  }

  handleOnChange(event: Parameters<BmbInputComponent['onChange']['emit']>[0]): void {
    console.info('onChange', event);
  }

  handleOnKeyDown(event: Parameters<BmbInputComponent['onKeyDown']['emit']>[0]): void {
    console.info('onKeyDown', event);
  }

  control = new FormControl('');

  errorMessage: string | IBmbInputError = {
    required: 'Please enter the required data',
    jsonFormat: 'Please enter content in valid JSON format',
    minLength: 'Please enter at least 4 characters',
    pattern: 'Please enter only letters',
  };
}
</script>

<bmb-input
  (isFocus)="handleIsFocus($event)"
  (isBlur)="handleIsBlur($event)"
  (onChange)="handleOnChange($event)"
  (onKeyDown)="handleOnKeyDown($event)"
  type="${type ?? 'text'}"
  name=""
  value="${escapeAttribute(value)}"
  appearance="${appearance ?? 'normal'}"
  label="${escapeAttribute(instance.getString('label') ?? "Input Label")}"
  tooltip="Tooltip example"
  icon="${getIcon('apps')}"
  placeholder="${escapeAttribute(instance.getString("placeholder") ?? "Placeholder")}"
  [disabled]="${disabled ?? false}"
  [isRequired]="${instance.getBoolean('isRequired') ?? false}"
  helperMessage="${escapeAttribute(instance.getString('helperMessage') ?? "Helper Message")}"
  [errorMessage]="errorMessage"
  [spellcheck]="false"
  [maxlength]="20"
  [minlength]="4"
  pattern="[A-Za-z]+"
  [showMaxTextLength]="${instance.getBoolean('showMaxTextLength') ?? true}"
  [rows]="3"
  [jsonFormat]="false"
  [isClearable]="false"
  additionalAction="none"
  [control]="control"
/>`,
  imports: [
    "import { FormControl } from '@angular/forms'",
    "import type { IBmbInputError } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbInputComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-input',
  metadata: { nestable: true },
}
