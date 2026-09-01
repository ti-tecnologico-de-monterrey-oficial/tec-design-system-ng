import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  input,
  inject,
  model,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BmbDatepickerComponent } from '../bmb-datepicker/bmb-datepicker.component';
import { CommonModule } from '@angular/common';
import { IBmbInputError } from '../../_shared/types/input';
import {
  assignNewFormControl,
  newFormControlByType,
} from '../../_shared/logic/formControl';
import { getUUID } from '../../_shared/logic/utils';
import {
  getDateRangeClasses,
  getDisableDateBefore,
} from '../../_shared/logic/components/date-range';

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

@Component({
  selector: 'bmb-date-range',
  standalone: true,
  imports: [BmbDatepickerComponent, CommonModule],
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
  disableDatesBefore = input<string>('');
  disableDatesAfter = input<string>('');

  disableDatesBeforeCurrent = '';
  disableDatesAfterCurrent = '';
  isControlStartNull = false;
  isControlEndNull = false;
  private readonly destroyRef = inject(DestroyRef);
  private readonly subscriptions = new Subscription();

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.subscriptions.unsubscribe();
    });
  }

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

    const controlStartSubscription =
      this.controlStart()?.valueChanges.subscribe((value) => {
        this.disableDatesBeforeCurrent = getDisableDateBefore(
          value,
          this.dateFormat(),
          this.disableDatesBeforeCurrent,
        );
      });

    const controlEndSubscription = this.controlEnd()?.valueChanges.subscribe(
      (value) => {
        if (value) {
          this.disableDatesAfterCurrent = value;
        }
      },
    );

    if (controlStartSubscription) {
      this.subscriptions.add(controlStartSubscription);
    }

    if (controlEndSubscription) {
      this.subscriptions.add(controlEndSubscription);
    }
  }

  getClassList(): string[] {
    return getDateRangeClasses(this.multipleRow());
  }
}
