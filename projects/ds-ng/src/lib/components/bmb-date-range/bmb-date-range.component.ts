import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { BmbDatepickerComponent } from '../bmb-datepicker/bmb-datepicker.component';
import { CommonModule } from '@angular/common';
import { IBmbInputError } from '../bmb-input/bmb-input.component';
import {
  assignNewFormControl,
  newFormControlByType,
} from '../../utils/formControl';
import { getUUID } from '../../utils/utils';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';

@Component({
  selector: 'bmb-date-range',
  standalone: true,
  imports: [
    BmbDatepickerComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    CommonModule,
  ],
  templateUrl: './bmb-date-range.component.html',
  styleUrl: './bmb-date-range.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDateRangeComponent implements OnInit {
  inputId = input<string>(getUUID());
  labelStartDate = input<string>('');
  labelEndDate = input<string>('');
  icon = input<string>('calendar_month');
  invalidFormatErrorMessage = input<string>();
  requiredFieldErrorMessage = input<string>();
  disabled = input<boolean>(false);
  isRequired = input<boolean>(false);
  isClearable = input<boolean>(false);
  controlStart = model<FormControl>(newFormControlByType());
  controlEnd = model<FormControl>(newFormControlByType());
  dateFormat = input<string>('dd/MM/yyyy');
  placeholderStartDate = input<string>(this.dateFormat());
  placeholderEndDate = input<string>(this.dateFormat());
  stepYearPicker = input<number>(12);
  name = input<string>(getUUID());
  multipleRow = input<boolean>(false);
  customValidation = input<ValidatorFn>();
  errorMessage = input<string | IBmbInputError>('');

  disableDatesBefore: string = '';
  disableDatesAfter: string = '';
  isControlStartNull: boolean = false;
  isControlEndNull: boolean = false;

  ngOnInit() {
    if (!this.controlStart()) {
      this.controlStart.set(
        assignNewFormControl(this.name(), this.controlStart())!,
      );
      this.isControlStartNull = true;
    }

    if (!this.controlEnd()) {
      this.controlEnd.set(
        assignNewFormControl(this.name(), this.controlEnd())!,
      );
      this.isControlEndNull = true;
    }

    this.controlStart()?.valueChanges.subscribe((value) => {
      if (!!value) {
        this.disableDatesBefore = value;
      }
    });

    this.controlEnd()?.valueChanges.subscribe((value) => {
      if (!!value) {
        this.disableDatesAfter = value;
      }
    });
  }
}
