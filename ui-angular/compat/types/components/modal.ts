// Angular compatibility bindings. Source contracts remain framework independent.
import type { TemplateRef, Type } from '@angular/core';
import type * as Core from '../contracts/modal';
export * from '../contracts/modal';
export interface ModalDataConfig
  extends Core.ModalDataConfig<TemplateRef<any>> {}
export interface IBmbNativeModal
  extends Core.IBmbNativeModal<TemplateRef<any>, Type<any>> {}
