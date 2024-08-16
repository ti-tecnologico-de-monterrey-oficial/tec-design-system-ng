import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BmbStudentActivityCardComponent } from './bmb-student-activity-card.component';
import { DateTime } from 'luxon';

export default {
  title: 'Micro Componentes/Student activity card',
  component: BmbStudentActivityCardComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BmbStudentActivityCardComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbStudentActivitySelectorComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbStudentActivityCardComponent ],
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})

\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    startDate: {
      name: 'Start date',
      control: null,
      description: 'Set the start date label <luxon DateTime>.',
      table: {
        category: 'Properties',
        type: { summary: 'DateTime' },
      },
    },
    endDate: {
      name: 'End date',
      control: null,
      description: 'Set the end date label <luxon DateTime>.',
      table: {
        category: 'Properties',
        type: { summary: 'DateTime' },
      },
    },
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: 'Set the title on the top of the modal content.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    modalTitle: {
      name: 'Modal title',
      control: {
        type: 'text',
        description: 'Set the title on the modal header.',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    detail: {
      name: 'Detail',
      control: {
        type: 'text',
        description: 'Set the content text.',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    type: {
      name: 'Type',
      control: 'select',
      options: ['academic', 'life', 'events'],
      description: 'Set the color schema for the modal.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'academic' },
      },
    },
    status: {
      name: 'Status',
      control: {
        type: 'text',
        description: 'Set the status label.',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },

  args: {
    startDate: DateTime.now(),
    endDate: DateTime.now(),
    title: 'Activity title',
    detail: 'Activity detail',
    type: 'academic',
    status: 'In progress',
    modalTitle: 'Math class',
  },
} as Meta<typeof BmbStudentActivityCardComponent>;

type Story = StoryObj<BmbStudentActivityCardComponent>;
export const Default: Story = {};
