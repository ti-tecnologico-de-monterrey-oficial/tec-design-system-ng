// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=159-44357
// source=projects/ds-ng/src/lib/components/bmb-tabs/bmb-tabs.component.ts
// component=BmbTabsComponent
import figma from 'figma'

const instance = figma.selectedInstance
const appearanceContrast = instance.getEnum('Container color', {
  Default: 'default',
  Primary: 'primary',
  Alternative: 'alternative',
})
const notificationCounter = instance.getEnum('Variation', {
  'Notification Counter': true,
  Default: false,
})
const device = instance.getEnum('Device', {
  Mobile: 'mobile',
  Web: 'desktop',
})
const titleLayer = instance.findText('Todos', { traverseInstances: true })
const title = titleLayer && titleLayer.type === 'TEXT' ? titleLayer.textContent : 'Todos'

export default {
  example: figma.code`<bmb-tabs appearanceContrast="${appearanceContrast}" [tabs]="[{ id: 1, title: '${title}', isActive: true, badge: ${notificationCounter ? 3 : 0}, isMobile: ${device === 'mobile'}, isDesktop: ${device === 'desktop'} }]" />`,
  imports: [
    "import { BmbTabsComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-tabs',
  metadata: { nestable: true },
}
