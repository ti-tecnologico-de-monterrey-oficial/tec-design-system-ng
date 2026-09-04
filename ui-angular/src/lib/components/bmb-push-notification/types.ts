import type { TemplateRef } from '@angular/core';
import type {
  IBmbPushNotification,
  IBmbPushMinimalNotification,
  IBmbPushNotificationAction,
} from '../../_shared/types/components/push-notification';

export type {
  BmbPushNotificationAppearance,
  IBmbButtonAction,
  IBmbGenericAction,
  IBmbNoticeCardContent,
  IBmbNoticeCardDescription,
  NotificationType,
} from '../../_shared/types/components/push-notification';

export interface INotification
  extends IBmbPushNotification<TemplateRef<unknown>> {}

export interface IMinimalNotification
  extends IBmbPushMinimalNotification<TemplateRef<unknown>> {}

export interface INotificationAction
  extends IBmbPushNotificationAction<TemplateRef<unknown>> {}
