import { INotification } from '../../../../components/bmb-push-notification/types';
import { IBmbNativeModal } from '../../../../components/bmb-modal/bmb-modal.interface';
import { IBmbProjectionContent } from '../../../../services/projection/projection.service';
import { BmbNotificationService } from '../../../../services/notification/notification.service';
import { BmbNativeModalService } from '../../../../services/modal/native-modal.service';
import { BmbProjectionContentService } from '../../../../services/projection/projection.service';

/**
 * Closes a notification.
 */
export const closeNotification = (
  notificationService: BmbNotificationService,
  notification: INotification,
): void => {
  if (notification.id) {
    notificationService.deleteNotification(notification.id);
  }
};

/**
 * Returns the notification position.
 */
export const getNotificationPosition = (
  notificationService: BmbNotificationService,
) => notificationService.positionX;

/**
 * Closes a native modal.
 */
export const closeModal = (
  modalService: BmbNativeModalService,
  id: string,
): void => {
  modalService.closeModal(id);
};

/**
 * Executes the modal callback when available.
 */
export const handleModalClick = (
  item: IBmbNativeModal,
  event: unknown,
): void => {
  item.closeModalClicked?.({ item, event });
};

/**
 * Removes projected content.
 */
export const removeProjectedContent = (
  projectionService: BmbProjectionContentService,
  id?: string,
): void => {
  if (!id) {
    projectionService.closeContent();
    return;
  }

  if (projectionService.isContentOpen(id)) {
    projectionService.closeContent(id);
  }
};

/**
 * TrackBy helper.
 */
export const trackByDialogId = (
  _: number,
  dialog: IBmbProjectionContent,
): string => dialog.id ?? '';

/**
 * Determines whether any notification is a toast.
 */
export const hasToast = (
  notifications: INotification[],
): boolean =>
  notifications.some(
    (notification) => notification.component === 'toast',
  );