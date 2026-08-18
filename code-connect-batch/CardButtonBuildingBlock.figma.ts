// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=16-929
// source=ui-angular/src/lib/components/old/bmb-card-button/bmb-card-button.component.ts
// component=BmbCardButtonComponent
import figma from 'figma'

const instance = figma.selectedInstance
const type = instance.getEnum('Type', {
  'Add Content': 'add-content',
  'Full Interactive': 'full-interactive',
  Badge: 'badge',
})
const isDisabled = instance.getEnum('State', {
  Default: false,
  Hover: false,
  Select: false,
  Disabled: true,
})
const hasMenu = instance.getEnum('Menu', {
  Inactive: false,
  Active: true,
})
const showBadges = instance.getBoolean('Show Badges')
const titleLayer = instance.findText('Title', { traverseInstances: true })
const title =
  titleLayer && titleLayer.type === 'TEXT' ? titleLayer.textContent : 'Title'
const bodyLayer = instance.findText('Resumen de Texto', {
  traverseInstances: true,
})
const body =
  bodyLayer && bodyLayer.type === 'TEXT' ? bodyLayer.textContent : ''

let example
if (type === 'add-content') {
  example = figma.code`<bmb-card-button
  [isFullInteractive]="false"
  componentTitle="${title}"
  icon="add_circle"
  [isDisabled]="${isDisabled}"
/>`
} else if (type === 'badge') {
  example = figma.code`<bmb-card-button
  componentTitle="${title}"
  body="${body}"
  [leftContent]="true"
  [leftContentImage]="{ src: 'https://picsum.photos/id/25/200/300', alt: 'Left content image' }"
  ${
    showBadges
      ? figma.code`[badge]="{ text: 'Badge 1', appearance: 'mitec_purple' }"`
      : ''
  }
  [isDisabled]="${isDisabled}"
/>`
} else {
  example = figma.code`<bmb-card-button
  componentTitle="${title}"
  body="${body}"
  [leftContent]="true"
  leftContentIcon="note_add"
  icon="group"
  ${
    hasMenu
      ? figma.code`[hasMenu]="true"
  [menuItems]="[
    { icon: 'link', text: 'Link', url: 'https://example.com', target: '_back' },
    { icon: 'delete', text: 'Delete', url: 'https://example.com', target: '_back' },
    { icon: 'settings', text: 'Settings', url: 'https://example.com', target: '_back' }
  ]"`
      : ''
  }
  [isDisabled]="${isDisabled}"
/>`
}

export default {
  example,
  imports: [
    "import { BmbCardButtonComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-card-button-bb-1-6',
  metadata: { nestable: true },
}
