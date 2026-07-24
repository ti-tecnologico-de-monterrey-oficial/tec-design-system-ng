import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  EnvironmentInjector,
  Injectable,
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
  forceMobileCenter?: boolean;
  beforeCloseContent?: (event: {
    contentId: string;
    reason: 'single' | 'all';
  }) => void;
  afterCloseContent?: (event: {
    contentId: string;
    reason: 'single' | 'all';
  }) => void;
  afterOpenContent?: (event: {
    contentId: string;
    reason: 'single' | 'all';
  }) => void;
}

@Injectable({
  providedIn: 'root',
})
export class BmbProjectionContentService {
  readonly contentList = signal<IBmbProjectionContent | null>(null);
  readonly contentStack = signal<IBmbProjectionContent[]>([]);
  private portalComponentRef: ComponentRef<BmbPortalComponent> | null = null;

  runContentHook(
    content: IBmbProjectionContent,
    hook: 'afterOpenContent' | 'beforeCloseContent' | 'afterCloseContent',
    reason: 'all' | 'single',
  ): void {
    if (!content[hook]) return;

    try {
      content?.[hook]({
        contentId: content.id ?? '',
        reason,
      })
    } catch {
      console.warn(
        `Error executing ${hook} for modal with id ${content.id}`,
      )
    }
  }

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
    this.runContentHook(content, 'afterOpenContent', 'single');

    return id;
  }

  closeContent(id?: string) {
    if (!id && this.contentList() !== null) {
      const list = [...this.contentStack()];

      list.forEach(content => {
        this.runContentHook(content, 'beforeCloseContent', 'all');
      });
      this.contentStack.set([]);
      this.contentList.set(null);
      list.forEach(content => {
        this.runContentHook(content, 'afterCloseContent', 'all');
      });

      return;
    }

    const content = this.contentStack()?.find((item) => item.id !== id);

    if (!content) return;

    this.runContentHook(content, 'beforeCloseContent', 'single');
    this.contentStack.update((list) => list.filter((item) => item.id !== id));

    const remaining = this.contentStack();
    this.contentList.set(
      remaining.length ? remaining[remaining.length - 1] : null,
    );
    this.runContentHook(content, 'afterCloseContent', 'single');
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

  isContentOpen(id: string) {
    return this.contentStack().some((item) => item.id === id);
  }
}
