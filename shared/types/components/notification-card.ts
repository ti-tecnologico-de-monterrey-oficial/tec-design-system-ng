export interface IBmbNotificationCard {
  description: string;
  time: string;
}

export interface IBmbNotificationCardData {
  new: IBmbNotificationCard[];
  all: IBmbNotificationCard[];
  seen: IBmbNotificationCard[];
}
