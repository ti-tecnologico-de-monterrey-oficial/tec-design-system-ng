import { DateTime, Info } from 'luxon';
import {
  categorizeAlertCenterEvents,
  getAlertCenterFooterEvent,
  getAlertCenterSelectionSummary,
  orderAlertCenterEvents,
} from './_shared/logic/components/alert-center';
import { layoutEvents } from './_shared/logic/components/calendar';
import {
  filterCalendarEvents,
  orderCalendarEvents,
} from './_shared/logic/components/calendar-state';
import {
  getChatBarBotChunks,
  shouldSendChatBarMessage,
} from './_shared/logic/components/chat-bar';
import {
  getFilterCardSubmission,
  getFilterCardVisibility,
} from './_shared/logic/components/filter-card';
import {
  prepareTimestreamEvents,
  selectTimestreamDate,
} from './_shared/logic/components/timestream';
import { filterTimestreamCardEvents } from './_shared/logic/components/timestream-card';
import {
  getTitleContentClassNames,
  getTitleContentStyles,
} from './_shared/logic/components/title-content';
import type { IBmbDataAlert } from './_shared/types/components/alert-center';
import type { ITimelineEvent } from './_shared/types/components/timestream';

const alert = (id: number, date: string): IBmbDataAlert => ({
  id,
  date,
  time: '09:00',
  title: `Alert ${id}`,
  description: [],
  type: 'notification',
  isRead: false,
  isFavorite: false,
  isArchived: false,
});
const event: ITimelineEvent = {
  id: 1,
  start: '31/10/2026',
  end: '02/11/2026',
  type: 'pending',
  title: 'Enrollment',
  description: 'Enrollment',
  short_description: 'Enrollment',
  image: '',
};

describe('Shared migration behavior', () => {
  it('preserves alert ordering, category boundaries, and footer payloads', () => {
    const alerts = [
      alert(1, '01/10/2026'),
      alert(2, '21/10/2026'),
      alert(3, '14/10/2026'),
      alert(4, '01/08/2026'),
    ];
    const parsed = orderAlertCenterEvents(alerts, 'dd/MM/yyyy');
    expect(parsed.map((item) => item.id)).toEqual([2, 3, 1, 4]);
    const categories = categorizeAlertCenterEvents(
      parsed,
      DateTime.fromISO('2026-10-21T12:00:00'),
    );
    expect(
      Object.values(categories).map((items) => items.map((item) => item.id)),
    ).toEqual([[2], [3], [1], [4]]);
    expect(
      getAlertCenterFooterEvent({ event: 'isRead', alerts: ['2'] }, alerts),
    ).toEqual({ event: 'add_read', alerts: [alerts[1]] });
    expect(
      getAlertCenterFooterEvent({ event: 'tags', alerts: ['missing'] }, alerts),
    ).toBeUndefined();
    expect(getAlertCenterSelectionSummary({})).toEqual({
      some: false,
      all: true,
    });
  });

  it('groups calendar events and preserves filter visibility without changing the grouped input', () => {
    const grouped = orderCalendarEvents(
      [
        {
          title: 'Later',
          detail: '',
          start: '2026-10-21T10:00:00',
          end: '2026-10-21T12:00:00',
          calendar: 'academic',
        },
        {
          title: 'Earlier',
          detail: '',
          start: '2026-10-21T09:00:00',
          end: '2026-10-21T11:00:00',
          calendar: 'life',
        },
      ],
      'iso',
    );
    const week = DateTime.fromISO('2026-10-21').weekNumber;
    const events = grouped[week]['2026-10-21'];
    expect(events.map((item) => item.title)).toEqual(['Earlier', 'Later']);
    expect(layoutEvents(events).map((item) => item.columnCount)).toEqual([
      2, 2,
    ]);
    const filtered = filterCalendarEvents({
      orderedEvents: grouped,
      filters: { life: false },
    });
    expect(filtered[week]['2026-10-21'].map((item) => item.isVisible)).toEqual([
      false,
      true,
    ]);
    expect(events[0].isVisible).toBeUndefined();
  });

  it('expands inclusive timestream dates across months and keeps selection and filters compatible', () => {
    const prepared = prepareTimestreamEvents(
      [event],
      'dd/MM/yyyy',
      Info.months('long', { locale: 'es' }),
    );
    expect(prepared.orderedEvents).toEqual(['2026/10', '2026/11']);
    expect(prepared['2026/11'].orderedEvents).toEqual([
      '2026/11/01',
      '2026/11/02',
    ]);
    const selected = selectTimestreamDate(
      prepared.orderedEvents,
      prepared,
      DateTime.fromISO('2026-11-01'),
    );
    expect(selected.day).toBe('2026/11/01');
    expect(prepared['2026/11'].events[selected.day].selected).toBe(true);
    expect(filterTimestreamCardEvents({}, [event])).toEqual([event]);
    expect(
      filterTimestreamCardEvents({ done: { checked: true } }, [event]),
    ).toEqual([]);
    expect(prepareTimestreamEvents([], 'dd/MM/yyyy', [])).toEqual({});
  });

  it('keeps bot pagination, keyboard behavior, and title styling compatible', () => {
    const bots = Array.from({ length: 13 }, (_, i) => ({
      name: `Bot ${i}`,
      icon: 'bot_tecStandar',
    }));
    expect(getChatBarBotChunks(bots).map((chunk) => chunk.length)).toEqual([
      6, 6, 1,
    ]);
    expect(bots).toHaveLength(13);
    expect(shouldSendChatBarMessage('Enter', false)).toBe(true);
    expect(shouldSendChatBarMessage('Enter', true)).toBe(false);
    expect(getTitleContentClassNames('title', '5', '600', true)).toEqual([
      'title-5',
      'title-600',
      'title-centered',
    ]);
    expect(getTitleContentStyles('image.png', true, false, undefined)).toEqual({
      'background-color': 'transparent',
    });
  });

  it('preserves conditional filter precedence and submitted payloads', () => {
    const visibility = getFilterCardVisibility(
      [
        { when: { level: 'a' }, show: ['course'] },
        { when: { level: 'a' }, hide: ['course'] },
      ],
      { level: 'a' },
    );
    expect(visibility?.get('course')).toBe(false);
    const checked = { type: 'checkbox', checked: true, label: 'Pending' };
    expect(
      getFilterCardSubmission(
        { pending: checked, course: { type: 'dropdown' } },
        { search: 'hello', course: ['a'] },
      ),
    ).toEqual({
      pending: checked,
      course: { type: 'dropdown', value: ['a'] },
      search: 'hello',
    });
  });
});
