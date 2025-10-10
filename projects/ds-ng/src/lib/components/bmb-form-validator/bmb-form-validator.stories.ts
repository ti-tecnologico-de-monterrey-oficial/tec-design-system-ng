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
  RELEVANT_TITLE,
  getBasicExampleBlock,
  getOnEvent,
  getFormatName,
  getStoryLink,
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
  getOnEventParam,
} from '../../utils/doc/parameterDescriptions';
import * as calendarDatePicker from '../bmb-datepicker/bmb-datepicker.stories';
import * as checkbox from '../bmb-checkbox/bmb-checkbox.stories';
import * as datepickerRange from '../bmb-date-range/bmb-date-range.component.stories';
import * as dropdown from '../bmb-dropdown/bmb-dropdown.stories';
import * as phoneNumber from '../bmb-input-phone-number/bmb-input-phone-number.stories';
import * as textInput from '../bmb-input/bmb-input.stories';
import * as textInputWithTags from '../bmb-input-tags/bmb_input-tags.stories';

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
>- ${getStoryLink({ title: calendarDatePicker.default.title!, showFullLinkName: false })}
>- ${getStoryLink({ title: checkbox.default.title!, showFullLinkName: false })}
>- ${getStoryLink({ title: datepickerRange.default.title!, showFullLinkName: false })}
>- ${getStoryLink({ title: dropdown.default.title!, showFullLinkName: false })}
>- ${getStoryLink({ title: phoneNumber.default.title!, showFullLinkName: false })}
>- ${getStoryLink({ title: textInput.default.title!, showFullLinkName: false })}
>- ${getStoryLink({ title: textInputWithTags.default.title!, showFullLinkName: false })}
  `,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/patterns/forms/descripcion-general-FDqTdYSy',
    isSubStory: true,
  },
)}
${getArchitectureSection(
  `
<form (ngSubmit)="onSubmit()">
  <custom-content />
</form>
`,
  true,
)}
${getSpecialSpecifications(
  `
  ${getFormControlConsiderations('>')}
`,
  { isSubStory: true },
)}
${getReactiveFormTitle('BmbFormValidatorComponent', true)}
><br/>
>${getTypescriptExampleTextBlock(
          'BmbButtonDirective, BmbFormValidatorComponent',
          '',
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
          true,
        ).replace('in with', 'with')}
>${getDescribeTypeTextBlock('HTML', 'for reactive form', true, 'with status handle function', true)}
\`\`\`html
<bmb-form-validator (formGroupState)="handleFormGroupState($event)">
  <!--Add your Bamboo inputs-->
  <button bmbButton appearance="primary" type="submit">
    Submit
  </button>
</bmb-form-validator>
\`\`\`
${getBasicExampleBlock('BmbButtonDirective, BmbFormValidatorComponent', '', 'formGroup:FormGroup = new FormGroup({});', true)}
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



${RELEVANT_TITLE.warning}
It is essential to assign the property \`name\` for correct behavior of the field.



**Bamboo inputs** automatically implements the \`Validators\` on the following properties:

- isRequired: adds \`Validators.required\` to the \`FormControl\`
- minlength: adds \`Validators.minLength\` to the \`FormControl\`
- maxlength: adds \`Validators.maxLength\` to the \`FormControl\`
- max: adds \`Validators.max\` to the \`FormControl\`
- min: adds \`Validators.min\` to the \`FormControl\`
- pattern: adds \`Validators.pattern\` to the \`FormControl\`

${RELEVANT_TITLE.note}
This property is a \`model\` input, and for this reason can be used as:
    [(formGroup)]="formGroup"
      `,
      table: {
        category: 'Properties',
        type: {
          summary: 'FormGroup',
        },
        defaultValue: { summary: '{}' },
      },
    },
    formGroupState: getOnEventParam(
      getOnEvent('', 'formGroupState', 'FormGroup'),
      ` when ***Submit*** button is clicked.

${RELEVANT_TITLE.note}
Emits the state of the \`FormGroup\` after execute the validation and change the state of the form.
    `,
      'other',
    ),
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
