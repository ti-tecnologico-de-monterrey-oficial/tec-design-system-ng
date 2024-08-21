import {
  ChangeDetectionStrategy,
  Component,
  Output,
  Input,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbFabComponent } from '../bmb-fab/bmb-fab.component';
import { BmbInteractiveIconComponent } from '../bmb-interactive-icon/bmb-interactive-icon.component';
import { IBmbApp } from '../../types';
import { BmbInnerHeaderComponent } from '../bmb-inner-header/bmb-inner-header.component';
import { BmbTabsComponent } from '../bmb-tabs/bmb-tabs.component';

@Component({
  selector: 'bmb-drawer-overlay',
  standalone: true,
  imports: [
    CommonModule,
    BmbFabComponent,
    BmbInteractiveIconComponent,
    BmbInnerHeaderComponent,
    BmbTabsComponent,
  ],
  styleUrls: ['./bmb-drawer-overlay.component.scss'],
  templateUrl: './bmb-drawer-overlay.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDrawerOverlayComponent {
  @Input() menu: any = [];
  @Input() title: string = '';
  @Input() dataSearch: string[] = [];
  @Input() tabs: { title: string; id: number }[] = [];
  @Input() appServices: { [key: number]: IBmbApp[] } = {};

  @Output() onValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  isOpen: boolean = false;
  isFull: boolean = false;
  activeNavItemIndex: number = 0;

  toggleDrawer() {
    this.isOpen = !this.isOpen;

    if (!this.isOpen) {
      this.isFull = false;
    }
  }

  toggleFullDrawer(item?: any) {
    this.isFull = !this.isFull;

    if (this.isFull) {
      if (item.buttonClick) {
        item.buttonClick();
      }
    }
  }

  selectNavItem(index: number) {
    this.activeNavItemIndex = index;
  }

  handleValueChange(event: string): void {
    this.onValueChange.emit(event);
  }

  get appsActive(): IBmbApp[] {
    const appsForCurrentNav = this.appServices[this.activeNavItemIndex];
    return Array.isArray(appsForCurrentNav) ? appsForCurrentNav : [];
  }
}
