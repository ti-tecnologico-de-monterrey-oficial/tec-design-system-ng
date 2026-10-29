import type {
  IBmbTimestreamFilters,
  ITimelineEvent,
} from '../../types/components/timestream';
import { timestreamFilter } from '../timestreamFilters';

export function getTimestreamCardClasses(isFiltersEnabled: boolean): string[] {
  const classList = ['bmb-timestream-card-filters'];
  if (isFiltersEnabled) classList.push('bmb-timestream-card-filters-active');
  return classList;
}

export function filterTimestreamCardEvents(
  filters: any,
  events: ITimelineEvent[],
): ITimelineEvent[] {
  const activeFilters = Object.keys(filters);
  const validFilters = activeFilters.filter((filter) => {
    if (typeof filters[filter] === 'string') return filters[filter] !== '';
    return filters[filter].checked;
  });

  if (!validFilters.length) {
    return events;
  } else {
    const filtersValue = validFilters.reduce(
      (obj: IBmbTimestreamFilters, filter) => {
        if (filter === 'instances')
          return { ...obj, instances: filters[filter].label };
        if (filter === 'search') return { ...obj, text: filters[filter] };
        const types = obj?.type || [];
        return { ...obj, type: [...types, filter] };
      },
      {},
    );

    return timestreamFilter(events, filtersValue);
  }
}
