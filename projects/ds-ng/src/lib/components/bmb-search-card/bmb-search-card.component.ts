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

export interface IBmbSearchCardResultService {
  id?: string;
  name: string;
  category: string;
  icon?: string;
  backgroundColorIcon?: IBmbColor;
  [key: string]: any;
}

export interface IBmbSearchCardResultPerson {
  id?: string;
  name: string;
  area: string;
  avatar: string;
  [key: string]: any;
}

export interface IBmbSearchCardResults {
  services: IBmbSearchCardResultService[];
  persons: IBmbSearchCardResultPerson[];
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
  title = input<string>('');
  inputPlaceholder = input<string>('');
  results = input<IBmbSearchCardResults>({ services: [], persons: [] });
  isLoading = input<boolean>(false);

  triggerSearch = output<string>();

  inputSearchControl = new FormControl('');
  selectedTabId = model<number>(1);
  tabsData = computed<IBmbTab[]>(() => [
    {
      id: 1,
      title: this.translationsService.translate('search_card.tabs.all'),
      badge: this.results().persons.length + this.results().services.length,
      isActive: true,
    },
    {
      id: 2,
      title: this.translationsService.translate('search_card.tabs.services'),
      badge: this.results().services.length,
    },
    {
      id: 3,
      title: this.translationsService.translate('search_card.tabs.people'),
      badge: this.results().persons.length,
    },
  ]);

  constructor(private translationsService: BmbTranslationsService) {
    this.inputSearchControl.valueChanges.subscribe((value) => {
      this.triggerSearch.emit(value || '');
    });
  }
}
