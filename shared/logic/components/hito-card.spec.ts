import {
  formatHitoCardBadgeText,
  getHitoCardAppearanceBadge,
  getHitoCardClassList,
  getHitoCardIconClass,
  truncateHitoCardText,
} from './hito-card';

describe('hito-card', () => {
  describe('truncateHitoCardText', () => {
    it('should return an empty string for an undefined value', () => {
      expect(truncateHitoCardText(undefined)).toBe('');
    });

    it('should return the text unchanged when within the limit', () => {
      expect(truncateHitoCardText('short text', 30)).toBe('short text');
    });

    it('should truncate and append an ellipsis when exceeding the limit', () => {
      const result = truncateHitoCardText('a very long title here', 10);
      expect(result).toBe('a very lon…');
    });
  });

  describe('getHitoCardClassList', () => {
    it('should return only the base class by default', () => {
      expect(getHitoCardClassList(false, false, false)).toEqual([
        'bmb_hito-card',
      ]);
    });

    it('should add every enabled modifier class', () => {
      expect(getHitoCardClassList(true, true, true)).toEqual([
        'bmb_hito-card',
        'bmb_hito-card-bullet',
        'bmb_hito-card-active',
        'bmb_hito-card-compact',
      ]);
    });
  });

  describe('formatHitoCardBadgeText', () => {
    it('should replace underscores in a string legend', () => {
      expect(formatHitoCardBadgeText('under_review')).toBe('under review');
    });

    it('should replace underscores in a custom event legend', () => {
      expect(
        formatHitoCardBadgeText({ text: 'custom_text', type: 'normal' }),
      ).toBe('custom text');
    });
  });

  describe('getHitoCardIconClass', () => {
    it('should return the string type directly', () => {
      expect(getHitoCardIconClass('done')).toBe('done');
    });

    it('should return the custom event type', () => {
      expect(getHitoCardIconClass({ text: 'Custom', type: 'warning' })).toBe(
        'warning',
      );
    });

    it('should default to custom when the custom event has no type', () => {
      expect(
        getHitoCardIconClass({ text: 'Custom', type: '' as any }),
      ).toBe('custom');
    });
  });

  describe('getHitoCardAppearanceBadge', () => {
    it.each([
      ['active', 'strong'],
      ['done', 'success'],
      ['pending', 'normal'],
      ['under_review', 'warning'],
      ['canceled', 'error'],
    ])('should map %s to %s', (type, expected) => {
      expect(getHitoCardAppearanceBadge(type as any)).toBe(expected);
    });

    it('should default to strong for an unknown string type', () => {
      expect(getHitoCardAppearanceBadge('unknown' as any)).toBe('strong');
    });

    it('should return the custom event type', () => {
      expect(
        getHitoCardAppearanceBadge({ text: 'Custom', type: 'warning' }),
      ).toBe('warning');
    });

    it('should default to normal when the custom event has no type', () => {
      expect(
        getHitoCardAppearanceBadge({ text: 'Custom', type: '' as any }),
      ).toBe('normal');
    });
  });
});
