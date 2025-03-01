import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbTooltipComponent } from '../bmb-tooltip/bmb-tooltip.component';
import { BmbDropdownComponent, IBmbDropdownItem } from '../bmb-dropdown/bmb-dropdown.component';
import { IBmbCountryCode, IBmbCountryCodes } from '../../utils/countryCodes';
import { BmbInputComponent, IBmbInputAppearance, IBmbInputError } from '../bmb-input/bmb-input.component';

@Component({
  selector: 'bmb-input-phone-number',
  templateUrl: './bmb-input-phone-number.component.html',
  styleUrls: ['./bmb-input-phone-number.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BmbTooltipComponent,
    BmbDropdownComponent,
    BmbInputComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInputPhoneNumberComponent implements OnInit {
  label = input<string>();
  isRequired = input<boolean>(false);
  tooltip = input<string>('');
  defaultLada = input<string>('+52');
  placeholder = input<string>('');
  appearance = input<IBmbInputAppearance>('normal');
  errorMessage = input<string | IBmbInputError>('');
  disabled = input<boolean>(false);
  inputId = input<string>('');
  control = input<FormControl>(new FormControl());
  helperMessage = input<string>('');
  preferredCountries = input<string[]>(['mx']);
  onlyCountries = input<string[]>([]);

  @Input() showError: boolean = false; // deprecated

  allCountryCodes: IBmbCountryCode[] = IBmbCountryCodes;
  controls = new FormGroup({
    select: new FormControl(this.defaultLada()),
    input: new FormControl(''),
  });

  constructor(private cdr: ChangeDetectorRef) {}

  findDefaultCountryCode(lada: string): Validators[] {
    const selectedLada = this.allCountryCodes.find(({ lada: countryCode }) => countryCode === lada);
    if (selectedLada) {
      return [
        Validators.pattern(`[0-9 ]{${selectedLada.length}}`)
      ]
    }

    return []
  }

  ngOnInit(): void {
    if (this.isRequired()) {
      this.control().setValidators(Validators.required);
    }

    this.control().valueChanges.subscribe(() => {
      this.updateErrorState();
      this.cdr.markForCheck();
    });
  }

  private updateErrorState(): void {
    this.showError =
      this.control().invalid &&
      (this.control().touched || this.control().dirty);
  }

  onValueChange(event: any) {
    // const country = this.findCountryCode(event.value);
    // this.selectedCountry.set(country);
  }

  getOptions(): IBmbDropdownItem[] {
    if (this.onlyCountries().length) {
      const lowerCaseCountries = this.onlyCountries().map(country => country.toLocaleLowerCase());
      const filteredOptions = this.allCountryCodes.filter(({ country_code }) => {
        return lowerCaseCountries.includes(country_code.toLocaleLowerCase());
      });

      return filteredOptions.map(({ country, lada }) => ({
        name: `${country} (${lada})`,
        value: lada,
        icon: 'flag',
      }));
    }

    return this.allCountryCodes.map(({ country, lada }) => ({
      name: `${country} (${lada})`,
      value: lada,
      icon: 'flag',
    }));
  }

  getControl(name: string) {
    return this.controls.get(name) as FormControl;
  }

  get shouldShowError(): boolean {
    return this.showError;
  }

  getErrorMessage(): string {
    if (typeof this.errorMessage() === 'string') {
      return this.errorMessage().toString();
    }

    // if (this.control['errors'] !== null) {
    //   const errorType = this.control['errors'];
    //   const error = this.errorMessage() as IBmbInputError;

    //   if (errorType['invalidJson'] && error.jsonFormat) return error.jsonFormat;
    //   if (errorType['pattern'] && error.pattern) return error.pattern;
    //   if (errorType['min'] && error.min) return error.min;
    //   if (errorType['max'] && error.max) return error.max;
    //   if (errorType['minlength'] && error.minLength) return error.minLength;
    //   if (errorType['required'] && error.required) return error.required;
    // }

    return '';
  }
}
