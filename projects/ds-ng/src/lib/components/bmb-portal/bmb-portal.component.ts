import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ViewEncapsulation,
} from '@angular/core';
import { BmbNotificationService } from '../../services/notification/notification.service';
import { INotification } from '../bmb-push-notification/types';
import { BmbPushNotificationItemComponent } from '../bmb-push-notification/bmb-push-notification-item/bmb-push-notification-item.component';
import { BmbToastComponent } from '../bmb-toast/bmb-toast.component';
import { CommonModule } from '@angular/common';
import { BmbNoticeCardComponent } from '../bmb-notice-card/bmb-notice-card.component';
import { BmbNativeModalService } from '../../services/modal/native-modal.service';
import { BmbNativeModalComponent } from '../bmb-modal/bmb-native-modal.component';
import { IBmbNativeModal } from '../bmb-modal/bmb-modal.interface';
import { BmbProjectionContentService } from '../../services/projection/projection.service';
import { BmbProjectedContentComponent } from './bmb-projected-content/bmb-projected-content.component';

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

  handleRemoveProjectedContent() {
    this.projectionService.closeContent();
  }

  hasToast(): boolean {
    return this.notificationsList().some((n) => n.component === 'toast');
  }
}
