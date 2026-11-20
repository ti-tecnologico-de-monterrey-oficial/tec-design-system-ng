import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import {
  FormControl,
  TouchedChangeEvent,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { getUUID } from '../../_shared/logic/utils';
import { newFormControlByType } from '../../_shared/logic/formControl';
import { IBmbInputError } from '../../_shared/types/input';
import { BmbDatepickerComponent } from '../bmb-datepicker/bmb-datepicker.component';
import { BmbTimepickerComponent } from '../bmb-timepicker/bmb-timepicker.component';
import type {
  IBmbTimepickerFormat,
  IBmbMinuteStep,
} from '../../_shared/types/components/timepicker';

@Component({
  selector: 'bmb-date-time-picker',
  standalone: true,
  imports: [
    BmbDatepickerComponent,
    BmbTimepickerComponent,
  ],
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
  customValidation = input<ValidatorFn>();
  errorMessage = input<string | IBmbInputError>('');
  control = model<FormControl>(newFormControlByType());
  isClearable = input<boolean>(false);
  dateHelperMessage = input<string>('');
  timeHelperMessage = input<string>('');

  readonly dateControl = newFormControlByType();
  readonly timeControl = newFormControlByType();

  private readonly destroyRef = inject(DestroyRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private updatingCombinedControl = false;
  private controlSubscription?: Subscription;
  private appliedValidators: ValidatorFn[] = [];
  private validatorsControl?: FormControl;
  private initialized = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.initialized) return;
    if (changes['control']) this.connectCombinedControl();
    if (
      changes['control'] ||
      changes['isRequired'] ||
      changes['customValidation']
    ) {
      this.applyValidators();
    }
  }

  ngOnInit(): void {
    this.initialized = true;
    this.connectCombinedControl();
    this.applyValidators();
    this.dateControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateCombinedControl());
    this.timeControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.handleTimeChange());
  }

  /** Also bound to the timepicker's getChange, since its list selection doesn't emit valueChanges. */
  handleTimeChange(): void {
    this.updateCombinedControl();
    if (this.timeControl.value && !this.dateControl.value) {
      this.markFieldAsTouched(this.dateControl);
      this.cdr.markForCheck();
    }
  }

  private connectCombinedControl(): void {
    this.controlSubscription?.unsubscribe();
    const control = this.control();
    this.syncFromCombinedControl(control.value);
    if (control.touched) this.markFieldsAsTouched();
    this.controlSubscription = control.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (
          event instanceof TouchedChangeEvent &&
          event.touched &&
          !this.updatingCombinedControl
        ) {
          this.markFieldsAsTouched();
        }
        this.cdr.markForCheck();
      });
    this.controlSubscription.add(
      control.valueChanges
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((value) => {
          if (!this.updatingCombinedControl) {
            this.syncFromCombinedControl(value);
          }
        }),
    );
  }

  private applyValidators(): void {
    this.validatorsControl?.removeValidators(this.appliedValidators);
    this.validatorsControl?.updateValueAndValidity({ emitEvent: false });

    const control = this.control();
    const customValidation = this.customValidation();
    this.appliedValidators = [
      ...(this.isRequired() && !control.hasValidator(Validators.required)
        ? [Validators.required]
        : []),
      ...(customValidation ? [customValidation] : []),
    ];
    control.addValidators(this.appliedValidators);
    control.updateValueAndValidity({ emitEvent: false });
    this.validatorsControl = control;
  }

  private markFieldsAsTouched(): void {
    [this.dateControl, this.timeControl].forEach((field) =>
      this.markFieldAsTouched(field),
    );
  }

  private markFieldAsTouched(field: FormControl): void {
    if (field.touched) return;
    field.markAsTouched();
    // Emits valueChanges so the OnPush child validators refresh their error state.
    field.updateValueAndValidity();
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

    if (control.value === value) return;

    this.updatingCombinedControl = true;
    control.setValue(value);
    control.markAsDirty();
    control.markAsTouched();
    this.updatingCombinedControl = false;
  }
}
