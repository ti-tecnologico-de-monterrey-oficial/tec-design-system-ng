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
import {
  BmbDropdownComponent,
  IBmbDropdownItem,
} from '../bmb-dropdown/bmb-dropdown.component';
import { IBmbCountryCode, IBmbCountryCodes } from '../../utils/countryCodes';
import {
  BmbInputComponent,
  IBmbInputAppearance,
  IBmbInputError,
} from '../bmb-input/bmb-input.component';
import { BmbInputValidationComponent } from '../bmb-input/bmb-input-validation/bmb-input-validation.component';
import { getUUID } from '../../utils/utils';

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
    BmbInputComponent,
    BmbInputValidationComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInputPhoneNumberComponent implements OnInit {
  label = input<string>();
  name = input<string>(window.crypto.randomUUID());
  value = input<string>();
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
  selectedLada: IBmbCountryCode | undefined;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.isRequired()) {
      this.control().setValidators(Validators.required);
    }

    const selectedLada = this.allCountryCodes.find(
      ({ lada }) => lada === this.defaultLada(),
    );
    this.control().setValidators(
      Validators.pattern(
        `^\\${this.defaultLada()}\\d{${selectedLada?.length}}$`,
      ),
    );

    this.controls.controls['input'].setValue(this.control().value?.replace(this.defaultLada(),''))

    this.control().valueChanges.subscribe(() => {
      this.updateErrorState();
      this.cdr.markForCheck();
    });

    this.controls.controls['input'].valueChanges.subscribe((value) => {
      const lada = this.controls.controls['select'].value || '';
      this.control().setValue(lada + value);
    });
  }

  getPatternVal(): string {
    const selectedLada = this.allCountryCodes.find(
      ({ lada }) => lada === this.defaultLada(),
    );
    return `^\\${this.defaultLada()}\\d{${selectedLada?.length}}$`;
  }

  generateID(): string {
    return getUUID();
  }

  private updateErrorState(): void {
    this.showError =
      this.control().invalid &&
      (this.control().touched || this.control().dirty);
  }

  onValueChange(event: any) {
    this.selectedLada = this.allCountryCodes.find(
      ({ lada }) => lada === event.value,
    );

    this.control().setValidators(
      Validators.pattern(`^\\${event.value}\\d{${this.selectedLada?.length}}$`),
    );
    this.control().setValue(event.value);
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

  getErrors(): boolean {
    return this.control().errors !== null;
  }

  getErrorMessage(): string {
    if (typeof this.errorMessage() === 'string') {
      return this.errorMessage().toString();
    }

    if (this.control()['errors'] !== null) {
      const errorType = this.control()['errors'];
      const error = this.errorMessage() as IBmbInputError;

      if (errorType?.['pattern'] && error.pattern) return error.pattern;
      if (errorType?.['required'] && error.required) return error.required;
    }

    return '';
  }
}
