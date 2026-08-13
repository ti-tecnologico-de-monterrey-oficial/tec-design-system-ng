// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=100-30139
// source=projects/ds-ng/src/lib/components/bmb-totp/bmb-totp.component.ts
// component=BmbTotpComponent
import figma from 'figma'

const instance = figma.selectedInstance
const variation = instance.getEnum('Variation', {
  Simple: 'simple',
  'w/Button': 'button',
  W/Button_ErrorState: 'button-error',
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
const showButton = variation !== 'simple'
const codeError = variation === 'button-error'

export default {
  example: figma.code`<bmb-totp componentTitle="${componentTitle}" subtitle="${subtitle}" [showButton]="${showButton}" [codeError]="${codeError}" ${showButton ? figma.code`buttonText="${buttonText}"` : ''} ${helpText ? codeError ? figma.code`errorMessage="${helpText}"` : figma.code`helperText="${helpText}"` : ''} />`,
  imports: [
    "import { BmbTotpComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-totp',
  metadata: { nestable: true },
}
