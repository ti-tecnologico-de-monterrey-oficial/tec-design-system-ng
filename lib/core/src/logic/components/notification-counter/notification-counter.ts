export type IBmbNotificationCounterType =
  | 'notification'
  | 'plain';

export const getCounter = ({
  counter,
  appearance,
}: {
  counter?: number;
  appearance: IBmbNotificationCounterType;
}): string => {
  const formattedCounter =
    (counter ?? 0) > 99 ? '99+' : String(counter ?? 0);

  return appearance === 'plain'
    ? `(${formattedCounter})`
    : formattedCounter;
};