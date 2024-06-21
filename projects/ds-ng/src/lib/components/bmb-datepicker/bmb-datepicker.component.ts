import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule, FormControl } from '@angular/forms';
import { DateTime } from 'luxon';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { InputType } from '../bmb-input/bmb-input.interface';

@Component({
  selector: 'bmb-datepicker',
  standalone: true,
  imports: [BmbIconComponent, FormsModule, BmbInputComponent],
  templateUrl: './bmb-datepicker.component.html',
  styleUrl: './bmb-datepicker.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDatepickerComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() icon: string = 'calendar_month';
  @Input() errorMessage: string = 'Invalid format';
  @Input() isDisabled: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() value?: string | undefined;
  @Input() isClearable: boolean = false;
  @Input() appearance: InputType = 'normal';
  @Input() dateFormat: string = 'dd/mm/yyyy';
  @Input() inline: boolean = false;
  @Input() stepYearPicker: number = 12;
  @Input() formControl!: FormControl | undefined;

  @Output() handleClick: EventEmitter<any> = new EventEmitter();
  @Output() handleFocus: EventEmitter<any> = new EventEmitter();
  @Output() handleBlur: EventEmitter<any> = new EventEmitter();
  @Output() handleMouseover: EventEmitter<any> = new EventEmitter();
  @Output() handleChange: EventEmitter<any> = new EventEmitter();

  defaultDate = new Date();

  ngOnInit(): void {
    if (!this.formControl) {
      this.formControl = new FormControl();
    }
  }

  // showErrorMessage = false;
  // inputModel: string | undefined;

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['value']?.currentValue && !this.checkValue(changes['value'].currentValue)) {
  //     this.showErrorMessage = true;
  //   };

  // }

  // ngAfterViewInit() {
  //   if (this.isDisabled && this.formControl) {
  //     this.formControl.disable();
  //   }
  //   setTimeout(() => {
  //     if (this.value && this.inputModel !== undefined) {
  //       this.value = undefined;
  //     }
  //   }, 0);
  // }

  // ngOnInit() {
  //   console.log('this.formControl', this.formControl);
  // }

  // checkValue(date: string): boolean {
  //   return DateTime.fromFormat(date, this.dateFormat).isValid;
  // }
}
