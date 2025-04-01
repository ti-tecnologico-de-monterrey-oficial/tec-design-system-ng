import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBmbTab } from '../components/bmb-tabs/bmb-tabs.component';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  private tabsSubject = new BehaviorSubject<IBmbTab[]>([]);
  private selectedTabSubject = new BehaviorSubject<IBmbTab | null>(null);

  tabs$ = this.tabsSubject.asObservable();
  selectedTab$ = this.selectedTabSubject.asObservable();

  setTabs(tabs: IBmbTab[]) {
    this.tabsSubject.next(tabs);
  }

  selectTab(tab: IBmbTab) {
    this.selectedTabSubject.next(tab);
  }

  resetTabs() {
    this.tabsSubject.next([]);
    this.selectedTabSubject.next(null);
  }
}
