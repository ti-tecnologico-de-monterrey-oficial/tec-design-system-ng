import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbButtonIconComponent } from 'ui-angular';

type ButtonIconContrast = 'default' | 'primary' | 'alternative' | 'solid';

@Component({
  selector: 'app-button-icon-page',
  imports: [BmbButtonIconComponent],
  templateUrl: './button-icon-page.html',
  styleUrl: './button-icon-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonIconPage {
  readonly contrasts: ButtonIconContrast[] = [
    'default',
    'primary',
    'alternative',
    'solid',
  ];
  readonly icon = signal('favorite');
  readonly idElement = signal('button-icon-demo');
  readonly alt = signal('Marcar como favorito');
  readonly appearanceContrast = signal<ButtonIconContrast>('default');
  readonly showContainer = signal(true);
  readonly isOutline = signal(false);
  readonly disabled = signal(false);
  readonly active = signal(false);
  readonly clickCount = signal(0);

  setIcon(value: string): void {
    this.icon.set(value);
  }

  setIdElement(value: string): void {
    this.idElement.set(value);
  }

  setAlt(value: string): void {
    this.alt.set(value);
  }

  selectContrast(contrast: ButtonIconContrast): void {
    this.appearanceContrast.set(contrast);
  }

  setShowContainer(value: boolean): void {
    this.showContainer.set(value);
  }

  setIsOutline(value: boolean): void {
    this.isOutline.set(value);
  }

  setDisabled(value: boolean): void {
    this.disabled.set(value);
  }

  setActive(value: boolean): void {
    this.active.set(value);
  }

  handleButtonClick(): void {
    this.clickCount.update((value) => value + 1);
  }
}
