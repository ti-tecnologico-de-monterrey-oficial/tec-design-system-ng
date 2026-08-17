// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=152-40426
// source=ui-angular/src/lib/components/old/bmb-paginator/bmb-paginator.component.ts
// component=BmbPaginatorComponent
import figma from 'figma'

export default {
  example: figma.code`<bmb-paginator [totalItems]="20" [itemsPerPage]="5" [currentPage]="1" />`,
  imports: [
    "import { BmbPaginatorComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-paginator',
  metadata: { nestable: true },
}
