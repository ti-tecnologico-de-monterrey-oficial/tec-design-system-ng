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
import { BmbPortalComponent } from '../../../components/bmb-portal/bmb-portal.component';

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
      content[hook]({
        contentId: content.id ?? '',
        reason,
      });
    } catch {
      console.warn(`Error executing ${hook} for modal with id ${content.id}`);
    }
  }

  private appRef: ApplicationRef = inject(ApplicationRef);
  private environmentInjector: EnvironmentInjector = inject(EnvironmentInjector);

  private getOrCreatePortal(): void {
    if (this.portalComponentRef || document.querySelector('bmb-portal')) {
      return;
    }

    this.portalComponentRef = createComponent(BmbPortalComponent, {
      environmentInjector: this.environmentInjector,
    });
    this.appRef.attachView(this.portalComponentRef.hostView);

    const hostDomElem = (
      this.portalComponentRef.hostView as EmbeddedViewRef<any>
    ).rootNodes[0] as HTMLElement;
    document.body.appendChild(hostDomElem);
  }

  openContent(content: IBmbProjectionContent) {
    this.getOrCreatePortal();

    const id = content.id ?? this.generateId();

    if (this.contentList().some((item) => item.id === id)) {
      console.warn(
        `Projected content with id "${id}" is already open. Skipping creation.`,
      );
      return id;
    }

    const normalizedContent: IBmbProjectionContent = {
      ...content,
      id,
    };

    this.contentList.update((list) => [...list, normalizedContent]);
    this.runContentHook(normalizedContent, 'afterOpenContent', 'single');

    return id;
  }

  private generateId(): string {
    if (
      typeof crypto !== 'undefined' &&
      typeof crypto.randomUUID === 'function'
    ) {
      return crypto.randomUUID();
    }

    return `projected-${Date.now()}-${Math.random().toString(36).slice(2)}`;
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

  getAllProjectedContents(): IBmbProjectionContent[] {
    return this.contentList();
  }

  isContentOpen(id: string) {
    return this.contentList().some((item) => item.id === id);
  }
}
