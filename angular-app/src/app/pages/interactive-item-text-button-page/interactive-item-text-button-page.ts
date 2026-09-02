import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbInteractiveItemTextButtonComponent } from 'ui-angular';

@Component({
  selector: 'app-interactive-item-text-button-page',
  imports: [BmbInteractiveItemTextButtonComponent],
  templateUrl: './interactive-item-text-button-page.html',
  styleUrl: './interactive-item-text-button-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveItemTextButtonPage {
  readonly icon = signal('mobile_2');
  readonly label = signal('Title');
  readonly value = signal('info');
  readonly isDisabled = signal(false);
  readonly lastEvent = signal('Sin interacción');

  handleActionClick(event: MouseEvent): void {
    this.lastEvent.set(`click: ${event.type}`);
  }
}
