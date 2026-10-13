import { getNextAiChatCardMode, shouldTrackAsLastNonChatMode } from './ai-chat-card';

describe('ai-chat-card', () => {
  describe('getNextAiChatCardMode', () => {
    it('should go to chat from compact', () => {
      expect(getNextAiChatCardMode('compact', 'expanded')).toBe('chat');
    });

    it('should go to chat from invisible', () => {
      expect(getNextAiChatCardMode('invisible', 'expanded')).toBe('chat');
    });

    it('should go to invisible from chat when the last non-chat mode was invisible', () => {
      expect(getNextAiChatCardMode('chat', 'invisible')).toBe('invisible');
    });

    it('should go to compact from chat when the last non-chat mode was not invisible', () => {
      expect(getNextAiChatCardMode('chat', 'expanded')).toBe('compact');
      expect(getNextAiChatCardMode('chat', 'compact')).toBe('compact');
    });

    it('should go to chat from expanded', () => {
      expect(getNextAiChatCardMode('expanded', 'compact')).toBe('chat');
    });

    it('should fall back to expanded for any other mode', () => {
      expect(getNextAiChatCardMode('unknown' as never, 'compact')).toBe(
        'expanded',
      );
    });
  });

  describe('shouldTrackAsLastNonChatMode', () => {
    it('should track invisible mode', () => {
      expect(shouldTrackAsLastNonChatMode('invisible')).toBe(true);
    });

    it('should track compact mode', () => {
      expect(shouldTrackAsLastNonChatMode('compact')).toBe(true);
    });

    it('should not track chat mode', () => {
      expect(shouldTrackAsLastNonChatMode('chat')).toBe(false);
    });

    it('should not track expanded mode', () => {
      expect(shouldTrackAsLastNonChatMode('expanded')).toBe(false);
    });
  });
});
