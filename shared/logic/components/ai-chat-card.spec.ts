import { getNextAIChatCardMode } from './ai-chat-card';

describe('ai-chat-card', () => {
  describe('getNextAIChatCardMode', () => {
    it('should go to chat from compact', () => {
      expect(getNextAIChatCardMode('compact', 'expanded')).toBe('chat');
    });

    it('should go to chat from invisible', () => {
      expect(getNextAIChatCardMode('invisible', 'expanded')).toBe('chat');
    });

    it('should go to invisible from chat when the last non-chat mode was invisible', () => {
      expect(getNextAIChatCardMode('chat', 'invisible')).toBe('invisible');
    });

    it('should go to compact from chat when the last non-chat mode was not invisible', () => {
      expect(getNextAIChatCardMode('chat', 'expanded')).toBe('compact');
      expect(getNextAIChatCardMode('chat', 'compact')).toBe('compact');
    });

    it('should go to chat from expanded', () => {
      expect(getNextAIChatCardMode('expanded', 'compact')).toBe('chat');
    });

    it('should fall back to expanded for any other mode', () => {
      expect(getNextAIChatCardMode('unknown' as never, 'compact')).toBe(
        'expanded',
      );
    });
  });
});
