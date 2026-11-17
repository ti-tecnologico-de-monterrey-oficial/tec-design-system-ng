import { hasPortalToastNotification } from './portal';

describe('portal', () => {
  describe('hasPortalToastNotification', () => {
    it('should be true when a toast notification is present', () => {
      expect(
        hasPortalToastNotification([
          { component: 'card' },
          { component: 'toast' },
        ]),
      ).toBe(true);
    });

    it('should be false when there is no toast notification', () => {
      expect(hasPortalToastNotification([{ component: 'card' }])).toBe(false);
    });

    it('should be false for an empty list', () => {
      expect(hasPortalToastNotification([])).toBe(false);
    });
  });
});
