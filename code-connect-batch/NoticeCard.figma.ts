// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=6939-96312
// source=projects/ds-ng/src/lib/components/bmb-notice-card/bmb-notice-card.component.ts
// component=BmbNoticeCardComponent
import figma from 'figma'

const instance = figma.selectedInstance
const type = instance.getEnum('Type', {
  Button: 'button',
  Paginator: 'paginator',
})
const titleLayer = instance.findText('¡Ahora puedes hacer X función!', {
  traverseInstances: true,
})
const paginatorDescriptionLayer = instance.findText(
  'Descripción de función frame 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  { traverseInstances: true },
)
const buttonDescriptionLayer = instance.findText(
  'Descripción de función frame 2 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore. ¡Lorem Ipsum!',
  { traverseInstances: true },
)
const buttonTextLayer = instance.findText('Button', { traverseInstances: true })
const componentTitle =
  titleLayer && titleLayer.type === 'TEXT' ? titleLayer.textContent : ''
const paginatorDescription =
  paginatorDescriptionLayer && paginatorDescriptionLayer.type === 'TEXT'
    ? paginatorDescriptionLayer.textContent
    : ''
const buttonDescription =
  buttonDescriptionLayer && buttonDescriptionLayer.type === 'TEXT'
    ? buttonDescriptionLayer.textContent
    : ''
const buttonText =
  buttonTextLayer && buttonTextLayer.type === 'TEXT'
    ? buttonTextLayer.textContent
    : ''
const description =
  type === 'button' ? buttonDescription : paginatorDescription

export default {
  example: figma.code`<bmb-notice-card componentTitle="${componentTitle}" [description]="{ pageOne: '${description}' }" ${type === 'button' ? figma.code`buttonText="${buttonText}"` : ''} />`,
  imports: [
    "import { BmbNoticeCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-notice-card',
  metadata: { nestable: true },
}
