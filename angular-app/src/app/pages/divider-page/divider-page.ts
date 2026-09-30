import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbDividerComponent,
  type BmbDividerType,
  type BmbDividerOrientationType,
  BMB_DIVIDER_LIST,
  BMB_DIVIDER_ORIENTATION_LIST,
} from 'ui-angular';

@Component({
  selector: 'app-divider-page',
  imports: [BmbDividerComponent],
  templateUrl: './divider-page.html',
  styleUrl: './divider-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerPage {
  readonly type = signal<BmbDividerType>('simple');

  readonly orientation = signal<BmbDividerOrientationType>('horizontal');
  readonly removeMargin = signal(false);

  selectType(type: BmbDividerType): void {
    this.type.set(type);
  }

  selectOrientation(orientation: BmbDividerOrientationType): void {
    this.orientation.set(orientation);
  }

  setRemoveMargin(removeMargin: boolean): void {
    this.removeMargin.set(removeMargin);
  }

  getDividerTypes(): string[] {
    return BMB_DIVIDER_LIST;
  }

  getDividerOrientationTypes(): string[] {
    return BMB_DIVIDER_ORIENTATION_LIST;
  }
}
