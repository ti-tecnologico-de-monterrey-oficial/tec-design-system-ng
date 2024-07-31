export type IBmbNotificationCard = {
    description: string,
    time: string,
}
  
  export type IBmbNotificationCardData = {
    new: Array<IBmbNotificationCard>;
    all: Array<IBmbNotificationCard>;
    seen: Array<IBmbNotificationCard>;
  };