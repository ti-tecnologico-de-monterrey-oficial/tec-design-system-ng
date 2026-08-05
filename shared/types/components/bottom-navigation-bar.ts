export type IBmbFooterEvent =
  | 'back'
  | 'forward'
  | 'share'
  | 'reload';

export type IBmbNavigationBarIcon = {
  name: string;
  label: string;
  eventName?: IBmbFooterEvent;
  dotNotification?: number;
};

export type IBmbNavigationBarIcons = {
  one: IBmbNavigationBarIcon;
  two: IBmbNavigationBarIcon;
  three: IBmbNavigationBarIcon;
  four: IBmbNavigationBarIcon;
};