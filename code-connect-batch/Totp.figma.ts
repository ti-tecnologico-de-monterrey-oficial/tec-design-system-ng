// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=100-30139
// source=ui-angular/src/lib/components/bmb-totp/bmb-totp.component.ts
// component=BmbTotpComponent
import figma from 'figma'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const variation = instance.getEnum('Variation', {
  Simple: 'simple',
  'w/Button': 'button',
  'W/Button_ErrorState': 'button-error',
})
const componentTitleLayer = instance.findText('TOTP', { traverseInstances: true })
const subtitleLayer = instance.findText('(Time-based one-time', {
  traverseInstances: true,
})
const helpLayer = instance.findText('Help text', { traverseInstances: true })
const buttonTextLayer = instance.findText('Text', {
  traverseInstances: true,
  path: ['Button'],
})
const componentTitle =
  componentTitleLayer && componentTitleLayer.type === 'TEXT'
    ? componentTitleLayer.textContent
    : 'TOTP'
const subtitle =
  subtitleLayer && subtitleLayer.type === 'TEXT'
    ? subtitleLayer.textContent
    : '(Time-based One-time Password)'
const helpText =
  helpLayer && helpLayer.type === 'TEXT' ? helpLayer.textContent : ''
const buttonText =
  buttonTextLayer && buttonTextLayer.type === 'TEXT'
    ? buttonTextLayer.textContent
    : 'Verify'
const showButton = variation === 'button' || variation === 'button-error'
const codeError = variation === 'button-error'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleHandleSubmit(event: Parameters<BmbTotpComponent['handleSubmit']['emit']>[0]): void {
    console.info('handleSubmit', event);
  }
}
</script>

<bmb-totp
  (handleSubmit)="handleHandleSubmit($event)"
  componentTitle="${escapeAttribute(String(componentTitle ?? "TOTP"))}"
  subtitle="${escapeAttribute(String(subtitle ?? "(Time-based One-time Password)"))}"
  instanceId="first"
  [codeError]="${codeError}"
  errorMessage="${escapeAttribute(String(helpText ?? "Invalid Code. Please try again."))}"
  helperText="${escapeAttribute(String(helpText ?? "Helper text"))}"
  [showButton]="${showButton}"
  buttonText="${escapeAttribute(String(buttonText ?? "Verify"))}"
  [disableButton]="false"
/>`,
  imports: [
    "import { BmbTotpComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-totp',
  metadata: { nestable: true },
}
