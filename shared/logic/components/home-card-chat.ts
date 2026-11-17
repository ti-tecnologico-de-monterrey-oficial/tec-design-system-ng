type TChatAction = 'repeat' | 'voice' | 'copy' | 'like' | 'dislike';

export interface IHomeCardChatBubbleActionMeta {
  key: TChatAction;
  icon: string;
  translationKey: string;
}

export function getHomeCardChatBubbleActionMeta(
  action: TChatAction,
): IHomeCardChatBubbleActionMeta {
  switch (action) {
    case 'repeat':
      return { key: 'repeat', icon: 'repeat', translationKey: 'chat_bubbles.repeat' };
    case 'voice':
      return {
        key: 'voice',
        icon: 'record_voice_over',
        translationKey: 'chat_bubbles.voice',
      };
    case 'copy':
      return { key: 'copy', icon: 'content_copy', translationKey: 'chat_bubbles.copy' };
    case 'like':
      return { key: 'like', icon: 'thumb_up', translationKey: 'chat_bubbles.like' };
    case 'dislike':
      return {
        key: 'dislike',
        icon: 'thumb_down',
        translationKey: 'chat_bubbles.dislike',
      };
    default:
      throw new Error('Action name not supported');
  }
}

export function isHomeCardChatGptMessage(isUserMessage: boolean): boolean {
  return !isUserMessage;
}

export function isHomeCardChatThinking(
  isUserMessage: boolean,
  isLast: boolean,
  isLoading: boolean,
): boolean {
  return !isUserMessage && isLoading && isLast;
}

export function getHomeCardChatTestId(
  testId: string,
  messageId: string | number | undefined,
  index: number,
): string {
  return `${testId}-bubble-${messageId ?? index}`;
}
