import { IBmbTab } from '../../types/components/tabs';

export function buildAdvertisementCardTabs(
  promotionsLabel: string,
  announcementsLabel: string,
  informationLabel: string,
): IBmbTab[] {
  return [
    { id: 1, title: promotionsLabel, isActive: true },
    { id: 2, title: announcementsLabel },
    { id: 3, title: informationLabel },
  ];
}
