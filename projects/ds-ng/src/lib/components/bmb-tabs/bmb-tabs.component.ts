import {
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
  AfterViewInit,
  input,
  output,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsService } from '../../services/tabs.service';

export interface IBmbTab {
  id: number;
  title: string;
  isActive?: boolean;
  badge?: number;
  isMobile?: boolean;
  isDesktop?: boolean;
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
  format = input<string>('');
  tabs = input<IBmbTab[]>([]);
  selectedTabId = model<number>(0); //internal

  selected = output<IBmbTab>();

  activeTabIndex: number = 0;
  @ViewChild('tabsItems') tabsItems!: ElementRef;

  constructor(private tabsService: TabsService) {}

  ngOnInit(): void {
    const initialActiveTab = this.tabs().findIndex(
      (tab: IBmbTab) => tab.isActive,
    );
    this.activeTabIndex = initialActiveTab || 0;
    this.tabs().forEach(
      (tab, index) => (tab.isActive = index === this.activeTabIndex),
    );

    this.tabsService.setTabs(this.tabs());

    this.tabsService.selectedTab$.subscribe((tab: any) => {
      if (tab && tab.id !== this.tabs()[this.activeTabIndex].id) {
        this.selectTab(tab.id);
      }
    });

    this.selectedTabId.set(this.activeTabIndex + 1);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.showActiveTab(), 100);
  }

  selectTab(selectedId: number): void {
    const tabIndex = this.tabs().findIndex((tab) => tab.id === selectedId);
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
    this.tabs().forEach((tab) => (tab.isActive = false));
    this.tabs()[index].isActive = true;
    this.activeTabIndex = index;
    const activeTab = this.tabs()[index];
    this.selected.emit(activeTab);
    setTimeout(() => this.showActiveTab(), 0);

    this.selectedTabId.set(this.activeTabIndex + 1);
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
