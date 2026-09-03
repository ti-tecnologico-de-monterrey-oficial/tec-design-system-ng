import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  input,
  output,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/old/bmb-button/button.directive';
import { IBbmBgAppearance } from '../../_shared/types/components/advertisement-card';
import { logDeprecatedInput } from '../../_shared/logic/logDeprecatedInput';
import {
  getLoaderClasses,
  getLoaderErrorIconClass,
  shouldShowLoaderOverlay,
} from '../../_shared/logic/components/loader';


@Component({
  selector: 'bmb-loader',
  styleUrl: './bmb-loader.component.scss',
  templateUrl: './bmb-loader.component.html',
  standalone: true,
  imports: [CommonModule, BmbIconComponent, BmbButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbLoaderComponent {
  appearance = input<IBbmBgAppearance>('normal');
  icon = input<string>('wifi_off');
  subtitle = input<string>('');
  overlay = input<boolean>(false);
  isVisible = input<boolean>(true);
  errorState = input<boolean>(false);
  actions = input<boolean>(false);
  buttonPrimary = input<string>('');
  buttonSecondary = input<string>('');
  showInline = input<boolean>(false);
  componentTitle = input<string>();

  title = input<string>(); // deprecated

  onButtonPrimary = output<MouseEvent>();
  onButtonSecondary = output<MouseEvent>();

  private renderer: Renderer2 = inject(Renderer2);
  private elRef: ElementRef = inject(ElementRef);

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );
    });
  }

  ngOnInit() {
    this.updateBodyClass();
  }

  ngOnChanges() {
    this.updateBodyClass();
  }

  ngOnDestroy() {
    this.cleanupBody();
  }

  private updateBodyClass() {
    if (this.showInline()) return;

    if (this.isInsideIframe()) {
      return;
    }

    if (this.isVisible()) {
      document.body.appendChild(this.elRef.nativeElement);

      if (this.shouldShowOverlay()) {
        this.renderer.addClass(document.body, 'bmb_loader-body-overlay');
      }
    } else {
      this.cleanupBody();
    }
  }

  private cleanupBody() {
    if (this.showInline()) return;

    if (this.isInsideIframe()) {
      return;
    }

    if (document.body.contains(this.elRef.nativeElement)) {
      this.renderer.removeChild(document.body, this.elRef.nativeElement);
    }
    this.renderer.removeClass(document.body, 'bmb_loader-body-overlay');
  }

  private isInsideIframe(): boolean {
    return window.self !== window.top;
  }

  shouldShowOverlay(): boolean {
    return shouldShowLoaderOverlay(this.overlay(), this.errorState());
  }

  getClassList(): Record<string, boolean> {
    return getLoaderClasses(this.overlay(), this.errorState());
  }

  getErrorIconClass(): string {
    return getLoaderErrorIconClass(this.appearance());
  }

  handleButtonPrimary(event: MouseEvent) {
    this.onButtonPrimary.emit(event);
  }

  handleButtonSecondary(event: MouseEvent) {
    this.onButtonSecondary.emit(event);
  }
}
