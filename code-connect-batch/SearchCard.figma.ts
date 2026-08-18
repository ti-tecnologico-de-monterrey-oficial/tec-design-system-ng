// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=9038-61107
// source=ui-angular/src/lib/components/old/bmb-search-card/bmb-search-card.component.ts
// component=BmbSearchCardComponent
import figma from 'figma'

const instance = figma.selectedInstance
const componentTitle = instance.findText('Mi día de hoy', {
  traverseInstances: true,
  path: ['BB_2_12_4'],
}).textContent
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
  example: figma.code`<bmb-search-card componentTitle="${componentTitle}" [isLoading]="${isLoading}" />`,
  imports: [
    "import { BmbSearchCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-search-card',
}
