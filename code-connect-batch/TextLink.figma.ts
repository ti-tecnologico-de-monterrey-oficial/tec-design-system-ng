// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=20-3320
// source=ui-angular/src/lib/components/bmb-text-link/bmb-text-link.component.ts
// component=BmbTextLinkComponent
import figma from 'figma'

const instance = figma.selectedInstance
const state = instance.getEnum('State', {
  Hovered: 'hovered',
  Enabled: 'enabled',
  Disabled: 'disabled',
})
const textLayer = instance.findText('Text', { traverseInstances: true })
const text = textLayer && textLayer.type === 'TEXT' ? textLayer.textContent : ''

export default {
  example: figma.code`<bmb-text-link textLink="${text}" link="https://example.com" ${state === 'disabled' ? '[disabled]="true"' : ''} />`,
  imports: [
    "import { BmbTextLinkComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-text-link',
  metadata: { nestable: true },
}
