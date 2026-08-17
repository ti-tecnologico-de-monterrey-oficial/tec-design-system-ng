// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=1644-67872
// source=ui-angular/src/lib/components/old/bmb-list-items/bmb-list-items.component.ts
// component=BmbListItemsComponent
import figma from 'figma'

const instance = figma.selectedInstance
const populated = instance.getEnum('State', {
  Empty: false,
  Populated: true,
})
const items = populated
  ? "[{ title: 'Reunión de equipo', date: '2025-10-08', icon: 'group' }, { title: 'Entrega de reporte', date: '2025-10-01', icon: 'description' }, { title: 'Actualización de sistema', date: '2025-09-15', icon: 'update' }]"
  : '[]'

export default {
  example: figma.code`<bmb-list-items
  componentTitle="Historial de actividades"
  addButtonIcon="add_circle"
  [showAddButton]="true"
  [items]="${items}"
  dateFormat="yyyy-MM-dd"
/>`,
  imports: [
    "import { BmbListItemsComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-list-items',
  metadata: { nestable: true },
}
