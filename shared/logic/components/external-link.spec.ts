import { getExternalLinkSubtitleIcon } from './external-link';

describe('external-link', () => {
  describe('getExternalLinkSubtitleIcon', () => {
    it('should return lock when the subtitle is an external link', () => {
      expect(getExternalLinkSubtitleIcon('https://external.com')).toBe(
        'lock',
      );
    });

    it('should return an empty string when the subtitle is not a URL', () => {
      expect(getExternalLinkSubtitleIcon('internal-page')).toBe('');
    });

    it('should return an empty string when the subtitle is empty', () => {
      expect(getExternalLinkSubtitleIcon('')).toBe('');
    });
  });
});
