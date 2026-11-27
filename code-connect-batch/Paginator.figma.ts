// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=152-40426
// source=ui-angular/src/lib/components/bmb-paginator/bmb-paginator.component.ts
// component=BmbPaginatorComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handlePageChange(event: Parameters<BmbPaginatorComponent['pageChange']['emit']>[0]): void {
    console.info('pageChange', event);
  }
}
</script>

<bmb-paginator
  (pageChange)="handlePageChange($event)"
  [totalItems]="20"
  [itemsPerPage]="5"
  [currentPage]="1"
/>`,
  imports: [
    "import { BmbPaginatorComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-paginator',
  metadata: { nestable: true },
}
