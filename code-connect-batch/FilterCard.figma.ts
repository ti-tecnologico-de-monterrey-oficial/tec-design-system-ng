// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=107-31067
// source=ui-angular/src/lib/components/old/bmb-filter-card/bmb-filter-card.component.ts
// component=BmbFilterCardComponent
import figma from 'figma'

const instance = figma.selectedInstance
const showGlobalSearch = instance.getEnum('Search-Menu', {
  off: 'false',
  on: 'true',
})

export default {
  example: figma.code`<bmb-filter-card [showGlobalSearch]="${showGlobalSearch}" />`,
  imports: [
    "import { BmbFilterCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-filter-card',
}
