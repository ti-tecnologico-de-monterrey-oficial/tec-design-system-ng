import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbInteractiveItemDefaultComponent,
  BmbVerticalLayoutDirective,
  BmbContainerComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
} from 'ui-angular';

@Component({
  selector: 'app-item-default-page',
  imports: [
    BmbInteractiveItemDefaultComponent,
    BmbVerticalLayoutDirective,
    BmbContainerComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  templateUrl: './item-default-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDefaultPage {
  readonly itemTitle = signal('Title');
  readonly icon = signal('person');
  readonly isActive = signal<boolean | undefined>(false);
  readonly lastEvent = signal('Sin interacción');
  handleActionClick(event: MouseEvent): void {
    this.lastEvent.set('click: ' + event.type);
  }
}
