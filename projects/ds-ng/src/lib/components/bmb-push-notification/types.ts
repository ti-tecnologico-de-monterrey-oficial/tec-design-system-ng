import { IButtonAppearance } from "../../types";

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
}

export interface IMinimalNotification {
  title: string;
  subTitle?: string;
  content?: string;
  isFullColor: boolean;
  id?: string;
}

export interface INotificationAction {
  title: string,
  action: 'close' | ((notification: IMinimalNotification) => void),
  type?: IButtonAppearance,
  icon?: string;
}

export type NotificationType = 'tec' | 'success' | 'info' | 'neutral' | 'event' | 'error' | 'warning' | 'black';
