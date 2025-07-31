import {
  Meta,
  StoryFn,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BmbInputPhoneNumberComponent } from './bmb-input-phone-number.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  attributes,
  generateLabel,
  getAccordionDetail,
  getBasicExampleBlock,
  getEmptyStateMessage,
  getFieldDescription,
  getFormExampleBlock,
  getSpecialSpecifications,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  DBmbInputParamDesc,
} from '../../utils/doc/parameterDescriptions';
import { IBmbCountryCode, IBmbCountryCodes } from '../../utils/countryCodes';

const inputName = 'input_phone_number';
const inputExample = `<bmb-input-phone-number
  id="${inputName}_id"
  name="${inputName}"
  label="${generateLabel(inputName)}"
  helperMessage="Helper Message"
  [onlyCountries]="['mx', 'us', 'ca']"
  [useOnlyCountries]="true"
  [control]="getFormControl('${inputName}')"
 />`;

const getAllCountryList = () => {
  const allCountries: IBmbCountryCode[] = IBmbCountryCodes;
  const content: string = allCountries
    .map(
      (element) =>
        `**${element.country}**: code(*${element.country_code}*)  lada(*${element.lada}*)  length(*${element.length}*)<br/>`,
    )
    .toString()
    .replaceAll('<br/>,', '<br/>');
  return `
### Country references
>${getAccordionDetail('Countries', content)}
  `;
};

export default {
  title: 'Components/Inputs/Phone number',
  component: BmbInputPhoneNumberComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BmbIconComponent,
      ],
    }),
    componentWrapperDecorator((story: string) => {
      return `
        <div style="height: 25rem">
          ${story}
        </div>`;
    }),
  ],
  parameters: {
    controls: {
      exclude: [
        'customValidatorPhone',
        'getErrorMessage',
        'getNumberValue',
        'getOptions',
        'getSelectedCountry',
        'getSelectedCountryCode',
        'getSelectedCountryLada',
        'getSelectedCountryLength',
        'getUUID',
        'handleFocus',
        'handleValidity',
        'onValueChange',
        'setControlValue',
        'allCountryCodes',
        'countryFiltering',
        'isFocused',
        'ladaControl',
        'phoneControl',
        'uuid',
      ],
    },
    docs: {
      description: {
        component: `
${getFieldDescription(
  'input-phone-number',
  'enter a phone number with automatic validation of the phone number length based on the selected area code.',
  'https://bamboo.tec.mx/latest/componentes/input-phone-number/descripcion-general-VhtBCJiR',
)}
${getSpecialSpecifications(`
>${getEmptyStateMessage()}<br/>
>${getAllCountryList()}
`)}
${getFormExampleBlock('BmbInputPhoneNumberComponent', inputName, '', inputExample)}
${getBasicExampleBlock('BmbInputPhoneNumberComponent')}
        `,
      },
    },
  },
  argTypes: {
    control: DBmbInputParamDesc.control,
    disabled: DBmbInputParamDesc.disabled,
    errorMessage: DBmbInputParamDesc.errorMessage,
    showError: DBmbInputParamDesc.showError,
    isRequired: DBmbInputParamDesc.isRequired,
    preferredCountries: {
      control: { type: 'array' },
      description:
        'Sets the list of countries that should be shown at the top.',
      table: {
        category: 'Properties',
        type: { summary: 'string[]' },
        defaultValue: { summary: "['mx']" },
      },
    },
    onlyCountries: {
      control: { type: 'array' },
      description:
        'Restricts the dropdown to only these countries (county codes example: mx, us, ca).',
      table: {
        category: 'Properties',
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    label: DBmbInputParamDesc.label,
    tooltip: DBmbInputParamDesc.tooltip,
    tooltipPosition: DBmbInputParamDesc.tooltipPosition,
    inputId: DBmbInputParamDesc.inputId,
    name: DBmbInputParamDesc.name,
    value: DBmbInputParamDesc.value,
    appearance: DBmbGenericParamDesc.deprecated,
    defaultLada: DBmbGenericParamDesc.deprecated,
    helperMessage: DBmbInputParamDesc.helperMessage,
    placeholder: DBmbInputParamDesc.placeholder,
    defaultCountryCode: {
      control: { type: 'string' },
      description:
        'Sets the default country code for the phone number input (e.g., "mx" for Mexico).',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'mx' },
      },
    },
  },
  args: {
    inputId: '',
    name: '',
    value: '',
    label: '',
    tooltip: '',
    tooltipPosition: {},
    placeholder: '',
    defaultCountryCode: 'mx',
    preferredCountries: ['mx'],
    onlyCountries: ['mx', 'us', 'ca'],
    disabled: false,
    isRequired: false,
  },
} as Meta<typeof BmbInputPhoneNumberComponent>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
    <bmb-input-phone-number
      ${attributes(args)}
    />
    `,
});

export const Default = customizable();
