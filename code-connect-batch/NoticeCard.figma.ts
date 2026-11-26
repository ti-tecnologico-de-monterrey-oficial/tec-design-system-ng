// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=6939-96312
// source=ui-angular/src/lib/components/bmb-notice-card/bmb-notice-card.component.ts
// component=BmbNoticeCardComponent
import figma from 'figma'
import { getIcon } from './icon-image'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const type = instance.getEnum('Type', {
  Button: 'button',
  Paginator: 'paginator',
})
const componentTitle = instance.getString('componentTitle')
const showNavigation = instance.getBoolean('Show Navigation area')
const closeBtnColor = instance.getEnum('closeBtnColor', {
  white: 'white',
  black: 'black',
})
const pageOne = JSON.stringify(
  instance.getString('description') ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
).replace(/</g, '\\u003c')
const buttonTextLayer = instance.findText('Button', { traverseInstances: true })
const buttonText =
  buttonTextLayer && buttonTextLayer.type === 'TEXT'
    ? buttonTextLayer.textContent
    : ''

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleOnClose(): void {
    console.info('onClose');
  }

  handleOnClickBtn(): void {
    console.info('onClickBtn');
  }

  description: IBmbCardNoticeDescription = {
    pageOne: ${pageOne},
    ${type === 'paginator' && showNavigation !== false ? "pageTwo: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'," : ''}
  };
}
</script>

<bmb-notice-card
  (onClose)="handleOnClose()"
  (onClickBtn)="handleOnClickBtn()"
  icon="${getIcon('chevron_left')}"
  [iconSize]="24"
  componentTitle="${escapeAttribute(String(componentTitle ?? "Notification Title"))}"
  src="https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg"
  [description]="description"
  buttonText="${escapeAttribute(String(buttonText ?? "Ir"))}"
  closeBtnColor="${closeBtnColor ?? 'white'}"
/>`,
  imports: [
    "import type { IBmbCardNoticeDescription } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import { BmbNoticeCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-notice-card',
  metadata: { nestable: true },
}
