import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
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
import {
  BmbDropdownComponent,
  IBmbDropdownItem,
} from '../bmb-dropdown/bmb-dropdown.component';
import { IBmbCountryCode, IBmbCountryCodes } from '../../utils/countryCodes';
import {
  IBmbInputAppearance,
  IBmbInputError,
  IBmbInputTooltipPosition,
} from '../bmb-input/bmb-input.component';
import { BmbInputValidatorComponent } from '../bmb-input/bmb-input-validator/bmb-input-validator.component';
import {
  buildErrorMessage,
  getCustomValidation,
  getCustomValidationMessage,
  getUUID,
} from '../../utils/utils';
import { BmbInputContentComponent } from '../bmb-input/bmb-input-content/bmb-input-content.component';
import {
  assignNewFormControl,
  handleValidity,
  showError,
} from '../../utils/formControl';

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
  defaultLada = input<string>('+52'); //Deprecated
  defaultCountryCode = input<string>('mx'); //Must match the area lada of the initial value
  placeholder = input<string>('');
  appearance = input<IBmbInputAppearance>('normal'); //Deprecated
  errorMessage = input<string | IBmbInputError>('');
  disabled = input<boolean>(false);
  inputId = input<string>(this.name());
  helperMessage = input<string>('');
  preferredCountries = input<string[]>(['mx']);
  onlyCountries = input<string[]>([]);
  customValidation = input<ValidatorFn>();

  control = model<FormControl>(new FormControl());
  showError = model<boolean>(false); // deprecated

  uuid: string = getUUID();
  isFocused = signal<boolean>(false);
  allCountryCodes: IBmbCountryCode[] = IBmbCountryCodes;
  ladaControl: FormControl = new FormControl();
  phoneControl: FormControl = new FormControl({
    value: '',
    disabled: this.disabled(),
  });
  countryFiltering: IBmbDropdownItem[] = [];
  isControlNull: boolean = false;
  customValidationMessage: string = '';

  ngOnInit(): void {
    if (!this.control()) {
      this.control.set(assignNewFormControl(this.name(), this.control())!);
      this.isControlNull = true;
    }

    if (!!this.value() || !!this.control().value) {
      let inputs: string[] = [];

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

    this.phoneControl.valueChanges.subscribe((value) => {
      if (!!value) {
        this.setControlValue(
          this.getSelectedCountryLada(this.ladaControl.value),
          value,
        );
      }
    });

    this.control().valueChanges.subscribe((value) => {
      if (value === null) {
        this.phoneControl.reset('');
        this.ladaControl.reset(
          this.getSelectedCountryCode(
            this.defaultCountryCode().toLocaleLowerCase(),
          ),
        );
      }
    });
  }

  handleFocus(value: boolean): void {
    this.isFocused.set(value);
  }

  handleCustomValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;

      if (!value) return null;
      if (this.phoneControl.hasError('pattern')) return { pattern: true };
      if (
        this.phoneControl.hasError('maxlength') ||
        this.phoneControl.hasError('minlength')
      ) {
        return { minlength: true };
      }

      const regExp = new RegExp(
        `^\\${this.getSelectedCountryLada(
          this.ladaControl.value,
        )}\\d{${this.getSelectedCountryLength(this.ladaControl.value)}}$`,
      );

      if (!regExp.test(control.value)) {
        this.customValidationMessage =
          'Por favor ingresa un número de teléfono válido, verifica si la lada es correcta.';
        return { customValidation: true };
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

  getUUID(name: string): string {
    return `${name}_${this.name()}_${this.uuid}`;
  }

  setControlValue(lada: string, phoneNumber: string): void {
    if (!!lada && !!phoneNumber) {
      this.control().setValue(lada + phoneNumber);
    } else {
      this.control().reset('');
    }

    this.handleValidity();
  }

  getNumberValue(): string {
    const value = this.control().value || this.value();
    return value.replace(
      this.getSelectedCountryLada(this.ladaControl.value),
      '',
    )!;
  }

  getSelectedCountry(value: string): IBmbCountryCode {
    return this.allCountryCodes.find(
      ({ country_code }) => country_code.toLocaleLowerCase() === value,
    )!;
  }

  getSelectedCountryCode(value: string): string {
    const selectedCountry = this.getSelectedCountry(value);

    if (!!selectedCountry) {
      return selectedCountry.country_code.toLocaleLowerCase();
    }

    return '';
  }

  getSelectedCountryLada(value: string): string {
    const selectedCountry = this.getSelectedCountry(value);

    if (!!selectedCountry) {
      return selectedCountry.lada;
    }

    return '';
  }

  getSelectedCountryLength(value: string): number {
    const selectedCountry = this.getSelectedCountry(value);

    if (!!selectedCountry) {
      return selectedCountry.length;
    }

    return 0;
  }

  onValueChange(value: string) {
    if (!!this.phoneControl.value) {
      this.setControlValue(
        this.getSelectedCountryLada(value),
        this.phoneControl.value,
      );
    }
  }

  getOptions(): IBmbDropdownItem[] {
    if (this.onlyCountries().length) {
      const lowerCaseCountries = this.onlyCountries().map((country) =>
        country.toLocaleLowerCase(),
      );

      const filteredOptions = this.allCountryCodes.filter(
        ({ country_code }) => {
          return lowerCaseCountries.includes(country_code.toLocaleLowerCase());
        },
      );

      return filteredOptions.map(({ country, lada, country_code }) => ({
        name: `${country} (${lada})`,
        value: country_code.toLocaleLowerCase(),
        selectedText: lada,
        icon: 'flag',
      }));
    }

    return this.allCountryCodes.map(({ country, lada, country_code }) => ({
      name: `${country} (${lada})`,
      value: country_code.toLocaleLowerCase(),
      selectedText: lada,
      icon: 'flag',
    }));
  }

  getErrorMessage(): IBmbInputError {
    const pattern = 'Por favor ingresa sólo caracteres numéricos';
    const minLength = `Por favor ingresa ${this.getSelectedCountryLength(
      this.ladaControl.value,
    )} caracteres numéricos`;
    if (!!this.errorMessage()) {
      if (typeof this.errorMessage() === 'string')
        return {
          required: this.errorMessage().toString(),
          pattern,
          minLength,
          customValidation: this.customValidationMessage,
        };

      return {
        pattern,
        minLength,
        ...(this.errorMessage() as IBmbInputError),
        customValidation: this.customValidationMessage,
      };
    }

    return {
      pattern,
      minLength,
      customValidation: this.customValidationMessage,
    };
  }

  handleValidity(): void {
    handleValidity(this.control());
  }

  get shouldShowError(): boolean {
    return showError(this.control()) || showError(this.phoneControl);
  }
}
