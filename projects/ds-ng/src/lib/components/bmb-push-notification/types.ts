import { IButtonAppearance } from '../../types';
import { BmbToastAppearance } from '../bmb-toast/bmb-toast.component';

export interface INotification extends IMinimalNotification {
  icon?: string;
  type?: NotificationType;
  dontAskAgainEvent?: (id: string) => void;
  date?: string;
  delay?: number;
  actions?: INotificationAction[];
  appIcon?: string;
  appName?: string;
  userName?: string;
  userMail?: string;
  userAvatar?: string;
  media?: string;
  appearance?: BmbToastAppearance;
  component?: 'toast' | 'notification';
  position?:
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';
}

export interface IMinimalNotification {
  title: string;
  subTitle?: string;
  content?: string;
  isFullColor: boolean;
  id?: string;
}

export interface IBmbGenericAction {
  title: string;
  type?: IButtonAppearance;
  icon?: string;
}

export interface INotificationAction extends IBmbGenericAction {
  action: 'close' | ((notification: IMinimalNotification) => void);
}

export interface IBmbButtonAction extends IBmbGenericAction {
  action: () => void;
}

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
