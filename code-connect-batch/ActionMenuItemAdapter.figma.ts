// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=6751-92478
// source=ui-angular/src/lib/components/old/bmb-action-menu/bmb-action-menu.stories.ts
// component=ActionMenuItemAdapter
import figma from 'figma'

const instance = figma.selectedInstance
const type = instance.getEnum('Type', {
  Chevron: 'chevron',
  Checkmark: 'checkmark',
  'Text button': 'text-button',
  'Text Link Web': 'text-link',
  'Text Link Mobile': 'text-link',
  'Text button Mobile': 'text-button',
})
const state = instance.getEnum('State', {
  Enabled: 'enabled',
  Hovered: 'hovered',
  Disabled: 'disabled',
  Active: 'active',
})
const showLeadingIcon = instance.getBoolean('Show Leading_icon')
const showSupportingText = instance.getBoolean('Show Supporting text')
const titleLayer = instance.findText('Title', { traverseInstances: true })
const supportLayer = instance.findText('Supporting text', {
  traverseInstances: true,
})
const appNameLayer = instance.findText('App name', { traverseInstances: true })
const linkLayer = instance.findText('Text', { traverseInstances: true })
const textLayers = instance.findLayers(
  (node) => {
    return node.type === 'TEXT'
  },
  { traverseInstances: true },
)
const iconLayer = textLayers.find((node) => {
  return (
    node.type === 'TEXT' &&
    node.name !== 'Title' &&
    node.name !== 'Supporting text' &&
    node.name !== 'App name' &&
    node.name !== 'Text' &&
    node.name !== 'Name'
  )
})

const title = titleLayer.type === 'TEXT' ? titleLayer.textContent : 'Title'
const supportingText =
  supportLayer.type === 'TEXT' ? supportLayer.textContent : ''
const appName =
  appNameLayer.type === 'TEXT' ? appNameLayer.textContent : 'Information'
const linkText = linkLayer.type === 'TEXT' ? linkLayer.textContent : 'Link'
const icon =
  iconLayer && iconLayer.type === 'TEXT' ? iconLayer.textContent : 'square'
const disabled = state === 'disabled'
const active = state === 'active'

let example
if (type === 'chevron') {
  example = figma.code`<bmb-interactive-item-chevron
  itemTitle="${title}"
  itemSubtitle="${showSupportingText ? supportingText : ''}"
  [isDisabled]="${disabled}"
/>`
} else if (type === 'checkmark') {
  example = figma.code`<bmb-interactive-item-default
  icon="${icon}"
  itemTitle="${title}"
  [isActive]="${active}"
/>`
} else if (type === 'text-button') {
  example = figma.code`<bmb-interactive-item-text-button
  icon="${icon}"
  label="${title}"
  value="${appName}"
  [isDisabled]="${disabled}"
/>`
} else {
  example = figma.code`<bmb-item-hyperlink
  ${showLeadingIcon ? `icon="${icon}"` : ''}
  label="${title}"
  value="${linkText}"
  valueLink="mailto:tecservices@servicios.tec.mx"
  valueTarget="_self"
/>`
}

export default {
  example,
  imports: [
    "import { BmbInteractiveItemChevronComponent, BmbInteractiveItemDefaultComponent, BmbInteractiveItemTextButtonComponent, BmbItemHyperlinkComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-action-menu-item-adapter',
  metadata: { nestable: true },
}
