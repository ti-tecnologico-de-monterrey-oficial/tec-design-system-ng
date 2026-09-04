import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  EnvironmentInjector,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { getUUID } from '../../../_shared/logic/utils';
import { IBmbNativeModal } from '../../../components/bmb-modal/bmb-modal.interface';
import { BmbPortalComponent } from '../../../components/bmb-portal/bmb-portal.component';

@Injectable({
  providedIn: 'root',
})
export class BmbNativeModalService {
  readonly modalList = signal<IBmbNativeModal[]>([]);
  private portalComponentRef: ComponentRef<BmbPortalComponent> | null = null;

  private appRef: ApplicationRef = inject(ApplicationRef);
  private environmentInjector: EnvironmentInjector = inject(EnvironmentInjector);

  private getOrCreatePortal() {
    if (this.portalComponentRef) {
      return this.portalComponentRef.instance;
    }

    const existingHost = document.querySelector('bmb-portal');

    if (existingHost) {
      return null;
    }

    this.portalComponentRef = createComponent(BmbPortalComponent, {
      environmentInjector: this.environmentInjector,
    });

    this.appRef.attachView(this.portalComponentRef.hostView);

    const hostDomElem = (
      this.portalComponentRef.hostView as EmbeddedViewRef<any>
    ).rootNodes[0] as HTMLElement;
    document.body.appendChild(hostDomElem);

    return this.portalComponentRef.instance;
  }

  private runModalHook(
    modal: IBmbNativeModal,
    hook: 'beforeCloseModal' | 'afterCloseModal' | 'afterOpenModal',
    reason: 'single' | 'all',
  ): void {
    if (!modal[hook]) return;

    try {
      modal[hook]?.({
        modalId: modal.modalId ?? '',
        reason,
      });
    } catch {
      console.warn(
        `Error executing ${hook} for modal with id ${modal.modalId}`,
      );
    }
  }

  openModal(newModal: IBmbNativeModal): string {
    const id =
      newModal.modalId && newModal.modalId !== ''
        ? newModal.modalId
        : getUUID();
    if (this.checkIfModalExists(id)) {
      return id;
    }
    this.getOrCreatePortal();
    this.modalList.update((currentModals) => [
      ...currentModals,
      { ...newModal, modalId: id },
    ]);
    this.runModalHook(newModal, 'afterOpenModal', 'single');

    return id;
  }

  closeModal(id: string) {
    const modalToClose = this.modalList().find((modal) => modal.modalId === id);

    if (!modalToClose) return;
    this.runModalHook(modalToClose, 'beforeCloseModal', 'single');
    this.modalList.update((currentModals) =>
      currentModals.filter((modal) => modal.modalId !== id),
    );
    this.runModalHook(modalToClose, 'afterCloseModal', 'single');
  }

  closeAllModals() {
    const modalsToClose = [...this.modalList()];

    modalsToClose.forEach((modal) => {
      this.runModalHook(modal, 'beforeCloseModal', 'all');
    });
    this.modalList.set([]);
    modalsToClose.forEach((modal) => {
      this.runModalHook(modal, 'afterCloseModal', 'all');
    });
  }

  getModalList() {
    return this.modalList();
  }

  checkIfModalExists(id: string): boolean {
    return this.modalList().some((modal) => modal.modalId === id);
  }
}
