import { Component, computed, input, model, output } from '@angular/core';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import { TranslatePipe } from '../../pipes/translations';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { BmbTabsComponent, IBmbTab } from '../bmb-tabs/bmb-tabs.component';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbSearchCardEmptyStateComponent } from './bmb-search-card-empty-state/bmb-search-card-empty-state.component';
import { BmbTranslationsService } from '../../services/translations/translations.service';
import { BmbSearchCardItemComponent } from './bmb-search-card-item/bmb-search-card-item.component';
import { IBmbColor } from '../../types/colors';

export interface IBmbSearchCardItemResult {
  id: string;
  name: string;
  subtitle: string;
  avatarOrIcon: string;
  backgroundColorIcon?: IBmbColor;
  type: 'person' | 'service';
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
  ],
  templateUrl: './bmb-search-card.component.html',
  styleUrl: './bmb-search-card.component.scss',
})
export class BmbSearchCardComponent {
  inputPlaceholder = input<string>('');
  results = input<IBmbSearchCardItemResult[]>([]);
  isLoading = input<boolean>(false);
  componentTitle = input<string>();

  title = input<string>(); // deprecated

  selectedTabId = model<number>(1);

  triggerSearch = output<string>();
  searchItemClick = output<IBmbSearchCardItemResult>();

  inputSearchControl = new FormControl('');
  computedResults = computed<{
    services: IBmbSearchCardItemResult[];
    persons: IBmbSearchCardItemResult[];
  }>(() => {
    return this.results().reduce(
      (acc, item) => {
        if (item.type === 'service') {
          acc.services.push(item);
        } else if (item.type === 'person') {
          acc.persons.push(item);
        }
        return acc;
      },
      { services: [], persons: [] } as {
        services: IBmbSearchCardItemResult[];
        persons: IBmbSearchCardItemResult[];
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
      title: this.translationsService.translate('search_card.tabs.services'),
      badge: this.computedResults().services.length,
    },
    {
      id: 3,
      title: this.translationsService.translate('search_card.tabs.people'),
      badge: this.computedResults().persons.length,
    },
  ]);

  constructor(private translationsService: BmbTranslationsService) {
    this.inputSearchControl.valueChanges.subscribe((value) => {
      this.triggerSearch.emit(value || '');
    });
  }
}
