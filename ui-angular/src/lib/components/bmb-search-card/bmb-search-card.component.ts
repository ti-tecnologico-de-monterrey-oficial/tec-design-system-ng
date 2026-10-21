import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import { TranslatePipe } from '../../pipes/translations';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { BmbTabsComponent, IBmbTab } from '../bmb-tabs/bmb-tabs.component';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { BmbSearchCardEmptyStateComponent } from './bmb-search-card-empty-state/bmb-search-card-empty-state.component';
import { BmbTranslationsService } from '../../services/translations/translations.service';
import { BmbSearchCardItemComponent } from './bmb-search-card-item/bmb-search-card-item.component';
import { BmbLoaderComponent } from '../bmb-loader/bmb-loader.component';
import { IBmbSearchCardItemResult } from '../../_shared/types';
import { groupSearchCardResults } from '../../_shared/logic/components/search-card';

@Component({
  selector: 'bmb-search-card',
  standalone: true,
  imports: [
    BmbHomeCardComponent,
    TranslatePipe,
    BmbInputComponent,
    BmbTabsComponent,
    CommonModule,
    BmbSearchCardEmptyStateComponent,
    BmbSearchCardItemComponent,
    BmbLoaderComponent,
  ],
  templateUrl: './bmb-search-card.component.html',
  styleUrl: './bmb-search-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BmbSearchCardComponent {
  inputPlaceholder = input<string>('');
  results = input<IBmbSearchCardItemResult[]>([]);
  isLoading = input<boolean>(false);
  componentTitle = input<string>();
  title = input<string>(); // deprecated
  favorites = input<IBmbSearchCardItemResult[]>([]);
  disableFavoritesTab = input<boolean>(true);

  selectedTabId = model<number>(1);

  triggerSearch = output<string>();
  searchItemClick = output<IBmbSearchCardItemResult>();
  getBookmarkItemClick = output<IBmbSearchCardItemResult>();
  private readonly destroyRef = inject(DestroyRef);
  private readonly subscriptions = new Subscription();
  private translationsService: BmbTranslationsService = inject(
    BmbTranslationsService,
  );

  inputSearchControl = new FormControl('');
  computedResults = computed(() =>
    groupSearchCardResults(
      this.results(),
      this.favorites(),
      this.inputSearchControl.value,
    ),
  );
  tabsData = computed<IBmbTab[]>(() => {
    const _disableFavoritesTab = this.disableFavoritesTab();
    const rowTabs = [
    {
      title: this.translationsService.translate('search_card.tabs.all'),
      badge:
        this.computedResults().persons.length +
        this.computedResults().services.length,
      isActive: true,
      id: 0,
    },
    {
      title: this.translationsService.translate('search_card.tabs.favorites'),
      badge: this.computedResults().favorites.length,
      id: 1,
      isMobile: !_disableFavoritesTab,
      isDesktop: !_disableFavoritesTab,
    },
    {
      title: this.translationsService.translate('search_card.tabs.services'),
      badge: this.computedResults().services.length,
      id: 2,
    },
    {
      title: this.translationsService.translate('search_card.tabs.people'),
      badge: this.computedResults().persons.length,
      id: 3,
    },
  ];

    return rowTabs;
  });

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.subscriptions.unsubscribe();
    });

    this.subscriptions.add(
      this.inputSearchControl.valueChanges.subscribe((value) => {
        this.triggerSearch.emit(value || '');
      }),
    );
  }

  handleBookmarkClick(item: IBmbSearchCardItemResult): void {
    this.getBookmarkItemClick.emit({
      ...item,
      isBookmarkActive: !item.isBookmarkActive,
    });
  }
}
