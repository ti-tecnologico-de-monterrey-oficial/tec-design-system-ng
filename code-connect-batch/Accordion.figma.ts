// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=55-9576
// source=ui-angular/src/lib/components/bmb-accordion/bmb-accordion.component.ts
// component=BmbAccordionComponent
import figma from 'figma'

const instance = figma.selectedInstance
const appearanceContrast = instance.getEnum('Container color', {
  Default: 'default',
  Primary: 'primary',
  Alternative: 'alternative',
})
const disabled = instance.getEnum('State:', {
  Disabled: true,
  Enabled: false,
  Hovered: false,
  Selected: false,
})
const expanded = instance.getEnum('State:', {
  Disabled: false,
  Enabled: false,
  Hovered: false,
  Selected: true,
})

export default {
  example: figma.code`<bmb-accordion
  [accordionId]="1"
  appearanceContrast="${appearanceContrast}"
  [disabled]="${disabled}"
  [expanded]="${expanded}"
></bmb-accordion>`,
  imports: [
    "import { BmbAccordionComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-accordion',
}
