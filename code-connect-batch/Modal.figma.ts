// url=https://www.figma.com/design/Q4t8qIM5fklC9I3Atc1BrZ/Bamboo-Design-System---Components?node-id=82-27913
// source=ui-angular/src/lib/components/bmb-modal/bmb-modal.component.ts
// component=BmbModalComponent
import figma from 'figma'

export default {
  example: figma.code`export class ExampleComponent {
  private readonly matDialog = inject(MatDialog);

  modalData: ModalDataConfig = {
    title: 'My Modal',
    subtitle: 'Subtitle',
    content: 'This is plain text content.',
    size: 'large',
    type: 'action',
    alertStyle: 'error',
    primaryBtnLabel: 'OK',
    secondaryBtnLabel: 'Cancel',
    hidePrimaryButton: false,
    hideSecondaryButton: true,
    extendButtons: false,
  };

  openModal() {
    this.matDialog.open(BmbModalComponent, { data: this.modalData });
  }
}`,
  imports: [
    "import { inject } from '@angular/core'",
    "import { MatDialog } from '@angular/material/dialog'",
    "import { BmbModalComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
    "import type { ModalDataConfig } from '@ti-tecnologico-de-monterrey-oficial/ds-ng'",
  ],
  id: 'bmb-modal',
}
