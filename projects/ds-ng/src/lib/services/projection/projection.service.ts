import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  EnvironmentInjector,
  Injectable,
  inject,
  PLATFORM_ID,
  signal,
  TemplateRef,
  Type,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { BmbPortalComponent } from '../../components/bmb-portal/bmb-portal.component';
import { getUUID } from '../../utils/utils';

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
    id: string;
    reason: 'single' | 'all';
  }) => void;
  afterCloseContent?: (event: {
    id: string;
    reason: 'single' | 'all';
  }) => void;
}

@Injectable({
  providedIn: 'root',
})
export class BmbProjectionContentService {
  private readonly document = inject<Document>(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  readonly contentList = signal<IBmbProjectionContent | null>(null);
  readonly contentStack = signal<IBmbProjectionContent[]>([]);
  private portalComponentRef: ComponentRef<BmbPortalComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector,
  ) {}

  private isBrowserEnvironment(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private getOrCreatePortal(): void {
    if (!this.isBrowserEnvironment()) {
      return;
    }

    if (this.portalComponentRef) {
      return;
    }

    const existingHost = this.document.querySelector('bmb-portal');

    if (existingHost) {
      return;
    }

    this.portalComponentRef = createComponent(BmbPortalComponent, {
      environmentInjector: this.environmentInjector,
    });

    this.appRef.attachView(this.portalComponentRef.hostView);

    const hostDomElem = (
      this.portalComponentRef.hostView as EmbeddedViewRef<any>
    ).rootNodes[0] as HTMLElement;
    this.document.body.appendChild(hostDomElem);
  }

  private destroyPortalIfUnused(): void {
    if (this.contentStack().length > 0 || !this.portalComponentRef) {
      return;
    }

    this.appRef.detachView(this.portalComponentRef.hostView);
    this.portalComponentRef.destroy();
    this.portalComponentRef = null;
  }

  private createContentId(): string {
    return typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : getUUID();
  }

  openContent(content: IBmbProjectionContent): string {
    this.getOrCreatePortal();

    const id = content.id ?? this.createContentId();

    if (this.isContentOpen(id)) {
      throw new Error(`Projected content with id \"${id}\" is already open.`);
    }

    const normalizedContent: IBmbProjectionContent = {
      ...content,
      id,
      mode: content.mode ?? 'outside',
      fixSizeToRef: content.fixSizeToRef ?? false,
      inputContext: content.inputContext ?? {},
      showBackdrop: content.showBackdrop ?? true,
      outputContext: content.outputContext ?? {},
      focusOnOpen: content.focusOnOpen ?? true,
      forceMobileCenter: content.forceMobileCenter ?? false,
    };

    this.contentStack.update((list) => [...list, normalizedContent]);

    this.contentList.set(normalizedContent);

    return id;
  }

  private runCloseHook(
    content: IBmbProjectionContent,
    hook: 'beforeCloseContent' | 'afterCloseContent',
    reason: 'single' | 'all',
  ): void {
    try {
      content[hook]?.({
        id: content.id ?? '',
        reason,
      });
    } catch {
      console.warn(`Error executing ${hook} for projected content with id ${content.id}`);
    }
  }

  closeContent(id?: string): void {
    if (!id) {
      const contentsToClose = this.contentStack();

      contentsToClose.forEach((content) => {
        this.runCloseHook(content, 'beforeCloseContent', 'all');
      });

      this.contentStack.set([]);
      this.contentList.set(null);
      this.destroyPortalIfUnused();

      contentsToClose.forEach((content) => {
        this.runCloseHook(content, 'afterCloseContent', 'all');
      });

      return;
    }

    const contentToClose = this.contentStack().find((item) => item.id === id);

    if (contentToClose) {
      this.runCloseHook(contentToClose, 'beforeCloseContent', 'single');
    }

    this.contentStack.update((list) => list.filter((item) => item.id !== id));

    const remaining = this.contentStack();
    this.contentList.set(
      remaining.length ? remaining[remaining.length - 1] : null,
    );

    this.destroyPortalIfUnused();

    if (contentToClose) {
      this.runCloseHook(contentToClose, 'afterCloseContent', 'single');
    }
  }

  getProjectedContent(): IBmbProjectionContent | null {
    return this.contentList();
  }

  getAllProjectedContents(): IBmbProjectionContent[] {
    return this.contentStack();
  }

  isThereContentProjected(): boolean {
    return this.contentList() !== null;
  }

  isContentOpen(id: string): boolean {
    return this.contentStack().some((item) => item.id === id);
  }
}
