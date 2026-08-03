import {
  ComponentRef,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';

import { IBmbProjectedContentMode } from '../../../../services/projection/projection.service';

export interface ProjectedContentPositionParams {
  htmlRef: HTMLElement | null;
  mode: IBmbProjectedContentMode;
  fixSizeToRef: boolean;
}

export interface RenderProjectedContentParams {
  container: ViewContainerRef;
  componentRef: ComponentRef<any> | null;
  content: TemplateRef<any> | Type<any> | null;
  inputContext: { [key: string]: any };
  outputContext: { [key: string]: (value: any) => void };
}

export interface DialogClassParams {
  fixSizeToRef: boolean;
  dialogClass: string | string[] | Record<string, boolean>;
  forceMobileCenter: boolean;
}