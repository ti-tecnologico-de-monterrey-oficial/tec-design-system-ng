import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { BmbTranslationsService } from '../../../services/translations/translations.service';
import {
  buildTooltipStyle,
  calculateTooltipPosition,
  createTooltipContent as buildTooltipContent,
} from '../../../_shared/logic/components/tooltip';
import { TooltipPosition } from '../../../_shared/types/components/tooltip';

@Component({
  selector: 'bmb-tooltip-base',
  standalone: true,
  imports: [],
  templateUrl: './bmb-tooltip-base.component.html',
  styleUrl: './bmb-tooltip-base.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[style.display]': "manual() ? 'none' : null" },
})
export class BmbTooltipBaseComponent {
  text = input<string>('');
  componentTitle = input<string>();
  manual = input<boolean>(false);
  anchor = input<HTMLElement>();
  language = computed(() => this.bmbTranslationsService.getCurrentLanguage());

  @ViewChild('tooltipContainer', { static: true })
  tooltipContainer!: ElementRef<HTMLElement>;

  private readonly bmbTranslationsService = inject(BmbTranslationsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject<Document>(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private tooltipElement: HTMLDialogElement | null = null;
  private readonly repositionHandler = () => this.updateTooltipPosition();
  private readonly windowBlurHandler = () => this.hideTooltip();

  /** Rendered overlay, for consumers that manage pointer transitions in manual mode. */
  get floatingElement(): HTMLDialogElement | null {
    return this.tooltipElement;
  }

  constructor() {
    effect(() => {
      this.componentTitle();
      this.text();
      this.language();
      this.anchor();
      this.manual();

      if (!this.tooltipElement || !this.isBrowserEnvironment()) {
        return;
      }

      this.updateTooltipContent();
      this.tooltipElement.classList.toggle(
        'bmb_tooltip-dialog--manual',
        this.manual(),
      );
      this.updateTooltipPosition();
    });

    this.destroyRef.onDestroy(() => {
      this.hideTooltip();
    });
  }

  getPosition(): TooltipPosition {
    if (!this.isBrowserEnvironment()) {
      return {
        top: null,
        left: null,
        right: null,
        bottom: null,
      };
    }

    return calculateTooltipPosition({
      targetElement: this.anchor() ?? this.tooltipContainer.nativeElement,
      tooltipWidth: this.tooltipElement?.offsetWidth || 280,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  }

  showTooltip(event?: Event): void {
    if (!this.isBrowserEnvironment()) {
      return;
    }

    if (
      event?.type === 'focusin' &&
      !(event.target as HTMLElement | null)?.matches(':focus-visible')
    ) {
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
    // Measure after insertion so the floating content is laid out before positioning.
    this.tooltipElement.getBoundingClientRect();
    this.updateTooltipPosition();
    this.tooltipElement.style.visibility = 'visible';

    window.addEventListener('resize', this.repositionHandler);
    window.addEventListener('scroll', this.repositionHandler, true);
    window.addEventListener('blur', this.windowBlurHandler);
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
    window.removeEventListener('blur', this.windowBlurHandler);
  }

  private createTooltipElement(): HTMLDialogElement {
    const dialog = this.document.createElement('dialog');
    dialog.className = 'bmb_tooltip-dialog bmb_tooltip-dialog--floating';
    dialog.classList.toggle('bmb_tooltip-dialog--manual', this.manual());
    dialog.lang = this.language();
    dialog.setAttribute('open', 'true');
    dialog.setAttribute('aria-hidden', 'true');

    dialog.appendChild(this.createTooltipContent());

    return dialog;
  }

  private createTooltipContent(): HTMLElement {
    return buildTooltipContent({
      title: this.componentTitle(),
      text: this.text(),
      document: this.document,
    });
  }

  private updateTooltipContent(): void {
    if (!this.tooltipElement) {
      return;
    }

    this.tooltipElement.lang = this.language();
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
    const newPosition = buildTooltipStyle(position);
    Object.assign(this.tooltipElement.style, newPosition);
  }

  private isBrowserEnvironment(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
