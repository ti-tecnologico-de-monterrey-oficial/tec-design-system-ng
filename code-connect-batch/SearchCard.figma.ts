// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=9038-61107
// source=ui-angular/src/lib/components/bmb-search-card/bmb-search-card.component.ts
// component=BmbSearchCardComponent
import figma from 'figma'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  results: IBmbSearchCardItemResult[] = [];

  favorites: IBmbSearchCardItemResult[] = [];
}
</script>

<bmb-search-card
  componentTitle=""
  [results]="results"
  inputPlaceholder=""
  [isLoading]="false"
  [favorites]="favorites"
  [disableFavoritesTab]="true"
/>`,
  imports: [
    "import type { IBmbSearchCardItemResult } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbSearchCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-search-card',
}
