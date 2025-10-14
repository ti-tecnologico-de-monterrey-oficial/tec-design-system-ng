import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  EnvironmentInjector,
  Injectable,
  signal,
} from '@angular/core';
import { getUUID } from '../utils/utils';
import { IBmbNativeModal } from '../components/bmb-modal/bmb-modal.interface';
import { BmbPortalComponent } from '../components/bmb-portal/bmb-portal.component';

@Injectable({
  providedIn: 'root',
})
export class BmbNativeModalService {
  readonly modalList = signal<IBmbNativeModal[]>([]);
  private portalComponentRef: ComponentRef<BmbPortalComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector,
  ) {}

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

  openModal(newModal: IBmbNativeModal): string {
    const id =
      newModal.modalId && newModal.modalId !== ''
        ? newModal.modalId
        : getUUID();
    this.getOrCreatePortal();
    this.modalList.update((currentModals) => [
      ...currentModals,
      { ...newModal, modalId: id },
    ]);

    return id;
  }

  closeModal(id: string) {
    this.modalList.update((currentModals) =>
      currentModals.filter((modal) => modal.modalId !== id),
    );
  }

  closeAllModals() {
    this.modalList.set([]);
  }

  getModalList() {
    return this.modalList();
  }

  checkIfModalExists(id: string): boolean {
    return this.modalList().some((modal) => modal.modalId === id);
  }
}
