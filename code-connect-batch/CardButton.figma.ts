// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=2978-76218
// source=ui-angular/src/lib/components/bmb-card-button/bmb-card-button.component.ts
// component=BmbCardButtonComponent
import figma from 'figma'

const instance = figma.selectedInstance

// Menu: only meaningful for the Full Interactive branch. Values come from the
// real MenuExample story (hasMenu + menuItems), never fabricated.
const menuAttrs = instance.getEnum('Menu', {
  Inactive: '',
  Active: `
  [hasMenu]="true"
  [menuItems]="[
    { icon: 'link', text: 'Link', url: 'https://example.com', target: '_back' },
    { icon: 'delete', text: 'Delete', url: 'https://example.com', target: '_back' },
    { icon: 'settings', text: 'Settings', url: 'https://example.com', target: '_back' }
  ]"`,
})

// Show Badges: only meaningful for the Badge branch. Maps to two real,
// distinct Storybook stories (BadgeContainerImageExample vs ImageExample).
const badgeAttrs = instance.getBoolean('Show Badges', {
  true: `
  [badge]="{ text: 'Badge 1', appearance: 'mitec_purple' }"
  [textLink]="{ label: 'More', link: 'https://example.com', target: '_back' }"
  body="This is the body content of the card button."`,
  false: `
  body="Test example | Test example | Test example"`,
})

const example = instance.getEnum('Type', {
  'Add Content': figma.code`<bmb-card-button
  [isFullInteractive]="false"
  componentTitle="Create new skill"
  icon="add_circle"
/>`,
  'Full Interactive': figma.code`<bmb-card-button
  [isFullInteractive]="true"
  [leftContent]="true"
  leftContentIcon="note_add"
  componentTitle="Title or Text summary"
  icon="group"
  body="This is the body content of the card button. It can be long and will be truncated with ellipsis after 3 lines."${menuAttrs}
/>`,
  Badge: figma.code`<bmb-card-button
  [isFullInteractive]="true"
  [leftContent]="true"
  [leftContentImage]="{ src: 'https://picsum.photos/id/25/200/300', alt: 'Left content image' }"
  componentTitle="Title or summary"${badgeAttrs}
/>`,
})

export default {
  example,
  imports: [
    "import { BmbCardButtonComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-card-button',
}
