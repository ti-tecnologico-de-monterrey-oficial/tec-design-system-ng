// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=149-37128
// source=ui-angular/src/lib/components/bmb-breadcrumb/bmb-breadcrumb.component.ts
// component=BmbBreadcrumbComponent
import figma from 'figma'

const instance = figma.selectedInstance
const isTopBar = instance.getEnum('Variation', {
  'Local Navigation': false,
  topBar: true,
  Mobile: false,
})

export default {
  example: figma.code`<bmb-breadcrumb [dataTopBar]="[{ text: 'Inicio', link: '/' }, { text: 'Sección' }]" [dataLocalNav]="[{ text: 'Inicio', link: '/' }, { text: 'Sección' }]" [isTopBar]="${isTopBar}" />`,
  imports: [
    "import { BmbBreadcrumbComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-breadcrumb',
  metadata: { nestable: true },
}
