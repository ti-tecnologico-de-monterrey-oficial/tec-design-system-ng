import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryFn,
} from '@storybook/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbFormValidatorComponent } from './bmb-form-validator.component';
import { FormControl, FormGroup } from '@angular/forms';
import {
  BmbButtonDirective,
  BmbCheckboxComponent,
  BmbDatepickerComponent,
  BmbDateRangeComponent,
  BmbInputComponent,
  BmbInputPhoneNumberComponent,
  BmbRadialComponent,
} from '../../../public-api';

@Component({
  selector: 'storybook-form-validator',
  standalone: true,
  imports: [
    CommonModule,
    BmbFormValidatorComponent,
    BmbButtonDirective,
    BmbCheckboxComponent,
    BmbDatepickerComponent,
    BmbDateRangeComponent,
    BmbInputPhoneNumberComponent,
    BmbRadialComponent,
    BmbInputComponent,
  ],
  template: `
    <bmb-form-validator [(formGroup)]="formGroup">
      <bmb-checkbox
        id="checkbox_id1"
        name="checkbox1"
        label="Checkbox"
        errorMessage="Please enter the required data"
        [required]="true"
      />
      <bmb-datepicker
        id="datepicker_id1"
        name="datepicker1"
        label="Date"
        invalidFormatErrorMessage="Please enter a date in a valid format."
        requiredFieldErrorMessage="Please enter the date"
        [isRequired]="true"
      />
      <bmb-date-range
        id="datepicker_id1"
        name="datepicker1"
        label="Date range"
        icon="calendar_month"
        invalidFormatErrorMessage="Please enter a date in a valid format."
        requiredFieldErrorMessage="Please enter the required data"
        [isRequired]="true"
        [multipleRow]="true"
      />
      <bmb-input-phone-number
        name="input_phone_number"
        label="Phone number"
        [onlyCountries]="['mx', 'us', 'ca']"
        [isRequired]="true"
        helperMessage="Helper Message"
        errorMessage="Please enter the phone number"
      />
      <bmb-radial
        inputId="radial_id1"
        name="radial_group"
        label="Radial A"
        value="A"
        [required]="true"
        errorMessage="Please enter the required data"
        [control]="formGroup.controls['radial_group']"
      />
      <bmb-radial
        inputId="radial_id2"
        name="radial_group"
        label="Radial B"
        value="B"
        [required]="true"
        errorMessage="Please enter the required data"
        [control]="formGroup.controls['radial_group']"
      />
      <bmb-input
        id="input_field_id"
        name="input_field"
        label="Input"
        tooltip="Tooltip example"
        placeholder="Placeholder"
        icon="apps"
        [isRequired]="true"
        [maxlength]="20"
        [minlength]="4"
        pattern="[A-Za-z]+"
        helperMessage="Helper Message"
        [errorMessage]="{
          required: 'Please enter the required data',
          minLength: 'Please enter at least 4 characters',
          pattern: 'Please enter only letters',
        }"
      />
      <div style="padding: 1rem">
        <button bmbButton appearance="primary" type="submit">Submit</button>
      </div>
    </bmb-form-validator>

    FormGroup state: {{ formGroup.status }}
    <br />
    FormGroup value {{ formGroup.value | json }}
  `,
})
class StorybookFormValidator {
  formGroup: FormGroup = new FormGroup({
    radial_group: new FormControl(),
  });
}

export default {
  title: 'Components/Inputs/Example with state and values of the FormGroup',
  component: BmbFormValidatorComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        StorybookFormValidator,
        BmbFormValidatorComponent,
        BmbButtonDirective,
        BmbCheckboxComponent,
        BmbDatepickerComponent,
        BmbDateRangeComponent,
        BmbInputComponent,
      ],
    }),
    componentWrapperDecorator((story: string) => {
      return `
        <div style="height: 60rem">
          ${story}
        </div>`;
    }),
  ],
} as Meta<typeof BmbFormValidatorComponent>;

export const Default: StoryFn<typeof BmbFormValidatorComponent> = (args) => {
  return {
    name: 'Example with state and values',
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-form-validator />
    `,
  };
};
