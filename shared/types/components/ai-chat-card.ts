export const IBMB_AI_CHAT_CARD_MODE = {
  COMPACT: 'compact',
  CHAT: 'chat',
  EXPANDED: 'expanded',
  INVISIBLE: 'invisible',
};

export const BMB_AI_CHAT_CARD_MODE_LIST: string[] = [
  ...Object.values(IBMB_AI_CHAT_CARD_MODE),
] as const;

export type IBmbAIChatCardMode = (typeof BMB_AI_CHAT_CARD_MODE_LIST)[number];
