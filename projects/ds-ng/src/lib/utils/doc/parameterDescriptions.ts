export const DEPRECATED_PROPERTIES_DESCRIPTION =
  'This property is deprecated and will be removed in future versions.';

const getLabelDescription = (positionDescription: string) => `
Sets the  label associated with the form input field.

The label helps users understand the context of what the checkbox represents.

The label will be displayed ${positionDescription} the form input field.
`;

export const InputParameterDescriptions = {
  inputId: {
    description: `

Sets the unique identifier for the form input field.

This property is used to link the label to the form input field through the ***for*** attribute, improving accessibility and usability.
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
Sets the form input field name.

<br>
**Important:**

This property is essential for correct behavior of the the \`FormControl\`.

<br>
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
Sets the value of the form input field.

This is the value that is taken when the form is submitted.

**Important**

The value will not be necessary to define a value on the \`FormControl\` instance, as long as this properties is correctly assigned of this form input field .
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
  labelCheckboxOrRadial: {
    control: {
      type: 'text',
    },
    description: `
${getLabelDescription('at the default \`labelPosition\` or the position specified in \`labelPosition\` relative to')}
    `,
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  tooltip: {
    control: {
      type: 'text',
    },
    description:
      'Sets the text to be displayed as a tooltip above the form input field.',
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
Sets the name of the icon to be displayed within the form input field.

<br>
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
      'Sets the text to be displayed as a placeholder within the form input field.',
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  disabled: {
    control: { type: 'boolean' },
    description: `
Disables the form input field when true, making it non-interactive and cannot be clicked.

This is useful for conditions where user interaction should be restricted.

It will not be necessary to define disabled property on the \`FormControl\` instance, as long as this properties is correctly assigned of this form input field .
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
Sets the form input field as required when true.

Specifies whether the form input field must be filled out before submitting the form.

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
    description:
      'Sets the skill to clear the contents of this form input field when true',
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
      'Sets the text to be displayed as a supporting message below the form input field.',
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  errorMessage: {
    control: {
      type: 'object',
    },
    description: `
Sets the error message instance or required field message to display below the form input field when there is an error in it.

For fields that only require mandatory field validation, it is sufficient to assign a string.

In case the field needs more than one validation per field, it is recommended to instantiate the error specification.

Validations supported in instantiation:

- **required**: corresponds to the validation assigned to the \`isRequired\` property
- **min**: corresponds to the validation assigned to the \`min\` property, used for numeric form input fields
- **max**: corresponds to the validation assigned to the \`max\` property, used for numeric form input fields
- **minLength**: corresponds to the validation assigned to the \`minlength\` property, used for text and textarea form input fields
- **maxLength**: corresponds to the validation assigned to the \`maxlength\` property, used for text and textarea form input fields
- **pattern**: corresponds to the validation assigned to the \`pattern\` property
- **jsonFormat**: corresponds to the validation assigned to the \`jsonFormat\` property, used for textarea form input fields
- **customValidation**: corresponds to the validation assigned to the \`customValidation\` property

<br>
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
  control: {
    control: { type: 'object' },
    description: `
Sets the \`FormControl\` instance to manage the state of the form input field.

<br>
**Important:**

It is essential to assign the property \`name\` for correct behavior of the form input field.

It will not be necessary to define \`Validators\` in the \`FormControl\` instance, as long as the properties of this form input field are correctly assigned.

<br>
This component automatically implements the \`Validators\` on the following properties:

- **isRequired**: adds \`Validators.required\` to the \`FormControl\`
- **minlength**: adds \`Validators.minLength\` to the \`FormControl\`
- **maxlength**: adds \`Validators.maxLength\` to the \`FormControl\`
- **max**: adds \`Validators.max\` to the \`FormControl\`
- **min**: adds \`Validators.min\` to the \`FormControl\`
- **pattern**: adds \`Validators.pattern\` to the \`FormControl\`

<br>
In **Bamboo**, it is possible to implement automatic field validation using the \`bmb-form-validator\` component.

<br>
The \`bmb-form-validator\` component contains the state of the form by collecting the form fields and adding them to a \`FormGroup\`.

<br>
Please check the ***Form validator*** documentation for details on how to implement \`bmb-form-validator\` component.

This documentation is displayed as a tab at the top.
`,
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

This property is not required or used because the component automatically validates errors.
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

Adding the id using a property with the same name affects the operation of the form input field.
    `,
    table: {
      category: 'Deprecated',
      type: { summary: '' },
      defaultValue: { summary: '-' },
    },
  },
};
