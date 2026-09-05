import type { IBmbPushNotificationColors } from '../foundations/colors/color-type';
import type { IButtonAppearance } from '../utils';

export type BmbPushNotificationAppearance =
  | 'neutral'
  | 'primary'
  | 'warning'
  | 'error'
  | 'event'
  | 'successful'
  | 'reminder'
  | 'mitec_blue'
  | 'mitec_red'
  | 'mitec_green'
  | 'mitec_orange'
  | 'mitec_light_green'
  | 'mitec_purple'
  | 'creative_violet'
  | 'creative_indigo'
  | 'creative_emerald'
  | 'creative_licorice'
  | 'creative_darkteal'
  | 'creative_peach'
  | 'creative_sepia'
  | 'creative_softred'
  | 'creative_wattle'
  | 'creative_shipcove'
  | 'creative_plantation'
  | 'creative_rum'
  | 'creative_hibiscus'
  | 'creative_ripelemon';

export type NotificationType =
  | 'tec'
  | 'success'
  | 'info'
  | 'neutral'
  | 'event'
  | 'error'
  | 'warning'
  | 'black'
  | 'creative_violet'
  | 'creative_indigo'
  | 'creative_emerald'
  | 'creative_licorice'
  | 'creative_darkteal'
  | 'creative_orange'
  | 'creative_peach'
  | 'creative_sepia'
  | 'creative_softred'
  | 'creative_wattle'
  | 'creative_shipcove'
  | 'creative_plantation'
  | 'creative_rum'
  | 'creative_hibiscus'
  | 'creative_ripelemon';

export interface IBmbNoticeCardDescription {
  pageOne?: string;
  pageTwo?: string;
}

export interface IBmbPushMinimalNotification<TContent = never> {
  title: string;
  subTitle?: string;
  content?: string | IBmbNoticeCardDescription | TContent;
  isFullColor: boolean;
  id?: string;
}

export interface IBmbNoticeCardContent {
  buttonText?: string;
  link?: string;
}

export interface IBmbGenericAction {
  title: string;
  type?: IButtonAppearance;
  icon?: string;
}

export interface IBmbPushNotificationAction<TContent = never>
  extends IBmbGenericAction {
  action:
    | 'close'
    | ((notification: IBmbPushMinimalNotification<TContent>) => void);
}

export interface IBmbButtonAction extends IBmbGenericAction {
  action: () => void;
}

export interface IBmbPushNotification<TContent = never>
  extends IBmbPushMinimalNotification<TContent>,
    IBmbNoticeCardContent {
  icon?: string;
  type?: IBmbPushNotificationColors | NotificationType;
  dontAskAgainEvent?: (id: string) => void;
  date?: string;
  delay?: number;
  actions?: IBmbPushNotificationAction<TContent>[];
  appIcon?: string;
  appName?: string;
  userName?: string;
  userMail?: string;
  userAvatar?: string;
  media?: string;
  appearance?: BmbPushNotificationAppearance;
  component?: 'toast' | 'notification' | 'notice-card';
  position?:
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';
}
