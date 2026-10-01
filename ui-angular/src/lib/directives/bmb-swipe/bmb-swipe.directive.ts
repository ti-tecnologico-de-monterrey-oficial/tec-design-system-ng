import {
  AfterContentInit,
  ContentChild,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
  output,
} from '@angular/core';

export type IBmbSwipeSide = 'left' | 'right';

const DEFAULT_SNAP_THRESHOLD = 0.4;
const DRAG_AXIS_LOCK_DISTANCE = 6;

@Directive({
  selector: 'ng-template[bmbSwipeLeftActions]',
  standalone: true,
})
export class BmbSwipeLeftActionsDirective {
  templateRef: TemplateRef<unknown> = inject(TemplateRef<unknown>);
}

@Directive({
  selector: 'ng-template[bmbSwipeRightActions]',
  standalone: true,
})
export class BmbSwipeRightActionsDirective {
  templateRef: TemplateRef<unknown> = inject(TemplateRef<unknown>);
}

@Directive({
  selector: '[bmbSwipe]',
  standalone: true,
})
export class BmbSwipeDirective implements AfterContentInit, OnDestroy {
  swipeThreshold = input<number>(DEFAULT_SNAP_THRESHOLD);
  swipeCloseOnAction = input<boolean>(true);
  swipeDisabled = input<boolean>(false);

  getSwipeOpenChange = output<IBmbSwipeSide | null>();

  @ContentChild(BmbSwipeLeftActionsDirective, { read: TemplateRef })
  private leftTemplate: TemplateRef<unknown> | undefined;

  @ContentChild(BmbSwipeRightActionsDirective, { read: TemplateRef })
  private rightTemplate: TemplateRef<unknown> | undefined;

  private readonly el: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly viewContainerRef: ViewContainerRef =
    inject(ViewContainerRef);

  private contentWrapper: HTMLElement | undefined;
  private leftContainer: HTMLElement | undefined;
  private rightContainer: HTMLElement | undefined;
  private leftView: EmbeddedViewRef<unknown> | undefined;
  private rightView: EmbeddedViewRef<unknown> | undefined;

  private readonly cleanupFns: (() => void)[] = [];
  private stopDragListeners: (() => void) | undefined;

  private dragging = false;
  private axisLocked: 'x' | 'y' | undefined;
  private startX = 0;
  private startY = 0;
  private dragStartOffset = 0;
  private currentX = 0;
  private openSide: IBmbSwipeSide | null = null;

  ngAfterContentInit(): void {
    this.buildStructure();
    this.attachHostListeners();
  }

  ngOnDestroy(): void {
    this.stopDragListeners?.();
    this.cleanupFns.forEach((cleanup) => cleanup());
    this.leftView?.destroy();
    this.rightView?.destroy();
  }

  close(): void {
    this.snapTo(0);
  }

  private buildStructure(): void {
    const host = this.el.nativeElement;
    this.renderer.addClass(host, 'bmb_swipe');
    this.renderer.setStyle(host, 'position', 'relative');
    this.renderer.setStyle(host, 'overflow', 'hidden');

    const wrapper = this.renderer.createElement('div') as HTMLElement;
    this.renderer.addClass(wrapper, 'bmb_swipe-content');

    Array.from(host.childNodes).forEach((child) => {
      this.renderer.appendChild(wrapper, child);
    });
    this.renderer.appendChild(host, wrapper);
    this.contentWrapper = wrapper;

    if (this.leftTemplate) {
      this.leftContainer = this.createActionsContainer(
        'left',
        this.leftTemplate,
      );
    }

    if (this.rightTemplate) {
      this.rightContainer = this.createActionsContainer(
        'right',
        this.rightTemplate,
      );
    }
  }

  private createActionsContainer(
    side: IBmbSwipeSide,
    template: TemplateRef<unknown>,
  ): HTMLElement {
    const host = this.el.nativeElement;
    const container = this.renderer.createElement('div') as HTMLElement;
    this.renderer.addClass(container, 'bmb_swipe-actions');
    this.renderer.addClass(container, `bmb_swipe-actions-${side}`);

    const view = this.viewContainerRef.createEmbeddedView(template);
    view.detectChanges();
    view.rootNodes.forEach((node) =>
      this.renderer.appendChild(container, node),
    );

    if (side === 'left') {
      this.leftView = view;
    } else {
      this.rightView = view;
    }

    this.renderer.insertBefore(host, container, this.contentWrapper ?? null);

    if (this.swipeCloseOnAction()) {
      this.cleanupFns.push(
        this.renderer.listen(container, 'click', () => this.close()),
      );
    }

    return container;
  }

  private attachHostListeners(): void {
    const host = this.el.nativeElement;
    this.cleanupFns.push(
      this.renderer.listen(host, 'pointerdown', (event: PointerEvent) =>
        this.onPointerDown(event),
      ),
    );
  }

  private onPointerDown(event: PointerEvent): void {
    if (this.swipeDisabled()) return;
    if (!this.leftContainer && !this.rightContainer) return;
    if (
      event.target instanceof Node &&
      (this.leftContainer?.contains(event.target) ||
        this.rightContainer?.contains(event.target))
    ) {
      return;
    }

    this.dragging = true;
    this.axisLocked = undefined;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.dragStartOffset = this.currentX;
    this.setTransition(false);

    const moveCleanup = this.renderer.listen(
      'document',
      'pointermove',
      (moveEvent: PointerEvent) => this.onPointerMove(moveEvent),
    );
    const upCleanup = this.renderer.listen('document', 'pointerup', () =>
      this.onPointerEnd(),
    );
    const cancelCleanup = this.renderer.listen(
      'document',
      'pointercancel',
      () => this.onPointerEnd(),
    );

    this.stopDragListeners = () => {
      moveCleanup();
      upCleanup();
      cancelCleanup();
    };
  }

  private onPointerMove(event: PointerEvent): void {
    if (!this.dragging) return;

    const deltaX = event.clientX - this.startX;
    const deltaY = event.clientY - this.startY;

    if (!this.axisLocked) {
      if (
        Math.abs(deltaX) < DRAG_AXIS_LOCK_DISTANCE &&
        Math.abs(deltaY) < DRAG_AXIS_LOCK_DISTANCE
      ) {
        return;
      }
      this.axisLocked = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y';

      if (this.axisLocked === 'y') {
        this.endDrag();
        return;
      }
    }

    if (this.axisLocked !== 'x') return;

    event.preventDefault();

    const maxLeft = this.getContainerWidth(this.leftContainer);
    const maxRight = this.getContainerWidth(this.rightContainer);
    const proposed = this.dragStartOffset + deltaX;
    const clamped = Math.min(maxLeft, Math.max(-maxRight, proposed));

    this.setPosition(clamped);
  }

  private onPointerEnd(): void {
    if (!this.dragging) {
      this.endDrag();
      return;
    }

    const maxLeft = this.getContainerWidth(this.leftContainer);
    const maxRight = this.getContainerWidth(this.rightContainer);
    const threshold = this.swipeThreshold();

    let target = 0;
    if (
      this.currentX > 0 &&
      maxLeft > 0 &&
      this.currentX > maxLeft * threshold
    ) {
      target = maxLeft;
    } else if (
      this.currentX < 0 &&
      maxRight > 0 &&
      Math.abs(this.currentX) > maxRight * threshold
    ) {
      target = -maxRight;
    }

    this.endDrag();
    this.snapTo(target);
  }

  private endDrag(): void {
    this.dragging = false;
    this.axisLocked = undefined;
    this.stopDragListeners?.();
    this.stopDragListeners = undefined;
  }

  private snapTo(x: number): void {
    this.setTransition(true);
    this.setPosition(x);
    this.updateOpenSide(x > 0 ? 'left' : x < 0 ? 'right' : null);
  }

  private setPosition(x: number): void {
    this.currentX = x;
    if (!this.contentWrapper) return;
    this.renderer.setStyle(
      this.contentWrapper,
      'transform',
      `translateX(${x}px)`,
    );
  }

  private setTransition(enabled: boolean): void {
    if (!this.contentWrapper) return;
    this.renderer.setStyle(
      this.contentWrapper,
      'transition',
      enabled ? 'transform 0.25s ease' : 'none',
    );
  }

  private updateOpenSide(side: IBmbSwipeSide | null): void {
    if (side === this.openSide) return;
    this.openSide = side;
    this.getSwipeOpenChange.emit(side);
  }

  private getContainerWidth(container: HTMLElement | undefined): number {
    return container?.getBoundingClientRect().width ?? 0;
  }
}
