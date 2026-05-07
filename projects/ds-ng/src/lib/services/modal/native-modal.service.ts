import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  computed,
  EmbeddedViewRef,
  EnvironmentInjector,
  Injectable,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { getUUID } from '../../utils/utils';
import { IBmbNativeModal } from '../../components/bmb-modal/bmb-modal.interface';
import { BmbPortalComponent } from '../../components/bmb-portal/bmb-portal.component';

@Injectable({
  providedIn: 'root',
})
export class BmbNativeModalService {
  private readonly document = inject<Document>(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly modalList = signal<IBmbNativeModal[]>([]);
  readonly modals = computed(() => this.modalList());
  private portalComponentRef: ComponentRef<BmbPortalComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector,
  ) {}

  private isBrowserEnvironment(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private getOrCreatePortal(): void {
    if (!this.isBrowserEnvironment()) {
      return;
    }

    if (this.portalComponentRef) {
      return;
    }

    const existingHost = this.document.querySelector('bmb-portal');

    if (existingHost) {
      return;
    }

    this.portalComponentRef = createComponent(BmbPortalComponent, {
      environmentInjector: this.environmentInjector,
    });

    this.appRef.attachView(this.portalComponentRef.hostView);

    const hostDomElem = (
      this.portalComponentRef.hostView as EmbeddedViewRef<any>
    ).rootNodes[0] as HTMLElement;
    this.document.body.appendChild(hostDomElem);

    return;
  }

  private destroyPortalIfUnused(): void {
    if (this.modalList().length > 0 || !this.portalComponentRef) {
      return;
    }

    this.appRef.detachView(this.portalComponentRef.hostView);
    this.portalComponentRef.destroy();
    this.portalComponentRef = null;
  }

  openModal(newModal: IBmbNativeModal): string {
    const id =
      newModal.modalId && newModal.modalId !== ''
        ? newModal.modalId
        : getUUID();

    if (this.checkIfModalExists(id)) {
      throw new Error(`A modal with id \"${id}\" already exists.`);
    }

    this.getOrCreatePortal();

    this.modalList.update((currentModals) => [
      ...currentModals,
      { ...newModal, modalId: id },
    ]);

    return id;
  }

  private runCloseHook(
    modal: IBmbNativeModal,
    hook: 'beforeCloseModal' | 'afterCloseModal',
    reason: 'single' | 'all',
  ): void {
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

  closeModal(id: string) {
    const modalToClose = this.modalList().find((modal) => modal.modalId === id);

    if (modalToClose) {
      this.runCloseHook(modalToClose, 'beforeCloseModal', 'single');
    }

    this.modalList.update((currentModals) =>
      currentModals.filter((modal) => modal.modalId !== id),
    );

    this.destroyPortalIfUnused();

    if (modalToClose) {
      this.runCloseHook(modalToClose, 'afterCloseModal', 'single');
    }
  }

  closeAllModals() {
    const modalsToClose = this.modalList();

    modalsToClose.forEach((modal) => {
      this.runCloseHook(modal, 'beforeCloseModal', 'all');
    });

    this.modalList.set([]);
    this.destroyPortalIfUnused();

    modalsToClose.forEach((modal) => {
      this.runCloseHook(modal, 'afterCloseModal', 'all');
    });
  }

  getModalList(): IBmbNativeModal[] {
    return this.modalList();
  }

  checkIfModalExists(id: string): boolean {
    return this.modalList().some((modal) => modal.modalId === id);
  }
}
