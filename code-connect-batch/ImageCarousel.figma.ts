// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=9258-67822
// source=ui-angular/src/lib/components/bmb-carousel/bmb-carousel.component.ts
// component=BmbCarouselComponent
import figma from 'figma'

const instance = figma.selectedInstance
const selectedIndex = instance.getEnum('Slide', {
  Default: 0,
  '2': 1,
  '3': 2,
})
const images = instance.findConnectedInstances(
  (node) => node.codeConnectId() === 'bmb-image',
  { traverseInstances: true },
)

let image1
let image2
let image3
if (images[0] && images[0].type === 'INSTANCE') {
  image1 = images[0].executeTemplate().example
}
if (images[1] && images[1].type === 'INSTANCE') {
  image2 = images[1].executeTemplate().example
}
if (images[2] && images[2].type === 'INSTANCE') {
  image3 = images[2].executeTemplate().example
}

export default {
  example: figma.code`<bmb-carousel [selectedIndex]="${selectedIndex}">
  <div #carouselItem>${image1}</div>
  <div #carouselItem>${image2}</div>
  <div #carouselItem>${image3}</div>
</bmb-carousel>`,
  imports: [
    "import { BmbCarouselComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-image-carousel',
}
