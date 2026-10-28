// Angular compatibility bindings. Source contracts remain framework independent.
import type { TemplateRef } from '@angular/core';
import type * as Core from '../contracts/ai-chat-bubble';
export * from '../contracts/ai-chat-bubble';
export interface BmbTemplateMessage<TTemplate = TemplateRef<unknown>>
  extends Core.BmbTemplateMessage<TTemplate> {}
export type BmbChatMessage<TTemplate = TemplateRef<unknown>> =
  Core.BmbChatMessage<TTemplate>;
export interface BmbChatActionEvent<TTemplate = TemplateRef<unknown>>
  extends Core.BmbChatActionEvent<TTemplate> {}
