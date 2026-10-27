import {
  appendItems,
  removeItemBy,
  hasItemBy,
  findItemBy,
} from '../../../_shared/logic/services/collections';
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

export type { IBmbProjectedContentMode } from '../../../_shared/types/contracts/projection';
import type { IBmbProjectionContent as ProjectionContent } from '../../../_shared/types/contracts/projection';
export interface IBmbProjectionContent
  extends ProjectionContent<
    TemplateRef<any> | null | Type<any>,
    HTMLElement | null
  > {}

@Injectable({
  providedIn: 'root',
})
export class BmbProjectionContentService {
  readonly contentList = signal<IBmbProjectionContent[]>([]);
  private portalComponentRef: ComponentRef<BmbPortalComponent> | null = null;
  private generatedIdSequence = 0;

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
  private environmentInjector: EnvironmentInjector =
    inject(EnvironmentInjector);

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

    if (hasItemBy(this.contentList(), 'id', id)) {
      console.warn(
        `Projected content with id "${id}" is already open. Skipping creation.`,
      );
      return id;
    }

    const normalizedContent: IBmbProjectionContent = {
      ...content,
      id,
    };

    this.contentList.update((list) => appendItems(list, [normalizedContent]));
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

    if (
      typeof crypto !== 'undefined' &&
      typeof crypto.getRandomValues === 'function'
    ) {
      const randomValues = crypto.getRandomValues(new Uint32Array(2));
      return `projected-${randomValues[0].toString(36)}-${randomValues[1].toString(36)}`;
    }

    this.generatedIdSequence += 1;
    return `projected-${Date.now()}-${this.generatedIdSequence}`;
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

    const content = findItemBy(this.contentList(), 'id', id);

    if (!content) return;

    this.runContentHook(content, 'beforeCloseContent', 'single');
    this.contentList.update((list) => removeItemBy(list, 'id', id));
    this.runContentHook(content, 'afterCloseContent', 'single');
  }

  getAllProjectedContents(): IBmbProjectionContent[] {
    return this.contentList();
  }

  isContentOpen(id: string) {
    return hasItemBy(this.contentList(), 'id', id);
  }
}
