export interface IActions {
  name: string;
  icon: string;
  action: () => void;
}

export type IBmbTextEditorPromptType = 'link' | 'image' | 'color';
