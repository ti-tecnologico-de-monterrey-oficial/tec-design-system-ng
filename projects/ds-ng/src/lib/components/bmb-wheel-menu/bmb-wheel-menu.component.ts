import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbFabComponent } from '../bmb-fab/bmb-fab.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbInnerHeaderComponent } from '../bmb-inner-header/bmb-inner-header.component';
import { BmbTabsComponent } from '../bmb-tabs/bmb-tabs.component';
import { BmbInteractiveIconComponent } from '../bmb-interactive-icon/bmb-interactive-icon.component';

interface NavItem {
  title: string;
  id: number;
  badge?: number;
  isActive?: boolean;
}

interface App {
  appearance: string;
  title: string;
  icon: string;
  target: string;
  link: string;
}

@Component({
  selector: 'bmb-wheel-menu',
  standalone: true,
  imports: [
    CommonModule,
    BmbFabComponent,
    BmbIconComponent,
    BmbInnerHeaderComponent,
    BmbTabsComponent,
    BmbInteractiveIconComponent,
  ],
  styleUrls: ['./bmb-wheel-menu.component.scss'],
  templateUrl: './bmb-wheel-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbWheelMenuComponent implements AfterViewInit {
  @Input() navItems: NavItem[] = [];
  @Input() apps: { [key: number]: App[] } = {};
  @Input() data: string[] = [];
  @Input() isLoading: boolean = false;
  @Output() onValueChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('wheel', { static: false }) wheel!: ElementRef;
  @ViewChild('wheelMenu', { static: false }) wheelMenu!: ElementRef;
  @ViewChild(BmbTabsComponent) tabsComponent!: BmbTabsComponent;

  activeNavItemIndex: number = 0;
  isFull: boolean = false;
  isOpen: boolean = false;

  constructor() {}

  ngAfterViewInit() {
    this.updateClasses();
    this.selectNavItem(0);
  }

  toggleWheel() {
    this.isFull = false;
    this.isOpen = !this.isOpen;
    this.updateClasses();
  }

  toggleFullWheel() {
    this.isFull = !this.isFull;
    if (!this.isFull) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
      this.setActiveTab(this.activeNavItemIndex);
      setTimeout(() => {
        this.isOpen = true;
        this.setActiveTab(this.activeNavItemIndex);
      }, 100);
    }
    this.updateClasses();
  }

  handleBackButton() {
    this.toggleFullWheel();
  }

  selectNavItem(index: number) {
    if (this.activeNavItemIndex !== index) {
      this.activeNavItemIndex = index;
      this.updateClasses();
      this.setActiveTab(index);
    }
  }

  selectFullMenuNavItem(index: number) {
    if (this.activeNavItemIndex !== index) {
      this.activeNavItemIndex = index;
      this.updateClasses();
      this.setActiveTab(index);
    }
  }

  getClasses(index: number): string {
    const activeIndex = this.activeNavItemIndex;
    if (index === activeIndex) {
      return 'active';
    } else if (index === (activeIndex + 1) % 3) {
      return 'next';
    } else if (index === (activeIndex + 2) % 3) {
      return 'previous';
    }
    return '';
  }

  updateClasses() {
    if (!this.wheelMenu) return;

    const navItems = Array.from(
      this.wheelMenu.nativeElement.querySelectorAll('.bmb_wheel-item'),
    ) as HTMLElement[];

    navItems.forEach((item, index) => {
      item.classList.remove('previous', 'active', 'next');
      item.classList.add(...this.getClasses(index).split(' '));
    });
  }

  setActiveTab(index: number) {
    if (this.tabsComponent) {
      this.tabsComponent.selectTab(this.navItems[index].id);
    }
  }

  get activeApps() {
    return this.apps[this.activeNavItemIndex] || [];
  }

  handleValueChange(event: string): void {
    this.onValueChange.emit(event);
  }
}
