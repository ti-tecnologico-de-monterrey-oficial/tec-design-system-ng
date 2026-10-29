import {
  BmbChatAction,
  BmbChatActionConfig,
  BmbChatCopyState,
} from '../../types/components/ai-chat-bubble';

export const AI_CHAT_ACTIONS_DEFAULT_CONFIG: BmbChatActionConfig[] = [
  {
    action: 'repeat',
    icon: 'repeat',
    label: 'chat_bubbles.repeat',
  },
  {
    action: 'voice',
    icon: 'record_voice_over',
    label: 'chat_bubbles.voice',
  },
  {
    action: 'copy',
    icon: 'content_copy',
    label: 'chat_bubbles.copy',
  },
  {
    action: 'edit',
    icon: 'edit',
    label: 'chat_bubbles.edit',
  },
  {
    action: 'like',
    icon: 'thumb_up',
    label: 'chat_bubbles.like',
    active: false,
  },
  {
    action: 'dislike',
    icon: 'thumb_down',
    label: 'chat_bubbles.dislike',
    active: false,
  },
];

export function updateChatActionsLikeState(
  actions: BmbChatActionConfig[],
  like: boolean,
  dislike: boolean,
): BmbChatActionConfig[] {
  return actions.map((action) => {
    if (action.action === 'like') {
      return { ...action, active: like };
    }
    if (action.action === 'dislike') {
      return { ...action, active: dislike };
    }
    return action;
  });
}

export function filterVisibleChatActions(
  actions: BmbChatActionConfig[],
  selectedActions: BmbChatAction[] | null,
): BmbChatActionConfig[] {
  return actions.filter(
    (action) =>
      selectedActions !== null && selectedActions.includes(action.action),
  );
}

export function toggleChatActionState(
  actions: BmbChatActionConfig[],
  triggeredAction: BmbChatAction,
): BmbChatActionConfig[] {
  return actions.map((item) => {
    if (item.action === 'like' || item.action === 'dislike') {
      if (item.action === triggeredAction) {
        return { ...item, active: !item.active };
      }
      return { ...item, active: false };
    }
    return item;
  });
}

export function getChatActionIcon(
  action: BmbChatActionConfig,
  copyState: BmbChatCopyState,
): string {
  if (action.action !== 'copy') return action.icon;
  if (copyState === 'success') return 'check';
  if (copyState === 'error') return 'close';
  return action.icon;
}
