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
  NgZone,
  OnDestroy,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsService } from '../../services/tabs.service';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { IBmbContrast } from '../../types/colors';

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
  styleUrl: './bmb-tabs.component.scss',
  standalone: true,
  imports: [CommonModule, BmbActionIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTabsComponent implements OnInit, AfterViewInit, OnDestroy {
  appearanceContrast = input<IBmbContrast>('default');
  format = input<string>('');
  tabs = input<IBmbTab[]>([]);
  selectedTabId = model<number>(0); //internal

  selected = output<IBmbTab>();

  activeTabIndex: number = 0;
  observer: any;
  hasScroll = signal<boolean>(false);
  scrollLeft = signal<number>(0);
  scrollRight = signal<number>(999999);
  @ViewChild('tabsItems') tabsItems!: ElementRef;

  constructor(
    private tabsService: TabsService,
    private zone: NgZone,
  ) {}

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
    this.hasScroll.set(
      this.tabsItems.nativeElement.scrollWidth >
        this.tabsItems.nativeElement.clientWidth,
    );

    this.observer = new ResizeObserver(() => {
      this.zone.run(() => {
        this.hasScroll.set(
          this.tabsItems.nativeElement.scrollWidth >
            this.tabsItems.nativeElement.clientWidth,
        );
      });
    });

    this.observer.observe(this.tabsItems.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.unobserve(this.tabsItems.nativeElement);
    }
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

  scrollTo(toLeft: boolean): void {
    const tabsElement = this.tabsItems.nativeElement;
    tabsElement.scrollBy({
      left: toLeft ? -tabsElement.clientWidth : tabsElement.clientWidth,
      behavior: 'smooth',
    });
  }

  scrollEvent(event: Event): void {
    const tabsElement = this.tabsItems.nativeElement;
    this.scrollLeft.set(tabsElement.scrollLeft);
    this.scrollRight.set(
      tabsElement.scrollLeft +
        tabsElement.clientWidth -
        tabsElement.scrollWidth,
    );
  }

  getTabsClasses(): string[] {
    const classes: string[] = ['bmb_tabs'];

    if (this.appearanceContrast() === 'primary') {
      classes.push('bmb_tabs-primary');
    }

    if (this.appearanceContrast() === 'alternative') {
      classes.push('bmb_tabs-alternative');
    }

    return classes;
  }
}
