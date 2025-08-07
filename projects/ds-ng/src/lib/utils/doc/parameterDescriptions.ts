import { Description } from '@storybook/addon-docs/blocks';
import {
  DESIGN_SYSTEM_TITLE,
  getOnEvent,
  IBmbOnEventType,
  IBmbOnEvent,
} from './utils';
type onButtonEventType = 'clicked' | 'pressed';
export const DEPRECATED_PROPERTIES_DESCRIPTION =
  'This property is deprecated and will be removed in future versions.';
export const GOGGLE_FONTS_LINK = `Please refer to [Google Fonts](https://fonts.google.com/icons?icon.size=24&icon.color=%23e8eaed&selected=Material+Symbols+Outlined:more_vert:FILL@0;wght@400;GRAD@0;opsz@24) for more icons.`;
const DISABLE_DESCRIPTION = `
Disables the field when true, making it non-interactive and cannot be clicked.

This is useful for conditions where user interaction should be restricted.
`;
const UNIQUE_IDENTIFY_DESCRIPTION = 'Sets the unique identifier for';
export const getLabelDescription = (
  positionDescription: string,
  type: string = ' field',
) => `
Sets the label associated with ${type}.

The label helps users understand the context of what the ${type} represents.

The label will be displayed ${positionDescription} the ${type}.
`;
export const ON_BUTTON_CLICK: IBmbOnEvent = getOnEvent('', 'buttonClick');
export const ON_CLICK_DESCRIPTION: string =
  ', this event is only emitted if the *link* property is empty';
export const ICON_IMAGE_DETAIL: string =
  'Supports images; instead of the icon name, enter the URL of the image to use.';

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
  `__In ${DESIGN_SYSTEM_TITLE}, it is possible to implement automatic field validation using the \`bmb-form-validator\` component.
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
**‼︎Important:**
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

export const getAppearanceParam = (
  name: string,
  options: unknown[],
  defaultSummary: string = ' ',
) => {
  return {
    control: {
      type: 'select',
    },
    options,
    description: `Sets the appearance of ${name}, affecting its visual style.`,
    table: {
      category: 'Properties',
      defaultValue: { summary: defaultSummary },
      type: { summary: 'string' },
    },
  };
};

export const getOnEventParam = (
  onEvent: IBmbOnEvent,
  additionalDescription: string = '',
  eventType: IBmbOnEventType = 'change',
) => {
  return {
    control: false,
    description: `Emits the event ${eventType === 'change' || eventType === 'other' ? `${eventType === 'change' ? `when the ${onEvent.name} changed.` : ''}` : 'when a key is pressed while the input is focused.'}${additionalDescription}`,
    table: {
      category: 'Events',
      defaultValue: false,
      type: { summary: onEvent.propertyValue, detail: onEvent.event_type },
    },
  };
};

export const getOnClickParam = (
  onEvent: IBmbOnEvent,
  additionalDescription: string = '',
  buttonEventType: onButtonEventType = 'clicked',
) =>
  getOnEventParam(
    onEvent,
    `triggered after the ${onEvent.name} button is ${buttonEventType}${additionalDescription}.`,
    'other',
  );

export const DBmbGenericParamDesc = {
  uniqueId: {
    control: {
      type: 'text',
    },
    description: `

${UNIQUE_IDENTIFY_DESCRIPTION} the field.

This property is used to link the label to the field through the ***for*** attribute, improving accessibility and usability.
    `,
    table: {
      category: 'Properties',
      defaultValue: { summary: '' },
      type: { summary: 'string' },
    },
  },
  disabled: {
    control: { type: 'boolean' },
    description: DISABLE_DESCRIPTION,
    table: {
      category: 'Properties',
      defaultValue: { summary: 'false' },
      type: { summary: 'boolean' },
    },
  },
  link: {
    control: {
      type: 'text',
    },
    description:
      'Sets the link for redirection to another or same page. If this property is empty it will emit the button event.',
    table: {
      category: 'Events',
      defaultValue: { summary: '' },
      type: { summary: 'string' },
    },
  },
  target: {
    control: {
      type: 'radio',
    },
    options: ['_blank', '_self', '_parent', '_top'],
    description:
      'Sets the target property for the link. Refer to [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) for more information.',
    table: {
      category: 'Events',
      type: { summary: 'IBmbTargetLink (option)' },
      defaultValue: { summary: '_blank' },
    },
  },
  deprecated: {
    control: false,
    description: DEPRECATED_PROPERTIES_DESCRIPTION,
    table: {
      category: 'Deprecated',
      type: { summary: '' },
      defaultValue: { summary: '-' },
    },
  },
  onButtonClick: getOnClickParam(ON_BUTTON_CLICK, ON_CLICK_DESCRIPTION),
  onButtonPress: getOnClickParam(
    getOnEvent('', 'buttonPress'),
    ON_CLICK_DESCRIPTION,
    'pressed',
  ),
  buttonKeyPress: getOnClickParam(
    getOnEvent('', 'buttonKeyPress'),
    ' with a keyboard'.concat(ON_CLICK_DESCRIPTION),
    'pressed',
  ),
};

export const DBmbImageParamDesc = {
  image: {
    control: {
      type: 'text',
    },
    description:
      'Sets the source of the image to display, either from a path or a URL.',
    table: {
      category: 'Properties',
      defaultValue: { summary: '' },
      type: { summary: 'string' },
    },
  },
  src: {
    control: {
      type: 'text',
    },
    description: 'Sets the Hi-res image source URL',
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  mobileSrc: {
    control: {
      type: 'text',
    },
    description: 'Sets the low-res image source URL',
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  alt: {
    control: {
      type: 'text',
    },
    description: `
Sets the alternative text of the images. It is an essential part of making content accessible.

Refer [here](https://www.w3.org/WAI/alt/) for more information.
    `,
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  width: {
    control: {
      type: 'text',
    },
    description: 'Sets a blurred image as a box shadow.',
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '100%' },
    },
  },
  ratio: {
    control: {
      type: 'text',
    },
    description: 'Sets the aspect ratio of the image.',
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  borderRadius: {
    control: {
      type: 'select',
    },
    options: ['xs', 's', 'm', 'l', 'xl', 'none'],
    table: {
      type: { summary: 'string' },
      category: 'Properties',
      defaultValue: { summary: 'm' },
    },
    description: 'Sets the corner radius size.',
  },
  loading: {
    control: {
      type: 'radio',
    },
    options: ['lazy', 'eager'],
    table: {
      type: { summary: 'string' },
      category: 'Properties',
      defaultValue: { summary: 'lazy' },
    },
    description: `
Enables the loading behavior.
- **eager**: the browser will load the image immediately.
- **lazy**: the browser will wait until the viewport is close to the image to load it.
        `,
  },
  enableZoom: {
    control: { type: 'boolean' },
    description: `
Sets the zoom configuration when true.<br/><br/>
It groups multiple interactive icons into a parent element.<br/><br/>
By default, it is false, and you do not need to explicitly set it.
The badge should always have a parent element.`,
    table: {
      category: 'Properties',
      defaultValue: { summary: 'false' },
      type: { summary: 'boolean' },
    },
  },
  isBlurredBackdrop: {
    control: { type: 'boolean' },
    description: 'Sets a blurred image set blurred image as box shadow.',
    table: {
      category: 'Properties',
      defaultValue: { summary: 'false' },
      type: { summary: 'boolean' },
    },
  },
};

export const DBmbIconParamDesc = {
  icon: {
    control: {
      type: 'text',
    },
    description: `
Sets the icon name to be displayed.
<br/><br/>${GOGGLE_FONTS_LINK}<br/><br/>${ICON_IMAGE_DETAIL}`,
    table: {
      category: 'Properties',
      type: { summary: 'string' },
      defaultValue: { summary: '' },
    },
  },
  iconSize: {
    control: {
      type: 'number',
    },
    description:
      'Sets the size of the icon or width of the image to use. Note: <= 0 will be inherited.',
    table: {
      category: 'Properties',
      defaultValue: { summary: '' },
      type: { summary: 'number' },
    },
  },
  isIconFill: {
    control: { type: 'boolean' },
    description:
      'Determines whether the icon is filled (`true`) or outlined (`false`).',
    table: {
      category: 'Properties',
      defaultValue: { summary: 'true' },
      type: { summary: 'boolean' },
    },
  },
  iconDotNotification: {
    control: { type: 'number' },
    description:
      'Displays a notification dot with a number on the icon. Set to 0 to hide.',
    table: {
      category: 'Properties',
      defaultValue: { summary: '' },
      type: { summary: 'number' },
    },
  },
  alt: {
    ...DBmbImageParamDesc.alt,
    description: DBmbImageParamDesc.alt.description.replace(
      'of the images',
      'for the icon when it is an image',
    ),
  },
};

export const DBmbButtonParamDesc = {
  appearance: {
    control: { type: 'select' },
    options: [
      'primary',
      'secondary-filled',
      'secondary-outlined',
      'destructive',
      'transparent',
    ],
    description:
      'Sets the appearance of the buttons, affecting its visual style.',
    table: {
      category: 'Properties',
      defaultValue: { summary: 'primary' },
      type: { summary: 'string' },
    },
  },
  size: {
    control: 'radio',
    options: ['small', 'large'],
    table: {
      category: 'Properties',
      defaultValue: { summary: 'small' },
      type: { summary: 'string' },
    },
    description: 'Sets the size of the button, affecting its visual size.',
  },
  icon: {
    ...DBmbIconParamDesc.icon,
    description: DBmbIconParamDesc.icon.description.concat(
      '<br/><br/>The icon to display on the button.',
    ),
  },
};

export const DBmbModalParamDesc = {
  title: {
    control: {
      type: 'text',
    },
    description:
      'Specifies the text display. This message should be concise and direct.',
    table: {
      category: 'Properties',
      defaultValue: { summary: '' },
      type: { summary: 'string' },
    },
  },
  primaryBtnLabel: {
    control: {
      type: 'text',
    },
    description: 'Specifies the text of the primary button.',
    table: {
      category: 'Properties',
      defaultValue: { summary: '' },
      type: { summary: 'string' },
    },
  },
  secondaryBtnLabel: {
    control: {
      type: 'text',
    },
    description: 'Specifies the text of the secondary button.',
    table: {
      category: 'Properties',
      defaultValue: { summary: '' },
      type: { summary: 'string' },
    },
  },
};

export const DBmbDropdownMenuParamDesc = {
  items: {
    control: { type: 'object' },
    description: `
Sets the data to be displayed in the dropdown menu.

It is an array of objects representing menu items, providing additional actions or navigation options within the card button.

Each object in the array should contain the following properties:

- \`icon\`: (string) The name of the icon displayed next to the menu item text.

- \`text\`: (string) The text label for the menu item.

- \`url\`: (optional, string) The URL to navigate to when the menu item is clicked.

- \`target\`: (optional, string) Specifies where to display the linked URL (e.g., \`_self\`, \`_blank\`).

- \`action\`: (optional, function) A custom function executed when the menu item is clicked. This is useful for triggering specific behaviors or events.
    `,
    table: {
      category: 'Properties',
      type: {
        summary: 'IDropdownItem[]',
        detail: `
IDropdownItem {
idItem?: string;
icon: string;
text: string;
selectedText?: string;
value?: string;
url?: string;
target?: IBmbTargetLink;
action?: () => void;
}

IBmbTargetLink = '_blank' | '_parent' | '_self' | '_top';
        `,
      },
      defaultValue: { summary: '[]' },
    },
  },
};

export const DBmbInputParamDesc = {
  inputId: {
    description: `

${UNIQUE_IDENTIFY_DESCRIPTION} the field.

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
**‼︎Important:**

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

**‼︎Important**

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
  icon: {
    ...DBmbIconParamDesc.icon,
    description: DBmbIconParamDesc.icon.description.concat(
      '<br/><br/>The icon to display within the field.',
    ),
  },
  disabled: {
    control: { type: 'boolean' },
    description: `
${DISABLE_DESCRIPTION}

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
  onKeyDown: getOnEventParam(
    getOnEvent('', 'onKeyDown', 'KeyboardEvent'),
    '',
    'keyDown',
  ),
};
