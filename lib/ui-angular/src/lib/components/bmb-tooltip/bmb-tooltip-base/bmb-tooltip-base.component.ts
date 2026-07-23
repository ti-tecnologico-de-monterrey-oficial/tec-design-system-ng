import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  PLATFORM_ID,
  input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import {
  calculateTooltipPosition,
  createTooltipContent,
  buildTooltipStyle,
} from '../../../_core/logic/components/tooltip/tooltip';

@Component({
  selector: 'bmb-tooltip-base',
  standalone: true,
  imports: [],
  templateUrl: './bmb-tooltip-base.component.html',
  styleUrl: './bmb-tooltip-base.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTooltipBaseComponent {
  text = input<string>('');
  componentTitle = input<string>();

  @ViewChild('tooltipContainer', { static: true })
  tooltipContainer!: ElementRef<HTMLElement>;

  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject<Document>(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private tooltipElement: HTMLDialogElement | null = null;

  private readonly repositionHandler = () =>
    this.updateTooltipPosition();

  constructor() {
    effect(() => {
      this.componentTitle();
      this.text();

      if (!this.tooltipElement || !this.isBrowserEnvironment()) {
        return;
      }

      this.updateTooltipContent();
      this.updateTooltipPosition();
    });

    this.destroyRef.onDestroy(() => {
      this.hideTooltip();
    });
  }

  showTooltip(): void {
    if (!this.isBrowserEnvironment()) {
      return;
    }

    if (this.tooltipElement) {
      this.updateTooltipContent();
      this.updateTooltipPosition();
      return;
    }

    this.tooltipElement = this.createTooltipElement();
    this.tooltipElement.style.visibility = 'hidden';

    this.document.body.appendChild(this.tooltipElement);

    this.tooltipElement.offsetHeight;

    this.updateTooltipPosition();

    this.tooltipElement.style.visibility = 'visible';

    window.addEventListener(
      'resize',
      this.repositionHandler,
    );

    window.addEventListener(
      'scroll',
      this.repositionHandler,
      true,
    );
  }

  hideTooltip(): void {
    if (!this.isBrowserEnvironment()) {
      this.tooltipElement = null;
      return;
    }

    if (!this.tooltipElement) {
      return;
    }

    this.tooltipElement.remove();
    this.tooltipElement = null;

    window.removeEventListener(
      'resize',
      this.repositionHandler,
    );

    window.removeEventListener(
      'scroll',
      this.repositionHandler,
      true,
    );
  }

  private createTooltipElement(): HTMLDialogElement {
    const dialog =
      this.document.createElement('dialog');

    dialog.className =
      'bmb_tooltip-dialog bmb_tooltip-dialog--floating';

    dialog.setAttribute('open', 'true');
    dialog.setAttribute('aria-hidden', 'true');

    dialog.appendChild(
      createTooltipContent({
        title: this.componentTitle(),
        text: this.text(),
        document: this.document,
      }),
    );

    return dialog;
  }

  private updateTooltipContent(): void {
    if (!this.tooltipElement) {
      return;
    }

    this.tooltipElement.replaceChildren(
      createTooltipContent({
        title: this.componentTitle(),
        text: this.text(),
        document: this.document,
      }),
    );
  }

  private updateTooltipPosition(): void {
    if (!this.isBrowserEnvironment()) {
      return;
    }

    if (!this.tooltipElement) {
      return;
    }

    const position = calculateTooltipPosition({
      targetElement: this.tooltipContainer.nativeElement,
      tooltipWidth:
        this.tooltipElement.offsetWidth || 280,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });

    Object.assign(
      this.tooltipElement.style,
      buildTooltipStyle(position),
    );
  }

  private isBrowserEnvironment(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}