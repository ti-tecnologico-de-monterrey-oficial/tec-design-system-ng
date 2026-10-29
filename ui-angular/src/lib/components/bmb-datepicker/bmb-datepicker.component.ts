import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  model,
  OnInit,
  output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { DateTime } from 'luxon';
import {
  IBmbInputError,
  IBmbInputTooltipPosition,
} from '../../_shared/types/input';
import { BmbProjectionContentService } from '../../services/projection/projection.service';
import { BmbDatepickerModalComponent } from './bmb-datepicker-modal/bmb-datepicker-modal.component';
import { getUUID } from '../../_shared/logic/utils';
import {
  assignNewFormControl,
  newFormControlByType,
  showError,
} from '../../_shared/logic/formControl';
import { BmbInputContentComponent } from '../bmb-input/bmb-input-content/bmb-input-content.component';
import { BmbInputValidatorComponent } from '../bmb-input/bmb-input-validator/bmb-input-validator.component';
import {
  buildDatepickerErrorMessage,
  getDatepickerValidationResult,
  parseDatepickerDate,
} from '../../_shared/logic/components/datepicker';

@Component({
  selector: 'bmb-datepicker',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BmbInputContentComponent,
    BmbInputValidatorComponent,
    BmbDatepickerModalComponent,
  ],
  templateUrl: './bmb-datepicker.component.html',
  styleUrl: './bmb-datepicker.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDatepickerComponent implements OnInit {
  label = input<string>('');
  icon = input<string>('calendar_month');
  dateFormat = input<string>('dd/MM/yyyy');
  invalidFormatErrorMessage = input<string>(); //The default value is assigned as '||' in the corresponding error message
  requiredFieldErrorMessage = input<string>(); //The default value is assigned as '||' in the corresponding error message
  disabled = input<boolean>(false);
  isRequired = input<boolean>(false);
  isClearable = input<boolean>(false);
  placeholder = input<string>(this.dateFormat());
  stepYearPicker = input<number>(18);
  name = input<string>(getUUID());
  disableDatesBefore = input<string>('');
  disableDatesAfter = input<string>('');
  helperMessage = input<string>(this.dateFormat());
  value = input<string>();
  customValidation = input<ValidatorFn>();
  errorMessage = input<string | IBmbInputError>('');
  inputId = input<string>(this.name());
  tooltip = input<string>('');
  tooltipPosition = input<IBmbInputTooltipPosition>({
    align: 'above',
    justify: 'before',
  });
  control = model<FormControl>(newFormControlByType());

  onChange = output<string>();

  now = DateTime.now();
  defaultDate = new Date();
  isWindowOpen = false;
  isControlNull = false;
  customValidationMessage = '';
  uuid: string = getUUID();

  @ViewChild('contentDiv', { static: true }) contentRef!: ElementRef<any>;
  @ViewChild('modalTemplate', { static: true })
  modalTemplateRef!: TemplateRef<any>;

  private projectionService: BmbProjectionContentService = inject(BmbProjectionContentService);

  ngOnInit(): void {
    if (!this.control()) {
      this.control.set(assignNewFormControl(this.name(), this.control())!);
      this.isControlNull = true;
    }
  }

  handleCustomValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { errors, message } = getDatepickerValidationResult(
        control.value,
        this.dateFormat(),
        this.customValidation(),
        this.control(),
        this.errorMessage(),
      );

      if (message !== undefined) {
        this.customValidationMessage = message;
      }

      return errors;
    };
  }

  getErrorMessage(): IBmbInputError {
    return buildDatepickerErrorMessage(
      this.requiredFieldErrorMessage(),
      this.label(),
      this.customValidationMessage,
      this.errorMessage(),
    );
  }

  handleFocusedEvent(event: KeyboardEvent | MouseEvent) {
    if (this.disabled()) return;

    const data = {
      content: this.modalTemplateRef,
      targetRef: this.contentRef?.nativeElement,
      fixSizeToRef: true,
      showBackdrop: false,
      focusOnOpen: true,
    };

    if (event instanceof KeyboardEvent) {
      if (event.key === 'Enter' || event.key === ' ') {
        if (!this.isWindowOpen) {
          event.preventDefault();
          this.projectionService.openContent(data);
        }
      }
    }

    if (event instanceof MouseEvent) {
      if (!this.isWindowOpen) this.projectionService.openContent(data);
    }
  }

  handleWindowOpen(event: boolean) {
    this.isWindowOpen = event;
  }

  handleValueChange(event: string) {
    this.control().setValue(event);
    this.projectionService.closeContent();
    this.onChange.emit(event);
  }

  convertToDate(date: string): DateTime | null {
    return parseDatepickerDate(date, this.dateFormat());
  }

  get shouldShowError(): boolean {
    return showError(this.control());
  }
}
