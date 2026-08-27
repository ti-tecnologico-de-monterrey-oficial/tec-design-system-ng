import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbSelectComponent, BmbSelectItemComponent } from 'ui-angular';

@Component({
  selector: 'app-select-page',
  imports: [BmbSelectComponent, BmbSelectItemComponent],
  templateUrl: './select-page.html',
  styleUrl: './select-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPage {
  readonly selectedValue = signal('first');
  readonly lastEvent = signal('Sin interacción');

  select(value: string): void {
    this.selectedValue.set(value);
    this.lastEvent.set(`onValueChange · ${value}`);
  }

  getSelectedLabel(): string {
    const labels: Record<string, string> = {
      first: 'Primera opción',
      second: 'Segunda opción',
      third: 'Tercera opción',
    };
    return labels[this.selectedValue()] ?? 'Selecciona una opción';
  }
}
