import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import { BmbFormValidatorComponent } from './bmb-form-validator.component';
import {
  getArchitectureSection,
  getDescribeTypeTextBlock,
  getReactiveFormTitle,
  getSpecialSpecifications,
  getTypescriptExampleTextBlock,
  getGeneralDescription,
} from '../../utils/doc/utils';
import {
  BmbButtonDirective,
  BmbCheckboxComponent,
  BmbDatepickerComponent,
  BmbDateRangeComponent,
  BmbDropdownComponent,
  BmbInputComponent,
  BmbInputPhoneNumberComponent,
  BmbInputTagsComponent,
} from '../../../public-api';
import {
  getFormControlConsiderations,
  getFormControlDescription,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Inputs/Form validator',
  component: BmbFormValidatorComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        BmbButtonDirective,
        BmbCheckboxComponent,
        BmbDatepickerComponent,
        BmbDateRangeComponent,
        BmbDropdownComponent,
        BmbInputPhoneNumberComponent,
        BmbInputComponent,
        BmbInputTagsComponent,
      ],
    }),
    componentWrapperDecorator((story: string) => {
      return `
          <div style="height: 55rem">
            ${story}
          </div>`;
    }),
  ],
  parameters: {
    controls: {
      exclude: [
        'addControl',
        'addControls',
        'addRadials',
        'getFormControl',
        'ngAfterViewInit',
        'onSubmit',
        'updateErrorState',
        'bmbCheckboxes',
        'bmbDatepickers',
        'bmbDateRanges',
        'bmbDropdowns',
        'bmbInputPhoneNumbers',
        'bmbInputs',
        'bmbInputTags',
        'bmbRadials',
        'bmbSwitches',
      ],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription(
  `
${getFormControlDescription('>').replace('<br/>', '')}
>
>The supported **Bamboo inputs** are:
>
>- [Calendar date picker](/docs/components-inputs-calendar-date-picker--documentation)
>- [Checkbox](/docs/components-inputs-checkbox--documentation)
>- [Date picker range](/docs/components-inputs-date-picker-range--documentation)
>- [Dropdown](/docs/components-inputs-dropdown--documentation)
>- [Phone number](/docs/components-inputs-phone-number--documentation)
>- [Radial](/docs/components-inputs-radial--documentation)
>- [Text input](/docs/components-inputs-text-input--documentation)
>- [Text input with tags](/docs/components-inputs-text-input-with-tags--documentation)
  `,
  'https://bamboo.tec.mx/latest/patterns/forms/descripcion-general-FDqTdYSy',
).replace('Description', '-Description')}
${getArchitectureSection(`
<form (ngSubmit)="onSubmit()">
  <custom-content />
</form>
`).replace('DOM Architecture', '-DOM Architecture')}
${getSpecialSpecifications(`
  **Important:**
  ${getFormControlConsiderations('>')}
`).replace('Considerations / Restrictions', '-Considerations / Restrictions')}
${getReactiveFormTitle('BmbFormValidatorComponent').replace('Reactive form example', '-Reactive form example')}
><br/>
>${getTypescriptExampleTextBlock(
          'BmbButtonDirective, BmbFormValidatorComponent',
          '',
          '',
          '',
          'for reactive form',
          true,
          'in with status handle function',
          `
  handleFormGroupState(state: FormGroup): void {
    //Add your code
  }`,
          '>',
        )
          .replace('in with', 'with')
          .replace(
            'TypeScript example for reactive form',
            '-TypeScript example for reactive form',
          )}
>${getDescribeTypeTextBlock('HTML', 'for reactive form', true, 'with status handle function').replace('HTML example for reactive form', '-HTML example for reactive form')}
\`\`\`html
<bmb-form-validator (formGroupState)="handleFormGroupState($event)">
  <!--Add your Bamboo inputs-->
  <button bmbButton appearance="primary" type="submit">
    Submit
  </button>
</bmb-form-validator>
\`\`\`
${getTypescriptExampleTextBlock(
  'BmbFormValidatorComponent, BmbButtonDirective',
  '',
  '',
  '',
  '',
  false,
  '',
  'formGroup:FormGroup = new FormGroup({});',
).replace('TypeScript example', '-TypeScript example')}
${getDescribeTypeTextBlock('HTML').replace('HTML example', '-HTML example')}
\`\`\`html
<bmb-form-validator [(formGroup)]="formGroup">
<!--Add your Bamboo inputs-->
  <button bmbButton appearance="primary" type="submit">
    Submit
  </button>
</bmb-form-validator>
\`\`\`
          `,
      },
    },
  },
  argTypes: {
    formGroup: {
      control: {
        type: null,
      },
      description: `
Sets the \`FormGroup\` instance defined for cases where the validations are different from those already natively supported by **Bamboo inputs**.

<br/>
**Important:**

It is essential to assign the property \`name\` for correct behavior of the field.

<br/>
**Bamboo inputs** automatically implements the \`Validators\` on the following properties:

- isRequired: adds \`Validators.required\` to the \`FormControl\`
- minlength: adds \`Validators.minLength\` to the \`FormControl\`
- maxlength: adds \`Validators.maxLength\` to the \`FormControl\`
- max: adds \`Validators.max\` to the \`FormControl\`
- min: adds \`Validators.min\` to the \`FormControl\`
- pattern: adds \`Validators.pattern\` to the \`FormControl\`

<br/>
This property is a \`model\` input, and for this reason can be used as: [(formGroup)]="formGroup"

<br/>
This property can be optional for the \`formGroupState\` event.
      `,
      table: {
        category: 'Properties',
        type: {
          summary: 'FormGroup',
        },
        defaultValue: { summary: '{}' },
      },
    },
    formGroupState: {
      control: {
        type: null,
      },
      description: `
Emits the state of the \`FormGroup\`, this output can be optional for the \`formGroup\` property.
      `,
      table: {
        category: 'Events',
        type: { summary: 'FormGroup' },
      },
    },
  },
} as Meta<typeof BmbFormValidatorComponent>;

type Story = StoryObj<BmbFormValidatorComponent>;

export const Default: Story = {
  name: 'Default',
  render: (args: any) => ({
    props: args,
    template: `
<bmb-form-validator>
  <bmb-checkbox
    inputId="checkbox_id"
    name="checkbox"
    label="Checkbox"
    [required]="true"
    helperMessage="Helper Message"
  />
  <bmb-datepicker
    inputId="datepicker_id"
    name="datepicker"
    label="Date"
    [isRequired]="true"
    helperMessage="Helper Message"
  />
  <bmb-date-range
    inputId="date_range_id"
    name="date_range"
    labelStartDate="Date range start"
    labelEndDate="Date range end"
    [isRequired]="true"
  />
  <bmb-input-phone-number
    inputId="input_phone_id"
    name="input_phone_number"
    name="input_phone_number"
    label="Phone number"
    [onlyCountries]="['mx', 'us', 'ca']"
    [isRequired]="true"
    helperMessage="Helper Message"
  />
  <bmb-input
    inputId="input_field_id"
    name="input_field"
    label="Input"
    pattern="[A-Za-z]+"
    [maxlength]="20"
    [minlength]="4"
    [isRequired]="true"
    helperMessage="Helper Message"
  />
   <bmb-input
    type="text-area"
    inputId="text_area_id"
    name="text_area"
    label="Textarea"
    [jsonFormat]="true"
    [isRequired]="true"
    helperMessage="Helper Message"
  />
  <bmb-input-tags
    inputId="input_tags_id"
    name="input_tags"
    label="Input with tags"
    [tagOptions]="[
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
    ]"
    [isRequired]="true"
    helperMessage="Helper Message"
  />
  <div style="padding: 1rem">
    <button bmbButton appearance="primary" type="submit">
      Submit
    </button>
  </div>
</bmb-form-validator>
    `,
  }),
};
