import { TemplateRef } from '@angular/core';

export type BmbChatMessageType =
  | 'text'
  | 'image'
  | 'mixed'
  | 'link'
  | 'options'
  | 'upload-file'
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

export interface IBmbChatOptionEvent {
  option: BmbChatOption;
  event: Event;
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

export interface BmbUploadFileMessage extends BmbChatBaseMessage {
  type: 'upload-file';
  content: {
    fileName: string;
    text?: string;
    buttonLabel?: string;
    acceptedFormats?: string[];
    /** Display-only limit in MB; file validation is handled by the consuming app. */
    maxFileSize?: number;
    additionalRequirements?: string[];
    cancelKeyword?: string;
  };
}

export interface BmbUploadFileRequestEvent {
  messageId: string;
  message: BmbUploadFileMessage;
  nativeEvent: Event;
}

export type BmbChatMessage =
  | BmbTextMessage
  | BmbImageMessage
  | BmbMixedMessage
  | BmbLinkMessage
  | BmbOptionsMessage
  | BmbUploadFileMessage
  | BmbTemplateMessage;

export type BmbChatAction =
  | 'repeat'
  | 'voice'
  | 'copy'
  | 'like'
  | 'dislike'
  | 'edit';

export type BmbChatCopyState = 'idle' | 'pending' | 'success' | 'error';

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

export interface BmbChatMessageEditedEvent {
  /** Message before editing. */
  previousMessage: BmbTextMessage;

  /** Message containing the edited text. */
  editedMessage: BmbTextMessage;
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
