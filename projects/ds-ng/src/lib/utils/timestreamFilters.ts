import { ITimelineEvent, IBmbTimestreamFilters } from '../types';



const checkFilters = (event: ITimelineEvent, filters: IBmbTimestreamFilters) => {
  const filtersKeys  = Object.keys(filters);
  const result = filtersKeys.map(filter => {
    switch (filter) {
      case 'type':
        return !!filters[filter]?.includes(event.type);

      case 'instances':
        if (filters[filter] === 'Múltiple') return event.start !==  event.end;
        if (filters[filter] === 'Una') return event.start ===  event.end;
        return true;

      case 'text':
        const allowedSeparator = '\\\s,;"\'|';
        const substr = new RegExp(`(^.*[${allowedSeparator}]${filters[filter]}$)|(^${filters[filter]}[${allowedSeparator}].*)|(^${filters[filter]}$)|(^.*[${allowedSeparator}]${filters[filter]}[${allowedSeparator}].*$)`);
        return substr.test(event.title) ||
          substr.test(event.description) ||
          substr.test(event.short_description);

      default:
        return false;
    }
  });

  return result;
}

export const timestreamFilter  = (events: ITimelineEvent[], filters: IBmbTimestreamFilters) => {
  const newEvents = events.filter((event) => {
    return checkFilters(event, filters).every((filter: any) => filter);
  });

  return newEvents;
}
