import { Injectable, signal } from '@angular/core';
import { ModalDataConfig } from '../../public-api';

@Injectable({
  providedIn: 'root',
})
export class BmbModalService {
  readonly modalList = signal<ModalDataConfig[]>([]);

  openModal(modal: ModalDataConfig): string {
    const id = self.crypto.randomUUID().toString();

    this.modalList.update((currentModals) => [
      ...currentModals,
      { ...modal, id },
    ]);

    return id;
  }

  getModalList() {
    return this.modalList();
  }

  searchModal(id: string) {
    return this.modalList().find((modal) => modal.id === id);
  }

  closeModal(id: string) {
    this.modalList.update((currentModals) =>
      currentModals.filter((modal) => modal.id !== id),
    );
  }
}
