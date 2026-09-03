import { Component, computed, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  BmbDropdownComponent,
  BmbButtonDirective,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbBookmarkComponent,
  BmbFormValidatorComponent,
} from 'ui-angular';

@Component({
  selector: 'app-dropdown-page',
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
export class DropdownPageComponent {
  userForm: FormGroup = new FormGroup({});

  getFormControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
  }

  handleDropdownChange(event: unknown) {
    //Add your code
  }

  // options = computed(() => {
  //   const elements = this.animeService.topAnime();
  //   return elements.data.map((anime) => anime.title);
  // });
  options = [
    // { name: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. ', value: '_apple', icon: 'home', id: 'apple_' },
    { name: 'Banana name', value: '_banana', icon: 'bolt', id: 'banana_' },
    { name: 'Orange name', value: '_orange', icon: 'bolt', id: 'orange_' },
    { name: 'Pear name', value: '_pear', icon: 'info', id: 'pear_' },
    { name: 'Grape name', value: '_grape', icon: 'bolt', id: 'grape_' },
    { name: 'Mango name', value: '_mango', icon: 'star', id: 'mango_' },
    {
      name: 'Strawberry name',
      value: '_strawberry',
      icon: 'favorite',
      id: 'strawberry_',
    },
    {
      name: 'Blueberry name',
      value: '_blueberry',
      icon: 'circle',
      id: 'blueberry_',
    },
    {
      name: 'Watermelon name',
      value: '_watermelon',
      icon: 'water_drop',
      id: 'watermelon_',
    },
    {
      name: 'Pineapple name',
      value: '_pineapple',
      icon: 'sunny',
      id: 'pineapple_',
    },
    {
      name: 'Cherry name',
      value: '_cherry',
      icon: 'heart_broken',
      id: 'cherry_',
    },
    { name: 'Peach name', value: '_peach', icon: 'spa', id: 'peach_' },
    { name: 'Lemon name', value: '_lemon', icon: 'wb_sunny', id: 'lemon_' },
    { name: 'Kiwi name', value: '_kiwi', icon: 'eco', id: 'kiwi_' },
    {
      name: 'Coconut name',
      value: '_coconut',
      icon: 'beach_access',
      id: 'coconut_',
    },
  ];

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
