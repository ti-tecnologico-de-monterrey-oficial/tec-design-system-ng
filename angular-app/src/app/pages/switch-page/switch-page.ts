import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbSwitchComponent } from 'ui-angular';

@Component({
  selector: 'app-switch-page',
  imports: [BmbSwitchComponent],
  templateUrl: './switch-page.html',
  styleUrl: './switch-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchPage {
  readonly leftText = signal('Claro');
  readonly rightText = signal('Oscuro');
  readonly leftIcon = signal('');
  readonly rightIcon = signal('');
  readonly isChecked = signal(false);
  readonly disabled = signal(false);
  readonly lastEvent = signal('Sin interacciones');

  handleChange(value: boolean): void {
    this.lastEvent.set(`change emitido: ${value}`);
  }
}
