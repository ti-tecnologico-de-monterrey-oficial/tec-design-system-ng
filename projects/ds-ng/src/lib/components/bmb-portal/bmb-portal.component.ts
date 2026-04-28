import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Signal,
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
import {
  BmbProjectionContentService,
  IBmbProjectionContent,
} from '../../services/projection/projection.service';
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
  readonly notificationPositions: NonNullable<INotification['position']>[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ];

  constructor(
    private notificationSignal: BmbNotificationService,
    private modalService: BmbNativeModalService,
    private projectionService: BmbProjectionContentService,
  ) {}

  modalSignal = this.modalService.modals;
  normalizedModals = computed(() =>
    this.modalSignal().map((item) => ({
      ...item,
      modalId: item.modalId ?? '',
      title: item.title ?? '',
      subtitle: item.subtitle ?? '',
      content: item.content ?? '',
      size: item.size ?? 'medium',
      actions: item.actions ?? [],
      inputContext: item.inputContext ?? {},
      outputContext: item.outputContext ?? {},
    })),
  );
  notificationsList = computed(() =>
    this.notificationSignal.getNotificationList(),
  );
  notificationsByPosition = computed(() => {
    const grouped: Record<NonNullable<INotification['position']>, INotification[]> = {
      'top-left': [],
      'top-center': [],
      'top-right': [],
      'bottom-left': [],
      'bottom-center': [],
      'bottom-right': [],
    };

    for (const notification of this.notificationsList()) {
      grouped[notification.position ?? 'top-right'].push(notification);
    }

    return grouped;
  });
  hasToast = computed(() =>
    this.notificationsList().some((n) => n.component === 'toast'),
  );
  projectedContents: Signal<IBmbProjectionContent[]> = computed(() =>
    this.projectionService.getAllProjectedContents(),
  );

  closeNotification(notification: INotification): void {
    if (notification.id) {
      this.notificationSignal.deleteNotification(notification.id);
    }
  }

  handleModalClick(
    item: IBmbNativeModal,
    event: { modalId: string; event: MouseEvent },
  ): void {
    try {
      item.closeModalClicked?.({ item, event });
    } catch {
      console.warn(`Error executing closeModalClicked for modal with id ${item.modalId}`);
      return;
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
}
