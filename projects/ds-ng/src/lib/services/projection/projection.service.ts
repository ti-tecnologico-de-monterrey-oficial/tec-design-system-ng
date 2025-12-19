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
import { BmbPortalComponent } from '../../components/bmb-portal/bmb-portal.component';

export type IBmbProjectedContentMode = 'over' | 'partial' | 'outside';

export interface IBmbProjectionContent {
  id?: string;
  content: TemplateRef<any> | null | Type<any>;
  targetRef?: HTMLElement | null;
  mode?: IBmbProjectedContentMode;
  fixSizeToRef?: boolean;
  inputContext?: { [key: string]: any };
  showBackdrop?: boolean;
  outputContext?: { [key: string]: (value: any) => void };
  focusOnOpen?: boolean;
  dialogClass?: string | string[] | Record<string, boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class BmbProjectionContentService {
  readonly contentList = signal<IBmbProjectionContent | null>(null);
  readonly contentStack = signal<IBmbProjectionContent[]>([]);
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

    const id = content.id ?? crypto.randomUUID();

    const normalizedContent: IBmbProjectionContent = {
      ...content,
      id,
    };

    this.contentStack.update((list) => [...list, normalizedContent]);

    this.contentList.set(normalizedContent);

    return id;
  }

  closeContent(id?: string) {
    if (!id) {
      this.contentStack.set([]);
      this.contentList.set(null);
      return;
    }

    this.contentStack.update((list) => list.filter((item) => item.id !== id));

    const remaining = this.contentStack();
    this.contentList.set(
      remaining.length ? remaining[remaining.length - 1] : null,
    );
  }

  getProjectedContent() {
    return this.contentList();
  }

  getAllProjectedContents() {
    return this.contentStack();
  }

  isThereContentProjected() {
    return this.contentList() !== null;
  }

  isDialogOpen(id: string) {
    return this.contentStack().some((item) => item.id === id);
  }
}
