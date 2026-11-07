import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
  inject,
  input,
} from '@angular/core';

/** Reveals truncated text without activating the host during a long press. */
@Directive({
  selector: '[bmbFullText]',
  standalone: true,
  host: { '[class.bmb_full-text-enabled]': 'bmbFullTextEnabled()' },
})
export class BmbFullTextDirective
  implements AfterViewInit, OnChanges, OnDestroy
{
  readonly bmbFullText = input.required<string>();
  readonly bmbFullTextEnabled = input(true);
  /** Optional selector for the truncated text inside the interactive host. */
  readonly bmbFullTextTarget = input('');

  private static readonly active = new WeakMap<
    Document,
    BmbFullTextDirective
  >();
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly cleanup: (() => void)[] = [];
  private gestureCleanup: (() => void)[] = [];
  private pressTimer?: ReturnType<typeof setTimeout>;
  private hideTimer?: ReturnType<typeof setTimeout>;
  private clickTimer?: ReturnType<typeof setTimeout>;
  private pointerId: number | null = null;
  private suppressPointerId: number | null = null;
  private startX = 0;
  private startY = 0;
  private tooltip?: HTMLElement;
  private tooltipCleanup: (() => void)[] = [];

  ngAfterViewInit(): void {
    if (!this.browser) return;
    const host = this.element.nativeElement;
    this.listen(host, 'pointerdown', this.startPress);
    this.listen(host, 'pointerenter', (event) => {
      if ((event as PointerEvent).pointerType === 'mouse') this.show();
    });
    this.listen(host, 'pointerleave', (event) => {
      if ((event as PointerEvent).pointerType === 'mouse') {
        this.cancelPress();
        this.scheduleHide();
      }
    });
    this.listen(host, 'focusin', () => {
      if (host.matches(':focus-visible')) this.show();
    });
    this.listen(host, 'focusout', () => this.dismiss());
    // Capture runs before Angular's click handler on the same element.
    this.listen(host, 'click', this.captureClick, true);
    this.listen(host, 'contextmenu', (event) => {
      if (this.pointerId !== null && this.canShow()) event.preventDefault();
    });
    this.listen(this.document, 'keydown', (event) => {
      if ((event as KeyboardEvent).key === 'Escape') this.dismiss();
    });
    this.listen(this.document, 'pointerdown', (event) => {
      const target = event.target as Node | null;
      if (target && !host.contains(target) && !this.tooltip?.contains(target)) {
        this.dismiss();
      }
    });
    this.listen(
      this.document,
      'scroll',
      (event) => {
        if (!this.tooltip?.contains(event.target as Node)) this.dismiss();
      },
      true,
    );
    const view = this.document.defaultView;
    if (view) {
      this.listen(view, 'resize', () => this.dismiss());
      this.listen(view, 'blur', () => this.dismiss());
    }
  }

  ngOnChanges(): void {
    this.dismiss();
    this.resetClick();
  }

  ngOnDestroy(): void {
    this.dismiss();
    this.resetClick();
    this.cleanup.forEach((remove) => remove());
  }

  private readonly startPress = (rawEvent: Event): void => {
    const event = rawEvent as PointerEvent;
    this.cancelPress();
    this.resetClick();
    if (event.button !== 0 || event.isPrimary === false || !this.canShow())
      return;
    this.pointerId = event.pointerId;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.gestureCleanup = [
      this.addListener(this.document, 'pointermove', (move) => {
        const pointer = move as PointerEvent;
        if (pointer.pointerId !== this.pointerId) return;
        if (
          Math.hypot(
            pointer.clientX - this.startX,
            pointer.clientY - this.startY,
          ) > 10
        ) {
          this.dismiss();
        }
      }),
      this.addListener(this.document, 'pointerup', (up) => {
        if ((up as PointerEvent).pointerId !== this.pointerId) return;
        this.cancelPress();
        // A compatibility click follows pointerup. Do not swallow a later click.
        if (this.suppressPointerId !== null) {
          this.clickTimer = setTimeout(() => this.resetClick(), 800);
        }
      }),
      this.addListener(this.document, 'pointercancel', (cancel) => {
        if ((cancel as PointerEvent).pointerId !== this.pointerId) return;
        this.dismiss();
        this.resetClick();
      }),
    ];
    this.pressTimer = setTimeout(() => {
      if (this.canShow()) {
        this.show();
        this.suppressPointerId = event.pointerId;
      }
    }, 500);
  };

  private readonly captureClick = (rawEvent: Event): void => {
    const event = rawEvent as PointerEvent;
    const samePointer =
      event.pointerId === undefined ||
      event.pointerId === this.suppressPointerId;
    if (this.suppressPointerId !== null && event.detail !== 0 && samePointer) {
      event.preventDefault();
      event.stopImmediatePropagation();
    } else {
      this.dismiss();
    }
    this.resetClick();
  };

  private canShow(): boolean {
    if (!this.browser || !this.bmbFullTextEnabled() || !this.bmbFullText())
      return false;
    const host = this.element.nativeElement;
    const target = this.bmbFullTextTarget()
      ? host.querySelector<HTMLElement>(this.bmbFullTextTarget())
      : host;
    return (
      !!target &&
      target.clientWidth > 0 &&
      (target.scrollWidth > target.clientWidth ||
        target.scrollHeight > target.clientHeight)
    );
  }

  private show(): void {
    clearTimeout(this.hideTimer);
    if (!this.canShow() || this.tooltip) return;
    BmbFullTextDirective.active.get(this.document)?.dismiss();
    const tooltip: HTMLElement = this.renderer.createElement('div');
    this.renderer.addClass(tooltip, 'bmb_full-text-tooltip');
    this.renderer.setAttribute(tooltip, 'role', 'tooltip');
    // The complete text already supplies the host's accessible name.
    this.renderer.setAttribute(tooltip, 'aria-hidden', 'true');
    this.renderer.appendChild(
      tooltip,
      this.renderer.createText(this.bmbFullText()),
    );
    this.renderer.appendChild(this.document.body, tooltip);
    this.tooltip = tooltip;
    BmbFullTextDirective.active.set(this.document, this);
    this.tooltipCleanup = [
      this.addListener(tooltip, 'pointerenter', () =>
        clearTimeout(this.hideTimer),
      ),
      this.addListener(tooltip, 'pointerleave', () => this.scheduleHide()),
    ];
    const rect = this.element.nativeElement.getBoundingClientRect();
    const view = this.document.defaultView;
    if (!view) return;
    const width = tooltip.offsetWidth;
    const height = tooltip.offsetHeight;
    const left = Math.max(
      8,
      Math.min(
        rect.left + (rect.width - width) / 2,
        view.innerWidth - width - 8,
      ),
    );
    const top =
      rect.bottom + height + 8 <= view.innerHeight
        ? rect.bottom + 8
        : Math.max(8, rect.top - height - 8);
    this.renderer.setStyle(tooltip, 'left', `${left}px`);
    this.renderer.setStyle(tooltip, 'top', `${top}px`);
  }

  private scheduleHide(): void {
    clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => this.dismiss(), 150);
  }

  private dismiss(): void {
    this.cancelPress();
    clearTimeout(this.hideTimer);
    this.tooltipCleanup.forEach((remove) => remove());
    this.tooltipCleanup = [];
    if (this.tooltip) {
      this.renderer.removeChild(this.document.body, this.tooltip);
      this.tooltip = undefined;
    }
    if (BmbFullTextDirective.active.get(this.document) === this) {
      BmbFullTextDirective.active.delete(this.document);
    }
  }

  private cancelPress(): void {
    clearTimeout(this.pressTimer);
    this.pointerId = null;
    this.gestureCleanup.forEach((remove) => remove());
    this.gestureCleanup = [];
  }

  private resetClick(): void {
    clearTimeout(this.clickTimer);
    this.suppressPointerId = null;
  }

  private listen(
    target: EventTarget,
    type: string,
    callback: (event: Event) => void,
    capture = false,
  ): void {
    this.cleanup.push(this.addListener(target, type, callback, capture));
  }

  private addListener(
    target: EventTarget,
    type: string,
    callback: (event: Event) => void,
    capture = false,
  ): () => void {
    target.addEventListener(type, callback, capture);
    return () => target.removeEventListener(type, callback, capture);
  }
}
