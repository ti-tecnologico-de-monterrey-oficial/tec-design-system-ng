// Angular compatibility bindings. Source contracts remain framework independent.
import type { TemplateRef, Type } from '@angular/core';
import type * as Core from '../contracts/modal';
export * from '../contracts/modal';
export interface ModalDataConfig<TContent = TemplateRef<any>>
  extends Core.ModalDataConfig<TContent> {}
export interface IBmbNativeModal<
  TContent = TemplateRef<any> | Type<any>,
  TComponent = never,
> extends Core.IBmbNativeModal<TContent, TComponent> {}
