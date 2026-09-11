import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbDropdownMenuComponent, type IDropdownItem } from 'ui-angular';

@Component({
  selector: 'app-dropdown-menu-page',
  imports: [BmbDropdownMenuComponent],
  templateUrl: './dropdown-menu-page.html',
  styleUrl: './dropdown-menu-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuPage {
  readonly iconOptions = ['more_vert', 'more_horiz'] as const;
  readonly showExternalLink = signal(true);
  readonly showActions = signal(true);
  readonly icon = signal<(typeof this.iconOptions)[number]>('more_horiz');
  readonly lastSelectedItem = signal('Ninguna opción seleccionada');

  readonly allItems: IDropdownItem[] = [
    {
      icon: 'link',
      text: 'Enlace externo',
      url: 'https://example.com',
      target: '_blank',
    },
    {
      icon: 'settings',
      text: 'Configuración',
      action: () => this.selectItem('Configuración'),
    },
    {
      icon: 'delete',
      text: 'Eliminar',
      action: () => this.selectItem('Eliminar'),
    },
  ];

  readonly items = signal<IDropdownItem[]>(this.allItems);

  updateItems(): void {
    this.items.set(
      this.allItems.filter((item) => {
        if (item.url) return this.showExternalLink();
        return this.showActions();
      }),
    );
  }

  selectItem(item: string): void {
    this.lastSelectedItem.set(item);
  }

  handleItemClick(item: IDropdownItem): void {
    this.lastSelectedItem.set(item.text);
  }
}
