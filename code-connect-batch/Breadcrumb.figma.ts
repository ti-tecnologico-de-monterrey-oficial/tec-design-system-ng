// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=149-37128
// source=ui-angular/src/lib/components/bmb-breadcrumb/bmb-breadcrumb.component.ts
// component=BmbBreadcrumbComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  dataTopBar: IBmbDataTopBar[] = [
    { text: 'Tec. Sign', link: '/' },
    { text: 'Borem ipsum dolor sit amet 1 Borem ipsum dolor sit amet 1' },
  ];

  dataLocalNav: IBmbDataTopBar[] = [
    { text: 'Borem ipsum dolor sit amet 1', link: '/' },
    { text: 'Borem ipsum dolor sit amet 2', link: '/emprendedor' },
    { text: 'Borem ipsum dolor sit amet 3', link: '/emprendedor/vivencia' },
    { text: 'Borem ipsum dolor sit amet 4', link: '/emprendedor/vivencia' },
    { text: 'Borem ipsum dolor sit amet 5', link: '/emprendedor/vivencia' },
    { text: 'Borem ipsum dolor sit amet 6', link: '/emprendedor/vivencia' },
  ];
}
</script>

<bmb-breadcrumb
  [dataTopBar]="dataTopBar"
  [dataLocalNav]="dataLocalNav"
  [isTopBar]="false"
  [isInactive]="false"
  [dropdownOpen]="false"
/>`,
  imports: [
    "import type { IBmbDataTopBar } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbBreadcrumbComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-breadcrumb',
  metadata: { nestable: true },
}
