import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbItemComponent } from './bmb-item.component';
import { CommonModule } from '@angular/common';
import { attributes } from '../../utils/utils';

import { CUSTOM_ELEMENTS_SCHEMA, InputSignal } from '@angular/core';
import { storiesLayoutHorizontal } from '../../utils/bambooLayout';

export type IBmbTargetLink = '_blank' | '_parent' | '_self' | '_top';

const meta: Meta<BmbItemComponent> = {
  title: 'Internal/Items',
  component: BmbItemComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
    storiesLayoutHorizontal,
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbItemComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbItemComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class AppComponent {
}
...
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'Icon name to display.',
      table: { category: 'Inputs', type: { summary: 'string (required)' } },
    },
    iconSize: {
      control: 'number',
      description: 'Size of the icon.',
      table: {
        category: 'Inputs',
        defaultValue: { summary: '24' },
        type: { summary: 'number' },
      },
    },
    label: {
      control: 'text',
      description: 'Main label for the item.',
      table: { category: 'Inputs', type: { summary: 'string (required)' } },
    },
    value: {
      control: 'text',
      description: 'Value displayed on the right.',
      table: { category: 'Inputs', type: { summary: 'string (required)' } },
    },
    valueLink: {
      control: 'text',
      description: 'If present, value becomes a link.',
      table: { category: 'Inputs', type: { summary: 'string' } },
    },
    valueTarget: {
      control: 'text',
      description: 'Target for the value link.',
      table: { category: 'Inputs', type: { summary: 'string' } },
    },
    supportText: {
      control: 'text',
      description: 'Support text shown below the label.',
      table: { category: 'Inputs', type: { summary: 'string' } },
    },
    isButton: {
      control: 'boolean',
      description: 'If true, renders the item as a button.',
      table: { category: 'Inputs', type: { summary: 'boolean' } },
    },
    action: {
      action: 'clicked',
      description: 'Event emitted on button click.',
      table: { category: 'Outputs', type: { summary: 'EventEmitter<void>' } },
    },
  },
  args: {
    label: 'Whatsapp',
  },
};

export default meta;

type Story = StoryObj<BmbItemComponent>;

export const Default: Story = {
  args: {
    value: '+52 81 1625 5123 (solo texto)',
  },
  render: (args) => ({
    props: args,
    template: `
      <!-- Instruction to users: This html is used for internal Storybook logic and should not be copied -->
      <div style="max-width: 560px; margin: 0 auto">
        <!-- Example of how you can use this component -->
        <bmb-item ${attributes(args)}/>
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  args: {
    icon: 'https://img.icons8.com/m_outlined/512/whatsapp.png',
    iconSize: 24,
    value: '+52 81 1625 5123 (solo texto)',
  },
  render: (args) => ({
    props: args,
    template: `
      <!-- Instruction to users: This html is used for internal Storybook logic and should not be copied -->
      <div style="max-width: 560px; margin: 0 auto">
        <!-- Example of how you can use this component -->
        <bmb-item ${attributes(args)}/>
      </div>
    `,
  }),
};

export const WithValueLink: Story = {
  args: {
    label: 'Correo',
    value: 'tecservices@servicios.tec.mx',
    valueLink: 'mailto:tecservices@servicios.tec.mx',
    valueTarget: '_self' as unknown as InputSignal<IBmbTargetLink>,
  },
  render: (args) => ({
    props: args,
    template: `
      <!-- Instruction to users: This html is used for internal Storybook logic and should not be copied -->
      <div style="max-width: 560px; margin: 0 auto">
        <!-- Example of how you can use this component -->
        <bmb-item ${attributes(args)}/>
      </div>
    `,
  }),
};

export const WithValueLinkAndIcon: Story = {
  args: {
    label: 'Correo',
    icon: 'mail',
    value: 'tecservices@servicios.tec.mx',
    valueLink: 'mailto:tecservices@servicios.tec.mx',
    valueTarget: '_self' as unknown as InputSignal<IBmbTargetLink>,
  },
  render: (args) => ({
    props: args,
    template: `
      <!-- Instruction to users: This html is used for internal Storybook logic and should not be copied -->
      <div style="max-width: 560px; margin: 0 auto">
        <!-- Example of how you can use this component -->
        <bmb-item ${attributes(args)}/>
      </div>
    `,
  }),
};

export const WithSupportText: Story = {
  args: {
    label: 'Informative text. Non actionable',
    supportText: 'Here is some support text for your soul.',
  },
  render: (args) => ({
    props: args,
    template: `
      <!-- Instruction to users: This html is used for internal Storybook logic and should not be copied -->
      <div style="max-width: 560px; margin: 0 auto">
        <!-- Example of how you can use this component -->
        <bmb-item ${attributes(args)}/>
      </div>
    `,
  }),
};

export const WithSupportTextWithLink: Story = {
  args: {
    label: 'Informative text. Non actionable',
    supportText:
      "Support text. <a href='https://www.google.com.mx' target='_blank'>Optional hyperlink text</a>",
  },
  render: (args) => ({
    props: args,
    template: `
      <!-- Instruction to users: This html is used for internal Storybook logic and should not be copied -->
      <div style="max-width: 560px; margin: 0 auto">
        <!-- Example of how you can use this component -->
        <bmb-item ${attributes(args)}/>
      </div>
    `,
  }),
};

export const WithSupportTextWithLinkAnIcon: Story = {
  args: {
    icon: 'mail',
    label: 'Informative text. Non actionable',
    supportText:
      "Support text. <a href='https://www.google.com.mx' target='_blank'>Optional hyperlink text</a>",
  },
  render: (args) => ({
    props: args,
    template: `
      <!-- Instruction to users: This html is used for internal Storybook logic and should not be copied -->
      <div style="max-width: 560px; margin: 0 auto">
        <!-- Example of how you can use this component -->
        <bmb-item ${attributes(args)}/>
      </div>
    `,
  }),
};

export const IsAButton: Story = {
  args: {
    isButton: true,
  },
  render: (args) => ({
    props: {
      ...args,
      action: () => {
        alert('In this method you can define the action to be executed');
      },
    },
    template: `
       <!-- Instruction to users: This html is used for internal Storybook logic and should not be copied -->
      <div style="max-width: 560px; margin: 0 auto">
        <!-- Example of how you can use this component -->
        <bmb-item ${attributes(args)}/>
      </div>
    `,
  }),
};

export const IsAButtonWithIcon: Story = {
  args: {
    icon: 'mail',
    isButton: true,
  },
  render: (args) => ({
    props: {
      ...args,
      action: () => {
        alert('In this method you can define the action to be executed');
      },
    },
    template: `
      <!-- Instruction to users: This html is used for internal Storybook logic and should not be copied -->
      <div style="max-width: 560px; margin: 0 auto">
        <!-- Example of how you can use this component -->
        <bmb-item ${attributes(args)}/>
      </div>
    `,
  }),
};
