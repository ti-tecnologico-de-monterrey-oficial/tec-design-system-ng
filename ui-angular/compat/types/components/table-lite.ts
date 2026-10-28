// Angular compatibility bindings. Source contracts remain framework independent.
import type { TemplateRef } from '@angular/core';
import type * as Core from '../contracts/table-lite';
export * from '../contracts/table-lite';
export interface ITableLiteColumn<TTemplate = TemplateRef<any>>
  extends Core.ITableLiteColumn<TTemplate> {}
