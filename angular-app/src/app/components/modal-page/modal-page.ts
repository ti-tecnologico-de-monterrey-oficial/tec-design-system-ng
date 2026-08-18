import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  BmbNativeModalService,
  type IBmbActionButton,
  type IBmbModalAlertStyle,
} from 'ui-angular';

interface ModalIconOption {
  value: IBmbModalAlertStyle;
  label: string;
}

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
  readonly selectedIcon = signal<IBmbModalAlertStyle>('warning');
  readonly iconOptions: readonly ModalIconOption[] = [
    { value: 'warning', label: 'Warning' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'primary', label: 'Primary' },
    { value: 'event', label: 'Event' },
    { value: 'success', label: 'Success' },
    { value: 'error', label: 'Error' },
  ];

  selectIcon(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedIcon.set(select.value as IBmbModalAlertStyle);
  }

  openModal(): void {
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
      iconStyle: this.selectedIcon(),
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
