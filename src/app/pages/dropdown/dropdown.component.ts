import { Component, computed, OnInit } from '@angular/core';
import {
  BmbDropdownComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbFrequentAppsSelectorComponent,
} from '../../../../projects/ds-ng/src/public-api';
import { AnimeService } from '../../services/anime.service';

@Component({
  selector: 'bmb-dropdown-page',
  templateUrl: './dropdown.component.html',
  standalone: true,
  imports: [
    BmbDropdownComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbFrequentAppsSelectorComponent,
  ],
})
export class DropdownPageComponent implements OnInit {
  constructor(private animeService: AnimeService) {}

  options = computed(() => {
    const elements = this.animeService.topAnime();
    return elements.data.map((anime) => anime.title);
  });

  ngOnInit() {
    this.animeService.fetchTopAnime();
  }
}
