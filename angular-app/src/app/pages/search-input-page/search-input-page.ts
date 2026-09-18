import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbSearchInputComponent } from 'ui-angular';

@Component({
  selector: 'app-search-input-page',
  imports: [BmbSearchInputComponent],
  templateUrl: './search-input-page.html',
  styleUrl: './search-input-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputPage {
  readonly data = signal([
    'Manzana',
    'Banana',
    'Cereza',
    'Durazno',
    'Fresa',
    'Guayaba',
    'Kiwi',
    'Limón',
    'Mango',
    'Naranja',
    'Papaya',
    'Sandía',
    'Uva',
  ]);
  readonly placeholder = signal('Busca una fruta');
  readonly isLoading = signal(false);
  readonly lastEvent = signal('Sin interacciones');

  handleValueChange(value: string): void {
    this.lastEvent.set(`onValueChange: ${value}`);
  }

  handleClearField(): void {
    this.lastEvent.set('onClearField emitido');
  }
}
