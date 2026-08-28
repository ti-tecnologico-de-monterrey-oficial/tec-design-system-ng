import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ViewEncapsulation,
  inject,
  effect,
} from '@angular/core';
import { BmbNotificationService } from '../../services/old/notification/notification.service';
import { INotification } from '../bmb-push-notification/types';
import { BmbPushNotificationItemComponent } from '../bmb-push-notification/bmb-push-notification-item/bmb-push-notification-item.component';
import { BmbToastComponent } from '../bmb-toast/bmb-toast.component';
import { CommonModule } from '@angular/common';
import { BmbNoticeCardComponent } from '../bmb-notice-card/bmb-notice-card.component';
import { BmbNativeModalService } from '../../services/old/modal/native-modal.service';
import { BmbNativeModalComponent } from '../bmb-modal/bmb-native-modal.component';
import { IBmbNativeModal } from '../bmb-modal/bmb-modal.interface';
import {
  BmbProjectionContentService,
  IBmbProjectionContent,
} from '../../services/old/projection/projection.service';
import { BmbProjectedContentComponent } from './bmb-projected-content/bmb-projected-content.component';

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

@Component({
  selector: 'bmb-portal',
  standalone: true,
  imports: [
    BmbPushNotificationItemComponent,
    BmbToastComponent,
    BmbNoticeCardComponent,
    CommonModule,
    BmbNativeModalComponent,
    BmbProjectedContentComponent,
  ],
  templateUrl: './bmb-portal.component.html',
  styleUrl: './bmb-portal.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbPortalComponent {
  private notificationSignal = inject(BmbNotificationService);
  private modalService = inject(BmbNativeModalService);
  private projectionService = inject(BmbProjectionContentService);

  modalSignal = computed(() => this.modalService.getModalList());
  notificationsList = computed(() =>
    this.notificationSignal.getNotificationList(),
  );
  projectedContents = computed(() =>
    this.projectionService.getAllProjectedContents(),
  );
  modalList = computed(() => this.modalService.getModalList());


  constructor() {
    effect((onCleanup) => {
      const projectedContent = this.projectedContents();
      const modals = this.modalList();

      const popstateHandler = () => {
        if (modals.length > 0) {
          this.modalService.closeAllModals();
        }

        if (projectedContent.length > 0) {
          this.projectionService.closeContent();
        }
      };

      window.addEventListener('popstate', popstateHandler);

      onCleanup(() => {
        window.removeEventListener('popstate', popstateHandler);
      });
    });
  }

  closeNotification(notification: INotification) {
    if (notification.id) {
      this.notificationSignal.deleteNotification(notification.id);
    }
  }

  getNotificationPosition() {
    return this.notificationSignal.positionX;
  }

  handleCloseModal(id: string) {
    this.modalService.closeModal(id);
  }

  handleModalClick(item: IBmbNativeModal, event: unknown) {
    if (item.closeModalClicked) {
      item.closeModalClicked({ item, event });
    }
  }

  handleRemoveProjectedContent(id?: string): void {
    if (!id) {
      this.projectionService.closeContent();
      return;
    }

    if (this.projectionService.isContentOpen(id)) {
      this.projectionService.closeContent(id);
    }
  }

  trackByDialogId(_: number, dialog: IBmbProjectionContent) {
    return dialog.id;
  }

  hasToast(): boolean {
    return this.notificationsList().some((n) => n.component === 'toast');
  }
}
