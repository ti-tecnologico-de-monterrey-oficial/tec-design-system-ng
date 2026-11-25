// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=61-9239
// source=ui-angular/src/lib/components/bmb-inner-header/bmb-inner-header.component.ts
// component=BmbInnerHeaderComponent
import figma from 'figma'
import { getIcon } from './icon-image'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const titleLayer = instance.findInstance('BB_9_1', { traverseInstances: true })
const title = titleLayer?.type === 'INSTANCE' ? titleLayer.getPropertyValue('componentTitle') : undefined
const componentTitle = typeof title === 'string' ? title : 'Inner Header'
const leadingControl = instance.findInstance('Header Close/Return', { traverseInstances: true })
const leadingAction = leadingControl?.type === 'INSTANCE' ? leadingControl.getPropertyValue('leadingAction') : undefined

export default {
  example: figma.code`<script lang="ts">
export class ExampleComponent {
  handleOnHandleTrailingPrimary(event: Parameters<BmbInnerHeaderComponent['onHandleTrailingPrimary']['emit']>[0]): void {
    console.info('onHandleTrailingPrimary', event);
  }

  handleOnHandleTrailingSecondary(event: Parameters<BmbInnerHeaderComponent['onHandleTrailingSecondary']['emit']>[0]): void {
    console.info('onHandleTrailingSecondary', event);
  }

  handleOnHandleBack(event: Parameters<BmbInnerHeaderComponent['onHandleBack']['emit']>[0]): void {
    console.info('onHandleBack', event);
  }

  handleOnHandleClose(event: Parameters<BmbInnerHeaderComponent['onHandleClose']['emit']>[0]): void {
    console.info('onHandleClose', event);
  }

  handleSearchData(event: Parameters<BmbInnerHeaderComponent['searchData']['emit']>[0]): void {
    console.info('searchData', event);
  }
}
</script>

<bmb-inner-header
  (onHandleTrailingPrimary)="handleOnHandleTrailingPrimary($event)"
  (onHandleTrailingSecondary)="handleOnHandleTrailingSecondary($event)"
  (onHandleBack)="handleOnHandleBack($event)"
  (onHandleClose)="handleOnHandleClose($event)"
  (searchData)="handleSearchData($event)"
  componentTitle="${escapeAttribute(componentTitle)}"
  placeholderSearch="Search"
  trailingIconPrimary="${getIcon('lock')}"
  trailingIconSecondary="${getIcon('')}"
  [showClose]="${leadingAction === undefined || leadingAction === 'close'}"
  [showReturn]="${leadingAction === 'return'}"
/>`,
  imports: [
    "import { BmbInnerHeaderComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-inner-header',
  metadata: { nestable: true },
}
