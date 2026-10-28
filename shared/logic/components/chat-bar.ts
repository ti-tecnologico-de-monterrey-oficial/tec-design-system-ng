import type { IBotType } from '../../types/components/chat-bar';

export const isChatBarImage = (type: string): boolean =>
  type.startsWith('image/');

export const shouldSendChatBarMessage = (
  key: string,
  shiftKey: boolean,
): boolean => key === 'Enter' && !shiftKey;

export const getChatBarTextareaHeight = (scrollHeight: number): string =>
  `${Math.max(scrollHeight, 57)}px`;

export function getChatBarBotChunks(botList: IBotType[]) {
  const chunks: IBotType[][] = [];
  for (let i = 0; i < (botList?.length ?? 0); i += 6) {
    chunks.push(botList?.slice(i, i + 6) ?? []);
  }
  return chunks;
}
