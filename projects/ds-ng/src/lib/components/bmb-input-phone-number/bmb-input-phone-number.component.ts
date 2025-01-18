import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IBmbCountryCode, IBmbCountryCodes } from '../../utils/countryCodes';
import {
  BmbDropdownComponent,
  IBmbDropdownItem,
} from '../bmb-dropdown/bmb-dropdown.component';
import {
  BmbInputComponent,
  IBmbInputAppearance,
  IBmbInputError,
} from '../bmb-input/bmb-input.component';
import { BmbTooltipComponent } from '../bmb-tooltip/bmb-tooltip.component';

@Component({
  selector: 'bmb-input-phone-number',
  templateUrl: './bmb-input-phone-number.component.html',
  styleUrls: ['./bmb-input-phone-number.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    BmbDropdownComponent,
    BmbInputComponent,
    BmbTooltipComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInputPhoneNumberComponent {
  defaultLada = input<string>('+52');
  label = input<string>('Teléfono');
  placeholder = input<string>('Ingrese su número de teléfono');
  disabled = input<boolean>(false);
  helperMessage = input<string>('Ejemplo: 5512345678');
  errorMessage = input<string | IBmbInputError>({
    required: 'This field is required.',
    minLength: 'Minimum characters.',
    pattern: 'Only accepts numbers.',
  });
  appearance = input<IBmbInputAppearance>('normal');
  isRequired = input<boolean>(true);
  control = input<FormControl>(new FormControl());
  inputId = input<string>('bmbInputPhoneNumber');

  allCountryCodes: IBmbCountryCode[] = IBmbCountryCodes;
  selectedCountry = signal<IBmbCountryCode>(
    this.findCountryCode(this.defaultLada()),
  );
  phoneNumber: any;
  showError = false;

  tooltip() {
    return `Se requiere un número de teléfono válido de ${this.selectedCountry().length} dígitos`;
  }

  ngOnInit() {
    this.phoneNumber = this.controls
      .get('input')
      ?.valueChanges.subscribe((value) => {
        this.control().setValue(`${this.selectedCountry().lada}${value}`);
        this.showError = !!this.controls.get('input')?.errors;
      });
  }

  buildValidators() {
    const validators = [];
    if (this.isRequired()) validators.push(Validators.required);
    const regex = `^\d{${this.selectedCountry().length}}$`;
    validators.push(Validators.pattern(new RegExp(regex)));

    return validators;
  }

  getOptions(): IBmbDropdownItem[] {
    return this.allCountryCodes.map(({ country, lada }) => ({
      name: `${country} (${lada})`,
      value: lada,
      icon: 'flag',
    }));
  }

  controls = new FormGroup({
    select: new FormControl(this.defaultLada()),
    input: new FormControl(''),
  });

  onValueChange(event: any) {
    const country = this.findCountryCode(event.value);
    this.selectedCountry.set(country);
  }

  findCountryCode(lada: string): IBmbCountryCode {
    const country = this.allCountryCodes.find(
      (country) => country.lada === lada,
    );
    if (!country)
      return {
        country: 'México',
        country_code: 'MX',
        lada: '+52',
        length: 10,
      };

    return country;
  }

  getControl(name: string) {
    return this.controls.get(name) as FormControl;
  }

  getErrorMessage(): string {
    if (typeof this.errorMessage() === 'string') {
      return this.errorMessage().toString();
    }

    if (this.controls.get('input')?.errors !== null) {
      const errorType = this.controls.get('input')?.errors;
      const error = this.errorMessage() as IBmbInputError;

      if (errorType?.['pattern'] && error.pattern) return error.pattern;
      if (errorType?.['min'] && error.min) return error.min;
      if (errorType?.['max'] && error.max) return error.max;
      if (errorType?.['minlength'] && error.minLength) return error.minLength;
      if (errorType?.['required'] && error.required) return error.required;
    }

    return '';
  }
  // @Input() control!: FormControl;
  // @Input() disabled: boolean = false;
  // @Input() showError: boolean = false;
  // @Input() errorMessage: string = '';
  // @Input() isRequired: boolean = false;

  // constructor(private cdr: ChangeDetectorRef) {}

  // ngOnInit(): void {
  //   if (!this.control) {
  //     this.control = new FormControl();
  //   }

  //   if (this.isRequired) {
  //     this.control.setValidators(Validators.required);
  //   } else {
  //     this.control.clearValidators();
  //   }
  //   this.control.updateValueAndValidity();

  //   this.control.valueChanges.subscribe(() => {
  //     this.updateErrorState();
  //     this.cdr.markForCheck();
  //   });
  // }

  // private updateErrorState(): void {
  //   this.showError =
  //     this.isRequired &&
  //     this.control.invalid &&
  //     (this.control.touched || this.control.dirty);
  // }

  // get shouldShowError(): boolean {
  //   return this.showError;
  // }
}
