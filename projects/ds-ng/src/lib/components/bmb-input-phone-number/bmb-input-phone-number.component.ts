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
  FormGroup,
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
import { BmbInputValidationComponent } from '../bmb-input/bmb-input-validation/bmb-input-validation.component';
import { buildErrorMessage, getUUID } from '../../utils/utils';
import { BmbInputValidationService } from '../bmb-input/bmb-input-validation/bmb-input-validation.service';
import { BmbInputContentComponent } from '../bmb-input/bmb-input-content/bmb-input-content.component';

@Component({
  selector: 'bmb-input-phone-number',
  templateUrl: './bmb-input-phone-number.component.html',
  styleUrls: ['./bmb-input-phone-number.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BmbDropdownComponent,
    BmbInputContentComponent,
    BmbInputValidationComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInputPhoneNumberComponent implements OnInit {
  label = input<string>();
  name = input<string>(window.crypto.randomUUID());
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
  inputId = input<string>('');
  helperMessage = input<string>('');
  preferredCountries = input<string[]>(['mx']);
  onlyCountries = input<string[]>([]);

  control = model<FormControl>(new FormControl());
  showError = model<boolean>(false); // deprecated

  isFocused = signal<boolean>(false);
  allCountryCodes: IBmbCountryCode[] = IBmbCountryCodes;
  controls = new FormGroup({
    select: new FormControl(),
    input: new FormControl(''),
  });
  selectedCountry: IBmbCountryCode | undefined;

  constructor(private ivs: BmbInputValidationService) {}

  ngOnInit(): void {
    if (!!this.value() || !!this.control().value) {
      let inputs: string[] = [];

      if (!this.defaultCountryCode()) {
        inputs.push('defaultCountry');
      } else if (!this.getSelectedCountry(this.defaultCountryCode())) {
        throw new Error(
          `
          The value ${this.defaultCountryCode()} for "defaultCountryCode" does not exist in the country List.
          `,
        );
      }
      if (inputs.length) {
        throw new Error(
          `
          The ${buildErrorMessage(inputs)} required when there is an initial "value" in "bmb-input-phone".
          `,
        );
      }
    }

    this.selectedCountry = this.getSelectedCountry(
      this.defaultCountryCode().toLocaleLowerCase(),
    );

    this.getControl('input').setValue(this.getNumberValue());

    this.getControl('input').valueChanges.subscribe((value) => {
      this.setControlValue(this.selectedCountry?.lada!, value);
    });

    this.control().valueChanges.subscribe((value) => {
      if (value === null) {
        this.selectedCountry = this.getSelectedCountry(
          this.defaultCountryCode().toLocaleLowerCase(),
        );
        this.getControl('input').setValue('');
        this.getControl('select').setValue(
          this.selectedCountry.country_code.toLocaleLowerCase(),
        );
      }
    });
  }

  handleFocus(value: boolean): void {
    this.isFocused.set(value);
  }

  customValidatorPhone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;

      if (!value) return null;

      if (this.getControl('input').hasError('pattern'))
        return { pattern: true };

      if (
        this.getControl('input').hasError('maxlength') ||
        this.getControl('input').hasError('minlength')
      )
        return { minlength: true };

      const regExp = new RegExp(
        `^\\${this.selectedCountry?.lada}\\d{${this.selectedCountry?.length}}$`,
      );

      return !regExp.test(control.value) ? { customValidation: true } : null;
    };
  }

  generateID(): string {
    return getUUID();
  }

  setControlValue(lada: string, phoneNumber: string): void {
    const control = this.getFormControl();

    if (!!lada && !!phoneNumber) {
      control.setValue(lada + phoneNumber);
    } else {
      control.setValue('');
    }

    control.updateValueAndValidity();
    control.markAsTouched();
  }

  getNumberValue(): string {
    const value = this.control().value || this.value();
    return value.replace(this.selectedCountry?.lada!, '')!;
  }

  getSelectedCountry(value: string): IBmbCountryCode {
    return this.allCountryCodes.find(
      ({ country_code }) => country_code.toLocaleLowerCase() === value,
    )!;
  }

  onValueChange(event: any) {
    this.selectedCountry = this.getSelectedCountry(event.toLocaleLowerCase());
    this.setControlValue(
      this.selectedCountry?.lada!,
      this.getControl('input').value!,
    );
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
    const customValidation =
      'Número de teléfono no válido, se debe verificar si la lada es correcta.';
    const pattern = 'Sólo se permiten caracteres numéricos';
    const minLength = `Deben ser ${this.selectedCountry?.length} caracteres numéricos`;
    if (!!this.errorMessage()) {
      if (typeof this.errorMessage() === 'string')
        return {
          required: this.errorMessage().toString(),
          pattern,
          minLength,
          customValidation,
        };

      return {
        pattern,
        minLength,
        ...(this.errorMessage() as IBmbInputError),
        customValidation,
      };
    }

    return {
      pattern,
      minLength,
      customValidation,
    };
  }

  handleValidity(): void {
    this.ivs.handleValidity(this.name());
  }

  get shouldShowError(): boolean {
    return this.ivs.showError(this.name()) || this.ivs.showError('input');
  }

  getControl(name: string): FormControl {
    return this.controls.get(name) as FormControl;
  }

  getFormControl(): FormControl {
    return this.ivs.getFormControlByName(this.name());
  }
}
