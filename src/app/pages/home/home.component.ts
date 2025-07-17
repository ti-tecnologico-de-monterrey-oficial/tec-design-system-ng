import { Component, computed, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { CommonModule } from '@angular/common';
import {
  BmbLoaderComponent,
  BmbCardComponent,
  BmbCardHeaderComponent,
  BmbCardContentComponent,
  BmbImageComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbTagComponent,
} from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'bmb-home',
  standalone: true,
  imports: [
    CommonModule,
    BmbLoaderComponent,
    BmbCardComponent,
    BmbCardHeaderComponent,
    BmbCardContentComponent,
    BmbTagComponent,
    BmbImageComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private animeService: AnimeService) {}

  animeList = computed(() => this.animeService.topAnime());

  getTopAnime() {
    return this.animeService.topAnime();
  }

  ngOnInit() {
    this.animeService.fetchTopAnime();
  }
}
