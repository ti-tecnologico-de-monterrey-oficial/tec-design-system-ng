import { Component, computed, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  BmbDropdownComponent,
  BmbButtonDirective,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbBookmarkComponent,
} from '../../../../projects/ds-ng/src/public-api';
// import { AnimeService } from '../../services/anime.service';

@Component({
  selector: 'bmb-dropdown-page',
  templateUrl: './dropdown.component.html',
  standalone: true,
  imports: [
    BmbButtonDirective,
    BmbDropdownComponent,
    ReactiveFormsModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbBookmarkComponent
  ],
})
export class DropdownPageComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    dropdown: new FormControl(),
  });

  // constructor(private animeService: AnimeService) {}

  ngOnInit() {
    // this.animeService.fetchTopAnime();
  }

  getFormControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
  }

  handleDropdownChange(event: unknown) {
    //Add your code
  }

  onSubmit() {
    if (this.userForm.valid) {
      //Add your code
      return;
    }
    this.userForm.markAllAsTouched();
    this.updateErrorState();
  }

  updateErrorState() {
    Object.keys(this.userForm.controls).forEach((field: any) => {
      const control = this.getFormControl(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });
  }

  options = computed(() => {
    return []
    // const elements = this.animeService.topAnime();
    // return elements.data.map((anime) => anime.title);
  });

  handleBookmarkChange(isActive: boolean) {
    console.log('Bookmark active state changed:', isActive);
    //Add your code
  }
}
