import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  EnvironmentInjector,
  Injectable,
  output,
  signal,
  TemplateRef,
  Type,
} from '@angular/core';
import { BmbPortalComponent } from '../components/bmb-portal/bmb-portal.component';

export type IBmbProjectedContentMode = 'over' | 'partial' | 'outside';

export interface IBmbProjectionContent {
  content: TemplateRef<any> | null | Type<any>;
  targetRef?: HTMLElement | null;
  mode?: IBmbProjectedContentMode;
  fixSizeToRef?: boolean;
  inputContext?: { [key: string]: any };
  showBackdrop?: boolean;
  outputContext?: { [key: string]: (value: any) => void };
  focusOnOpen?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BmbProjectionContentService {
  readonly contentList = signal<IBmbProjectionContent | null>(null);
  private portalComponentRef: ComponentRef<BmbPortalComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector,
  ) {}

  private getOrCreatePortal() {
    if (this.portalComponentRef) {
      return this.portalComponentRef.instance;
    }

    const existingHost = document.querySelector('bmb-portal');

    if (existingHost) {
      return null;
    }

    this.portalComponentRef = createComponent(BmbPortalComponent, {
      environmentInjector: this.environmentInjector,
    });

    this.appRef.attachView(this.portalComponentRef.hostView);

    const hostDomElem = (
      this.portalComponentRef.hostView as EmbeddedViewRef<any>
    ).rootNodes[0] as HTMLElement;
    document.body.appendChild(hostDomElem);

    return this.portalComponentRef.instance;
  }

  openContent(content: IBmbProjectionContent) {
    this.getOrCreatePortal();
    this.contentList.set(content);
  }

  closeContent() {
    this.contentList.set(null);
  }

  getProjectedContent() {
    return this.contentList();
  }

  isThereContentProjected() {
    return this.contentList() !== null;
  }
}
