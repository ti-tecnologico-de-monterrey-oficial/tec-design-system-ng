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
import { TranslatePipe } from '../../../pipes/translations';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { BmbTabsComponent, IBmbTab } from '../bmb-tabs/bmb-tabs.component';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { BmbSearchCardEmptyStateComponent } from './bmb-search-card-empty-state/bmb-search-card-empty-state.component';
import { BmbTranslationsService } from '../../../services/translations/translations.service';
import { BmbSearchCardItemComponent } from './bmb-search-card-item/bmb-search-card-item.component';
import { IBmbInteractiveIconAppearance } from '../../../_shared/types/components/interactive-icon';
import { BmbLoaderComponent } from '../bmb-loader/bmb-loader.component';

export interface IBmbSearchCardItemResult {
  id: string;
  name: string;
  subtitle: string;
  avatarOrIcon: string;
  backgroundColorIcon?: IBmbInteractiveIconAppearance;
  type: 'person' | 'service';
  isBookmarkActive?: boolean;
  [key: string]: any;
}

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
  computedResults = computed<{
    services: IBmbSearchCardItemResult[];
    persons: IBmbSearchCardItemResult[];
    favorites: IBmbSearchCardItemResult[];
  }>(() => {
    const newResults = this.results();
    console.log('New Results:', newResults);

    if (this.inputSearchControl.value === '') {
      return {
        services: [],
        persons: [],
        favorites: this.favorites(),
      };
    }

    return newResults.reduce(
      (acc, item) => {
        if (item.type === 'service') {
          if (item.isBookmarkActive) {
            acc.favorites.push(item);
            acc.services.push(item);
          }
        } else if (item.type === 'person') {
          acc.persons.push(item);
        }
        return acc;
      },
      { services: [], persons: [], favorites: [] } as {
        services: IBmbSearchCardItemResult[];
        persons: IBmbSearchCardItemResult[];
        favorites: IBmbSearchCardItemResult[];
      },
    );
  });
  tabsData = computed<IBmbTab[]>(() => [
    {
      id: 1,
      title: this.translationsService.translate('search_card.tabs.all'),
      badge:
        this.computedResults().persons.length +
        this.computedResults().services.length,
      isActive: true,
    },
    {
      id: 2,
      title: this.translationsService.translate('search_card.tabs.favorites'),
      badge: this.computedResults().favorites.length,
    },
    {
      id: 3,
      title: this.translationsService.translate('search_card.tabs.services'),
      badge: this.computedResults().services.length,
    },
    {
      id: 4,
      title: this.translationsService.translate('search_card.tabs.people'),
      badge: this.computedResults().persons.length,
    },
  ]);

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
