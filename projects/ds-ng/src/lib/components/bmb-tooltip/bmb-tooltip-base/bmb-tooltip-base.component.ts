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
  private readonly repositionHandler = () => this.updateTooltipPosition();

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

  getPosition() {
    if (!this.isBrowserEnvironment()) {
      return {
        top: null,
        left: null,
        right: null,
        bottom: null,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const targetPosition =
      this.tooltipContainer.nativeElement.getBoundingClientRect();
    const spacing = 8;
    const minSpaceForSideTooltip = 300;
    const tooltipWidth = this.tooltipElement?.offsetWidth || 280;
    const spaceOnLeft = targetPosition.left;
    const spaceOnRight = width - targetPosition.right;
    const canShowOnLeft = spaceOnLeft >= minSpaceForSideTooltip;
    const canShowOnRight = spaceOnRight >= minSpaceForSideTooltip;

    let left: string | null = null;
    let right: string | null = null;
    let top: string | null = null;
    let bottom: string | null = null;

    if (!canShowOnLeft && !canShowOnRight) {
      top = targetPosition.top <= height / 2
        ? `${targetPosition.bottom + spacing}px`
        : null;
      bottom = targetPosition.top > height / 2
        ? `${Math.max(height - targetPosition.top + spacing, 0)}px`
        : null;
      const centerLeft = Math.max((width - tooltipWidth) / 2, spacing);
      left = `${centerLeft}px`;
    } else {
      if (canShowOnLeft && canShowOnRight) {
        if (targetPosition.left <= width / 2) {
          left = `${targetPosition.right + spacing}px`;
        } else {
          right = `${Math.max(width - targetPosition.left + spacing, 0)}px`;
        }
      } else if (canShowOnLeft) {
        right = `${Math.max(width - targetPosition.left + spacing, 0)}px`;
      } else {
        left = `${targetPosition.right + spacing}px`;
      }
      top = targetPosition.top <= height / 2
        ? `${targetPosition.top}px`
        : null;
      bottom = targetPosition.top > height / 2
        ? `${Math.max(height - targetPosition.bottom, 0)}px`
        : null;
    }

    return {
      top,
      left,
      right,
      bottom,
    };
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

    window.addEventListener('resize', this.repositionHandler);
    window.addEventListener('scroll', this.repositionHandler, true);
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
    window.removeEventListener('resize', this.repositionHandler);
    window.removeEventListener('scroll', this.repositionHandler, true);
  }

  private createTooltipElement(): HTMLDialogElement {
    const dialog = this.document.createElement('dialog');
    dialog.className = 'bmb_tooltip-dialog bmb_tooltip-dialog--floating';
    dialog.setAttribute('open', 'true');
    dialog.setAttribute('aria-hidden', 'true');

    dialog.appendChild(this.createTooltipContent());

    return dialog;
  }

  private createTooltipContent(): HTMLElement {
    const section = this.document.createElement('section');
    section.className = 'bmb_tooltip';
    section.setAttribute('aria-describedby', 'tooltip-content');

    if (this.componentTitle()) {
      const titleElement = this.document.createElement('strong');
      titleElement.textContent = this.componentTitle() || '';
      section.appendChild(titleElement);
    }

    if (this.text()) {
      const textElement = this.document.createElement('span');
      textElement.textContent = this.text();
      section.appendChild(textElement);
    }

    return section;
  }

  private updateTooltipContent(): void {
    if (!this.tooltipElement) {
      return;
    }

    this.tooltipElement.replaceChildren(this.createTooltipContent());
  }

  private updateTooltipPosition(): void {
    if (!this.isBrowserEnvironment()) {
      return;
    }

    if (!this.tooltipElement) {
      return;
    }

    const position = this.getPosition();
    const newPosition: Record<string, string> = {
      position: 'fixed',
      top: 'auto',
      right: 'auto',
      bottom: 'auto',
      left: 'auto',
      margin: '0',
    };

    if (position.top) {
      newPosition['top'] = position.top;
    }
    if (position.left) {
      newPosition['left'] = position.left;
    }
    if (position.right) {
      newPosition['right'] = position.right;
    }
    if (position.bottom) {
      newPosition['bottom'] = position.bottom;
    }
    Object.assign(this.tooltipElement.style, newPosition);
  }

  private isBrowserEnvironment(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
