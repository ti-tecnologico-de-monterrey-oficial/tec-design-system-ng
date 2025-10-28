import { Component, computed, OnInit } from '@angular/core';
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
  ],
})
export class DropdownPageComponent implements OnInit {
  constructor(
    private animeService: AnimeService,
    private router: Router,
    private translationsService: BmbTranslationsService,
  ) {}

  lang = computed(() => this.translationsService.getCurrentLanguage());

  onExpandClick() {
    console.log('Expand clicked');

    this.router.navigate(['/home']);
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
}
