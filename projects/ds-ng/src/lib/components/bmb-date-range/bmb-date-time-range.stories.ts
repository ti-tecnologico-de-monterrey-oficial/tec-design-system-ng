import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';
import { Component, HostListener } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

import { DateTime, DateTimeMaybeValid } from 'luxon';

import { BmbFormValidatorComponent } from '../bmb-form-validator/bmb-form-validator.component';

import * as inputStory from '../../components/bmb-input/bmb-input.stories';
import * as calendarDatePickerStory from '../bmb-datepicker/bmb-datepicker.stories';

import {
  BlockquoteType,
  DESIGN_SYSTEM_TITLE,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralDescription,
  getPageStructureForTemplateStories,
  getSpecialSpecifications,
  getTechnicalDocReferences,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import { BmbDatepickerComponent } from '../bmb-datepicker/bmb-datepicker.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';

const HTML_TEMPLATE: string = `
<bmb-form-validator [(formGroup)]="formGroup">
  <section bmbLayout>
    <bmb-datepicker
      name="init_date"
      label="Fecha de ingreso "
      [dateFormat]="dateFormat"
      [isRequired]="true"
      [placeholder]="dateFormat.toLocaleUpperCase()"
      disableDatesBefore=""
      helperMessage=""
      [disableDatesAfter]="getControlEndDate(getFormControl('end_date'))"
      bmbLayoutItem
      [colSm]="4"
      [colLg]="6"
    />
    <bmb-input
      name="init_time"
      label="Hora de ingreso"
      [placeholder]="timeFormat.toUpperCase()"
      [isClearable]="true"
      [pattern]="getTimeRegExp()"
      [errorMessage]="{
        customValidation:
          'La fecha y hora de ingreso debe ser menor a la fecha y hora de salida.',
        pattern:
          'Por favor ingresa un horario correcto de indreso (00:00 - 23:59)'
      }"
      [isRequired]="true"
      [customValidation]="
        handleCustomValidation('init_date', 'end_date', 'end_time', 'initVal')
      "
      bmbLayoutItem
      [colSm]="4"
      [colLg]="6"
    />
    <bmb-datepicker
      name="end_date"
      label="Fecha de salida "
      [dateFormat]="dateFormat"
      [isRequired]="true"
      [placeholder]="dateFormat.toLocaleUpperCase()"
      [disableDatesBefore]="getControlInitDate(getFormControl('init_date'))"
      helperMessage=""
      bmbLayoutItem
      [colSm]="4"
      [colLg]="6"
    />
    <bmb-input
      name="end_time"
      label="Hora de salida"
      [placeholder]="timeFormat.toUpperCase()"
      [isClearable]="true"
      [pattern]="getTimeRegExp()"
      [errorMessage]="{
        customValidation:
          'La fecha y hora de salida debe ser mayor a la fecha y hora de ingreso.',
        pattern:
          'Por favor ingresa un horario correcto de salida (00:00 - 23:59)'
      }"
      [isRequired]="true"
      [customValidation]="
        handleCustomValidation('end_date', 'init_date', 'init_time', 'endVal')
      "
      bmbLayoutItem
      [colSm]="4"
      [colLg]="6"
    />
  </section>
  <section bmbLayout justify="end">
    <button type="submit" bmbButton appearance="primary" bmbLayoutItem>
      Submit
    </button>
  </section>
</bmb-form-validator>
`;

@Component({
  selector: 'storybook-date-time-range',
  standalone: true,
  imports: [
    BmbFormValidatorComponent,
    BmbInputComponent,
    BmbDatepickerComponent,
    BmbButtonDirective,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  template: HTML_TEMPLATE,
})
export class StorybookDateTimeRange {
  formGroup: FormGroup = new FormGroup({});

  dateFormat: string = 'dd/MM/yyyy';
  timeFormat: string = 'HH:mm';
  operations: { [key: string]: Function } = {
    initVal: (initDate: DateTime, endDate: DateTime) =>
      initDate.toMillis() >= endDate.toMillis(),
    endVal: (endDate: DateTime, initDate: DateTime) =>
      endDate.toMillis() <= initDate.toMillis(),
  };

  getTimeRegExp(): string {
    return '^(?:\\d|[01]\\d|2[0-3]):[0-5]\\d$';
  }

  getFormControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }

  getDateTimeFormat(): string {
    return this.dateFormat.concat('-').concat(this.timeFormat);
  }

  getDate(dateControl: FormControl): DateTimeMaybeValid {
    return DateTime.fromFormat(dateControl?.value || '', this.dateFormat);
  }

  getDateTime(
    dateControl: FormControl,
    timeControl: FormControl,
  ): DateTimeMaybeValid {
    if (dateControl?.value!) {
      return DateTime.fromFormat(
        dateControl.value.concat('-').concat(timeControl?.value || '00:00'),
        this.getDateTimeFormat(),
      );
    }

    return this.getDate(dateControl);
  }

  getControlInitDate(initDateControl: FormControl): string {
    const initDate: DateTime = this.getDate(initDateControl);
    if (initDate.isValid) {
      return initDate.minus({ day: 1 }).toFormat(this.dateFormat);
    }

    return '';
  }

  getControlEndDate(endDateControl: FormControl): string {
    const endDate: DateTime = this.getDate(endDateControl);
    if (endDate.isValid) {
      return endDate.plus({ day: 1 }).toFormat(this.dateFormat);
    }

    return '';
  }

  @HostListener('submit')
  handleSubmit() {
    if (this.formGroup.valid) {
      //Add your code
      return;
    }
  }

  handleCustomValidation(
    dateControlName: string,
    oppositeDateControlName: string,
    oppositeTimeControlName: string,
    operation: string,
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      if (!value) return null;

      const dateTime: DateTime = this.getDateTime(
          this.getFormControl(dateControlName),
          control as FormControl,
        ),
        oppositeTimeControl: FormControl = this.getFormControl(
          oppositeTimeControlName,
        ),
        oppositeDateTime: DateTime = this.getDateTime(
          this.getFormControl(oppositeDateControlName),
          oppositeTimeControl,
        );

      if (
        oppositeTimeControl.value &&
        this.operations[operation](dateTime, oppositeDateTime)
      ) {
        return { customValidation: true };
      }

      return null;
    };
  }
}

export default {
  title: 'Dev tools/Date time range',
  component: StorybookDateTimeRange,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: () => getPageStructureForTemplateStories(),
      description: {
        component: `
${getGeneralDescription(`This is an example of how to implement date and time using ${DESIGN_SYSTEM_TITLE} components.`)}
${getSpecialSpecifications(
  `
  ${getAlertBlockquote(
    `Please remember that you can add custom validations to the components, use ***customValidation*** property`,
    {
      title: '###'.concat(RELEVANT_TITLE.configuration),
      blockquoteType: BlockquoteType.important,
    },
  )}
  <br/>
  ${getAlertBlockquote(
    `Please use @HostListener('submit') only if you need additional validations on the submit button, the \`\`\`bmb-form-validation\`\`\` component handles the validations configured in the \`\`\`bmb-[input]\`\`\` automatically.`,
    {
      title: '###'.concat(RELEVANT_TITLE.configuration),
      blockquoteType: BlockquoteType.important,
    },
  )}
  ${getTechnicalDocReferences({
    references: [
      { title: calendarDatePickerStory.default.title! },
      { title: inputStory.default.title! },
    ],
  })}`,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock(
  `
  BmbFormValidatorComponent,
  BmbInputComponent,
  BmbDatepickerComponent,
  BmbButtonDirective,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
`,
  `
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { DateTime, DateTimeMaybeValid } from 'luxon';

  `,
  `formGroup: FormGroup = new FormGroup({});

  dateFormat: string = 'dd/MM/yyyy';
  timeFormat: string = 'HH:mm';
  operations: { [key: string]: Function } = {
    initVal: (initDate: DateTime, endDate: DateTime) =>
      initDate.toMillis() >= endDate.toMillis(),
    endVal: (endDate: DateTime, initDate: DateTime) =>
      endDate.toMillis() <= initDate.toMillis(),
  };

  getTimeRegExp(): string {
    return '^(?:\\d|[01]\\d|2[0-3]):[0-5]\\d$';
  }

  getFormControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }

  getDateTimeFormat(): string {
    return this.dateFormat.concat('-').concat(this.timeFormat);
  }

  getDate(dateControl: FormControl): DateTimeMaybeValid {
    return DateTime.fromFormat(dateControl?.value || '', this.dateFormat);
  }

  getDateTime(
    dateControl: FormControl,
    timeControl: FormControl,
  ): DateTimeMaybeValid {
    if (dateControl?.value!) {
      return DateTime.fromFormat(
        dateControl.value.concat('-').concat(timeControl?.value || '00:00'),
        this.getDateTimeFormat(),
      );
    }

    return this.getDate(dateControl);
  }

  getControlInitDate(initDateControl: FormControl): string {
    const initDate: DateTime = this.getDate(initDateControl);
    if (initDate.isValid) {
      return initDate.minus({ day: 1 }).toFormat(this.dateFormat);
    }

    return '';
  }

  getControlEndDate(endDateControl: FormControl): string {
    const endDate: DateTime = this.getDate(endDateControl);
    if (endDate.isValid) {
      return endDate.plus({ day: 1 }).toFormat(this.dateFormat);
    }

    return '';
  }

  @HostListener('submit')
  handleSubmit() {
    if (this.formGroup.valid) {
      //Add your code
      return;
    }
  }

  handleCustomValidation(
    dateControlName: string,
    oppositeDateControlName: string,
    oppositeTimeControlName: string,
    operation: string,
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      if (!value) return null;

      const dateTime: DateTime = this.getDateTime(
          this.getFormControl(dateControlName),
          control as FormControl,
        ),
        oppositeTimeControl: FormControl = this.getFormControl(
          oppositeTimeControlName,
        ),
        oppositeDateTime: DateTime = this.getDateTime(
          this.getFormControl(oppositeDateControlName),
          oppositeTimeControl,
        );

      if (
        oppositeTimeControl.value &&
        this.operations[operation](dateTime, oppositeDateTime)
      ) {
        return { customValidation: true };
      }

      return null;
    };
  }`,
)}
\`\`\`html
${HTML_TEMPLATE}
\`\`\`
    `,
      },
    },
  },
} as Meta<typeof StorybookDateTimeRange>;

type Story = StoryObj<StorybookDateTimeRange>;

export const Default: Story = {
  render: (args) => ({
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-date-time-range />
    `,
  }),
};
