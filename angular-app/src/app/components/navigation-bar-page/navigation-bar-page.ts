import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { BmbNavigationBarComponent } from 'ui-angular';
import type {
  BmbNavigationBarGapSize,
  IAlignItemsOptions,
  IBmbActionHeader,
  IJustifyOptions,
} from 'ui-angular';

@Component({
  selector: 'app-navigation-bar-page',
  imports: [BmbNavigationBarComponent],
  templateUrl: './navigation-bar-page.html',
  styleUrl: './navigation-bar-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarPage {
  readonly iconSize = signal<number | undefined>(24);
  readonly gapSize = signal<BmbNavigationBarGapSize>('m');
  readonly justify = signal<IJustifyOptions>('spaceBetween');
  readonly alignItems = signal<IAlignItemsOptions>('center');
  readonly isMitecHeader = signal(false);
  readonly emptyState = signal(false);
  readonly lastEvent = signal('Sin interacción');
  readonly actionHeaders = computed<IBmbActionHeader[]>(() =>
    this.emptyState()
      ? []
      : [
          {
            icon: 'home',
            alt: 'Inicio',
            action: () => this.handleAction('Inicio'),
          },
          {
            icon: 'search',
            alt: 'Buscar',
            iconActiveToggle: 'close',
            action: () => this.handleAction('Buscar'),
          },
          {
            icon: 'open_in_new',
            alt: 'Abrir Bamboo',
            link: 'https://bamboo.tec.mx/',
            target: '_blank',
          },
        ],
  );

  setIconSize(value: number): void {
    this.iconSize.set(value > 0 ? value : undefined);
  }

  setGapSize(value: BmbNavigationBarGapSize): void {
    this.gapSize.set(value);
  }

  setJustify(value: IJustifyOptions): void {
    this.justify.set(value);
  }

  setAlignItems(value: IAlignItemsOptions): void {
    this.alignItems.set(value);
  }

  handleAction(label: string): void {
    this.lastEvent.set(`action: ${label}`);
  }
}
