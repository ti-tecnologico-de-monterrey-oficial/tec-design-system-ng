import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbLoaderComponent, type IBbmBgAppearance } from 'ui-angular';

@Component({
  selector: 'app-loader-page',
  imports: [BmbLoaderComponent],
  templateUrl: './loader-page.html',
  styleUrl: './loader-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderPage {
  readonly appearances: IBbmBgAppearance[] = [
    'normal',
    'strong',
    'success',
    'info',
    'warning',
    'error',
    'brand',
  ];
  readonly appearance = signal<IBbmBgAppearance>('normal');
  readonly icon = signal('wifi_off');
  readonly componentTitle = signal('Sin conexión');
  readonly subtitle = signal('Verifica tu conexión a internet');
  readonly overlay = signal(false);
  readonly isVisible = signal(true);
  readonly errorState = signal(false);
  readonly actions = signal(false);
  readonly buttonPrimary = signal('Reintentar');
  readonly buttonSecondary = signal('Cancelar');
  readonly showInline = signal(true);
  readonly primaryClicks = signal(0);
  readonly secondaryClicks = signal(0);

  setAppearance(value: IBbmBgAppearance): void {
    this.appearance.set(value);
  }

  setIcon(value: string): void {
    this.icon.set(value);
  }

  setComponentTitle(value: string): void {
    this.componentTitle.set(value);
  }

  setSubtitle(value: string): void {
    this.subtitle.set(value);
  }

  setOverlay(value: boolean): void {
    this.overlay.set(value);
  }

  setIsVisible(value: boolean): void {
    this.isVisible.set(value);
  }

  setErrorState(value: boolean): void {
    this.errorState.set(value);
  }

  setActions(value: boolean): void {
    this.actions.set(value);
  }

  setButtonPrimary(value: string): void {
    this.buttonPrimary.set(value);
  }

  setButtonSecondary(value: string): void {
    this.buttonSecondary.set(value);
  }

  setShowInline(value: boolean): void {
    this.showInline.set(value);
  }

  handleButtonPrimary(): void {
    this.primaryClicks.update((value) => value + 1);
  }

  handleButtonSecondary(): void {
    this.secondaryClicks.update((value) => value + 1);
  }
}
