import { buildAdvertisementCardTabs } from './advertisement-card';

describe('advertisement-card', () => {
  it('should build the three tabs with the promotions tab active by default', () => {
    expect(
      buildAdvertisementCardTabs('Promotions', 'Announcements', 'Information'),
    ).toEqual([
      { id: 1, title: 'Promotions', isActive: true },
      { id: 2, title: 'Announcements' },
      { id: 3, title: 'Information' },
    ]);
  });
});
