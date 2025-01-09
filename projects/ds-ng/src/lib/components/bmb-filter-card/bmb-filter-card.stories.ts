import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbFilterCardComponent } from './bmb-filter-card.component';
import { CommonModule } from '@angular/common';
import { BmbPortalComponent } from '../bmb-portal/bmb-portal.component';
import { InputSignal } from '@angular/core';
import { IBmbControlType } from './bmb-filter-card.interface';

const meta: Meta<BmbFilterCardComponent> = {
  title: 'Macro Componentes/Filter Card',
  component: BmbFilterCardComponent,
  subcomponents: { BmbPortalComponent },
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BmbPortalComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbFilterCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbFilterCardComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    modalTitle: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: 'The title of the modal dialog.',
      table: {
        category: 'Properties',
      },
    },
    primaryBtnLabel: {
      name: 'Primary Button Label',
      control: {
        type: 'text',
      },
      description: 'The label of the primary button.',
      table: {
        category: 'Properties',
      },
    },
    secondaryBtnLabel: {
      name: 'Secondary Button Label',
      control: {
        type: 'text',
      },
      description: 'The label of the secondary button.',
      table: {
        category: 'Properties',
      },
    },
    icon: {
      name: 'icon',
      control: {
        type: 'text',
      },
      description: 'The icon to display on the button.',
      table: {
        category: 'Properties',
      },
    },
    placeholderSearch: {
      name: 'Placeholder Search',
      control: {
        type: 'text',
      },
      description: 'The placeholder text for the search input.',
      table: {
        category: 'Properties',
      },
    },
    controlTypes: {
      name: 'Control Types',
      control: {
        type: 'array',
      },
      description:
        'An array of control types, each with a title and an array of controls.',
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbControlType[]',
        },
      },
    },
    applyFilters: {
      name: 'Apply Filters',
      control: {
        type: 'void',
      },
      description: 'Emits an event when the user applies the filters.',
      table: {
        category: 'Outputs',
        type: {
          summary: 'void',
        },
      },
    },
    resetFilters: {
      name: 'Reset Filters',
      control: {
        type: 'void',
      },
      description: 'Emits an event when the user resets the filters.',
      table: {
        category: 'Outputs ',
        type: {
          summary: 'void',
        },
      },
    },
    inLine: {
      name: 'In line',
      control: {
        type: 'boolean',
      },
      description:
        'Display the filter card in the document instead of the dialog',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    modalTitle: 'Opciones Filtrado' as unknown as InputSignal<string>,
    primaryBtnLabel: 'Aplicar Filtros' as unknown as InputSignal<string>,
    secondaryBtnLabel: 'Limpiar Filtros' as unknown as InputSignal<string>,
    icon: 'tune' as unknown as InputSignal<string>,
    placeholderSearch: 'Search' as unknown as InputSignal<string>,
    // applyFilters: '',
    // resetFilters: '',
    controlTypes: [
      {
        title: 'Filter - Radial',
        control: [
          {
            name: 'radial-1',
            type: 'radial',
            label: 'Radial 1',
            checked: false,
          },
          {
            name: 'radial-1',
            type: 'radial',
            label: 'Radial 2',
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
    ] as unknown as InputSignal<IBmbControlType[]>,
    inLine: false as unknown as InputSignal<boolean>,
  },
};

export default meta;

type Story = StoryObj<BmbFilterCardComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 1000px;">
        <bmb-filter-card
          [modalTitle]="'Opciones Filtrado'"
          [primaryBtnLabel]="'Aplicar Filtros'"
          [secondaryBtnLabel]="'Limpiar Filtros'"
          [icon]="'tune'"
          [placeholderSearch]="'Search'"
          [controlTypes]="[{title: 'Filter - Radial', control: [{name: 'radial-1', type: 'radial', label: 'Radial 1', checked: false}, {name: 'radial-1', type: 'radial', label: 'Radial 2', checked: false}]}, {title: 'Filter - Checkbox', control: [{name: 'checkbox-1', type: 'checkbox', label: 'Checkbox 1', checked: false}, {name: 'checkbox-2', type: 'checkbox', label: 'Checkbox 2', checked: false}]}, {title: 'Filter - Switch', control: [{name: 'switch-1', type: 'switch', rightText: 'Switch 3', checked: false}]}]"
          [inLine]="false"
          (applyFilters)="applyFilters($event)"
          (resetFilters)="resetFilters($event)"
        />
      </div>
      <!-- The portal component should be added at the end of the app.component.html -->
      <bmb-portal />
    `,
  }),
};
