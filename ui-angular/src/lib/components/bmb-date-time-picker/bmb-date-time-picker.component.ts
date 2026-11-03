import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  model,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { getUUID } from '../../_shared/logic/utils';
import { newFormControlByType } from '../../_shared/logic/formControl';
import { BmbDatepickerComponent } from '../bmb-datepicker/bmb-datepicker.component';
import { BmbTimepickerComponent } from '../bmb-timepicker/bmb-timepicker.component';
import type {
  IBmbMinuteStep,
  IBmbTimepickerFormat,
} from '../bmb-timepicker/bmb-timepicker.component';

@Component({
  selector: 'bmb-date-time-picker',
  standalone: true,
  imports: [BmbDatepickerComponent, BmbTimepickerComponent],
  templateUrl: './bmb-date-time-picker.component.html',
  styleUrl: './bmb-date-time-picker.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDateTimePickerComponent implements OnChanges, OnInit {
  inputId = input<string>(getUUID());
  name = input<string>(getUUID());
  labelDate = input<string>('');
  labelTime = input<string>('');
  dateFormat = input<string>('dd/MM/yyyy');
  timeFormat = input<IBmbTimepickerFormat>('12h');
  minuteStep = input<IBmbMinuteStep>(15);
  disabled = input<boolean>(false);
  isRequired = input<boolean>(false);
  disableDatesBefore = input<string>('');
  disableDatesAfter = input<string>('');
  control = model<FormControl>(newFormControlByType());
  readonly dateControl = newFormControlByType();
  readonly timeControl = newFormControlByType();

  private readonly destroyRef = inject(DestroyRef);
  private updatingCombinedControl = false;
  private controlSubscription?: Subscription;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['control']) return;

    this.controlSubscription?.unsubscribe();
    const control = this.control();
    this.syncFromCombinedControl(control.value);
    this.controlSubscription = control
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        if (!this.updatingCombinedControl) {
          this.syncFromCombinedControl(value);
        }
      });
  }

  ngOnInit(): void {
    this.dateControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateCombinedControl());
    this.timeControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateCombinedControl());
  }

  private syncFromCombinedControl(value: unknown): void {
    const [date = '', time = ''] =
      typeof value === 'string' ? value.split(' - ', 2) : [];
    this.dateControl.setValue(date, { emitEvent: false });
    this.timeControl.setValue(time, { emitEvent: false });
  }

  private updateCombinedControl(): void {
    const date = this.dateControl.value || '';
    const time = this.timeControl.value || '';
    const value = date && time ? `${date} - ${time}` : '';
    const control = this.control();

    if (control.value !== value) {
      this.updatingCombinedControl = true;
      control.setValue(value);
      this.updatingCombinedControl = false;
    }
    control.markAsDirty();
    control.markAsTouched();
  }
}
