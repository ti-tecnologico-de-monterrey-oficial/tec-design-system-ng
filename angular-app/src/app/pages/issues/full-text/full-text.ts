import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbTabsComponent, type IBmbTab } from 'ui-angular';

@Component({
  selector: 'app-full-text',
  imports: [BmbTabsComponent],
  templateUrl: './full-text.html',
  styleUrl: './full-text.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullText {
  readonly selectedTabId = signal(1);
  readonly showFullText = signal(true);
  readonly selectionCount = signal(0);
  readonly selectedTitle = signal('Inicio');
  readonly tabs: IBmbTab[] = [
    { id: 1, title: 'Inicio', isActive: true },
    { id: 2, title: 'Formación de capital humano' },
    { id: 3, title: 'Herramientas tecnológicas', badge: 3 },
    {
      id: 4,
      title:
        'Desarrollo e implementación de estrategias de innovación educativa para la formación de competencias profesionales',
    },
    {
      id: 5,
      title:
        'FormacionDeCapitalHumanoYHerramientasTecnologicasParaLaInnovacionEducativa',
    },
  ];

  handleSelected(tab: IBmbTab): void {
    this.selectionCount.update((count) => count + 1);
    this.selectedTitle.set(tab.title);
  }
}
