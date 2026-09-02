// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=82-26226
// source=ui-angular/src/lib/components/bmb-list-group/bmb-list-group-item/bmb-list-group-item.component.ts
// component=BmbListGroupItemComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-list-group>
  <bmb-list-group-item
    id="list-group-item-1"
    headerText="Header text"
    descriptionText="Description text"
    infoText="Info text"
    icon="add_box"
    tooltipTitle="Tooltip title"
    tooltipText="Tooltip text"
    badgeAppearance="mitec_blue"
    badgeText="Badge Text"
  />
</bmb-list-group>`,
  imports: [
    "import { BmbListGroupItemComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbListGroupComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-list-group-item',
}
