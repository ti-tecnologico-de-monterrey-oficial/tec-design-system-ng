import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BmbDateRangeComponent } from 'ui-angular';

@Component({
  selector: 'app-date-range-page',
  imports: [BmbDateRangeComponent],
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
