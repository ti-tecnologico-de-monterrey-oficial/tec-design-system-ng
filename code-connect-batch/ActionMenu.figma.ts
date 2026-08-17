// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=2109-71690
// source=ui-angular/src/lib/components/old/bmb-action-menu/bmb-action-menu.component.ts
// component=BmbActionMenuComponent
import figma from 'figma'

const instance = figma.selectedInstance
const type = instance.getEnum('Type', {
  ActionMenu_Actions_Default: 'actions-default',
  ActionMenu_Actions_Icon: 'actions-icon',
  ActionMenu_Informative_text_icon: 'informative',
  Chevron: 'chevron',
  'Text Link': 'text-link',
  'Text Button': 'text-button',
  Checkmark: 'checkmark',
  'Profile switch menu': 'profile-switch',
})
const header = instance.findInstance('BB_2_12_4', { traverseInstances: true })
const headerTitleLayer = instance.findText('Mi día de hoy', {
  traverseInstances: true,
})
const showHeader = header.type === 'INSTANCE'
const componentTitle =
  headerTitleLayer.type === 'TEXT'
    ? headerTitleLayer.textContent
    : 'Action menu'

const connectedItems = instance.findConnectedInstances(
  (node) => {
    return node.codeConnectId() === 'bmb-action-menu-item-adapter'
  },
  { traverseInstances: true },
)
let connectedItem1
let connectedItem2
let connectedItem3
let connectedItem4
if (connectedItems[0] && connectedItems[0].type === 'INSTANCE') {
  connectedItem1 = connectedItems[0].executeTemplate().example
}
if (connectedItems[1] && connectedItems[1].type === 'INSTANCE') {
  connectedItem2 = connectedItems[1].executeTemplate().example
}
if (connectedItems[2] && connectedItems[2].type === 'INSTANCE') {
  connectedItem3 = connectedItems[2].executeTemplate().example
}
if (connectedItems[3] && connectedItems[3].type === 'INSTANCE') {
  connectedItem4 = connectedItems[3].executeTemplate().example
}
const projectedItem1 = connectedItem1
  ? figma.code`<ng-template #actionMenuItem>${connectedItem1}</ng-template>`
  : ''
const projectedItem2 = connectedItem2
  ? figma.code`<ng-template #actionMenuItem>${connectedItem2}</ng-template>`
  : ''
const projectedItem3 = connectedItem3
  ? figma.code`<ng-template #actionMenuItem>${connectedItem3}</ng-template>`
  : ''
const projectedItem4 = connectedItem4
  ? figma.code`<ng-template #actionMenuItem>${connectedItem4}</ng-template>`
  : ''

const appNameLayers = instance.findLayers(
  (node) => {
    return node.type === 'TEXT' && node.name === 'App name'
  },
  { traverseInstances: true },
)
const rawText1 =
  appNameLayers[0] && appNameLayers[0].type === 'TEXT'
    ? appNameLayers[0].textContent
    : 'Action'
const rawText2 =
  appNameLayers[1] && appNameLayers[1].type === 'TEXT'
    ? appNameLayers[1].textContent
    : 'Action'
const rawText3 =
  appNameLayers[2] && appNameLayers[2].type === 'TEXT'
    ? appNameLayers[2].textContent
    : 'Action'
const rawText4 =
  appNameLayers[3] && appNameLayers[3].type === 'TEXT'
    ? appNameLayers[3].textContent
    : ''
const rawText5 =
  appNameLayers[4] && appNameLayers[4].type === 'TEXT'
    ? appNameLayers[4].textContent
    : ''
const rawText6 =
  appNameLayers[5] && appNameLayers[5].type === 'TEXT'
    ? appNameLayers[5].textContent
    : ''

let example
if (connectedItems.length === 0 && !showHeader) {
  example = figma.code`<bmb-action-menu
  componentTitle="${componentTitle}"
  [showHeader]="${showHeader}"
>
  <ng-template #actionMenuItem><bmb-item-actions label="${rawText3}" /></ng-template>
  <ng-template #actionMenuItem><bmb-item-actions label="${rawText2}" /></ng-template>
  <ng-template #actionMenuItem><bmb-item-actions label="${rawText1}" /></ng-template>
</bmb-action-menu>`
} else if (connectedItems.length === 0 && showHeader) {
  example = figma.code`<bmb-action-menu
  componentTitle="${componentTitle}"
  [showHeader]="${showHeader}"
>
  <ng-template #actionMenuItem><bmb-item-informative-text itemTitle="${rawText6}" supportText="${rawText5}" /></ng-template>
  <ng-template #actionMenuItem><bmb-item-informative-text itemTitle="${rawText4}" supportText="${rawText3}" /></ng-template>
  <ng-template #actionMenuItem><bmb-item-informative-text itemTitle="${rawText2}" supportText="${rawText1}" /></ng-template>
</bmb-action-menu>`
} else if (type === 'profile-switch') {
  example = figma.code`<bmb-action-menu
  componentTitle="${componentTitle}"
  [showHeader]="${showHeader}"
>
  ${projectedItem3}
  ${projectedItem2}
  ${projectedItem1}
</bmb-action-menu>`
} else {
  example = figma.code`<bmb-action-menu
  componentTitle="${componentTitle}"
  [showHeader]="${showHeader}"
>
  ${projectedItem1}
  ${projectedItem2}
  ${projectedItem3}
  ${projectedItem4}
</bmb-action-menu>`
}

export default {
  example,
  imports: [
    "import { BmbActionMenuComponent, BmbItemActionsComponent, BmbItemInformativeTextComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-action-menu',
  metadata: { nestable: true },
}
