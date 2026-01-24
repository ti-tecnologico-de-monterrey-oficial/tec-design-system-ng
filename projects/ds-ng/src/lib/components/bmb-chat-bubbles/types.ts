import { TemplateRef } from '@angular/core';
import { IBmbTargetLink } from '../../types';

export type TBmbMessageType =
  | 'text'
  | 'mixed'
  | 'image'
  | 'link'
  | 'options'
  | 'template';
export type IBmbBubblePosition = 'top' | 'bottom';

export interface IBmbChatMessage {
  userProfile?: string;
  isUserMessage: boolean;
  type: TBmbMessageType;
  content: MessageContent;
  time: Date;
}

export interface IMessageContentOptions {
  title: string;
  target?: IBmbTargetLink;
  link?: string;
  onButton?: () => void;
}

export interface MessageContent {
  text?: string;
  imageUrl?: string;
  link?: string;
  options?: IMessageContentOptions[];
  template?: TemplateRef<any>;
}

export interface IBmbChatGptIcons {
  repeat: boolean;
  voice: boolean;
  copy: boolean;
  like: boolean;
  dislike: boolean;
}
