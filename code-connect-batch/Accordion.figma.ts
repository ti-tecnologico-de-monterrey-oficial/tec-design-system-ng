// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=55-9576
// source=ui-angular/src/lib/components/bmb-accordion/bmb-accordion.component.ts
// component=BmbAccordionComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-accordion
  appearanceContrast="default"
  borderRadius="m"
  margin="m"
  paddingHeader="m"
  paddingContent="m"
  icon="${getIcon('keyboard_arrow_down')}"
  [accordionId]="accordionId"
  [hideToggle]="false"
  [active]="false"
  [disabled]="false"
  [expanded]="false"
  [lockToggle]="false"
/>`,
  imports: [
    "import { BmbAccordionComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-accordion',
}
