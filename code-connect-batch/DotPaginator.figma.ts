// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=5858-135729
// source=ui-angular/src/lib/components/bmb-dot-paginator/bmb-dot-paginator.component.ts
// component=BmbDotPaginatorComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-dot-paginator [targets]="[{ target: '#item-1', index: 0 }, { target: '#item-2', index: 1 }, { target: '#item-3', index: 2 }, { target: '#item-4', index: 3 }]" />`,
  imports: [
    "import { BmbDotPaginatorComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-dot-paginator',
  metadata: { nestable: true },
}
