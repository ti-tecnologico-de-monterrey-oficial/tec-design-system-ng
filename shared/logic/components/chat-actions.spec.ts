import {
  AI_CHAT_ACTIONS_DEFAULT_CONFIG,
  filterVisibleChatActions,
  getChatActionIcon,
  toggleChatActionState,
  updateChatActionsLikeState,
} from './chat-actions';
import { BmbChatActionConfig } from '../../types/components/ai-chat-bubble';

describe('updateChatActionsLikeState', () => {
  it('should set the active state for like and dislike actions', () => {
    const result = updateChatActionsLikeState(
      AI_CHAT_ACTIONS_DEFAULT_CONFIG,
      true,
      false,
    );
    expect(result.find((a) => a.action === 'like')?.active).toBe(true);
    expect(result.find((a) => a.action === 'dislike')?.active).toBe(false);
  });

  it('should leave other actions untouched', () => {
    const result = updateChatActionsLikeState(
      AI_CHAT_ACTIONS_DEFAULT_CONFIG,
      true,
      false,
    );
    expect(result.find((a) => a.action === 'copy')).toEqual(
      AI_CHAT_ACTIONS_DEFAULT_CONFIG.find((a) => a.action === 'copy'),
    );
  });
});

describe('filterVisibleChatActions', () => {
  it('should return an empty array when selectedActions is null', () => {
    expect(
      filterVisibleChatActions(AI_CHAT_ACTIONS_DEFAULT_CONFIG, null),
    ).toEqual([]);
  });

  it('should only include actions present in selectedActions', () => {
    const result = filterVisibleChatActions(AI_CHAT_ACTIONS_DEFAULT_CONFIG, [
      'copy',
      'like',
    ]);
    expect(result.map((a) => a.action)).toEqual(['copy', 'like']);
  });
});

describe('toggleChatActionState', () => {
  it('should activate the triggered like/dislike action and deactivate the other', () => {
    const result = toggleChatActionState(AI_CHAT_ACTIONS_DEFAULT_CONFIG, 'like');
    expect(result.find((a) => a.action === 'like')?.active).toBe(true);
    expect(result.find((a) => a.action === 'dislike')?.active).toBe(false);
  });

  it('should toggle off an already active action', () => {
    const activated = toggleChatActionState(
      AI_CHAT_ACTIONS_DEFAULT_CONFIG,
      'like',
    );
    const toggledOff = toggleChatActionState(activated, 'like');
    expect(toggledOff.find((a) => a.action === 'like')?.active).toBe(false);
  });

  it('should leave non like/dislike actions untouched', () => {
    const result = toggleChatActionState(AI_CHAT_ACTIONS_DEFAULT_CONFIG, 'like');
    expect(result.find((a) => a.action === 'copy')).toEqual(
      AI_CHAT_ACTIONS_DEFAULT_CONFIG.find((a) => a.action === 'copy'),
    );
  });
});

describe('getChatActionIcon', () => {
  const copyAction: BmbChatActionConfig = {
    action: 'copy',
    icon: 'content_copy',
    label: 'copy',
  };

  it('should return the default icon for non-copy actions regardless of copyState', () => {
    const repeatAction: BmbChatActionConfig = {
      action: 'repeat',
      icon: 'repeat',
      label: 'repeat',
    };
    expect(getChatActionIcon(repeatAction, 'success')).toBe('repeat');
  });

  it('should return check for a successful copy', () => {
    expect(getChatActionIcon(copyAction, 'success')).toBe('check');
  });

  it('should return close for a failed copy', () => {
    expect(getChatActionIcon(copyAction, 'error')).toBe('close');
  });

  it('should return the default icon when idle or pending', () => {
    expect(getChatActionIcon(copyAction, 'idle')).toBe('content_copy');
    expect(getChatActionIcon(copyAction, 'pending')).toBe('content_copy');
  });
});
