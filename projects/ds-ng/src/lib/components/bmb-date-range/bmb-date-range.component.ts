import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BmbDatepickerComponent } from '../bmb-datepicker/bmb-datepicker.component';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import { IBmbInputAppearance } from '../bmb-input/bmb-input.component';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';

@Component({
  selector: 'bmb-date-range',
  standalone: true,
  imports: [BmbDatepickerComponent, CommonModule, BmbDividerComponent],
  templateUrl: './bmb-date-range.component.html',
  styleUrl: './bmb-date-range.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDateRangeComponent {
  label = input<string>('');
  placeholderStartDate = input<string>('');
  placeholderEndDate = input<string>('');
  icon = input<string>('calendar_month');
  invalidFormatErrorMessage = input<string>('');
  requiredFieldErrorMessage = input<string>('');
  appearance = input<IBmbInputAppearance | string>('normal');
  disabled = input<boolean>(false);
  isRequired = input<boolean>(false);
  isClearable = input<boolean>(false);
  controlStart = input<FormControl>(new FormControl());
  controlEnd = input<FormControl>(new FormControl());
  dateFormat = input<string>('dd/MM/yyyy');
  stepYearPicker = input<number>(12);
  name = input<string>('');
  multipleRow = input<boolean>(true);

  disableDatesBefore: string = '';
  disableDatesAfter: string = '';

  constructor() {
    this.controlStart().valueChanges.subscribe((newValue) => {
      if (newValue) {
        this.disableDatesBefore = newValue;
      }
    });

    this.controlEnd().valueChanges.subscribe((newValue) => {
      if (newValue) {
        this.disableDatesAfter = newValue;
      }
    });
  }

  getClassList(): string[] {
    const classList = ['bmb_date-range'];
    if (!this.multipleRow()) classList.push('bmb_date-range-single-row');
    return classList;
  }
}
