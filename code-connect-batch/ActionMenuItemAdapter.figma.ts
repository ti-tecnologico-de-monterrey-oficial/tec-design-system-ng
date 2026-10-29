// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=6751-92478
// source=ui-angular/src/lib/components/bmb-action-menu/bmb-action-menu.stories.ts
// component=ActionMenuItemAdapter
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<bmb-item-hyperlink
  icon="${getIcon('mail')}"
  label="Correo"
  value="tecservices@servicios.tec.mx"
  valueLink="mailto:tecservices@servicios.tec.mx"
  valueTarget="_self"
/>`,
  imports: [
    "import { BmbItemHyperlinkComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-action-menu-item-adapter',
  metadata: { nestable: true },
}
