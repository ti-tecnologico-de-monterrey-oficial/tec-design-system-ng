// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=8-7018
// source=ui-angular/src/lib/components/bmb-bookmark/bmb-bookmark.component.ts
// component=BmbBookmarkComponent
import figma from 'figma'

const instance = figma.selectedInstance
const isActive = instance.getEnum('Bookmark', {
  Inactive: false,
  Focused: false,
  Active: true,
})

export default {
  example: figma.code`<bmb-bookmark [isActive]="${isActive}" />`,
  imports: [
    "import { BmbBookmarkComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-bookmark',
  metadata: { nestable: true },
}
