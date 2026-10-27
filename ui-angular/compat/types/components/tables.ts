// Angular compatibility bindings. Source contracts remain framework independent.
import type { TemplateRef } from '@angular/core';
import type * as Core from '../contracts/tables';
export * from '../contracts/tables';
export interface TableColum extends Core.TableColum<TemplateRef<any>> {}
