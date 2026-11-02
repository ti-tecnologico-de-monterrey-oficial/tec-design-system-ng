import {
  IBmbAIChatCardMode,
  IBMB_AI_CHAT_CARD_MODE,
} from '../../types/components/ai-chat-card';

export function getNextAIChatCardMode(
  currentMode: IBmbAIChatCardMode,
): IBmbAIChatCardMode {
  if (isChatAIChatCardMode(currentMode))
    return IBMB_AI_CHAT_CARD_MODE.INVISIBLE;

  return IBMB_AI_CHAT_CARD_MODE.EXPANDED;
}

export function isConversationDisabledAIChatCardMode(
  mode: IBmbAIChatCardMode,
): boolean {
  return (
    mode === IBMB_AI_CHAT_CARD_MODE.INVISIBLE ||
    mode === IBMB_AI_CHAT_CARD_MODE.COMPACT
  );
}

export function isConversationEnabledAIChatCardMode(
  mode: IBmbAIChatCardMode,
): boolean {
  return (
    mode === IBMB_AI_CHAT_CARD_MODE.CHAT ||
    mode === IBMB_AI_CHAT_CARD_MODE.EXPANDED
  );
}

export function isExpandedAIChatCardMode(mode: IBmbAIChatCardMode): boolean {
  return mode === IBMB_AI_CHAT_CARD_MODE.EXPANDED;
}

export function isChatAIChatCardMode(mode: IBmbAIChatCardMode): boolean {
  return mode === IBMB_AI_CHAT_CARD_MODE.CHAT;
}

export function isInvisibleAIChatCardMode(mode: IBmbAIChatCardMode): boolean {
  return mode === IBMB_AI_CHAT_CARD_MODE.INVISIBLE;
}

export function isCompactAIChatCardMode(mode: IBmbAIChatCardMode): boolean {
  return mode === IBMB_AI_CHAT_CARD_MODE.COMPACT;
}
