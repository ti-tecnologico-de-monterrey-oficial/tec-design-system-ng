import { DateTime } from 'luxon';
import type { ITimelineEvent } from 'ui-angular';

export function createTimestreamDemoEvents(): ITimelineEvent[] {
  const today = DateTime.now();
  return (['pending', 'active', 'done', 'under_review'] as const).map(
    (type, index) => ({
      id: index + 1,
      title: `${type} event`,
      description: 'Open this event to inspect its details and dates.',
      short_description: 'Migration example',
      start: today.plus({ days: index }).toFormat('dd/MM/yyyy'),
      end: today.plus({ days: index + (index % 2) }).toFormat('dd/MM/yyyy'),
      type,
      image: '',
    }),
  );
}
