import { componentWrapperDecorator, type Meta, type StoryFn } from '@storybook/angular';
import { attributes } from '../../utils/utils';
import { BmbInputTagsComponent } from './bmb-input-tags.component';
import { storiesLayoutHorizontal } from '../../utils/bambooLayout';

export default {
  title: 'Micro Componentes/ Input Tags',
  component: BmbInputTagsComponent,
  decorators: [
    componentWrapperDecorator(
      (story: string) => {
        return `
        <div style="height: 25rem">
          ${story}
        </div>`;
      },
    ),
    storiesLayoutHorizontal
  ],
  parameters: {
    docs: {
      description: {
        component: `
  Below is an example of how you can use this component in TypeScript:

  \`\`\`typescript
  import { CommonModule } from '@angular/common';
  import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

  import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
  } from '@angular/forms';
  import {
    BmbInputTagsComponent,
    BmbLayoutItemDirective,
  } from '../../projects/ds-ng/src/public-api';
  @Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, BmbInputTagsComponent, BmbLayoutItemDirective],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class AppComponent implements OnInit {
    projectForm!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
      this.loadForm();
      this.setValueToForm();
    }

    loadForm() {
      this.projectForm = this.fb.group({
        nombre: new FormControl({ value: '', disabled: false }),
        descripcion: new FormControl({ value: '', disabled: false }),
        tipoEmprendimiento: new FormControl({ value: '', disabled: false }),
        perfilEmprendedor: new FormControl({ value: '', disabled: false }),
        odsImpactada: new FormControl({ value: '', disabled: false }),
        liderProyecto: new FormControl({ value: '', disabled: false }),
        socios: new FormControl({ value: '', disabled: false }),
      });
    }

    setValueToForm() {
      this.projectForm.patchValue({
        nombre: 'TEST1',
        descripcion: 'Esto es una prueba',
        tipoEmprendimiento: ['Enchiladas'],
        perfilEmprendedor: ['Quesadillas', 'Enchiladas'],
        odsImpactada: '',
        liderProyecto: 'Osvaldo Mendoza',
        socios: '',
      });
    }

    getFormControl(name: string): FormControl {
      return this.projectForm.get(name) as FormControl;
    }
  }
  \`\`\`

  ### Example in HTML

  Below is an example of how to use this component in HTML:

  \`\`\`html
  <div>
    <bmb-input-tags
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
      [errorMessage]="'Error Message'"
      [label]="'Tipo de emprendimiento'"
      [placeholder]="'Selecciona una opción'"
      [isRequired]="false"
      [disabled]="false"
      [control]="getFormControl('tipoEmprendimiento')"
    ></bmb-input-tags>
    <bmb-input-tags
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
      [errorMessage]="'Error Message'"
      [label]="'Perfil emprendedor'"
      [placeholder]="'Selecciona una opción'"
      [isRequired]="false"
      [control]="getFormControl('perfilEmprendedor')"
    ></bmb-input-tags>
    <bmb-input-tags
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
      [errorMessage]="'Error Message'"
      [label]="'ODC Impactada'"
      [placeholder]="'Selecciona una opción'"
      [isRequired]="false"
      [disabled]="false"
      [tooltip]="'tooltip del input tag'"
      [control]="getFormControl('odsImpactada')"
    ></bmb-input-tags>
  </div>

  \`\`\`
          `,
      },
    },
  },
  argTypes: {
    control: {
      name: 'Control',
      control: { type: 'object' },
      description: 'Instance of FormControl to manage the input control state.',
      table: {
        category: 'Properties',
        type: { summary: 'FormControl' },
        defaultValue: { summary: "FormControl('', Validators.required)" },
      },
    },
    errorMessage: {
      name: 'Error Message',
      control: {
        type: 'text',
      },
      description: 'Text to be displayed when there is an error.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    helperMessage: {
      name: 'Helper Message',
      control: {
        type: 'text',
      },
      description: 'Text to be displayed as a helper message below the input.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    isRequired: {
      name: 'Required',
      control: { type: 'boolean' },
      description: 'Indicates whether the input field is required.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    placeholder: {
      name: 'Placeholder',
      control: {
        type: 'text',
      },
      description: 'Placeholder text to be displayed inside the input field.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    disabled: {
      name: 'Disabled',
      control: { type: 'boolean' },
      description: 'Disables the input field when set to true.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    label: {
      name: 'Label',
      control: {
        type: 'text',
      },
      description: 'Label text to be displayed above the input field.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    showError: {
      name: 'Show Error',
      control: {
        type: 'boolean',
      },
      description: 'Boolean to show or hide the error message.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    tagOptions: {
      name: 'Tag Options',
      control: {
        type: 'array',
      },
      description:
        'The options the user can select from. It accepts a string array.',
      table: {
        category: 'Properties',
        type: { summary: 'Array<string>' },
      },
    },
    tooltip: {
      name: 'Tooltip',
      control: {
        type: 'text',
      },
      description: 'Shows a tooltip with extra information about the input',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    errorMessage: 'Error Message',
    helperMessage: 'Helper Message',
    isRequired: false,
    placeholder: 'Placeholder',
    disabled: false,
    label: 'Input Label',
    showError: false,
    tagOptions: [
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
      'Mole verde',
      'Arroz a la mexicana',
      'Burritos',
    ],
    tooltip: 'tooltip del input tag',
  },
} as Meta<typeof BmbInputTagsComponent>;

const customizable = (): StoryFn => (args) => ({
  template: `
    <bmb-input-tags
      ${attributes(args)}
      (onValueChange)="onValueChange($event)"
    />
  `,
});

export const Default = customizable();
