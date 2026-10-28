// Angular compatibility bindings. Source contracts remain framework independent.
import type { SafeHtml } from '@angular/platform-browser';
import type * as Core from '../contracts/notice-card';
export * from '../contracts/notice-card';
export interface IBmbCardNoticeDescription<THtml = SafeHtml>
  extends Core.IBmbCardNoticeDescription<THtml> {}
