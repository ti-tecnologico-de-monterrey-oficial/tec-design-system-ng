import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { BmbFabComponent } from '../bmb-fab/bmb-fab.component';
import { BmbInteractiveIconComponent } from '../bmb-interactive-icon/bmb-interactive-icon.component';
import { IBmbApp } from '../../types';
import { BmbInnerHeaderComponent } from '../bmb-inner-header/bmb-inner-header.component';
import { BmbTabsComponent, IBmbTab } from '../bmb-tabs/bmb-tabs.component';

@Component({
  selector: 'bmb-drawer-overlay',
  standalone: true,
  imports: [
    BmbFabComponent,
    BmbInteractiveIconComponent,
    BmbInnerHeaderComponent,
    BmbTabsComponent,
  ],
  styleUrl: './bmb-drawer-overlay.component.scss',
  templateUrl: './bmb-drawer-overlay.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDrawerOverlayComponent {
  menu = input<any>([]);
  title = input<string>('');
  dataSearch = input<string[]>([]);
  tabs = input<IBmbTab[]>([]);
  appServices = input<{ [key: number]: IBmbApp[] }>({});

  onValueChange = output<string>();
  buttonClick = output<MouseEvent>();

  isOpen: boolean = false;
  isFull: boolean = false;
  activeNavItemIndex: number = 0;

  toggleDrawer() {
    this.isOpen = !this.isOpen;

    if (!this.isOpen) {
      this.isFull = false;
    }
  }

  closeDrawer(_: MouseEvent | KeyboardEvent): void {
    this.isOpen = false;
    this.isFull = false;
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.isOpen) this.closeDrawer(new KeyboardEvent('keydown'));
  }

  toggleFullDrawer(event: MouseEvent, item?: any) {
    this.isFull = !this.isFull;

    if (this.isFull && item.buttonClick) {
      item.buttonClick(event);
    }
  }

  selectNavItem(index: number) {
    this.activeNavItemIndex = index;
  }

  handleValueChange(event: string): void {
    this.onValueChange.emit(event);
  }

  get appsActive(): IBmbApp[] {
    const appsForCurrentNav = this.appServices()[this.activeNavItemIndex];
    return Array.isArray(appsForCurrentNav) ? appsForCurrentNav : [];
  }
}
