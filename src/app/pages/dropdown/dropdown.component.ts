import { Component, computed, OnInit, signal } from '@angular/core';
import {
  BmbDropdownComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbFrequentAppsSelectorComponent,
  BmbHomeCardComponent,
  BmbInputComponent,
  BmbFilterCardComponent,
  BmbTranslationsService,
  BmbSwitchComponent,
  BmbDatepickerComponent,
  BmbDropzoneComponent,
} from '../../../../projects/ds-ng/src/public-api';
import { AnimeService } from '../../services/anime.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bmb-dropdown-page',
  templateUrl: './dropdown.component.html',
  standalone: true,
  imports: [
    BmbDropdownComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbFrequentAppsSelectorComponent,
    BmbHomeCardComponent,
    BmbInputComponent,
    BmbFilterCardComponent,
    BmbSwitchComponent,
    BmbDatepickerComponent,
    BmbDropzoneComponent,
  ],
})
export class DropdownPageComponent implements OnInit {
  constructor(
    private animeService: AnimeService,
    private router: Router,
    private translationsService: BmbTranslationsService,
  ) {}

  lang = computed(() => this.translationsService.getCurrentLanguage());
  progressFiles = signal<Record<string, number>>({});

  onExpandClick() {
    this.router.navigate(['/home']);
  }

  onNewFile(file: File | File[]) {
    setTimeout(() => {
      const updatedProgress = { ...this.progressFiles() };
      if (Array.isArray(file)) {
        file.forEach((f) => {
          updatedProgress[f.name] = 50;
        });
      } else {
        updatedProgress[file.name] = 50;
      }
      this.progressFiles.set(updatedProgress);
    }, 1000);
  }

  options = computed(() => {
    const elements = this.animeService.topAnime();
    return elements.data.map((anime) => anime.title);
  });

  handleLangChange(event: boolean) {
    const newLang = event ? 'en' : 'es';
    this.translationsService.setLanguage(newLang);
  }

  ngOnInit() {
    this.animeService.fetchTopAnime();
  }

  customFilterFunction = (
    item: { text: string; value?: string; selectedText?: string },
    filter: string,
  ): boolean => {
    // Custom filter logic: match if the text starts with the filter string
    return item.text.toLowerCase().startsWith(filter.toLowerCase());
  };
}
