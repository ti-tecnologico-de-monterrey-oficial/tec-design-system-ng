import { getNextAIChatCardMode } from './ai-chat-card';

describe('ai-chat-card', () => {
  describe('getNextAIChatCardMode', () => {
    it('should go to chat from compact', () => {
      expect(getNextAIChatCardMode('compact')).toBe('chat');
    });

    it('should go to chat from invisible', () => {
      expect(getNextAIChatCardMode('invisible')).toBe('chat');
    });

    it('should go to chat from expanded', () => {
      expect(getNextAIChatCardMode('expanded')).toBe('chat');
    });

    it('should fall back to expanded for any other mode', () => {
      expect(getNextAIChatCardMode('unknown' as never)).toBe('expanded');
    });
  });
});
