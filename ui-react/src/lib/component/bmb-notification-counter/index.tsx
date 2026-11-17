import { ReactNode } from 'react';
import '../../../../../shared/assets/styles/components/_notification-counter.scss';
import { getCounter } from '../../_shared/logic/components/notification-counter';
import type { IBmbNotificationCounterType } from '../../_shared/types/components/notification-counter';

export type { IBmbNotificationCounterType } from '../../_shared/types/components/notification-counter';

export interface BmbNotificationCounterProps {
  counter?: number;
  appearance?: IBmbNotificationCounterType;
  children?: ReactNode;
}

export const BmbNotificationCounter = ({
  counter,
  appearance = 'notification',
  children,
}: BmbNotificationCounterProps) => {
  if (!counter) return null;

  return (
    <section className="bmb_notification-counter">
      {children}
      <span
        className={
          appearance === 'notification'
            ? 'bmb_notification-counter-number bmb_notification-counter-bullet bmb_notification-counter-position-bullet'
            : 'bmb_notification-counter-number bmb_notification-counter-plain'
        }
      >
        {getCounter({ counter, appearance })}
      </span>
    </section>
  );
};
