import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import type { ValidatorFn } from '@angular/forms';
import { BmbDateRangeComponent } from 'ui-angular';
import type { IBmbInputError } from 'ui-angular';

@Component({
  selector: 'app-date-range-page',
  imports: [BmbDateRangeComponent, JsonPipe],
  templateUrl: './date-range-page.html',
  styleUrl: './date-range-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePage {
  readonly controlStart = new FormControl('');
  readonly controlEnd = new FormControl('');
  readonly inputId = signal('date_range_page');
  readonly name = signal('date_range_page');
  readonly labelStartDate = signal('Fecha inicial');
  readonly labelEndDate = signal('Fecha final');
  readonly icon = signal('calendar_month');
  readonly dateFormat = signal('dd/MM/yyyy');
  readonly placeholderStartDate = signal('dd/MM/yyyy');
  readonly placeholderEndDate = signal('dd/MM/yyyy');
  readonly stepYearPicker = signal(12);
  readonly disableDatesBefore = signal('');
  readonly disableDatesAfter = signal('');
  readonly invalidFormatErrorMessage = signal('');
  readonly requiredFieldErrorMessage = signal('');
  readonly errorMessage = signal('');
  readonly multipleRow = signal(false);
  readonly isRequired = signal(false);
  readonly isClearable = signal(false);
  readonly disabled = signal(false);
  readonly useStructuredErrors = signal(false);
  readonly requiredError = signal('Selecciona una fecha.');
  readonly customError = signal(
    'Fecha rechazada por la validación de ejemplo.',
  );
  readonly customValidationEnabled = signal(false);
  readonly customValidation: ValidatorFn = (control) =>
    this.customValidationEnabled() && control.value
      ? { customValidation: true }
      : null;
  readonly resolvedErrorMessage = computed<string | IBmbInputError>(() =>
    this.useStructuredErrors()
      ? { required: this.requiredError(), customValidation: this.customError() }
      : this.errorMessage(),
  );
  readonly lastModelEvent = signal('Sin cambios de instancia de FormControl');
  private readonly startEvents = toSignal(this.controlStart.events);
  private readonly endEvents = toSignal(this.controlEnd.events);
  readonly controlStartState = computed(() => {
    this.startEvents();
    return {
      value: this.controlStart.value,
      status: this.controlStart.status,
      errors: this.controlStart.errors,
      touched: this.controlStart.touched,
      dirty: this.controlStart.dirty,
    };
  });
  readonly controlEndState = computed(() => {
    this.endEvents();
    return {
      value: this.controlEnd.value,
      status: this.controlEnd.status,
      errors: this.controlEnd.errors,
      touched: this.controlEnd.touched,
      dirty: this.controlEnd.dirty,
    };
  });

  setControlStartValue(value: string): void {
    this.controlStart.setValue(value);
    this.controlStart.markAsDirty();
  }

  setControlEndValue(value: string): void {
    this.controlEnd.setValue(value);
    this.controlEnd.markAsDirty();
  }

  validateControls(): void {
    this.controlStart.updateValueAndValidity();
    this.controlEnd.updateValueAndValidity();
    this.controlStart.markAsTouched();
    this.controlEnd.markAsTouched();
  }

  clearControls(): void {
    this.controlStart.reset('');
    this.controlEnd.reset('');
  }

  handleControlStartChange(control: FormControl): void {
    this.lastModelEvent.set(
      `controlStartChange: ${JSON.stringify(control.value)}`,
    );
  }

  handleControlEndChange(control: FormControl): void {
    this.lastModelEvent.set(
      `controlEndChange: ${JSON.stringify(control.value)}`,
    );
  }

  setInputId(value: string): void {
    this.inputId.set(value);
  }

  setName(value: string): void {
    this.name.set(value);
  }

  setLabelStartDate(value: string): void {
    this.labelStartDate.set(value);
  }

  setLabelEndDate(value: string): void {
    this.labelEndDate.set(value);
  }

  setIcon(value: string): void {
    this.icon.set(value);
  }

  setDateFormat(value: string): void {
    this.dateFormat.set(value);
  }

  setPlaceholderStartDate(value: string): void {
    this.placeholderStartDate.set(value);
  }

  setPlaceholderEndDate(value: string): void {
    this.placeholderEndDate.set(value);
  }

  setStepYearPicker(value: number): void {
    this.stepYearPicker.set(value);
  }

  setDisableDatesBefore(value: string): void {
    this.disableDatesBefore.set(value);
  }

  setDisableDatesAfter(value: string): void {
    this.disableDatesAfter.set(value);
  }

  setInvalidFormatErrorMessage(value: string): void {
    this.invalidFormatErrorMessage.set(value);
  }

  setRequiredFieldErrorMessage(value: string): void {
    this.requiredFieldErrorMessage.set(value);
  }

  setErrorMessage(value: string): void {
    this.errorMessage.set(value);
  }

  setMultipleRow(value: boolean): void {
    this.multipleRow.set(value);
  }

  setIsRequired(value: boolean): void {
    this.isRequired.set(value);
  }

  setIsClearable(value: boolean): void {
    this.isClearable.set(value);
  }

  setDisabled(value: boolean): void {
    this.disabled.set(value);
  }
}
