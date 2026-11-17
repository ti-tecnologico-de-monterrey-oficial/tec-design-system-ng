import { groupSearchCardResults } from './search-card';
import { IBmbSearchCardItemResult } from '../../types/components/search-card';

describe('groupSearchCardResults', () => {
  it('should return favorites and empty groups when the search value is empty', () => {
    const favorites: IBmbSearchCardItemResult[] = [
      { id: '1', name: 'Fav', subtitle: '', avatarOrIcon: '', type: 'service' },
    ];
    expect(groupSearchCardResults([], favorites, '')).toEqual({
      services: [],
      persons: [],
      favorites,
    });
  });

  it('should group services and persons by type', () => {
    const results: IBmbSearchCardItemResult[] = [
      { id: '1', name: 'Service 1', subtitle: '', avatarOrIcon: '', type: 'service' },
      { id: '2', name: 'Person 1', subtitle: '', avatarOrIcon: '', type: 'person' },
    ];
    const grouped = groupSearchCardResults(results, [], 'test');
    expect(grouped.services).toEqual([results[0]]);
    expect(grouped.persons).toEqual([results[1]]);
    expect(grouped.favorites).toEqual([]);
  });

  it('should also add bookmarked services to favorites', () => {
    const results: IBmbSearchCardItemResult[] = [
      {
        id: '1',
        name: 'Service 1',
        subtitle: '',
        avatarOrIcon: '',
        type: 'service',
        isBookmarkActive: true,
      },
    ];
    const grouped = groupSearchCardResults(results, [], 'test');
    expect(grouped.services).toEqual(results);
    expect(grouped.favorites).toEqual(results);
  });

  it('should ignore unsupported item types', () => {
    const results = [
      { id: '1', name: 'Other', subtitle: '', avatarOrIcon: '', type: 'other' },
    ] as unknown as IBmbSearchCardItemResult[];
    const grouped = groupSearchCardResults(results, [], 'test');
    expect(grouped).toEqual({ services: [], persons: [], favorites: [] });
  });
});
