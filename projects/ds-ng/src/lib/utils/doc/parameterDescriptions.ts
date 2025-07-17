export const DEPRECATED_PROPERTIES_DESCRIPTION =
  'This property is deprecated and will be removed in future versions.';

const getLabelDescription = (
  positionDescription: string,
  type: string = ' field',
) => `
Sets the label associated with ${type}.

The label helps users understand the context of what the ${type} represents.

The label will be displayed ${positionDescription} the ${type}.
`;

const getCheckboxOrRadialLabel = (type: string) => {
  return {
    control: {
      type: 'text',
    },
    description: `
${getLabelDescription('at the default \`labelPosition\` or the position specified in \`labelPosition\` relative to', type)}
    `,
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  };
};

const getLabelPosition = (type: string) => {
  return {
    control: { type: 'radio' },
    options: ['before', 'after'],
    description: `
Specifies the position of the label relative to ${type}.

The possible positions to indicate where the label should be displayed in relation to the ${type} are:

- before
- after
      `,
    table: {
      category: 'Properties',
      type: {
        summary: 'IBbmSidePosition',
        detail: `IBbmSidePosition = 'before' | 'after'`,
      },
      defaultValue: { summary: 'after' },
    },
  };
};

export const getFormControlConsiderations = (replaceChar: string = '') =>
  `__
__It is essential to assign the property \`name\` for correct behavior of the field.
__
__It will not be necessary to define \`Validators\` in the \`FormControl\` instance, as long as the properties of this field are correctly assigned.
__
__
__This component automatically implements the \`Validators\` on the following properties:
__
__- **isRequired**: adds \`Validators.required\` to the \`FormControl\`
__- **minlength**: adds \`Validators.minLength\` to the \`FormControl\`
__- **maxlength**: adds \`Validators.maxLength\` to the \`FormControl\`
__- **max**: adds \`Validators.max\` to the \`FormControl\`
__- **min**: adds \`Validators.min\` to the \`FormControl\`
__- **pattern**: adds \`Validators.pattern\` to the \`FormControl\``.replaceAll(
    '__',
    replaceChar,
  );

export const getFormControlDescription = (replaceChar: string = '') =>
  `__In **Bamboo**, it is possible to implement automatic field validation using the \`bmb-form-validator\` component.
__
__<br/>
__The \`bmb-form-validator\` component contains the state of the form by collecting the form fields and adding them to a \`FormGroup\`.`.replaceAll(
    '__',
    replaceChar,
  );

export const getControlDescription = (isComplete: boolean = false) => `
Sets the \`FormControl\` instance to manage the state of the field.
${
  isComplete
    ? `

<br/>
**Important:**
${getFormControlConsiderations()}
<br/>
${getFormControlDescription()}

<br/>
Please check the ***Form validator*** documentation for details on how to implement \`bmb-form-validator\` component.

<br/>
This documentation is displayed as a tab at the top.
`
    : ''
}
`;

export const InputParameterDescriptions = {
  inputId: {
    description: `

Sets the unique identifier for the field.

This property is used to link the label to the field through the ***for*** attribute, improving accessibility and usability.
    `,
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: 'randomUUID' },
    },
    control: { type: 'text' },
  },
  name: {
    control: {
      type: 'text',
    },
    description: `
Sets the field name.

<br/>
**Important:**

This property is essential for correct behavior of the the \`FormControl\`.

<br/>
If no name is assigned, a name will be added using \`window.crypto.randomUUID()\`
`,
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: 'randomUUID' },
    },
  },
  value: {
    control: {
      type: 'text',
    },
    description: `
Sets the value of the field.

This is the value that is taken when the form is submitted.

**Important**

The value will not be necessary to define a value on the \`FormControl\` instance, as long as this properties is correctly assigned of this field .

**Note**:

The configuration implemented in the \`FormControl\` object will always be prioritized.

    formGroup: FormGroup = new FormGroup({
     fieldName: new FormControl('test'),
    });
    `,
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  label: {
    control: {
      type: 'text',
    },
    description: `
${getLabelDescription('above')}
    `,
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  checkboxLabel: getCheckboxOrRadialLabel('checkbox'),
  radialLabel: getCheckboxOrRadialLabel('radial'),
  checkboxLabelPosition: getLabelPosition('checkbox'),
  radialLabelPosition: getLabelPosition('radial'),
  tooltip: {
    control: {
      type: 'text',
    },
    description: 'Sets the text to be displayed as a tooltip above the field.',
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  tooltipPosition: {
    control: {
      type: 'object',
    },
    description: 'Sets the position of the tooltip.',
    table: {
      category: 'Properties',
      defaultValue: { summary: `{ align:'above', justify:'before' }` },
      type: {
        summary: 'IBmbInputTooltipPosition',
        detail: `
IBmbInputTooltipPosition {
  align: IBmbAlignTooltip;
  justify: IBmbJustifyTooltip;
}

IBmbAlignTooltip = 'above' | 'below' | 'left' | 'right'

IBmbJustifyTooltip = 'centered' | 'before' | 'after'
        `,
      },
    },
  },
  icon: {
    control: {
      type: 'text',
    },
    description: `
Sets the name of the icon to be displayed within the field.

<br/>
Refer to [Google Fonts](https://fonts.google.com/icons?icon.size=24&icon.color=%23e8eaed&selected=Material+Symbols+Outlined:more_vert:FILL@0;wght@400;GRAD@0;opsz@24) for more icons.`,
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  placeholder: {
    control: {
      type: 'text',
    },
    description:
      'Sets the text to be displayed as a placeholder within the field.',
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  disabled: {
    control: { type: 'boolean' },
    description: `
Disables the field when true, making it non-interactive and cannot be clicked.

This is useful for conditions where user interaction should be restricted.

It will not be necessary to define disabled property on the \`FormControl\` instance, as long as this properties is correctly assigned of this field .
    `,
    table: {
      category: 'Properties',
      defaultValue: { summary: 'false' },
      type: { summary: 'boolean' },
    },
  },
  isRequired: {
    control: { type: 'boolean' },
    description: `
Sets the field as required when true.

Specifies whether the field must be filled out before submitting the form.

This is commonly used to ensure that users do not skip mandatory choices in forms, enhancing data integrity and user interaction compliance.
    `,
    table: {
      category: 'Properties',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  isClearable: {
    control: { type: 'boolean' },
    description: 'Sets the skill to clear the contents of this field when true',
    table: {
      category: 'Properties',
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  helperMessage: {
    control: {
      type: 'text',
    },
    description:
      'Sets the text to be displayed as a supporting message below the field.',
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  errorMessage: {
    description: `
Sets the error message instance or required field message to display below the field when there is an error in it.

For fields that only require mandatory field validation, it is sufficient to assign a string.

In case the field needs more than one validation per field, it is recommended to instantiate the error specification.

Validations supported in instantiation:

- **required**: corresponds to the validation assigned to the \`isRequired\` property
- **min**: corresponds to the validation assigned to the \`min\` property, used for numeric fields
- **max**: corresponds to the validation assigned to the \`max\` property, used for numeric fields
- **minLength**: corresponds to the validation assigned to the \`minlength\` property, used for text and textarea fields
- **maxLength**: corresponds to the validation assigned to the \`maxlength\` property, used for text and textarea fields
- **pattern**: corresponds to the validation assigned to the \`pattern\` property
- **jsonFormat**: corresponds to the validation assigned to the \`jsonFormat\` property, used for textarea fields
- **customValidation**: corresponds to the validation assigned to the \`customValidation\` property

<br/>
**Note:**

Default error messages will be displayed if this property is not assigned correctly.
    `,
    table: {
      category: 'Properties',
      type: {
        summary: 'string or IBmbInputError',
        detail: `
IBmbInputError {
  required?: string;
  min?: string;
  max?: string;
  minLength?: string;
  maxLength?: string;
  pattern?: string;
  jsonFormat?: string;
  customValidation?: string;
}
          `,
      },
      defaultValue: { summary: '' },
    },
  },
  ariaDescribedBy: {
    control: { type: 'text' },
    description:
      'Provides additional descriptive text for the field, enhancing accessibility by linking the field to a descriptive element by ID.',
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  ariaLabel: {
    control: { type: 'text' },
    description:
      'Defines a string that labels the field for accessibility purposes, which can be used when a visible label text is not present.',
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  ariaLabelledBy: {
    control: { type: 'text' },
    description:
      'Identifies the element(s) that labels the field for accessibility purposes, providing a reference to the IDs of the elements that serve as the field label.',
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  control: {
    control: { type: 'object' },
    description: getControlDescription(true),
    table: {
      category: 'Properties',
      type: { summary: 'FormControl' },
      defaultValue: { summary: null },
    },
  },
  showError: {
    control: {
      type: 'boolean',
    },
    description: `
${DEPRECATED_PROPERTIES_DESCRIPTION}

**Clarification:**

This property is not required or used because error validation is performed by \`FomControl\`.

Below is a snippet of the **TypeScript example** that performs automatic validation and marks the field as visited:
    ...
    updateErrorState(): void {
      ...
      control.markAsTouched();
      control.updateValueAndValidity();
      ...
    `,
    table: {
      category: 'Deprecated',
      type: { summary: 'boolean' },
      defaultValue: { summary: '-' },
    },
  },
  deprecated: {
    control: {
      type: '',
    },
    description: DEPRECATED_PROPERTIES_DESCRIPTION,
    table: {
      category: 'Deprecated',
      type: { summary: '' },
      defaultValue: { summary: '-' },
    },
  },
  id: {
    control: {
      type: '',
    },
    description: `
${DEPRECATED_PROPERTIES_DESCRIPTION}

**Clarification:**

Adding the id using a property with the same name affects the operation of the field.
    `,
    table: {
      category: 'Deprecated',
      type: { summary: '' },
      defaultValue: { summary: '-' },
    },
  },
  onKeyDown: {
    control: { type: '' },
    description: `
Emits the ***keydown*** event.
    (onKeyDown)="handleKeyDown($event)"
      `,
    table: {
      category: 'Events',
      type: { summary: 'KeyboardEvent' },
    },
  },
  dateFormat: {
    control: {
      type: 'text',
    },
    description: 'Sets the date format allowed for validation of entered data.',
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: 'dd/MM/yyyy' },
    },
  },
  invalidFormatErrorMessage: {
    control: {
      type: 'text',
    },
    description: 'Sets an error message for format field validation',
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: {
        summary: 'Por favor ingresa la fecha con formato [dateFormat]}',
      },
    },
  },
  requiredFieldErrorMessage: {
    control: {
      type: 'text',
    },
    description: 'Sets an error message for required field validation',
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: 'Por favor ingresa la fecha de [label]' },
    },
  },
};
