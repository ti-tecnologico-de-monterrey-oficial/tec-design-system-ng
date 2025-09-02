import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import {
  BmbButtonDirective,
  BmbCheckboxComponent,
  BmbDatepickerComponent,
  BmbDateRangeComponent,
  BmbDropdownComponent,
  BmbDropdownMenuComponent,
  BmbDropzoneComponent,
  BmbExternalLinkComponent,
  BmbFormValidatorComponent,
  BmbInputComponent,
  BmbInputPhoneNumberComponent,
  BmbInputTagsComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbRadialComponent,
  BmbSearchInputComponent,
  BmbSwitchComponent,
  BmbThemeComponent,
  BmbTotpComponent,
  IBmbDropdownItem,
} from '../../../../projects/ds-ng/src/public-api';
import { handleValidity } from '../../../../projects/ds-ng/src/lib/utils/formControl';

@Component({
  selector: 'bmb-form-validator-test',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BmbThemeComponent,
    BmbTotpComponent,
    BmbFormValidatorComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbButtonDirective,
    BmbInputComponent,
    BmbCheckboxComponent,
    BmbSearchInputComponent,
    BmbInputTagsComponent,
    BmbDatepickerComponent,
    BmbDateRangeComponent,
    BmbDropdownComponent,
    BmbExternalLinkComponent,
    BmbDropdownMenuComponent,
    BmbInputPhoneNumberComponent,
    BmbRadialComponent,
    BmbSwitchComponent,
    BmbDropzoneComponent,
  ],
  templateUrl: './form-validator-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FormValidatorTestComponent implements AfterViewInit {
  formGroupTest: FormGroup = new FormGroup({
    // input1: new FormControl(),
    contract: new FormControl(),
    contract2: new FormControl(),
  });

  formGroupVal: FormGroup = new FormGroup({
    input1: new FormControl<string>('', Validators.required),
  });

  formGroup: FormGroup = new FormGroup({
    input_phone: new FormControl(),
    input_tag: new FormControl(),
    input5o: new FormControl(),
    input6o: new FormControl(),
    checkbox3o: new FormControl(),
    contract2o: new FormControl(),
    input_calendar: new FormControl(),
    range_start: new FormControl(),
    range_end: new FormControl(),
    inputDropdownSimple2: new FormControl(['_pear']),
  });

  testForm: FormGroup = new FormGroup({
    simpleInput: new FormControl<string>('Prueba', Validators.required),
    passwordInput: new FormControl<string>(''),
    numberInput: new FormControl<number>(0),
    textAreaInput: new FormControl<string>(''),
    dropdown: new FormControl<string>(''),
    datepicker: new FormControl<string>(''),
    controlStart: new FormControl<string>(''),
    controlEnd: new FormControl<string>(''),
    multiSelectDropdown: new FormControl<string[]>([]),
    phoneNumberInput: new FormControl<string>(''),
    inputTags: new FormControl<string[]>([]),
    checkbox1: new FormControl<boolean>(false),
    radio: new FormControl<string>('', Validators.required),
  });

  showErrors: { [key: string]: boolean } = {};
  errorControl: FormControl = new FormControl(false);
  list = signal<string[]>([]);
  options: IBmbDropdownItem[] = [
    { value: '1', name: 'Apple', icon: '' },
    { value: '2', name: 'Banana', icon: '' },
    { value: '3', name: 'Orange', icon: '' },
    { value: '4', name: 'Pear', icon: '' },
    { value: '5', name: 'Grape', icon: '' },
  ];

  asyncOptions = signal<IBmbDropdownItem[]>([]);

  asyncTagOptions = signal<string[] | IBmbDropdownItem[]>([]);

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.asyncOptions.set(this.options);
      this.asyncTagOptions.set([
        'Tacos al pastor',
        'Enchiladas',
        'Tamales',
        'Quesadillas',
        'Chiles en nogada',
        'Mole poblano',
        'Sopes',
        'Gorditas',
        'Pozole',
        'Ceviche',
        'Tortas',
        'Guacamole',
        'Tacos de pescado',
        'Flautas',
        'Chalupas',
        'Huevos rancheros',
        'Elote',
        'Mole verde',
        'Arroz a la mexicana',
        'Burritos',
      ]);
    }, 1000);

    this.asyncSetTagOptions();
  }

  handleRadial(target: HTMLInputElement): void {
    console.log('Radio value:', target.value);
    console.log('Radio name:', target.name);
    console.log('Is it checked?', target.checked);
  }

  asyncSetTagOptions(): void {
    // setTimeout(() => {
    //   this.list.set([
    //     'Tacos al pastor',
    //     'Enchiladas',
    //     'Tamales',
    //     'Quesadillas',
    //     'Chiles en nogada',
    //     'Mole poblano',
    //     'Sopes',
    //     'Gorditas',
    //     'Pozole',
    //     'Ceviche',
    //     'Tortas',
    //     'Guacamole',
    //     'Tacos de pescado',
    //     'Flautas',
    //     'Chalupas',
    //     'Huevos rancheros',
    //     'Elote',
    //     'Mole verde',
    //     'Arroz a la mexicana',
    //     'Burritos',
    //   ]);
    // }, 1000);
  }

  getTagOptions(): string[] {
    return [
      'Tacos al pastor',
      'Enchiladas',
      'Tamales',
      'Quesadillas',
      'Chiles en nogada',
      'Mole poblano',
      'Sopes',
      'Gorditas',
      'Pozole',
      'Ceviche',
      'Tortas',
      'Guacamole',
      'Tacos de pescado',
      'Flautas',
      'Chalupas',
      'Huevos rancheros',
      'Elote',
      'Mole verde',
      'Arroz a la mexicana',
      'Burritos',
    ];
  }

  // asyncTagOptions(): void {
  //   setTimeout(() => {
  //     callback(this.getTagOptions());
  //   }, 1000);
  // }

  verifyCode(receivedCode: string): void {
    console.log('verifyCode', receivedCode);
    // this.error = { codeError: false, errorMessage: '' };
    // if (receivedCode.length === this.maxCode) {
    //   this.isContinueDisable = false;
    //   this.code = receivedCode;
    // }
  }

  // onSubmit(): void {
  //   this.formGroup.markAllAsTouched();
  //   this.formGroup.updateValueAndValidity();
  //   console.log('FORM STATE', this.formGroup);
  //   if (this.formGroup.valid) {
  //     console.log('FORM VALID');
  //     return;
  //   }
  //   console.log('FORM STATUS', this.formGroup.status);
  //   this.updateErrorState();
  // }

  // updateErrorState() {
  //   Object.keys(this.formGroup.controls).forEach((field) => {
  //     const control = this.getFormControl(field);

  //     if (control instanceof FormControl) {
  //       control.markAsTouched();
  //       control.updateValueAndValidity();
  //     }
  //   });
  // }

  onSubmit() {
    console.log('App - onSubmit', this.formGroup.valid, this.formGroup);
    if (this.formGroup.valid) {
      console.log('onSubmit', this.formGroup.status);
      return;
    }

    this.formGroup.markAllAsTouched();
    this.updateErrorStateformGroup();
  }

  updateErrorStateformGroup() {
    // Object.keys(this.formGroup.controls).forEach((field) => {
    //   const control = this.getFormControl(field);
    //   if (control instanceof FormControl) {
    //     control.updateValueAndValidity();
    //     this.showErrors[field] =
    //       control.invalid && (control.touched || control.dirty);
    //   }
    // });
  }

  handleFormGroupState(state: FormGroup): void {
    console.log(
      'App - onSubmit',
      state?.status === 'VALID',
      state?.valid,
      state?.status,
      state,
    );
  }

  clearForm(state: FormGroup): void {
    console.log('App - onReset', state?.valid, state);
    state.reset();
    state.updateValueAndValidity();
    state.markAllAsTouched();
  }

  resetForm(): void {
    console.log(
      'App - resetForm',
      this.formGroupTest?.valid,
      this.formGroupTest,
    );
    this.formGroupTest.reset();
    this.formGroupTest.updateValueAndValidity();
    this.formGroupTest.markAllAsTouched();
  }

  handleFormGroupValue(value: unknown): void {
    console.log('App - onSubmit', value);
  }

  dropDownControl: FormControl = new FormControl();
  inputControl: FormControl = new FormControl();

  resetControlValidation(): void {
    // Object.keys(this.formGroup.controls).forEach((field) => {
    //   const control = this.getFormControl(field);
    //   if (control instanceof FormControl) {
    //     control.reset();
    //   }
    // });
    this.formGroup.reset();
    this.formGroup.updateValueAndValidity();
    this.formGroup.markAllAsTouched();
  }

  getFormControlTest(name: string): FormControl {
    return this.formGroupTest.get(name) as FormControl;
  }

  onValueChange(event: unknown): void {
    console.log('onValueChange', event);
  }

  onServerSideFilterEvent(event: unknown): void {
    console.log('onServerSideFilterEvent', event);
  }

  getFormControl(name: string): FormControl {
    return this.testForm.get(name) as FormControl;
  }

  clearButton() {
    this.testForm.reset();
    this.testForm.markAsPristine();
    this.testForm.markAsUntouched();
    this.testForm.updateValueAndValidity();
    console.log('Form cleared');
  }

  handleSubmitForm(event: Event): void {
    event.preventDefault();
    this.testForm.markAllAsTouched();
    this.testForm.updateValueAndValidity();
    console.log(
      'Form submitted:',
      this.testForm.value,
      'formGroup',
      this.testForm,
    );
    if (this.testForm.valid) {
      console.log('Form is valid');
      return;
    }
    console.log('Form is invalid', this.testForm.status);
    this.updateError();
  }

  updateError() {
    Object.keys(this.testForm.controls).forEach((field) => {
      const control = this.getFormControl(field);
      if (control instanceof FormControl) {
        handleValidity(control);
      }
    });
  }

  handleCustomValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      if (!value) return null;

      if (value.toString() === '07/08/2025') return { customValidation: true };

      return null;
    };
  }

  handleCustomValidatorT(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      if (!value) return null;

      if (value === 'tttt') return { customValidation: true };

      return null;
    };
  }

  handleCustomValidatorCK(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      if (!value) return null;

      if (value) return { customValidation: true };

      return null;
    };
  }

  handleCustomValidatorDPR(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      if (!value) return null;

      if (value === '07/08/2025') return { customValidation: true };

      return null;
    };
  }

  handleCustomValidatorDD(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      if (!value) return null;

      if (value === '_apple') return { customValidation: true };

      return null;
    };
  }

  handleCustomValidatorPH(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      if (!value) return null;

      if (value === '+521234567890') return { customValidation: true };

      return null;
    };
  }

  handleCustomValidatorIT(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      if (!value.length) return null;

      if (value.includes('Sopes')) return { customValidation: true };

      return null;
    };
  }
}
