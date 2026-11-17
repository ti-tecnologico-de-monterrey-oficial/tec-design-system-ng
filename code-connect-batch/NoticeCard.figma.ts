// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=6939-96312
// source=ui-angular/src/lib/components/bmb-notice-card/bmb-notice-card.component.ts
// component=BmbNoticeCardComponent
import figma from 'figma'
import { getIcon } from './icon-image'

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  description: IBmbCardNoticeDescription = {
    pageOne: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    pageTwo:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  };
}
</script>

<bmb-notice-card
  icon="${getIcon('chevron_left')}"
  [iconSize]="iconSize"
  componentTitle="Notification Title"
  src="https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg"
  [description]="description"
  buttonText="Ir"
  [closeBtnColor]="closeBtnColor"
/>`,
  imports: [
    "import type { IBmbCardNoticeDescription } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbNoticeCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-notice-card',
  metadata: { nestable: true },
}
