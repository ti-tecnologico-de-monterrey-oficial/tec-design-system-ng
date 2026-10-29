import {
  BmbChatAction,
  BmbChatMessage,
} from '../../types/components/ai-chat-bubble';

export const AI_CHAT_BUBBLE_PROMPT_ACTIONS: BmbChatAction[] = [
  'repeat',
  'voice',
  'copy',
  'like',
  'dislike',
];

export const AI_CHAT_BUBBLE_USER_ACTIONS: BmbChatAction[] = ['copy', 'edit'];

export function getAiChatBubbleClasses(
  isUser: boolean,
  isThinking: boolean,
  isEditing: boolean,
): Record<string, boolean> {
  return {
    'bmb_ai-chat-bubble-user': isUser,
    'bmb_ai-chat-bubble-bot': !isUser,
    'bmb_ai-chat-bubble-thinking': isThinking,
    'bmb_ai-chat-bubble-editing': isUser && isEditing,
  };
}

export function resolveAiChatBubbleActions(
  message: BmbChatMessage,
  showActions: boolean,
  actions: BmbChatAction[] | null,
): BmbChatAction[] | null {
  if (message.isUser) {
    if (showActions && message.type === 'text') {
      if (actions === null || !actions?.length) return ['copy'];
      return actions.reduce(
        (acc, action): BmbChatAction[] =>
          AI_CHAT_BUBBLE_USER_ACTIONS.includes(action) ? [...acc, action] : acc,
        [] as BmbChatAction[],
      );
    }
  } else if (showActions) {
    if (actions === null) {
      return AI_CHAT_BUBBLE_PROMPT_ACTIONS;
    }
    return actions.reduce(
      (acc, action): BmbChatAction[] =>
        AI_CHAT_BUBBLE_PROMPT_ACTIONS.includes(action)
          ? [...acc, action]
          : acc,
      [] as BmbChatAction[],
    );
  }

  return null;
}

export function buildAiChatBubblePlainText(
  message: BmbChatMessage,
): string | null {
  switch (message.type) {
    case 'text':
    case 'mixed':
      return message.content.text.trim();
    case 'image':
      return (message.content.alt ?? '').trim();
    case 'link':
      return [message.content.text, message.content.href]
        .filter(Boolean)
        .join('\n\n')
        .trim();
    case 'options': {
      const options = message.content.options
        .map((option) =>
          [`- ${option.label}`, option.href].filter(Boolean).join('\n'),
        )
        .join('\n');
      return [message.content.text, options].filter(Boolean).join('\n\n').trim();
    }
    case 'template':
      return null;
  }
}
