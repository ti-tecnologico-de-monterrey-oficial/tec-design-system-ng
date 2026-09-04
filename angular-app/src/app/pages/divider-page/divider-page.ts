import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbDividerComponent, type BmbDividerType } from 'ui-angular';

@Component({
  selector: 'app-divider-page',
  imports: [BmbDividerComponent],
  templateUrl: './divider-page.html',
  styleUrl: './divider-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerPage {
  readonly types: BmbDividerType[] = ['simple', 'dashed', 'dotted'];
  readonly type = signal<BmbDividerType>('simple');
  readonly removeMargin = signal(false);

  selectType(type: BmbDividerType): void {
    this.type.set(type);
  }

  setRemoveMargin(removeMargin: boolean): void {
    this.removeMargin.set(removeMargin);
  }
}
