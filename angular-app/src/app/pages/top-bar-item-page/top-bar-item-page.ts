import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbTopBarItemComponent } from 'ui-angular';

@Component({
  selector: 'app-top-bar-item-page',
  imports: [BmbTopBarItemComponent],
  templateUrl: './top-bar-item-page.html',
  styleUrl: './top-bar-item-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarItemPage {
  readonly isActive = signal(false);
  readonly projectedText = signal('Elemento de top bar');

  setProjectedText(value: string): void {
    this.projectedText.set(value);
  }
}
