import {
  getNextAiChatCardMode,
  shouldTrackAsLastNonChatMode,
} from './ai-chat-card';

describe('ai-chat-card', () => {
  describe('getNextAiChatCardMode', () => {
    it('should go to chat from compact', () => {
      expect(getNextAiChatCardMode('compact')).toBe('chat');
    });

    it('should go to chat from invisible', () => {
      expect(getNextAiChatCardMode('invisible')).toBe('chat');
    });

    it('should expand the floating chat', () => {
      expect(getNextAiChatCardMode('chat')).toBe('expanded');
    });

    it('should go to chat from expanded', () => {
      expect(getNextAiChatCardMode('expanded')).toBe('chat');
    });

    it('should fall back to expanded for any other mode', () => {
      expect(getNextAiChatCardMode('unknown' as never)).toBe('expanded');
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
