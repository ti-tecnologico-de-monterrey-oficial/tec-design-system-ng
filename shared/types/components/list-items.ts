import { DateTime } from 'luxon';

export interface IBmbListItemsElement {
  title: string;
  date: string;
  disabled?: boolean;
  icon?: string;
  formattedDate?: DateTime;
}

export interface IBmbListItemsElementGroupedByDate {
  recent: IBmbListItemsElement[];
  lastWeek: IBmbListItemsElement[];
  lastMonth: IBmbListItemsElement[];
  rest: IBmbListItemsElement[];
}
