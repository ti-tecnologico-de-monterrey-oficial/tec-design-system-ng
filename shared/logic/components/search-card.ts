import { IBmbSearchCardItemResult } from '../../types/components/search-card';

export function groupSearchCardResults(
  results: IBmbSearchCardItemResult[],
  favorites: IBmbSearchCardItemResult[],
  searchValue: string | null,
): {
  services: IBmbSearchCardItemResult[];
  persons: IBmbSearchCardItemResult[];
  favorites: IBmbSearchCardItemResult[];
} {
  if (searchValue === '') {
    return { services: [], persons: [], favorites };
  }

  return results.reduce(
    (acc, item) => {
      if (item.type === 'service') {
        if (item.isBookmarkActive) {
          acc.favorites.push(item);
          acc.services.push(item);
        } else {
          acc.services.push(item);
        }
      } else if (item.type === 'person') {
        acc.persons.push(item);
      }
      return acc;
    },
    { services: [], persons: [], favorites: [] } as {
      services: IBmbSearchCardItemResult[];
      persons: IBmbSearchCardItemResult[];
      favorites: IBmbSearchCardItemResult[];
    },
  );
}
