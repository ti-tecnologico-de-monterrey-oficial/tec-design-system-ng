export const BMB_AI_CHAT_CARD_MODE_LIST: string[] = [
  'compact',
  'chat',
  'expanded',
  'invisible',
] as const;

export type IBmbAIChatCardMode = (typeof BMB_AI_CHAT_CARD_MODE_LIST)[number];
