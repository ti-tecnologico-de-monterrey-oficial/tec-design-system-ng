import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { BmbNativeModalService, type IBmbActionButton } from 'ui-angular';

@Component({
  selector: 'app-modal-page',
  imports: [],
  templateUrl: './modal-page.html',
  styleUrl: './modal-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalPage {
  private readonly modalService = inject(BmbNativeModalService);

  readonly status = signal('Cerrado');

  openWarningModal(): void {
    const actions: IBmbActionButton[] = [
      {
        buttonName: 'cancel',
        appearance: 'secondary-outlined',
        label: 'Button (optional)',
        action: () => this.closeModal('Cancelado'),
      },
      {
        buttonName: 'accept',
        appearance: 'primary',
        label: 'Button',
        action: () => this.closeModal('Aceptado'),
      },
    ];

    this.modalService.openModal({
      title: 'Modal title',
      subtitle: 'Subtitulo (Optional)',
      content:
        'Cuerpo de texto que da mas informacion sobre lo que plantea el modal',
      iconStyle: 'warning',
      size: 'medium',
      actions,
      afterCloseModal: () => {
        if (this.status() === 'Abierto') this.status.set('Cerrado');
      },
    });
    this.status.set('Abierto');
  }

  private closeModal(status: string): void {
    this.status.set(status);
    this.modalService.closeAllModals();
  }
}
