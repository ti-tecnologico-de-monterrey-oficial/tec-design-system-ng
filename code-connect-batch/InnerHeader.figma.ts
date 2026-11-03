// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=61-9239
// source=ui-angular/src/lib/components/bmb-inner-header/bmb-inner-header.component.ts
// component=BmbInnerHeaderComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-inner-header
  componentTitle="Inner Header"
  placeholderSearch="Search"
  trailingIconPrimary="${getIcon('lock')}"
  trailingIconSecondary="${getIcon('')}"
  [showClose]="true"
  [showReturn]="showReturn"
  [showSearch]="showSearch"
/>`,
  imports: [
    "import { BmbInnerHeaderComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-inner-header',
  metadata: { nestable: true },
}
