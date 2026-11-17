export function canSaveAiChatBubbleEditorDraft(
  draft: string,
  initialValue: string,
): boolean {
  return draft.trim().length > 0 && draft !== initialValue;
}
