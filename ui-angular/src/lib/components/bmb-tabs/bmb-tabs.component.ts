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
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsService } from '../../services/tabs/tabs.service';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { IBmbContrast } from '../../_shared/types/colors';
import { BmbNotificationCounterComponent } from '../bmb-notification-counter/bmb-notification-counter.component';
import { TranslatePipe } from '../../pipes/translations';
import { IBmbTab } from '../../_shared/types/components/tabs';
import { getBmbTabsClasses } from '../../_shared/logic/components/tabs';
import { BmbFullTextDirective } from '../../directives/bmb-full-text/bmb-full-text.directive';

export type { IBmbTab };

@Component({
  selector: 'bmb-tabs',
  templateUrl: './bmb-tabs.component.html',
  styleUrl: './bmb-tabs.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    BmbActionIconComponent,
    BmbNotificationCounterComponent,
    TranslatePipe,
    BmbFullTextDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [TabsService],
})
export class BmbTabsComponent implements OnInit, AfterViewInit, OnDestroy {
  appearanceContrast = input<IBmbContrast>('default');
  format = input<string>('');
  showFullText = input<boolean>(false);
  tabs = input<IBmbTab[]>([]);
  selectedTabId = model<number>(0);

  selected = output<IBmbTab>();

  activeTabIndex = signal<number>(0);
  observer: any;
  hasScroll = signal<boolean>(false);
  scrollLeft = signal<number>(0);
  scrollRight = signal<number>(999999);
  @ViewChild('tabsItems', { static: true }) tabsItems!: ElementRef;

  readonly tabsService: TabsService = inject(TabsService);
  private zone: NgZone = inject(NgZone);

  ngOnInit(): void {
    const initialActiveTab = this.tabs().findIndex(
      (tab: IBmbTab) => tab.isActive,
    );
    this.activeTabIndex.set(initialActiveTab || 0);
    this.tabs().forEach(
      (tab, index) => (tab.isActive = index === this.activeTabIndex()),
    );

    this.tabsService.setTabs(this.tabs());

    this.tabsService.selectedTab$.subscribe((tab: any) => {
      if (tab && tab.id !== this.tabs()[this.activeTabIndex()].id) {
        this.selectTab(tab.id);
      }
    });

    this.selectedTabId.set(this.activeTabIndex() + 1);
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
    const nextIndex = this.activeTabIndex() + 1;
    if (nextIndex < this.tabs.length) {
      this.updateActiveTab(nextIndex);
    }
  }

  goToPreviousTab(): void {
    const previousIndex = this.activeTabIndex() - 1;
    if (previousIndex >= 0) {
      this.updateActiveTab(previousIndex);
    }
  }

  private updateActiveTab(index: number): void {
    this.tabs().forEach((tab) => (tab.isActive = false));
    this.tabs()[index].isActive = true;
    this.activeTabIndex.set(index);
    const activeTab = this.tabs()[index];
    this.selected.emit(activeTab);
    setTimeout(() => this.showActiveTab(), 0);

    this.selectedTabId.set(this.activeTabIndex() + 1);
  }

  showActiveTab(): void {
    requestAnimationFrame(() => {
      const tabsElement = this.tabsItems.nativeElement;
      const activeTabElement = tabsElement.children[this.activeTabIndex()];

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
    return getBmbTabsClasses(this.appearanceContrast());
  }

  /** Allows keyboard users to inspect every label in full-text mode. */
  focusTabLabel(event: KeyboardEvent): void {
    if (!this.showFullText() || event.altKey || event.ctrlKey || event.metaKey)
      return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const list: HTMLElement = this.tabsItems.nativeElement;
    const buttons = Array.from(
      list.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
    ).filter((button) => {
      const item = button.parentElement;
      return !!item && getComputedStyle(item).display !== 'none';
    });
    const current = buttons.indexOf(event.currentTarget as HTMLButtonElement);
    if (current < 0) return;
    event.preventDefault();
    const direction = getComputedStyle(list).direction === 'rtl' ? -1 : 1;
    const offset = (event.key === 'ArrowRight' ? 1 : -1) * direction;
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? buttons.length - 1
          : (current + offset + buttons.length) % buttons.length;
    buttons[next].focus();
  }
}
