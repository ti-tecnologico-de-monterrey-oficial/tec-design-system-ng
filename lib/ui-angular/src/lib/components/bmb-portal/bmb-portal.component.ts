import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { BmbNotificationService } from '../../services/notification/notification.service';
import { BmbNativeModalService } from '../../services/modal/native-modal.service';
import {
  BmbProjectionContentService,
  IBmbProjectionContent,
} from '../../services/projection/projection.service';

import { INotification } from '../bmb-push-notification/types';
import { BmbPushNotificationItemComponent } from '../bmb-push-notification/bmb-push-notification-item/bmb-push-notification-item.component';
import { BmbToastComponent } from '../bmb-toast/bmb-toast.component';
import { BmbNoticeCardComponent } from '../bmb-notice-card/bmb-notice-card.component';
import { BmbNativeModalComponent } from '../bmb-modal/bmb-native-modal.component';
import { IBmbNativeModal } from '../bmb-modal/bmb-modal.interface';
import { BmbProjectedContentComponent } from './bmb-projected-content/bmb-projected-content.component';

import {
  closeNotification,
  getNotificationPosition,
  closeModal,
  handleModalClick,
  removeProjectedContent,
  trackByDialogId,
  hasToast,
} from '../../_core/logic/components/portal/portal';

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
  constructor(
    private notificationSignal: BmbNotificationService,
    private modalService: BmbNativeModalService,
    private projectionService: BmbProjectionContentService,
  ) {}

  modalSignal = computed(() => this.modalService.getModalList());

  projectedContent = computed(() =>
    this.projectionService.getProjectedContent(),
  );

  notificationsList = computed(() =>
    this.notificationSignal.getNotificationList(),
  );

  projectedContents = computed(() =>
    this.projectionService.getAllProjectedContents(),
  );

  closeNotification(notification: INotification): void {
    closeNotification(this.notificationSignal, notification);
  }

  getNotificationPosition() {
    return getNotificationPosition(this.notificationSignal);
  }

  handleCloseModal(id: string): void {
    closeModal(this.modalService, id);
  }

  handleModalClick(
    item: IBmbNativeModal,
    event: unknown,
  ): void {
    handleModalClick(item, event);
  }

  handleRemoveProjectedContent(id?: string): void {
    removeProjectedContent(this.projectionService, id);
  }

  trackByDialogId(
    index: number,
    dialog: IBmbProjectionContent,
  ): string {
    return trackByDialogId(index, dialog);
  }

  hasToast(): boolean {
    return hasToast(this.notificationsList());
  }
}