export interface IBotType {
  name: string;
  icon: string;
}

export interface IChatBarActions {
  name: string;
  icon: string;
  action: () => void;
}

export interface IChatBarEvent {
  message?: string;
  files?: File[];
  recording?: Blob | undefined;
  recordingUrl?: string;
  hasEmojiReaction?: boolean;
}
