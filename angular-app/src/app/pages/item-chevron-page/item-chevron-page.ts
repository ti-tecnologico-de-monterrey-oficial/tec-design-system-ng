import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbInteractiveItemChevronComponent,
  BmbVerticalLayoutDirective,
  BmbContainerComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
} from 'ui-angular';

@Component({
  selector: 'app-item-chevron-page',
  imports: [
    BmbInteractiveItemChevronComponent,
    BmbVerticalLayoutDirective,
    BmbContainerComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  templateUrl: './item-chevron-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemChevronPage {
  readonly itemTitle = signal('Title');
  readonly itemSubtitle = signal('Subtitle');
  readonly isDisabled = signal(false);
  readonly lastEvent = signal('Sin interacción');
  handleActionClick(event: MouseEvent): void {
    this.lastEvent.set('click: ' + event.type);
  }
}
