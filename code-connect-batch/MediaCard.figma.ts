// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=107-31699
// source=ui-angular/src/lib/components/bmb-media-card/bmb-media-card.component.ts
// component=BmbMediaCardComponent
import figma from 'figma'

const instance = figma.selectedInstance
const type = instance.getEnum('Type', {
  Floating: 'floating',
  InlineDefault: 'inline',
  TimestreamDetail: 'inline',
  'Image Only': 'inline',
  'Mobile Banner': 'inline',
  InlineHover: 'inline',
  InlineSelect: 'inline',
})

export default {
  example: figma.code`<bmb-media-card type="${type}" src="https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg" alt="Example media" />`,
  imports: [
    "import { BmbMediaCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-media-card',
  metadata: { nestable: true },
}
