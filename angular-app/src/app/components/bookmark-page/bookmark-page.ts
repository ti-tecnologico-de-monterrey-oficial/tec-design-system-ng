import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbBookmarkComponent } from '../../../../../ui-angular/src/lib/components/bmb-bookmark/bmb-bookmark.component';

@Component({
  selector: 'app-bookmark-page',
  imports: [BmbBookmarkComponent],
  templateUrl: './bookmark-page.html',
  styleUrl: './bookmark-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarkPage {
  readonly isActive = signal(false);
  readonly lastEvent = signal('Sin interacción');

  setActive(value: boolean): void {
    this.isActive.set(value);
    this.lastEvent.set(`isActiveChange: ${value}`);
  }
}
