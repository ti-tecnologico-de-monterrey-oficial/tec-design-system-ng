// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=20-13644
// source=ui-angular/src/lib/directives/old/bmb-button-group/bmb-button-group.directive.ts
// component=BmbButtonGroupDirective
import figma from 'figma'

export default {
  example: figma.code`<div
  bmbButtonGroup
  size="small"
>
  <button bmbButton>Button text</button>
</div>`,
  imports: [
    "import { BmbButtonGroupDirective, BmbButtonDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-button-group',
  metadata: { nestable: true },
}
