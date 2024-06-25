import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormsModule,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { DateTime } from 'luxon';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { BmbDatepickerModalComponent } from './bmb-datepicker-modal/bmb-datepicker-modal.component';

@Component({
  selector: 'bmb-datepicker',
  standalone: true,
  imports: [
    BmbIconComponent,
    FormsModule,
    BmbInputComponent,
    ReactiveFormsModule,
    BmbDatepickerModalComponent,
  ],
  templateUrl: './bmb-datepicker.component.html',
  styleUrl: './bmb-datepicker.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDatepickerComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() icon: string = 'calendar_month';
  @Input() invalidFormaterrorMessage: string = 'Formato invalido';
  @Input() requiredFieldErrorMessage: string = 'Campo requerido';
  @Input() appearance: string = 'normal';
  @Input() disabled: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() isClearable: boolean = false;
  @Input() control: FormControl = new FormControl();
  @Input() dateFormat: string = 'dd/MM/yyyy';
  @Input() inline: boolean = false;
  @Input() stepYearPicker: number = 12;
  @Input() name: string = '';

  childNodes: any = null;
  now = DateTime.now();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const eventTarget = event.target as HTMLSpanElement;

    if (this.childNodes?.contains(eventTarget) || eventTarget?.classList?.contains('modal-persist')) {
      this.isWindowOpen = true;
    } else {
      this.isWindowOpen = false;
    }


  }

  ngAfterViewInit() {
    this.childNodes = this.elementRef.nativeElement;
  }

  defaultDate = new Date();
  isWindowOpen = false;

  clearValue() {
    this.control.reset();
  }

  ngOnInit() {
    this.control.addValidators(this.customValidatorDate());
    this.control.updateValueAndValidity();
  }

  customValidatorDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      if (!value) return null;

      const isValidDate = DateTime.fromFormat(
        control.value,
        this.dateFormat,
      ).isValid;

      return !isValidDate ? { validationDate: true } : null;
    };
  }

  getErrorMessage(errors: ValidationErrors | null): string {
    if (errors?.['validationDate']) return this.invalidFormaterrorMessage;
    if (errors?.['required']) return this.requiredFieldErrorMessage;
    return '';
  }

  handleFouseEvent(event: boolean) {
    if (event) {
      this.isWindowOpen = event;
    }
  }

  handleWindowOpen(event: boolean) {
    this.isWindowOpen = event;
  }

  handleValueChange(event: string) {
    this.control.setValue(event);
    this.isWindowOpen = false;
  }
}
