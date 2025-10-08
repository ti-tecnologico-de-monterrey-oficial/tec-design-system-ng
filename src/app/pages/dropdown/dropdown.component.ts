import { Component, computed, OnInit } from '@angular/core';
import {
  BmbDropdownComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbFrequentAppsSelectorComponent,
  BmbHomeCardComponent,
  BmbInputComponent,
  BmbFilterCardComponent,
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
  ],
})
export class DropdownPageComponent implements OnInit {
  constructor(
    private animeService: AnimeService,
    private router: Router,
  ) {}

  onExpandClick() {
    console.log('Expand clicked');

    this.router.navigate(['/home']);
  }

  options = computed(() => {
    const elements = this.animeService.topAnime();
    return elements.data.map((anime) => anime.title);
  });

  ngOnInit() {
    this.animeService.fetchTopAnime();
  }
}
