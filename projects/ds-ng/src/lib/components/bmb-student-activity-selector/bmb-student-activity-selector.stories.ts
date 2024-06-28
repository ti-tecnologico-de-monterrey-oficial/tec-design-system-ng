import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BmbStudentActivitySelectorComponent } from './bmb-student-activity-selector.component';

export default {
  title: 'Micro Componentes/StudentActivitySelector',
  component: BmbStudentActivitySelectorComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BmbStudentActivitySelectorComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { Component, ChangeDetectorRef } from '@angular/core';
import { BmbStudentActivitySelectorComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [
    CommonModule,
    BmbStudentActivitySelectorComponent,
  ],
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})

\`\`\`

### Example in HTML

Below is an example of how to use this component in HTML:

\`\`\`html
<bmb-student-activity-selector>
  <bmb-student-activity-tab title="1"
                           subtitle="item 1">
  </bmb-student-activity-tab>
  <bmb-student-activity-tab title="2"
                           subtitle="item 2">
  </bmb-student-activity-tab>
  <bmb-student-activity-tab title="3"
                           subtitle="item 3">
  </bmb-student-activity-tab>
</bmb-student-activity-selector>

\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Tab name.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: "" },
      },
    },
    subtitle: {
      control: {
        type: 'text',
      },
      description:
        'Tab subtitle.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },

  args: {
    title: 'Tab 1',
    subtitle: 'Subtitulo 1',
  },
} as Meta<typeof BmbStudentActivitySelectorComponent>;

type Story = StoryObj<BmbStudentActivitySelectorComponent>;

export const Default: Story = {};
