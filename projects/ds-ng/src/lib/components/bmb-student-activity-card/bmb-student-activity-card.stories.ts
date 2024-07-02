import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BmbCardComponent } from '../bmb-card/bmb-card.component';
import { BmbStudentActivityCardComponent } from './bmb-student-activity-card.component';

export default {
  title: 'Micro Componentes/Student activity card',
  component: BmbStudentActivityCardComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BmbStudentActivityCardComponent,
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
    BmbStudentActivityCardComponent,
  ],
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})

\`\`\`

### Example in HTML

Below is an example of how to use this component in HTML:

\`\`\`html
<bmb-student-activity-card
  [count]="'01 / 10'"
  [categoryTitle]="'Mathematics'"
  [classTitle]="'Algebra 101'"
  [classSubtitle]="'Introduction to Algebra'"
  [location]="'Room 201'"
  [statusLabel]="'EN PROGRESO'"
  [timeRange]="'10:00 AM - 11:00 AM'">
</bmb-student-activity-card>

\`\`\`
        `,
      },
    },
  },
  argTypes: {
    count: {
      control: { type: 'text' },
      description: 'Content count.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    categoryTitle: {
      control: {
        type: 'text',
        description: 'Category of the subject.',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    classTitle: {
        control: {
          type: 'text',
        },
        description: 'Name of the subject.',
        table: {
          category: 'Properties',
          type: { summary: 'string' },
          defaultValue: { summary: '' },
        },
      },

      classSubtitle: {
        control: {
          type: 'text',
        },
        description: 'Subtitle of the subject.',
        table: {
          category: 'Properties',
          type: { summary: 'string' },
          defaultValue: { summary: '' },
        },
      },

      location: {
        control: {
          type: 'text',
        },
        description: 'Location of matter.',
        table: {
          category: 'Properties',
          type: { summary: 'string' },
          defaultValue: { summary: '' },
        },
      },
      statusLabel: {
        control: {
          type: 'text',
        },
        description: 'State of matter.',
        table: {
          category: 'Properties',
          type: { summary: 'string' },
          defaultValue: { summary: '' },
        },
      },
      timeRange: {
        control: {
          type: 'text',
        },
        description: 'Subject schedule.',
        table: {
          category: 'Properties',
          type: { summary: 'string' },
          defaultValue: { summary: '' },
        },
      },
      
  },

  args: {
    count: '01 / 10',
    subcategorytitle: 'Mathematics',
    classTitle:'Algebra 101',
    classSubtitle:'Introducción to Algebra',
    location:'Room 201',
    statusLabel:'En progreso',
    timeRange:'10:00 AM - 11:00 AM'
  },
} as Meta<typeof BmbStudentActivityCardComponent>;

type Story = StoryObj<BmbStudentActivityCardComponent>;
export const Default: Story = {};