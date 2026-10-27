// Angular compatibility bindings. Source contracts remain framework independent.
import type { TemplateRef } from '@angular/core';
import type * as Core from '../contracts/ai-chat-bubble';
export * from '../contracts/ai-chat-bubble';
export interface BmbTemplateMessage
  extends Core.BmbTemplateMessage<TemplateRef<unknown>> {}
export type BmbChatMessage = Core.BmbChatMessage<TemplateRef<unknown>>;
export interface BmbChatActionEvent
  extends Core.BmbChatActionEvent<TemplateRef<unknown>> {}
