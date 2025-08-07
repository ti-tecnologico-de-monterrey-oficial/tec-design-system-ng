import { Injectable, signal } from "@angular/core";
import { getUUID } from '../utils/utils';
import { IBmbNativeModal } from "../components/bmb-modal/bmb-modal.interface";

@Injectable({
  providedIn: "root",
})
export class BmbNativeModalService {
  readonly modalList = signal<IBmbNativeModal[]>([]);

  openModal(newModal: IBmbNativeModal): string {
    const id = newModal.modalId ?? getUUID();
    this.modalList.update((currentModals) => [...currentModals, { ...newModal, modalId: id }]);

    return id;
  }

  closeModal(id: string) {
    this.modalList.update((currentModals) =>
      currentModals.filter((modal) => modal.modalId !== id)
    );
  }

  closeAllModals() {
    this.modalList.set([]);
  }

  getModalList() {
    return this.modalList();
  }
}
