import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';

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
  title = input<string>('');
  icon = input<string>('wifi_off');
  subtitle = input<string>('');
  overlay = input<boolean>(false);
  isVisible = input<boolean>(true);
  errorState = input<boolean>(false);
  actions = input<boolean>(false);
  buttonPrimary = input<string>('');
  buttonSecondary = input<string>('');

  onButtonPrimary = output<MouseEvent>();
  onButtonSecondary = output<MouseEvent>();

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
  ) {}

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
    if (this.isInsideIframe()) {
      return;
    }

    if (this.isVisible()) {
      document.body.appendChild(this.elRef.nativeElement);

      if (this.overlay() && !this.errorState()) {
        this.renderer.addClass(document.body, 'bmb_loader-body-overlay');
      }
    } else {
      this.cleanupBody();
    }
  }

  private cleanupBody() {
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

  handleButtonPrimary(event: MouseEvent) {
    this.onButtonPrimary.emit(event);
  }

  handleButtonSecondary(event: MouseEvent) {
    this.onButtonSecondary.emit(event);
  }
}
