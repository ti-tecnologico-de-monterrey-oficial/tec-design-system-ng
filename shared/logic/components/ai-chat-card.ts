import { IBmbAIChatCardMode } from '../../types/components/ai-chat-card';

export function getNextAiChatCardMode(
  currentMode: IBmbAIChatCardMode,
  lastNonChatMode: IBmbAIChatCardMode,
): IBmbAIChatCardMode {
  if (currentMode === 'compact' || currentMode === 'invisible') return 'chat';

  if (currentMode === 'chat') {
    return lastNonChatMode === 'invisible' ? 'invisible' : 'compact';
  }

  if (currentMode === 'expanded') return 'chat';

  return 'expanded';
}

export function shouldTrackAsLastNonChatMode(
  mode: IBmbAIChatCardMode,
): boolean {
  return mode === 'invisible' || mode === 'compact';
}
