import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbFilterCardComponent } from './bmb-filter-card.component';
import { CommonModule } from '@angular/common';
import {
  getBasicExampleBlock,
  getEmptyStateMessage,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  getTechnicalDocReferences,
} from '../../utils/doc/utils';
import {
  DBmbButtonParamDesc,
  DBmbModalParamDesc,
  getOnClickParam,
} from '../../utils/doc/parameterDescriptions';
import * as checkboxStory from './../bmb-checkbox/bmb-checkbox.stories';
import * as switchStory from './../bmb-switch/bmb-switch.stories';
import * as radialStory from './../bmb-radial/bmb-radial.stories';
import * as dropdownStory from './../bmb-dropdown/bmb-dropdown.stories';
import * as tagsStory from './../bmb-tags/bmb-tags.stories';

export default {
  title: 'Components/Containers/Filter card',
  component: BmbFilterCardComponent,
  decorators: [moduleMetadata({ imports: [CommonModule] })],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'getFormControl',
          'onControlChange',
          'onReset',
          'onSubmit',
          'onValueChange',
          'openModalComponent',
          'ngOnInit',
          'filterForm',
          'storedValues',
          'modalTemplate',
          'modalId',
          'handleSubmit',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'filter-card' })} to display and managing filter controls in a modal dialog.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/filter-card/descripcion-general-Be01z0Al' })}
${getSpecialSpecifications(
  `${getEmptyStateMessage()} ${getTechnicalDocReferences({
    references: [
      { title: dropdownStory.default.title! },
      { title: tagsStory.default.title! },
      { title: radialStory.default.title! },
      { title: checkboxStory.default.title! },
      { title: switchStory.default.title! },
    ],
  })}`,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock('BmbFilterCardComponent')}
        `,
      },
    },
  },
  argTypes: {
    modalTitle: DBmbModalParamDesc.title,
    primaryBtnLabel: DBmbModalParamDesc.primaryBtnLabel,
    secondaryBtnLabel: DBmbModalParamDesc.secondaryBtnLabel,
    icon: DBmbButtonParamDesc.icon,
    visibilityRules: {
      control: { type: 'object' },
      description: `
Declares conditional visibility rules. Each rule specifies a \`when\` condition (a map of control name → expected value) and lists of control names to \`show\` or \`hide\` when the condition is met.

When a dependent control is hidden, its form value is automatically cleared.

\`\`\`ts
visibilityRules: [
  { when: { nivel: 'Profesional' }, show: ['tipoEval', 'escuelas'], hide: ['deptos'] },
  { when: { nivel: 'Preparatoria' }, show: ['deptos'], hide: ['tipoEval', 'escuelas'] },
]
\`\`\`
      `,
      table: {
        category: 'Conditional Filters',
        type: { summary: 'IBmbVisibilityRule[]' },
        defaultValue: { summary: '[]' },
      },
    },
    optionRules: {
      control: { type: 'object' },
      description: `
Declares cascading option rules. Each rule specifies a \`when\` condition and the new \`options\` to apply to the \`target\` dropdown when the condition is met.

If the target dropdown's current value is not in the new options list, it is automatically cleared.

\`\`\`ts
optionRules: [
  { when: { campus: 'Monterrey' }, target: 'carrera', options: ['Ingeniería', 'Negocios'] },
  { when: { campus: 'Guadalajara' }, target: 'carrera', options: ['Arquitectura', 'Diseño'] },
]
\`\`\`
      `,
      table: {
        category: 'Conditional Filters',
        type: { summary: 'IBmbOptionRule[]' },
        defaultValue: { summary: '[]' },
      },
    },
    placeholderSearch: {
      control: { type: 'text' },
      description: 'Sets the placeholder text for the search input.',
      table: { category: 'Properties', defaultValue: { summary: '' } },
    },
    controlTypes: {
      control: { type: 'array' },
      description: `
Sets the data list of control types.

Data descriptions:
- ***name***: Unique identifier name for the control
- ***type***: Type of control to render (radial, checkbox, switch, tag, dropdown'
- ***label***: Display label for the control
- ***checked***: Whether the control is checked/selected (for checkbox, switch, radial)
- ***placeholder***: Placeholder text (for input/dropdown controls)
- ***rightText***: Additional text to display on the right side
- ***value***: Current value of the control
- ***id***: Unique identifier for the control element
- ***options***: Available options for selection controls (for dropdown controls)
- ***isMultiSelect***: Whether multiple selections are allowed (for dropdown controls), when this attribute is true the list will not be filterable.
        `,
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: {
          summary: 'IBmbControlType[]',
          detail: `IBmbControlType {
  name: string;
  type: 'radial' | 'checkbox' | 'switch' | 'tag' | 'dropdown';
  label: string;
  checked?: boolean;
  placeholder?: string;
  rightText?: string;
  value?: string;
  id?: string;
  options?: string[] | IBmbDropdownItem[];
  isMultiSelect?: boolean;
  }[];
}`,
        },
      },
    },
    applyFilters: getOnClickParam(
      getOnEvent('apply filters', 'applyFilters', 'void'),
    ),
    resetFilters: getOnClickParam(getOnEvent('reset ', 'resetFilters', 'void')),
    inLine: {
      control: { type: 'boolean' },
      description:
        'Displays the filter card in the document instead of the dialog.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    showDropdown: {
      control: { type: 'boolean' },
      description:
        'Determines if the dropdown should be displayed instead of the input.',
      table: {
        category: 'Deprecated',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    dropdownOptions: {
      control: { type: 'array' },
      description: 'Defines the list of options available in the dropdown.',
      table: {
        category: 'Deprecated',
        type: { summary: 'string[]' },
        defaultValue: {
          summary: "['Apple', 'Banana', 'Orange', 'Pear', 'Grape']",
        },
      },
    },
    showGlobalSearch: {
      control: 'boolean',
      Description:
        'Determines if the global search is visible (input or dropdown).',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
  },
  args: {
    showDropdown: false,
    dropdownOptions: ['Apple', 'Banana', 'Orange', 'Pear', 'Grape'],
    modalTitle: 'Opciones Filtrado',
    primaryBtnLabel: 'Aplicar Filtros',
    secondaryBtnLabel: 'Limpiar Filtros',
    icon: 'tune',
    placeholderSearch: 'Search',
    applyFilters: (filters: any) => {
      console.log('Filters applied', filters);
    },
    controlTypes: [
      {
        title: 'Filter - Dropdown',
        control: [
          {
            name: 'dropdown-1',
            type: 'dropdown',
            options: [
              { value: 'banana', name: 'Banana' },
              { value: 'apple', name: 'Apple' },
              { value: 'tomato', name: 'Tomato' },
            ],
            value: 'apple',
            isMultiSelect: true,
          },
        ],
      },
      {
        title: 'Filter - tags',
        control: [
          {
            name: 'tag-1',
            type: 'tag',
            label: 'Name tag 1',
            checked: false,
          },
          {
            name: 'tag-2',
            type: 'tag',
            label: 'Name tag 2',
            checked: false,
          },
        ],
      },
      {
        title: 'Filter - Radial',
        control: [
          {
            name: 'radial-1',
            type: 'radial',
            label: 'Radial 1',
            id: 'radial-1',
            value: '1',
            checked: false,
          },
          {
            name: 'radial-1',
            type: 'radial',
            label: 'Radial 2',
            id: 'radial-2',
            value: '2',
            checked: false,
          },
        ],
      },
      {
        title: 'Filter - Checkbox',
        control: [
          {
            name: 'checkbox-1',
            type: 'checkbox',
            label: 'Checkbox 1',
            checked: false,
          },
          {
            name: 'checkbox-2',
            type: 'checkbox',
            label: 'Checkbox 2',
            checked: false,
          },
        ],
      },
      {
        title: 'Filter - Switch',
        control: [
          {
            name: 'switch-1',
            type: 'switch',
            rightText: 'Switch 3',
            checked: false,
          },
        ],
      },
    ],
    inLine: false,
    showGlobalSearch: true,
  },
} as Meta<typeof BmbFilterCardComponent>;

type Story = StoryObj<typeof BmbFilterCardComponent>;

export const Default: Story = {};

export const ConditionalFilters = {
  name: 'Conditional Filters (visibilityRules)',
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates **Conditional Filters** using \`visibilityRules\`.

Select **Profesional** to show *Tipo de evaluación* and *Escuelas* while hiding *Departamentos (Prepa)*.
Select **Preparatoria** to show *Departamentos (Prepa)* while hiding the other two.

When a control is hidden, its previously selected value is cleared automatically.
        `,
      },
    },
  },
  args: {
    inLine: true,
    showGlobalSearch: false,
    modalTitle: 'Filtros',
    primaryBtnLabel: 'Aplicar',
    secondaryBtnLabel: 'Limpiar',
    icon: 'tune',
    controlTypes: [
      {
        title: 'Nivel',
        control: [
          {
            name: 'nivel',
            type: 'radial',
            label: 'Profesional',
            id: 'nivel-profesional',
            value: 'Profesional',
            checked: true,
          },
          {
            name: 'nivel',
            type: 'radial',
            label: 'Preparatoria',
            id: 'nivel-preparatoria',
            value: 'Preparatoria',
            checked: false,
          },
        ],
      },
      {
        title: 'Tipo de evaluación',
        control: [
          {
            name: 'tipoEval',
            type: 'radial',
            label: 'Parcial',
            id: 'tipo-parcial',
            value: 'Parcial',
          },
          {
            name: 'tipoEval',
            type: 'radial',
            label: 'Final',
            id: 'tipo-final',
            value: 'Final',
          },
        ],
      },
      {
        title: 'Estatus',
        control: [
          {
            name: 'estatus',
            type: 'radial',
            label: 'Activo',
            id: 'estatus-activo',
            value: 'Activo',
          },
          {
            name: 'estatus',
            type: 'radial',
            label: 'Inactivo',
            id: 'estatus-inactivo',
            value: 'Inactivo',
          },
        ],
      },
      {
        title: 'Escuelas (Profesional)',
        control: [
          { name: 'escuelaIngenieria', type: 'tag', label: 'Ingeniería' },
          { name: 'escuelaMedicina', type: 'tag', label: 'Medicina' },
          { name: 'escuelaNegocios', type: 'tag', label: 'Negocios' },
        ],
      },
      {
        title: 'Departamentos (Prepa)',
        control: [
          { name: 'deptoMatematicas', type: 'tag', label: 'Matemáticas' },
          { name: 'deptoCiencias', type: 'tag', label: 'Ciencias' },
        ],
      },
    ],
    visibilityRules: [
      {
        when: { nivel: 'Profesional' },
        show: [
          'tipoEval',
          'escuelaIngenieria',
          'escuelaMedicina',
          'escuelaNegocios',
        ],
        hide: ['deptoMatematicas', 'deptoCiencias'],
      },
      {
        when: { nivel: 'Preparatoria' },
        show: ['deptoMatematicas', 'deptoCiencias'],
        hide: [
          'tipoEval',
          'escuelaIngenieria',
          'escuelaMedicina',
          'escuelaNegocios',
        ],
      },
    ],
    optionRules: [],
    showDropdown: true,
  },
};

export const CascadingFilters = {
  name: 'Cascading Filters (optionRules)',
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates **Cascading Filters** using \`optionRules\`.

Select a **Campus** to dynamically update the available options in the **Carrera** dropdown.
If the previously selected carrera is no longer valid after the campus changes, it is cleared automatically.
        `,
      },
    },
  },
  args: {
    inLine: true,
    showGlobalSearch: false,
    modalTitle: 'Filtros',
    primaryBtnLabel: 'Aplicar',
    secondaryBtnLabel: 'Limpiar',
    icon: 'tune',
    controlTypes: [
      {
        title: 'Campus',
        control: [
          {
            name: 'campus',
            type: 'radial',
            label: 'Monterrey',
            id: 'campus-mty',
            value: 'Monterrey',
          },
          {
            name: 'campus',
            type: 'radial',
            label: 'Guadalajara',
            id: 'campus-gdl',
            value: 'Guadalajara',
          },
          {
            name: 'campus',
            type: 'radial',
            label: 'Ciudad de México',
            id: 'campus-cdmx',
            value: 'Ciudad de México',
          },
        ],
      },
      {
        title: 'Carrera',
        control: [
          {
            name: 'carrera',
            type: 'dropdown',
            label: 'Carrera',
            placeholder: 'Selecciona una carrera',
            options: [],
          },
        ],
      },
    ],
    visibilityRules: [],
    optionRules: [
      {
        when: { campus: 'Monterrey' },
        target: 'carrera',
        options: ['Ingeniería', 'Negocios', 'Medicina', 'Arquitectura'],
      },
      {
        when: { campus: 'Guadalajara' },
        target: 'carrera',
        options: ['Arquitectura', 'Diseño', 'Arte'],
      },
      {
        when: { campus: 'Ciudad de México' },
        target: 'carrera',
        options: ['Derecho', 'Economía', 'Ciencias Sociales'],
      },
    ],
  },
};

export const CascadingFiltersWithObjects = {
  name: 'Cascading Filters with IBmbDropdownItem (name ≠ value)',
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates **Cascading Filters** using \`IBmbDropdownItem[]\` objects in \`optionRules\`.

Each option has a **\`name\`** (display label) and a **\`value\`** (identifier emitted on apply).
This is useful when you need to show a human-readable label but send a technical identifier to the backend.

The emitted \`applyFilters\` event will contain the **\`value\`** field (e.g. \`'ing-sistemas'\`), not the display name.
        `,
      },
    },
  },
  args: {
    inLine: true,
    showGlobalSearch: false,
    modalTitle: 'Filtros',
    primaryBtnLabel: 'Aplicar',
    secondaryBtnLabel: 'Limpiar',
    icon: 'tune',
    controlTypes: [
      {
        title: 'Campus',
        control: [
          {
            name: 'campusObj',
            type: 'radial',
            label: 'Monterrey',
            id: 'campusobj-mty',
            value: 'MTY',
          },
          {
            name: 'campusObj',
            type: 'radial',
            label: 'Guadalajara',
            id: 'campusobj-gdl',
            value: 'GDL',
          },
        ],
      },
      {
        title: 'Carrera',
        control: [
          {
            name: 'carreraObj',
            type: 'dropdown',
            label: 'Carrera',
            placeholder: 'Selecciona una carrera',
            options: [],
          },
        ],
      },
    ],
    visibilityRules: [],
    optionRules: [
      {
        when: { campusObj: 'MTY' },
        target: 'carreraObj',
        options: [
          { name: 'Ingeniería en Sistemas', value: 'ing-sistemas' },
          { name: 'Ingeniería en Mecatrónica', value: 'ing-mecatronica' },
          { name: 'Negocios Internacionales', value: 'neg-int' },
        ],
      },
      {
        when: { campusObj: 'GDL' },
        target: 'carreraObj',
        options: [
          { name: 'Arquitectura y Diseño', value: 'arq-dis' },
          { name: 'Diseño Industrial', value: 'dis-ind' },
        ],
      },
    ],
  },
};

export const CombinedRules = {
  name: 'Combined Rules (visibilityRules + optionRules)',
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates **simultaneous use of \`visibilityRules\` and \`optionRules\`** (section 2.4 of the technical spec).

Both inputs are independent and coexist on the same component instance.

- **\`visibilityRules\`** controls whether the *Departamento* dropdown is shown or hidden.
- **\`optionRules\`** controls which options the dropdown exposes when it is visible.

Select **Profesional** → the *Departamento* dropdown appears with professional departments.
Select **Preparatoria** → the *Departamento* dropdown is hidden and its previously selected value is cleared automatically.
        `,
      },
    },
  },
  args: {
    inLine: true,
    showGlobalSearch: false,
    modalTitle: 'Filtros',
    primaryBtnLabel: 'Aplicar',
    secondaryBtnLabel: 'Limpiar',
    icon: 'tune',
    controlTypes: [
      {
        title: 'Nivel',
        control: [
          {
            name: 'nivelCombo',
            type: 'radial',
            label: 'Profesional',
            id: 'combo-nivel-pro',
            value: 'PRO',
            checked: true,
          },
          {
            name: 'nivelCombo',
            type: 'radial',
            label: 'Preparatoria',
            id: 'combo-nivel-prep',
            value: 'PREP',
          },
        ],
      },
      {
        title: 'Departamento',
        control: [
          {
            name: 'deptoCombo',
            type: 'dropdown',
            label: 'Departamento',
            placeholder: 'Selecciona un departamento',
            options: [],
          },
        ],
      },
    ],
    visibilityRules: [
      { when: { nivelCombo: 'PRO' }, show: ['deptoCombo'] },
      { when: { nivelCombo: 'PREP' }, hide: ['deptoCombo'] },
    ],
    optionRules: [
      {
        when: { nivelCombo: 'PRO' },
        target: 'deptoCombo',
        options: ['Ingeniería', 'Negocios', 'Medicina'],
      },
      {
        when: { nivelCombo: 'PREP' },
        target: 'deptoCombo',
        options: ['Matemáticas', 'Ciencias', 'Historia'],
      },
    ],
  },
};

export const MultiFieldCondition = {
  name: 'Multi-field AND Condition (optionRules)',
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates **\`optionRules\` with a multi-field \`when\` condition** (section 2.5 of the technical spec).

A rule applies only when **all fields in \`when\` match simultaneously** (logical AND).
The *Carrera* dropdown remains empty until **both** Campus and Nivel are selected.

| Campus | Nivel | Opciones disponibles |
|---|---|---|
| Monterrey | Profesional | Ingeniería, Medicina, Negocios |
| Monterrey | Preparatoria | Preparatoria Tec Monterrey |
| Guadalajara | Profesional | Arquitectura, Diseño |
| Guadalajara | Preparatoria | Preparatoria Tec Guadalajara |
        `,
      },
    },
  },
  args: {
    inLine: true,
    showGlobalSearch: false,
    modalTitle: 'Filtros',
    primaryBtnLabel: 'Aplicar',
    secondaryBtnLabel: 'Limpiar',
    icon: 'tune',
    controlTypes: [
      {
        title: 'Campus',
        control: [
          {
            name: 'campusAnd',
            type: 'radial',
            label: 'Monterrey',
            id: 'and-campus-mty',
            value: 'MTY',
          },
          {
            name: 'campusAnd',
            type: 'radial',
            label: 'Guadalajara',
            id: 'and-campus-gdl',
            value: 'GDL',
          },
        ],
      },
      {
        title: 'Nivel',
        control: [
          {
            name: 'nivelAnd',
            type: 'radial',
            label: 'Profesional',
            id: 'and-nivel-pro',
            value: 'PRO',
          },
          {
            name: 'nivelAnd',
            type: 'radial',
            label: 'Preparatoria',
            id: 'and-nivel-prep',
            value: 'PREP',
          },
        ],
      },
      {
        title: 'Carrera',
        control: [
          {
            name: 'carreraAnd',
            type: 'dropdown',
            label: 'Carrera',
            placeholder: 'Selecciona campus y nivel primero',
            options: [],
          },
        ],
      },
    ],
    visibilityRules: [],
    optionRules: [
      {
        when: { campusAnd: 'MTY', nivelAnd: 'PRO' },
        target: 'carreraAnd',
        options: ['Ingeniería', 'Medicina', 'Negocios'],
      },
      {
        when: { campusAnd: 'MTY', nivelAnd: 'PREP' },
        target: 'carreraAnd',
        options: ['Preparatoria Tec Monterrey'],
      },
      {
        when: { campusAnd: 'GDL', nivelAnd: 'PRO' },
        target: 'carreraAnd',
        options: ['Arquitectura', 'Diseño'],
      },
      {
        when: { campusAnd: 'GDL', nivelAnd: 'PREP' },
        target: 'carreraAnd',
        options: ['Preparatoria Tec Guadalajara'],
      },
    ],
  },
};
