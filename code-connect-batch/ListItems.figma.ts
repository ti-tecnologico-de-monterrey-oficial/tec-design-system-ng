// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=1644-67872
// source=ui-angular/src/lib/components/bmb-list-items/bmb-list-items.component.ts
// component=BmbListItemsComponent
import figma from 'figma'

// This Figma node's grouped sections ("Recientes"/"La semana pasada"/"Hace 30
// días") match BmbListItemsComponent's own internally-computed group titles —
// they are not a Figma-driven or user-supplied value. `items` and
// `componentTitle` have no Storybook-documented fixture (bmb-list-items has
// no .stories.ts), so per project convention they are left at their real,
// documented Angular defaults rather than fabricated. Both Empty and
// Populated states render the same, fully-valid default usage.
export default {
  example: figma.code`<bmb-list-items />`,
  imports: [
    "import { BmbListItemsComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-list-items',
}
