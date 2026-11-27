// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=20-3320
// source=ui-angular/src/lib/components/bmb-text-link/bmb-text-link.component.ts
// component=BmbTextLinkComponent
import figma from 'figma'
import { getIcon } from './icon-image'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const disabled = instance.getEnum('disabled', { false: false, true: true })
const text = instance.getString('textLink')

export default {
  example: figma.code`<bmb-text-link
  textLink="${escapeAttribute(text)}"
  link="https://www.youtube.com"
  textLinkStyle="${instance.getEnum('textLinkStyle', { icon: 'icon', underlined: 'underlined' }) ?? "icon"}"
  icon="${getIcon('arrow_forward')}"
  iconPosition="${instance.getEnum('iconPosition', { right: 'right', left: 'left' }) ?? "right"}"
  [disabled]="${disabled ?? false}"
/>`,
  imports: [
    "import { BmbTextLinkComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-text-link',
  metadata: { nestable: true },
}
