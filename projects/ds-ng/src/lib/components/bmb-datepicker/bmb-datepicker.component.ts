import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
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
  IBmbInputAppearance,
  IBmbInputError,
  IBmbInputTooltipPosition,
} from '../bmb-input/bmb-input.component';
import { BmbProjectionContentService } from '../../services/projection/projection.service';
import { BmbDatepickerModalComponent } from './bmb-datepicker-modal/bmb-datepicker-modal.component';
import {
  getCustomValidation,
  getCustomValidationMessage,
  getUUID,
  isErrorMessageSet,
} from '../../utils/utils';
import {
  assignNewFormControl,
  newFormControlByType,
  showError,
} from '../../utils/formControl';
import { BmbInputContentComponent } from '../bmb-input/bmb-input-content/bmb-input-content.component';
import { BmbInputValidatorComponent } from '../bmb-input/bmb-input-validator/bmb-input-validator.component';

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
  isControlNull: boolean = false;
  customValidationMessage: string = '';
  uuid: string = getUUID();

  @ViewChild('contentDiv', { static: true }) contentRef!: ElementRef<any>;
  @ViewChild('modalTemplate', { static: true })
  modalTemplateRef!: TemplateRef<any>;

  constructor(private projectionService: BmbProjectionContentService) {}

  ngOnInit(): void {
    if (!this.control()) {
      this.control.set(assignNewFormControl(this.name(), this.control())!);
      this.isControlNull = true;
    }
  }

  handleCustomValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      if (!value) return null;

      const isValidDate = DateTime.fromFormat(
        control.value,
        this.dateFormat(),
      ).isValid;

      if (!isValidDate) {
        this.customValidationMessage = `Por favor ingresa la fecha con formato ${this.dateFormat()}`;
        return {
          customValidation: true,
        };
      }

      const result = getCustomValidation(
        this.customValidation()!,
        this.control(),
      );
      this.customValidationMessage = getCustomValidationMessage(
        result,
        this.errorMessage(),
      );

      return result;
    };
  }

  getErrorMessage(): IBmbInputError {
    const defaultErrorMessages: IBmbInputError = {
      required:
        this.requiredFieldErrorMessage() ||
        `Por favor ingresa la fecha de ${this.label()}`,
      customValidation: this.customValidationMessage,
    };

    if (isErrorMessageSet(this.errorMessage())) {
      const errorMessages = this.errorMessage() as IBmbInputError;
      return {
        ...defaultErrorMessages,
        required: errorMessages.required || defaultErrorMessages.required,
      };
    }

    return defaultErrorMessages;
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
    const dateTime = DateTime.fromFormat(date, this.dateFormat());
    return dateTime.isValid ? dateTime : null;
  }

  get shouldShowError(): boolean {
    return showError(this.control());
  }
}
