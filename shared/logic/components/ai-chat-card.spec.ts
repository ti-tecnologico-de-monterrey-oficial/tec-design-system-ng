import { getNextAIChatCardMode } from './ai-chat-card';

describe('ai-chat-card', () => {
  describe('getNextAIChatCardMode', () => {
    it('should fall back to expanded for any other mode', () => {
      expect(getNextAIChatCardMode('unknown' as never)).toBe('expanded');
    });
  });
});
