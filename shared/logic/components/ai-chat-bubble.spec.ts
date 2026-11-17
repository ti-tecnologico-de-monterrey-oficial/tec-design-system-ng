import {
  buildAiChatBubblePlainText,
  getAiChatBubbleClasses,
  resolveAiChatBubbleActions,
} from './ai-chat-bubble';
import { BmbChatMessage } from '../../types/components/ai-chat-bubble';

const baseMessage = {
  id: '1',
  timestamp: new Date(),
};

describe('getAiChatBubbleClasses', () => {
  it('should mark bot classes when the message is not from the user', () => {
    expect(getAiChatBubbleClasses(false, false, false)).toEqual({
      'bmb_ai-chat-bubble-user': false,
      'bmb_ai-chat-bubble-bot': true,
      'bmb_ai-chat-bubble-thinking': false,
      'bmb_ai-chat-bubble-editing': false,
    });
  });

  it('should mark user and editing classes when the user is editing', () => {
    expect(getAiChatBubbleClasses(true, false, true)).toEqual({
      'bmb_ai-chat-bubble-user': true,
      'bmb_ai-chat-bubble-bot': false,
      'bmb_ai-chat-bubble-thinking': false,
      'bmb_ai-chat-bubble-editing': true,
    });
  });

  it('should not mark editing for bot messages even if isEditing is true', () => {
    expect(getAiChatBubbleClasses(false, false, true)).toEqual(
      expect.objectContaining({ 'bmb_ai-chat-bubble-editing': false }),
    );
  });

  it('should mark thinking state', () => {
    expect(getAiChatBubbleClasses(false, true, false)).toEqual(
      expect.objectContaining({ 'bmb_ai-chat-bubble-thinking': true }),
    );
  });
});

describe('resolveAiChatBubbleActions', () => {
  const textMessage: BmbChatMessage = {
    ...baseMessage,
    type: 'text',
    isUser: true,
    content: { text: 'hi' },
  };

  it('should return copy by default for a user text message', () => {
    expect(resolveAiChatBubbleActions(textMessage, true, null)).toEqual([
      'copy',
    ]);
  });

  it('should return copy when an empty actions list is given for a user text message', () => {
    expect(resolveAiChatBubbleActions(textMessage, true, [])).toEqual([
      'copy',
    ]);
  });

  it('should filter the given actions against the allowed user actions', () => {
    expect(
      resolveAiChatBubbleActions(textMessage, true, ['copy', 'edit', 'like']),
    ).toEqual(['copy', 'edit']);
  });

  it('should return null for a non-text user message', () => {
    const imageMessage: BmbChatMessage = {
      ...baseMessage,
      type: 'image',
      isUser: true,
      content: { imageUrl: 'x' },
    };
    expect(resolveAiChatBubbleActions(imageMessage, true, null)).toBeNull();
  });

  it('should return null for a user message when showActions is false', () => {
    expect(resolveAiChatBubbleActions(textMessage, false, null)).toBeNull();
  });

  const botMessage: BmbChatMessage = {
    ...baseMessage,
    type: 'text',
    isUser: false,
    content: { text: 'hi' },
  };

  it('should return the default prompt actions for a bot message', () => {
    expect(resolveAiChatBubbleActions(botMessage, true, null)).toEqual([
      'repeat',
      'voice',
      'copy',
      'like',
      'dislike',
    ]);
  });

  it('should filter the given actions against the allowed prompt actions', () => {
    expect(
      resolveAiChatBubbleActions(botMessage, true, ['copy', 'edit']),
    ).toEqual(['copy']);
  });

  it('should return null for a bot message when showActions is false', () => {
    expect(resolveAiChatBubbleActions(botMessage, false, null)).toBeNull();
  });
});

describe('buildAiChatBubblePlainText', () => {
  it('should trim text message content', () => {
    const message: BmbChatMessage = {
      ...baseMessage,
      type: 'text',
      isUser: false,
      content: { text: '  hello  ' },
    };
    expect(buildAiChatBubblePlainText(message)).toBe('hello');
  });

  it('should trim mixed message content', () => {
    const message: BmbChatMessage = {
      ...baseMessage,
      type: 'mixed',
      isUser: false,
      content: { text: '  mixed  ', imageUrl: 'x' },
    };
    expect(buildAiChatBubblePlainText(message)).toBe('mixed');
  });

  it('should fall back to an empty string when an image has no alt', () => {
    const message: BmbChatMessage = {
      ...baseMessage,
      type: 'image',
      isUser: false,
      content: { imageUrl: 'x' },
    };
    expect(buildAiChatBubblePlainText(message)).toBe('');
  });

  it('should use the image alt text when present', () => {
    const message: BmbChatMessage = {
      ...baseMessage,
      type: 'image',
      isUser: false,
      content: { imageUrl: 'x', alt: '  alt text  ' },
    };
    expect(buildAiChatBubblePlainText(message)).toBe('alt text');
  });

  it('should join link text and href', () => {
    const message: BmbChatMessage = {
      ...baseMessage,
      type: 'link',
      isUser: false,
      content: { text: 'Google', href: 'https://google.com' },
    };
    expect(buildAiChatBubblePlainText(message)).toBe(
      'Google\n\nhttps://google.com',
    );
  });

  it('should join options text and option labels/hrefs', () => {
    const message: BmbChatMessage = {
      ...baseMessage,
      type: 'options',
      isUser: false,
      content: {
        text: 'Pick one',
        options: [
          { id: '1', label: 'Option 1', href: '/one' },
          { id: '2', label: 'Option 2' },
        ],
      },
    };
    expect(buildAiChatBubblePlainText(message)).toBe(
      'Pick one\n\n- Option 1\n/one\n- Option 2',
    );
  });

  it('should return null for template messages', () => {
    const message: BmbChatMessage = {
      ...baseMessage,
      type: 'template',
      isUser: false,
      content: { template: {} as any },
    };
    expect(buildAiChatBubblePlainText(message)).toBeNull();
  });
});
