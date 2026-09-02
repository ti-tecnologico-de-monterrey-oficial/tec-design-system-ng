// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=82-27913
// source=ui-angular/src/lib/components/bmb-modal/bmb-modal.component.ts
// component=BmbModalComponent
import figma from 'figma'

const instance = figma.selectedInstance
const content = instance.getString('ModalContent_text')
const type = instance.getEnum('Modals', {
  Generic: 'informative',
  Informative: 'informative',
  Action: 'action',
  'Action/Secondary': 'action',
  Alert: 'alert',
  Scrolling: 'action',
  Rating: 'action',
  Grade: 'action',
  TimestreamDetail: 'action',
  Visor: 'action',
  Ad: 'action',
  ListWithBadge: 'action',
  'NoIcon(temp)': 'informative',
})
const scrollable = instance.getBoolean('Scroll Bar')
const hideSecondaryButton = instance.getBoolean('Button Secondary', {
  true: false,
  false: true,
})

export default {
  example: figma.code`const modalData: ModalDataConfig = {
  title: 'Modal title',
  content: "${content}",
  type: "${type}",
  scrollable: ${scrollable},
  hideSecondaryButton: ${hideSecondaryButton},
}

this.matDialog.open(BmbModalComponent, { data: modalData })`,
  imports: [
    "import { MatDialog } from '@angular/material/dialog'",
    "import { BmbModalComponent, ModalDataConfig } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-modal',
}
