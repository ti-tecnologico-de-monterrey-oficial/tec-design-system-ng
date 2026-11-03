// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=159-44357
// source=ui-angular/src/lib/components/bmb-tabs/bmb-tabs.component.ts
// component=BmbTabsComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  tabs: IBmbTab[] = [
    { id: 1, title: 'Tec de Monterrey', badge: 13, isActive: true },
    { id: 2, title: 'Label demasiado grande para una tab', badge: 113 },
    { id: 3, title: 'Mas usado', badge: 100 },
    { id: 4, title: 'Textualesssssssssssssssssssssssssss' },
    { id: 5, title: 'Text' },
    { id: 6, title: 'Mas usado' },
  ];
}
</script>

<bmb-tabs
  appearanceContrast="default"
  [tabs]="tabs"
  [selectedTabId]="selectedTabId"
/>`,
  imports: [
    "import type { IBmbTab } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbTabsComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-tabs',
  metadata: { nestable: true },
}
