// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=152-47279
// source=ui-angular/src/lib/components/bmb-tooltip/bmb-tooltip.component.ts
// component=BmbTooltipComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-tooltip
  componentTitle="Tooltip title"
  text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum nihil modi repellendus ad aspernatur corporis."
  icon="${getIcon('help')}"
  [size]="40"
/>`,
  imports: [
    "import { BmbTooltipComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-tooltip',
  metadata: { nestable: true },
}
