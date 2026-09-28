import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbInputTagsComponent, type IBmbDropdownItem } from 'ui-angular';

@Component({
  selector: 'app-input-tags-page',
  imports: [BmbInputTagsComponent],
  templateUrl: './input-tags-page.html',
  styleUrl: './input-tags-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTagsPage {
  readonly label = signal('Etiquetas');
  readonly placeholder = signal('Agregar etiqueta');
  readonly enableCustomTags = signal(true);
  readonly disabled = signal(false);
  readonly tagOptions = signal<string[] | IBmbDropdownItem[]>([
    'Angular',
    'React',
    'Vue',
  ]);
  readonly lastEvent = signal('Sin interacciones');

  handleChange(value: string[]): void {
    this.lastEvent.set(`onChange emitido: ${value.join(', ')}`);
  }
}
