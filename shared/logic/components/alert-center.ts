import { DateTime } from 'luxon';
import type {
  IBmbAlertCenterCategories,
  IBmbAlertCenterFooterEvent,
  IBmbAlertCenterFooterEventName,
  IBmbAlertCenterProtoEventFooter,
  IBmbAlertCenterTabConfig,
  IBmbDataAlert,
  IBmbDataAlertsParsed,
} from '../../types/components/alert-center';
import type { IBmbTab } from '../../types/components/tabs';

export const getSelectedAlertIds = (
  selection: Record<string, boolean>,
): string[] => Object.keys(selection).filter((id) => selection[id] === true);

export function selectAllAlertIds(
  selection: Record<string, boolean>,
  checked: boolean,
): Record<string, boolean> {
  const updated: Record<string, boolean> = {};
  for (const key in selection) {
    if (Object.prototype.hasOwnProperty.call(selection, key))
      updated[key] = checked;
  }
  return updated;
}

export function getInitialAlertSelection(
  categories: IBmbAlertCenterCategories,
): Record<string, boolean> {
  return Object.values(categories)
    .flat()
    .reduce(
      (selection, alert) => {
        selection[`${alert.id}`] = false;
        return selection;
      },
      {} as Record<string, boolean>,
    );
}

export function orderAlertCenterEvents(
  alerts: IBmbDataAlert[],
  dateFormat: string,
): IBmbDataAlertsParsed[] {
  const parserDates = alerts.map((alert) => ({
    ...alert,
    pDate: DateTime.fromFormat(
      `${alert.date} ${alert.time}`,
      `${dateFormat} HH:mm`,
    ),
    customEventHandler: alert.customEventHandler ?? false,
  }));

  return parserDates.sort((a, b) => {
    return b.pDate.toMillis() - a.pDate.toMillis();
  });
}

export function categorizeAlertCenterEvents(
  alerts: IBmbDataAlertsParsed[],
  now: DateTime,
): IBmbAlertCenterCategories {
  const objectEvent: IBmbAlertCenterCategories = {
    recent: [],
    sevenDays: [],
    month: [],
    rest: [],
  };
  alerts.forEach((alert) => {
    const diff = Math.trunc(now.diff(alert.pDate, 'days').days ?? 0);
    if (diff === 0) objectEvent.recent.push(alert);
    else if (diff <= 7) objectEvent.sevenDays.push(alert);
    else if (diff <= 30) objectEvent.month.push(alert);
    else objectEvent.rest.push(alert);
  });
  return objectEvent;
}

export function getAlertCenterFooterEvent(
  event: IBmbAlertCenterProtoEventFooter,
  alertList: IBmbDataAlert[],
): IBmbAlertCenterFooterEvent | undefined {
  const events = alertList.filter((alert) =>
    event.alerts.includes(alert.id.toString()),
  );

  if (events.length === 0) return undefined;
  if (event.event === 'tags') {
    return {
      alerts: events,
      event: 'tags',
    };
  }
  const names = {
    isRead: 'read',
    isFavorite: 'favorite',
    isArchived: 'archived',
  };
  const eventName = names[event.event] || event.event;
  const isPositiveOperation = events.some((alert) => !alert[event.event]);
  const eventType = isPositiveOperation
    ? `add_${eventName}`
    : `remove_${eventName}`;
  return {
    alerts: events,
    event: eventType as IBmbAlertCenterFooterEventName,
  };
}

export function filterAlertCenterCategories(
  filterBy: 'all' | 'unread' | 'archived' | 'favorites',
  categories: IBmbAlertCenterCategories,
) {
  if (filterBy === 'unread') {
    return {
      recent: categories.recent.filter((event) => !event.isRead),
      sevenDays: categories.sevenDays.filter((event) => !event.isRead),
      month: categories.month.filter((event) => !event.isRead),
      rest: categories.rest.filter((event) => !event.isRead),
    };
  }
  if (filterBy === 'archived') {
    return {
      recent: categories.recent.filter((event) => event.isArchived),
      sevenDays: categories.sevenDays.filter((event) => event.isArchived),
      month: categories.month.filter((event) => event.isArchived),
      rest: categories.rest.filter((event) => event.isArchived),
    };
  }
  if (filterBy === 'favorites') {
    return {
      recent: categories.recent.filter((event) => event.isFavorite),
      sevenDays: categories.sevenDays.filter((event) => event.isFavorite),
      month: categories.month.filter((event) => event.isFavorite),
      rest: categories.rest.filter((event) => event.isFavorite),
    };
  }

  return categories;
}

export function getAlertCenterSelectionSummary(
  selection: Record<string, boolean>,
) {
  const state = selection;
  const summarySelection = Object.values(state).reduce(
    (acc, value) => {
      acc.some = acc.some || value;
      acc.all = acc.all && value;
      return acc;
    },
    { some: false, all: true },
  );
  return summarySelection;
}

export function getAlertCenterTabs(
  tabsName: (string | IBmbAlertCenterTabConfig)[],
  alertList: IBmbDataAlert[],
) {
  return tabsName.map((tab, index) => {
    const complexTab: IBmbTab = {
      id: index,
      title: typeof tab === 'string' ? tab : tab.title,
      isActive: index === 0,
      badge:
        index === 0 || index === 1
          ? alertList.filter((alert) => !alert.isRead).length
          : 0,
      isMobile: typeof tab === 'string' ? true : tab.isMobile,
      isDesktop: typeof tab === 'string' ? true : tab.isDesktop,
    };
    return complexTab;
  });
}
