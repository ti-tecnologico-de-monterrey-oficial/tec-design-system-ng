// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=4070-156930
// source=ui-angular/src/lib/components/bmb-simple-header/bmb-simple-header.component.ts
// component=BmbSimpleHeaderComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-simple-header
  componentTitle="Mis apps"
  icon="${getIcon('apps')}"
  [iconAlternativeColor]="false"
/>`,
  imports: [
    "import { BmbSimpleHeaderComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-simple-header',
}
