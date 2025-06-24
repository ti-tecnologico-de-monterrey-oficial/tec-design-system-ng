import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BmbStudentActivitySelectorComponent } from './bmb-student-activity-selector.component';
import { BmbTabStudentActivityComponent } from './bmb-student-activity-tab/bmb-student-activity-tab.component';
import { BmbCardComponent } from '../bmb-card/bmb-card.component';
import { IStudentActivityAppearance } from '../../types';

const appearanceOptions: IStudentActivityAppearance[] = [
  'academic',
  'life',
  'events',
];

export default {
  title: 'Components/Menus/Student activity selector',
  component: BmbStudentActivitySelectorComponent,
  subcomponents: { BmbTabStudentActivityComponent, BmbCardComponent },
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BmbStudentActivitySelectorComponent,
        BmbTabStudentActivityComponent,
        BmbCardComponent,
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
  styleUrl: './component.scss',
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
    appearance: {
      name: 'Appearance',
      control: {
        type: 'select',
      },
      options: appearanceOptions,
      table: {
        category: 'Properties',
        defaultValue: { summary: 'normal' },
        type: { summary: 'string' },
      },
      description: `
Sets the appearance of the component, affecting its visual style.

  **Default appearance**: academic.
      `,
    },
    title: {
      control: { type: 'text' },
      description: 'Tab name.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    subtitle: {
      control: {
        type: 'text',
      },
      description: 'Tab subtitle.',
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
    appearance: 'academic',
  },
} as Meta<typeof BmbStudentActivitySelectorComponent>;

type Story = StoryObj<BmbStudentActivitySelectorComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <bmb-student-activity-selector [appearance]="appearance">
        <bmb-student-activity-tab title="1" subtitle="item 1">
          <bmb-card>Content 1</bmb-card>
        </bmb-student-activity-tab>
        <bmb-student-activity-tab title="2" subtitle="item 2">
          <bmb-card>Content 2</bmb-card>
        </bmb-student-activity-tab>
        <bmb-student-activity-tab title="3" subtitle="item 3">
          <bmb-card>Content 3</bmb-card>
        </bmb-student-activity-tab>
      </bmb-student-activity-selector>
    `,
  }),
};
