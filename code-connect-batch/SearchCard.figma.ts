// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=9038-61107
// source=ui-angular/src/lib/components/bmb-search-card/bmb-search-card.component.ts
// component=BmbSearchCardComponent
import figma from 'figma'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const titleLayer = instance.findText('Mi día de hoy', {
  traverseInstances: true,
  path: ['BB_2_12_4'],
})
const componentTitle = titleLayer?.type === 'TEXT' ? titleLayer.textContent : ''
const isLoading = instance.getEnum('Property 1', {
  Empty: false,
  'Results (All)': false,
  'Results (Services)': false,
  'Results (Persons)': false,
  'Empty (loading)': true,
  'Empty(Open)': false,
  'Empty (Error)': false,
  Mobile: false,
  'Mobile (Empty)': false,
})

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleTriggerSearch(event: Parameters<BmbSearchCardComponent['triggerSearch']['emit']>[0]): void {
    console.info('triggerSearch', event);
  }

  handleSearchItemClick(event: Parameters<BmbSearchCardComponent['searchItemClick']['emit']>[0]): void {
    console.info('searchItemClick', event);
  }

  handleGetBookmarkItemClick(event: Parameters<BmbSearchCardComponent['getBookmarkItemClick']['emit']>[0]): void {
    console.info('getBookmarkItemClick', event);
  }

  results: IBmbSearchCardItemResult[] = [];

  favorites: IBmbSearchCardItemResult[] = [];
}
</script>

<bmb-search-card
  (triggerSearch)="handleTriggerSearch($event)"
  (searchItemClick)="handleSearchItemClick($event)"
  (getBookmarkItemClick)="handleGetBookmarkItemClick($event)"
  componentTitle="${escapeAttribute(String(componentTitle ?? ""))}"
  [results]="results"
  inputPlaceholder=""
  [isLoading]="${isLoading ?? false}"
  [favorites]="favorites"
  [disableFavoritesTab]="true"
/>`,
  imports: [
    "import type { IBmbSearchCardItemResult } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbSearchCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-search-card',
}
