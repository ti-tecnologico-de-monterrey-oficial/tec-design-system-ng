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
        category: 'Deprecated',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    location: {
      name: 'Location',
      control: {
        type: 'text',
        description: 'Set the location text in the card.',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    responsible: {
      name: 'Responsible',
      control: {
        type: 'text',
        description: 'Set the responsible text in the card.',
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
        category: 'Deprecated',
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
        category: 'Deprecated',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    isListItem: {
      name: 'Is List Item',
      control: 'boolean',
      description: 'Set the card as a list item.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    image: {
      name: 'Image',
      control: 'text',
      description: 'Set the image URL.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    dateFormat: {
      name: 'Date Format',
      control: 'text',
      description: 'Set the date format.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'yyyy-MM-dd HH:mm:ss' },
      },
    },
  },

  args: {
    startDate: '2021-12-24 10:00:00',
    endDate: '2021-12-24 11:00:00',
    title: 'Activity title',
    type: 'academic',
    location: 'Activity location',
    responsible: 'Activity responsible',
    isListItem: false,
    image: 'https://picsum.photos/200/300',
    dateFormat: 'yyyy-MM-dd HH:mm:ss',
  },
} as Meta<typeof BmbStudentActivityCardComponent>;

type Story = StoryObj<BmbStudentActivityCardComponent>;
export const Default: Story = {};
