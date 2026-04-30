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
  id: string;
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

export interface IBmbChatGptIconState {
  visible: boolean;
  active?: boolean;
}

export interface IBmbChatActionEvent {
  action: 'repeat' | 'voice' | 'copy' | 'like' | 'dislike';
  messageId: string;
  message: IBmbChatMessage;
  event?: Event;
}

export interface IBmbChatGptIcons {
  repeat: IBmbChatGptIconState;
  voice: IBmbChatGptIconState;
  copy: IBmbChatGptIconState;
  like: IBmbChatGptIconState;
  dislike: IBmbChatGptIconState;
}

export type TChatAction = 'repeat' | 'voice' | 'copy' | 'like' | 'dislike';
