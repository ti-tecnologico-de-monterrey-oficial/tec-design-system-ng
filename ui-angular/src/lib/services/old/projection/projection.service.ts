import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EmbeddedViewRef,
  EnvironmentInjector,
  inject,
  Injectable,
  signal,
  TemplateRef,
  Type,
} from '@angular/core';
import { BmbPortalComponent } from '../../../components/old/bmb-portal/bmb-portal.component';

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
  readonly contentList = signal<IBmbProjectionContent[]>([]);
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
      });
    } catch {
      console.warn(`Error executing ${hook} for modal with id ${content.id}`);
    }
  }

  private appRef: ApplicationRef = inject(ApplicationRef);
  private environmentInjector: EnvironmentInjector = inject(EnvironmentInjector);

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

    this.contentList.update((list) => [...list, normalizedContent]);
    this.runContentHook(normalizedContent, 'afterOpenContent', 'single');

    return id;
  }

  closeContent(id?: string) {
    if (!id) {
      const list = [...this.contentList()];

      list.forEach((content) => {
        this.runContentHook(content, 'beforeCloseContent', 'all');
      });
      this.contentList.set([]);
      list.forEach((content) => {
        this.runContentHook(content, 'afterCloseContent', 'all');
      });

      return;
    }

    const content = this.contentList()?.find((item) => item.id === id);

    if (!content) return;

    this.runContentHook(content, 'beforeCloseContent', 'single');
    this.contentList.update((list) => list.filter((item) => item.id !== id));
    this.runContentHook(content, 'afterCloseContent', 'single');
  }

  getProjectedContent() {
    return this.contentList();
  }

  getAllProjectedContents() {
    return this.contentList();
  }

  isThereContentProjected() {
    return this.contentList().length > 0;
  }

  isContentOpen(id: string) {
    return this.contentList().some((item) => item.id === id);
  }
}
