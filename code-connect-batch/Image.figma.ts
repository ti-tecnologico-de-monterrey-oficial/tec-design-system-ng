// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=2102-56629
// source=projects/ds-ng/src/lib/components/bmb-image/bmb-image.component.ts
// component=BmbImageComponent
import figma from 'figma'

const instance = figma.selectedInstance
const isBlurredBackdrop = instance.getEnum('Style', {
  Default: 'false',
  'Blurred backdrop': 'true',
  Straight: 'false',
})

export default {
  example: figma.code`<bmb-image src="https://images.unsplash.com/photo-1546182990-dffeafbe841d" alt="Example image" [isBlurredBackdrop]="${isBlurredBackdrop}" />`,
  imports: [
    "import { BmbImageComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-image',
  metadata: { nestable: true },
}
