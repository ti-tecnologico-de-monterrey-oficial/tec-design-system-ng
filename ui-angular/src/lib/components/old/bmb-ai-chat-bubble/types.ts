import { TemplateRef } from '@angular/core';

export type BmbChatMessageType =
  | 'text'
  | 'image'
  | 'mixed'
  | 'link'
  | 'options'
  | 'template';

export type BmbChatStatus = 'sending' | 'sent' | 'error';

export interface BmbChatBaseMessage {
  id: string;
  type: BmbChatMessageType;
  timestamp: Date;
  isUser: boolean;
  userProfile?: string;
  status?: BmbChatStatus;
  like?: boolean;
  dislike?: boolean;
}

export interface BmbTextMessage extends BmbChatBaseMessage {
  type: 'text';
  content: {
    text: string;
  };
}

export interface BmbImageMessage extends BmbChatBaseMessage {
  type: 'image';
  content: {
    imageUrl: string;
    alt?: string;
  };
}

export interface BmbMixedMessage extends BmbChatBaseMessage {
  type: 'mixed';
  content: {
    text: string;
    imageUrl: string;
  };
}

export interface BmbLinkMessage extends BmbChatBaseMessage {
  type: 'link';
  content: {
    text: string;
    href: string;
    target?: '_blank' | '_self';
  };
}

export interface BmbChatOption {
  id: string;
  label: string;
  href?: string;
  target?: '_blank' | '_self';
  action?: () => void;
}

export interface BmbOptionsMessage extends BmbChatBaseMessage {
  type: 'options';
  content: {
    text?: string;
    options: BmbChatOption[];
  };
}

export interface BmbTemplateMessage extends BmbChatBaseMessage {
  type: 'template';
  content: {
    template: TemplateRef<unknown>;
  };
}

export type BmbChatMessage =
  | BmbTextMessage
  | BmbImageMessage
  | BmbMixedMessage
  | BmbLinkMessage
  | BmbOptionsMessage
  | BmbTemplateMessage;

export type BmbChatAction = 'repeat' | 'voice' | 'copy' | 'like' | 'dislike';

export interface BmbChatActionEvent {
  /**
   * Triggered action.
   */
  action: BmbChatAction;

  /**
   * Current message id.
   */
  messageId: string;

  /**
   * Current message reference.
   */
  message: BmbChatMessage;

  /**
   * Native DOM event.
   */
  nativeEvent?: Event;
}

export interface BmbChatActionConfig {
  /**
   * Action identifier.
   */
  action: BmbChatAction;

  /**
   * Icon token.
   */
  icon: string;

  /**
   * Accessible label.
   */
  label: string;

  /**
   * Active visual state.
   *
   * Used for like/dislike.
   */
  active?: boolean;

  /**
   * Visibility state.
   */
  visible?: boolean;
}
