import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import { BmbFormValidatorComponent } from './bmb-form-validator.component';
import {
  getDescribeTypeTextBlock,
  getTypescriptExampleTextBlock,
} from '../../utils/doc/utils';
import {
  BmbButtonDirective,
  BmbCheckboxComponent,
  BmbDatepickerComponent,
  BmbDateRangeComponent,
} from '../../../public-api';
import { BmbInputContentComponent } from '../bmb-input/bmb-input-content/bmb-input-content.component';

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
        BmbInputContentComponent,
      ],
    }),
    componentWrapperDecorator((story: string) => {
      return `
          <div style="height: 50rem">
            ${story}
          </div>`;
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
<br>
### Description
>In **Bamboo**, it is possible to implement automatic field validation using the \`bmb-form-validator\` component.
>
>The \`bmb-form-valitator\` component contains the form state by collecting the form input fields and adding them to a \`FormGroup\`.
>
>The supported **Bamboo inputs** are:
>
>- [Calendar date picker](https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/components-inputs-calendar-date-picker--documentation)
>- [Checkbox](https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/components-inputs-checkbox--documentation)
>- [Date picker range](https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/components-inputs-date-picker-range--documentation)
>- [Dropdown](https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/components-inputs-dropdown--documentation)
>- [Phone number](https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/components-inputs-phone-number--documentation)
>- [Radial](https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/components-inputs-radial--documentation)
>- [Switch](https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/components-inputs-switch--documentation)
>- [Text input](https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/components-inputs-text-input--documentation)
>- [Text input with tags](https://develop--65c3b4d1f966b98bb1f4e774.chromatic.com/?path=/docs/components-inputs-text-input-with-tags--documentation)

<br>
## DOM Architecture
\`\`\`html
<form (ngSubmit)="onSubmit()">
  <custom-content />
</form>
\`\`\`

${getTypescriptExampleTextBlock(
  'BmbFormValidatorComponent, BmbButtonDirective',
  `
  handleFormGroupState(state: FormGroup): void {
    //Add your code
  }`,
  'TypeScript with status handle function',
)}
${getDescribeTypeTextBlock('HTML', 'HTML with status handle function')}
\`\`\`html
<bmb-form-validator (formGroupState)="handleFormGroupState($event)">
  <!--Add your Bamboo inputs-->
  <button bmbButton appearance="primary" type="submit">
    Submit
  </button>
</bmb-form-validator>
\`\`\`

<br>
##FormGroup Instance Example
${getTypescriptExampleTextBlock(
  'BmbFormValidatorComponent, BmbButtonDirective',
  'formGroup:FormGroup = new FormGroup({});',
  'TypeScript with FormGroup instance',
)}
${getDescribeTypeTextBlock('HTML', 'HTML with FormGroup instance')}
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

<br>
**Important:**

It is essential to assign the property \`name\` for correct behavior of the form input field.

<br>
**Bamboo inputs** automatically implements the \`Validators\` on the following properties:

- isRequired: adds \`Validators.required\` to the \`FormControl\`
- minlength: adds \`Validators.minLength\` to the \`FormControl\`
- maxlength: adds \`Validators.maxLength\` to the \`FormControl\`
- max: adds \`Validators.max\` to the \`FormControl\`
- min: adds \`Validators.min\` to the \`FormControl\`
- pattern: adds \`Validators.pattern\` to the \`FormControl\`

<br>
This property is a \`model\` input, and for this reason can be used as: [(formGroup)]="formGroup"

<br>
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

  <div style="padding: 1rem">
    <button bmbButton appearance="primary" type="submit">
      Submit
    </button>
  </div>
</bmb-form-validator>
    `,
  }),
};
