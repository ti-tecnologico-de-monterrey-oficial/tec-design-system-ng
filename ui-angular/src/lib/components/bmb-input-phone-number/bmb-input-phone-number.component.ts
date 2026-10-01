import {
  Component,
  DestroyRef,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {
  BmbDropdownComponent,
} from '../bmb-dropdown/bmb-dropdown.component';
import { IBmbCountryCodes } from '../../_shared/logic/countryCodes';
import {
  IBmbInputError,
  IBmbInputTooltipPosition,
  IBmbDropdownItem,
  IBmbCountryCode,
} from '../../_shared/types';
import { BmbInputValidatorComponent } from '../bmb-input/bmb-input-validator/bmb-input-validator.component';
import { buildErrorMessage, getUUID } from '../../_shared/logic/utils';
import { BmbInputContentComponent } from '../bmb-input/bmb-input-content/bmb-input-content.component';
import {
  assignNewFormControl,
  handleValidity,
  showError,
} from '../../_shared/logic/formControl';
import {
  buildPhoneNumberControlValue,
  buildPhoneNumberErrorMessage,
  findPhoneNumberCountry,
  getPhoneNumberCountryCode,
  getPhoneNumberCountryLada,
  getPhoneNumberCountryLength,
  getPhoneNumberCountryOptions,
  getPhoneNumberValidationResult,
  getPhoneNumberWithoutLada,
} from '../../_shared/logic/components/input-phone-number';

@Component({
  selector: 'bmb-input-phone-number',
  templateUrl: './bmb-input-phone-number.component.html',
  styleUrl: './bmb-input-phone-number.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BmbDropdownComponent,
    BmbInputContentComponent,
    BmbInputValidatorComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInputPhoneNumberComponent implements OnInit {
  label = input<string>('');
  name = input<string>(getUUID());
  value = input<string>('');
  isRequired = input<boolean>(false);
  tooltip = input<string>('');
  tooltipPosition = input<IBmbInputTooltipPosition>({
    align: 'above',
    justify: 'before',
  });
  defaultCountryCode = input<string>('mx'); //Must match the area lada of the initial value
  placeholder = input<string>('');
  errorMessage = input<string | IBmbInputError>('');
  disabled = input<boolean>(false);
  inputId = input<string>(this.name());
  helperMessage = input<string>('');
  preferredCountries = input<string[]>(['mx']);
  onlyCountries = input<string[]>([]);
  customValidation = input<ValidatorFn>();

  control = model<FormControl>(new FormControl());

  uuid: string = getUUID();
  isFocused = signal<boolean>(false);
  allCountryCodes: IBmbCountryCode[] = IBmbCountryCodes;
  ladaControl: FormControl = new FormControl();
  phoneControl: FormControl = new FormControl({
    value: '',
    disabled: this.disabled(),
  });
  countryFiltering: IBmbDropdownItem[] = [];
  isControlNull = false;
  customValidationMessage = '';
  private readonly destroyRef = inject(DestroyRef);
  private readonly subscriptions = new Subscription();

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.subscriptions.unsubscribe();
    });
  }

  ngOnInit(): void {
    if (!this.control()) {
      this.control.set(assignNewFormControl(this.name(), this.control())!);
      this.isControlNull = true;
    }

    if (!!this.value() || !!this.control().value) {
      const inputs: string[] = [];

      if (!this.defaultCountryCode()) {
        inputs.push('defaultCountry');
      } else if (!this.getSelectedCountry(this.defaultCountryCode())) {
        throw new Error(
          `
          [${this.name()}] - The value ${this.defaultCountryCode()} for "defaultCountryCode" does not exist in the country List.
          `,
        );
      }
      if (inputs.length) {
        throw new Error(
          `
          [${this.name()}] - The ${buildErrorMessage(inputs)} required when there is an initial "value" in "bmb-input-phone.".
          `,
        );
      }
    }

    this.ladaControl.setValue(
      this.getSelectedCountryCode(
        this.defaultCountryCode().toLocaleLowerCase(),
      ),
    );
    this.phoneControl.setValue(this.getNumberValue());
    this.countryFiltering = this.getOptions();

    this.subscriptions.add(
      this.phoneControl.valueChanges.subscribe((value) => {
        if (value) {
          this.setControlValue(
            this.getSelectedCountryLada(this.ladaControl.value),
            value,
          );
        }
      }),
    );

    this.subscriptions.add(
      this.control().valueChanges.subscribe((value) => {
        if (value === null) {
          this.phoneControl.reset('');
          this.ladaControl.reset(
            this.getSelectedCountryCode(
              this.defaultCountryCode().toLocaleLowerCase(),
            ),
          );
        }
      }),
    );
  }

  handleFocus(value: boolean): void {
    this.isFocused.set(value);
  }

  handleCustomValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;

      const { errors, message } = getPhoneNumberValidationResult(
        value,
        this.phoneControl.hasError('pattern'),
        this.phoneControl.hasError('maxlength') ||
          this.phoneControl.hasError('minlength'),
        this.getSelectedCountryLada(this.ladaControl.value),
        this.getSelectedCountryLength(this.ladaControl.value),
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

  getUUID(name: string): string {
    return `${name}_${this.name()}_${this.uuid}`;
  }

  setControlValue(lada: string, phoneNumber: string): void {
    const value = buildPhoneNumberControlValue(lada, phoneNumber);

    if (value !== null) {
      this.control().setValue(value);
    } else {
      this.control().reset('');
    }

    this.handleValidity();
  }

  getNumberValue(): string {
    return getPhoneNumberWithoutLada(
      this.control().value,
      this.value(),
      this.getSelectedCountryLada(this.ladaControl.value),
    );
  }

  getSelectedCountry(value: string): IBmbCountryCode {
    return findPhoneNumberCountry(this.allCountryCodes, value)!;
  }

  getSelectedCountryCode(value: string): string {
    return getPhoneNumberCountryCode(this.allCountryCodes, value);
  }

  getSelectedCountryLada(value: string): string {
    return getPhoneNumberCountryLada(this.allCountryCodes, value);
  }

  getSelectedCountryLength(value: string): number {
    return getPhoneNumberCountryLength(this.allCountryCodes, value);
  }

  onValueChange(value: string) {
    if (this.phoneControl.value) {
      this.setControlValue(
        this.getSelectedCountryLada(value),
        this.phoneControl.value,
      );
    }
  }

  getOptions(): IBmbDropdownItem[] {
    return getPhoneNumberCountryOptions(
      this.allCountryCodes,
      this.onlyCountries(),
    );
  }

  getErrorMessage(): IBmbInputError {
    return buildPhoneNumberErrorMessage(
      this.errorMessage(),
      this.getSelectedCountryLength(this.ladaControl.value),
      this.customValidationMessage,
    );
  }

  handleValidity(): void {
    handleValidity(this.control());
  }

  get shouldShowError(): boolean {
    return showError(this.control()) || showError(this.phoneControl);
  }
}
