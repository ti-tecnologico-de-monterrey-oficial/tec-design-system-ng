import { canSaveAiChatBubbleEditorDraft } from './ai-chat-bubble-editor';

describe('canSaveAiChatBubbleEditorDraft', () => {
  it('should return false when the draft is unchanged', () => {
    expect(canSaveAiChatBubbleEditorDraft('same', 'same')).toBe(false);
  });

  it('should return false when the draft is whitespace only', () => {
    expect(canSaveAiChatBubbleEditorDraft('   ', 'original')).toBe(false);
  });

  it('should return true when the draft changed and is not empty', () => {
    expect(canSaveAiChatBubbleEditorDraft('changed', 'original')).toBe(true);
  });
});
