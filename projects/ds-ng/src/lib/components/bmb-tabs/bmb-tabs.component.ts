import {
  Component,
  Input,
  Output,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  EventEmitter,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface IBmbTab {
  id: number;
  title: string;
  isActive?: boolean;
  badge?: number;
}

@Component({
  selector: 'bmb-tabs',
  templateUrl: './bmb-tabs.component.html',
  styleUrls: ['./bmb-tabs.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTabsComponent implements OnInit, AfterViewInit {
  @Input() format: string = '';
  @Input() tabs: IBmbTab[] = [];
  @Output() selected = new EventEmitter<IBmbTab>();

  activeTabIndex: number = 0;
  @ViewChild('tabsItems') tabsItems!: ElementRef;

  ngOnInit(): void {
    const initialActiveTab = this.tabs.findIndex((tab) => tab.isActive);
    this.activeTabIndex = initialActiveTab !== -1 ? initialActiveTab : 0;
    this.tabs.forEach(
      (tab, index) => (tab.isActive = index === this.activeTabIndex),
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.showActiveTab(), 100);
  }

  selectTab(selectedId: number): void {
    const tabIndex = this.tabs.findIndex((tab) => tab.id === selectedId);
    if (tabIndex !== -1) {
      this.updateActiveTab(tabIndex);
    }
  }

  goToNextTab(): void {
    const nextIndex = this.activeTabIndex + 1;
    if (nextIndex < this.tabs.length) {
      this.updateActiveTab(nextIndex);
    }
  }

  goToPreviousTab(): void {
    const previousIndex = this.activeTabIndex - 1;
    if (previousIndex >= 0) {
      this.updateActiveTab(previousIndex);
    }
  }

  private updateActiveTab(index: number): void {
    this.tabs.forEach((tab) => (tab.isActive = false));
    this.tabs[index].isActive = true;
    this.activeTabIndex = index;
    const activeTab = this.tabs[index];
    this.selected.emit(activeTab);
    setTimeout(() => this.showActiveTab(), 0);
  }

  showActiveTab(): void {
    requestAnimationFrame(() => {
      const tabsElement = this.tabsItems.nativeElement;
      const activeTabElement = tabsElement.children[this.activeTabIndex];

      if (activeTabElement) {
        const containerWidth = tabsElement.offsetWidth;
        const activeTabWidth = activeTabElement.offsetWidth;
        const activeTabOffsetLeft = activeTabElement.offsetLeft;

        const scrollOffset =
          activeTabOffsetLeft - (containerWidth - activeTabWidth) / 2;

        tabsElement.scrollTo({
          left: scrollOffset,
          behavior: 'smooth',
        });
      }
    });
  }
}
