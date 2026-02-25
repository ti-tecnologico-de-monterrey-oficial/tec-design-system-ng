import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  BmbButtonDirective,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbInputComponent,
} from '../../../../projects/ds-ng/src/public-api';
import { AnimeService } from '../../services/anime.service';

@Component({
  selector: 'bmb-input-page',
  templateUrl: './input.component.html',
  standalone: true,
  imports: [
    BmbInputComponent,
    BmbButtonDirective,
    ReactiveFormsModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
})
export class InputPageComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    inputField: new FormControl(),
  });

  constructor(private animeService: AnimeService) {}

  ngOnInit() {
    this.animeService.fetchTopAnime();
  }

  getFormControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
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

  handleFocus(event: boolean): void {
    console.info('handleFocus', event);
  }

  handleBlur(event: boolean): void {
    console.info('handleBlur', event);
  }

  handleChange(event: HTMLInputElement): void {
    console.info('handleChange', event);
  }
}
