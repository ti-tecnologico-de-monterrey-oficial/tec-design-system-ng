import { TemplateRef } from "@angular/core";

export type TBmbMessageType = 'text' | 'mixed' | 'image' | 'link' | 'template';
export type IBmbBubblePosition = 'top' | 'bottom';

export interface IBmbChatMessage {
  userProfile?: string;
  isUserMessage: boolean;
  type: TBmbMessageType;
  content: MessageContent;
  time: Date;
}

export interface MessageContent {
  text?: string;
  imageUrl?: string;
  link?: string;
  template?: TemplateRef<any>
}

export interface IBmbChatGptIcons {
  repeat: boolean;
  voice: boolean;
  copy: boolean;
  like: boolean;
  dislike: boolean;
}
