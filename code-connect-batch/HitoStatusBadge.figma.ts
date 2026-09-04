// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=62-9624
// source=ui-angular/src/lib/components/bmb-badge/bmb-badge.component.ts
// component=BmbBadgeComponent
import figma from 'figma'

const instance = figma.selectedInstance
const appearance = instance.getEnum('Status', {
  Pending: 'normal',
  Started: 'strong',
  Revision: 'warning',
  Finished: 'success',
  Canceled: 'error',
  'Lorem Ipsum': 'strong',
})
const text = instance.getEnum('Status', {
  Pending: 'Pendiente',
  Started: 'Iniciado',
  Revision: 'En revisión',
  Finished: 'Finalizado',
  Canceled: 'Cancelado',
  'Lorem Ipsum': 'Lorem Ipsum',
})

export default {
  example: figma.code`<bmb-badge appearance="${appearance}" text="${text}" [container]="false" />`,
  imports: [
    "import { BmbBadgeComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-hito-status-badge',
  metadata: { nestable: true },
}
