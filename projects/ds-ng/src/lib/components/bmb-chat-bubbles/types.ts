export type TBmbMessageType = 'text' | 'mixed' | 'image' | 'personalized';
export type IBmbBubblePosition = 'top' | 'bottom';

export interface IBmbChatMessage {
  userProfile?: string;
  isUserMessage: boolean;
  type: TBmbMessageType;
  content: MessageContent;
  time: Date;
  loading?: boolean;
}

export interface MessageContent {
  text?: string;
  imageUrl?: string;
}
