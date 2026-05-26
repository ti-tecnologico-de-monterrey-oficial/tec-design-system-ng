import { Component, computed, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  BmbDropdownComponent,
  BmbButtonDirective,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbBookmarkComponent,
  BmbFormValidatorComponent,
} from '../../../../projects/ds-ng/src/public-api';
import { AnimeService } from '../../services/anime.service';

@Component({
  selector: 'bmb-dropdown-page',
  templateUrl: './dropdown.component.html',
  standalone: true,
  imports: [
    BmbButtonDirective,
    BmbDropdownComponent,
    BmbFormValidatorComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbBookmarkComponent,
  ],
})
export class DropdownPageComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  constructor(private animeService: AnimeService) {}

  ngOnInit() {
    this.animeService.fetchTopAnime();
  }

  getFormControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
  }

  handleDropdownChange(event: unknown) {
    //Add your code
  }

  options = computed(() => {
    const elements = this.animeService.topAnime();
    return elements.data.map((anime) => anime.title);
  });

  handleBookmarkChange(isActive: boolean) {
    console.log('Bookmark active state changed:', isActive);
    //Add your code
  }

  customFilterFunction = (
    item: { text: string; value?: string; selectedText?: string },
    filter: string,
  ): boolean => {
    // Custom filter logic: match if the text starts with the filter string
    return item.text.toLowerCase().startsWith(filter.toLowerCase());
  };

  handleFormGroupState(state: FormGroup): void {
    console.info(state.controls);
  }

  onInstitutionValueChange(event: unknown) {
    console.log('Selected institution:', event);
    //Add your code
  }
}
