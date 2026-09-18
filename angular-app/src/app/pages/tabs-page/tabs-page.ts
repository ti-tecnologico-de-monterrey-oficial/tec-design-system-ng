import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbTabsComponent, type IBmbTab, type IBmbContrast } from 'ui-angular';

@Component({
  selector: 'app-tabs-page',
  imports: [BmbTabsComponent],
  templateUrl: './tabs-page.html',
  styleUrl: './tabs-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPage {
  readonly appearanceContrasts: IBmbContrast[] = [
    'default',
    'primary',
    'alternative',
  ];

  readonly appearanceContrast = signal<IBmbContrast>('default');
  readonly selectedTabId = signal(1);
  readonly tabs = signal<IBmbTab[]>([
    { id: 1, title: 'Tec de Monterrey', badge: 1, isActive: true },
    { id: 2, title: 'Prestamo educativo' },
    { id: 3, title: 'Mas usado' },
  ]);
  readonly lastEvent = signal('Sin interacciones');

  handleSelected(tab: IBmbTab): void {
    this.lastEvent.set(`selected emitido: ${tab.title}`);
  }
}
