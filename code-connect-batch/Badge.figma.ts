// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=152-47367
// source=ui-angular/src/lib/components/bmb-badge/bmb-badge.component.ts
// component=BmbBadgeComponent
import figma from 'figma'

import { escapeAttribute } from './escape-attribute'

const instance = figma.selectedInstance
const appearance = instance.getEnum('appearance', {
  "Normal": "normal",
  "Disabled": "disabled",
  "semantic-success": "semantic-success",
  "creative-use-strong": "creative-use-strong",
  "semantic-info-event": "semantic-info-event",
  "semantic-warning": "semantic-warning",
  "semantic-error": "semantic-error",
  "semantic-brand": "semantic-brand",
  "semantic-alert": "semantic-alert",
  "mitec-red": "mitec-red",
  "mitec-blue": "mitec-blue",
  "mitec-green": "mitec-green",
  "mitec-orange": "mitec-orange",
  "mitec-purple": "mitec-purple",
  "creative-use-violet": "creative-use-violet",
  "creative-use-indigo": "creative-use-indigo",
  "creative-use-emerald": "creative-use-emerald",
  "creative-use-licorice": "creative-use-licorice",
  "creative-use-dark-teal": "creative-use-dark-teal",
  "creative-use-peach": "creative-use-peach",
  "creative-use-sepia": "creative-use-sepia",
  "creative-use-soft-red": "creative-use-soft-red",
  "creative-use-wattle": "creative-use-wattle",
  "creative-use-ship-cove": "creative-use-ship-cove",
  "creative-use-plantation": "creative-use-plantation",
  "creative-use-rum": "creative-use-rum",
  "creative-use-ripe-lemon": "creative-use-ripe-lemon",
  "creative-use-hibiscus": "creative-use-hibiscus"
})

const container = instance.getEnum('container', { false: false, true: true })
const text = instance.getString('text')

export default {
  example: figma.code`<bmb-badge
  text="${escapeAttribute(text)}"
  appearance="${appearance ?? 'normal'}"
  [container]="${container ?? true}"
/>`,
  imports: [
    "import { BmbBadgeComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-badge',
  metadata: { nestable: true },
}
