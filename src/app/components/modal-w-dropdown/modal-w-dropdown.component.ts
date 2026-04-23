import { Component, computed, input, OnInit } from '@angular/core';
import { BmbDropdownComponent } from '../../../../projects/ds-ng/src/public-api';
import { AnimeService } from '../../services/anime.service';

@Component({
  selector: 'app-modal-w-dropdown',
  standalone: true,
  imports: [BmbDropdownComponent],
  templateUrl: './modal-w-dropdown.component.html',
  styleUrl: './modal-w-dropdown.component.scss',
})
export class ModalWDropdownComponent implements OnInit {
  isFilterable = input.required<boolean>();
  constructor(private animeService: AnimeService) {}

  ngOnInit() {
    this.animeService.fetchTopAnime();
  }

  options = computed(() => {
    // return [];
    const elements = this.animeService.topAnime();
    return elements.data.map((anime) => anime.title);
  });
}
