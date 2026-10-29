// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=5858-135729
// source=ui-angular/src/lib/components/bmb-dot-paginator/bmb-dot-paginator.component.ts
// component=BmbDotPaginatorComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  targets: Target[] = [
    { target: '#item1', index: 0 },
    { target: '#item2', index: 1 },
    { target: '#item3', index: 2 },
    { target: '#item4', index: 3 },
  ];
}
</script>

<bmb-dot-paginator
  [appearance]="appearance"
  [activeDotIndex]="0"
  [targets]="targets"
/>`,
  imports: [
    "import type { Target } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbDotPaginatorComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-dot-paginator',
  metadata: { nestable: true },
}
