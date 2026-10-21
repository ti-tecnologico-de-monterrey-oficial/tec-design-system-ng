import {
  getHomeCardChatBubbleActionMeta,
  getHomeCardChatTestId,
  isHomeCardChatGptMessage,
  isHomeCardChatThinking,
} from './home-card-chat';

describe('home-card-chat', () => {
  describe('getHomeCardChatBubbleActionMeta', () => {
    it.each([
      ['repeat', 'repeat', 'chat_bubbles.repeat'],
      ['voice', 'record_voice_over', 'chat_bubbles.voice'],
      ['copy', 'content_copy', 'chat_bubbles.copy'],
      ['like', 'thumb_up', 'chat_bubbles.like'],
      ['dislike', 'thumb_down', 'chat_bubbles.dislike'],
    ] as const)('should map %s to icon %s', (action, icon, translationKey) => {
      expect(getHomeCardChatBubbleActionMeta(action)).toEqual({
        key: action,
        icon,
        translationKey,
      });
    });

    it('should throw for an unsupported action', () => {
      expect(() =>
        getHomeCardChatBubbleActionMeta('unknown' as any),
      ).toThrow('Action name not supported');
    });
  });

  describe('isHomeCardChatGptMessage', () => {
    it('should be true for a non-user message', () => {
      expect(isHomeCardChatGptMessage(false)).toBe(true);
    });

    it('should be false for a user message', () => {
      expect(isHomeCardChatGptMessage(true)).toBe(false);
    });
  });

  describe('isHomeCardChatThinking', () => {
    it('should be true for the last bot message while loading', () => {
      expect(isHomeCardChatThinking(false, true, true)).toBe(true);
    });

    it('should be false when not loading', () => {
      expect(isHomeCardChatThinking(false, true, false)).toBe(false);
    });

    it('should be false for a user message', () => {
      expect(isHomeCardChatThinking(true, true, true)).toBe(false);
    });

    it('should be false when it is not the last message', () => {
      expect(isHomeCardChatThinking(false, false, true)).toBe(false);
    });
  });

  describe('getHomeCardChatTestId', () => {
    it('should use the message id when present', () => {
      expect(getHomeCardChatTestId('chat', 'msg-1', 3)).toBe(
        'chat-bubble-msg-1',
      );
    });

    it('should fall back to the index when there is no message id', () => {
      expect(getHomeCardChatTestId('chat', undefined, 2)).toBe(
        'chat-bubble-2',
      );
    });
  });
});
