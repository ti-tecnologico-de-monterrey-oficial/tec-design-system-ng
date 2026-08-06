import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbContainerComponent, type IBmbAppearanceType } from 'ui-angular';

@Component({
  selector: 'app-container-page',
  imports: [BmbContainerComponent],
  templateUrl: './container-page.html',
  styleUrl: './container-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerPage {
  readonly appearances: IBmbAppearanceType[] = [
    'primary-container',
    'primary-home',
    'primary-header',
    'secondary-container',
    'contrast-box-container',
    'button-container',
  ];
  readonly appearance = signal<IBmbAppearanceType>('primary-container');
  readonly isHidden = signal(false);

  selectAppearance(appearance: IBmbAppearanceType): void {
    this.appearance.set(appearance);
  }

  setHidden(hidden: boolean): void {
    this.isHidden.set(hidden);
  }
}
