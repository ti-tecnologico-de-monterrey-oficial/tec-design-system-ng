import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BmbStudentActivityCardComponent } from './bmb-student-activity-card.component';
import { DBmbGenericParamDesc } from '../../utils/doc/parameterDescriptions';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';

export default {
  title: 'Components/Containers/Student activity card',
  component: BmbStudentActivityCardComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BmbStudentActivityCardComponent],
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'getBadgeType',
          'getCardClasses',
          'parsedEndDate',
          'parsedStartDate',
          'ngOnInit',
          '',
          '',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('student-activity-card')} to display information about a student activity, such as title, location, responsible person, type, and date range.
<br/><br/>Supports different visual styles based on the activity type and whether it is displayed as a list item.`)}
${getBasicExampleBlock('BmbStudentActivityCardComponent')}
        `,
      },
    },
  },
  argTypes: {
    startDate: {
      control: null,
      description: 'Sets the start date label <luxon DateTime>.',
      table: {
        category: 'Properties',
        type: { summary: 'DateTime' },
      },
    },
    endDate: {
      control: null,
      description: 'Sets the end date label <luxon DateTime>.',
      table: {
        category: 'Properties',
        type: { summary: 'DateTime' },
      },
    },
    title: {
      control: {
        type: 'text',
      },
      description: 'Sets the title on the top of the modal content.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    modalTitle: DBmbGenericParamDesc.deprecated,
    location: {
      control: {
        type: 'text',
        description: 'Sets the location text in the card.',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    responsible: {
      control: {
        type: 'text',
        description: 'Sets the responsible text in the card.',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    detail: DBmbGenericParamDesc.deprecated,
    type: {
      control: 'select',
      options: ['academic', 'life', 'events'],
      description: 'Sets the color schema for the modal.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'academic' },
      },
    },
    status: DBmbGenericParamDesc.deprecated,
    isListItem: {
      control: 'boolean',
      description: 'Sets the card as a list item.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    image: {
      control: 'text',
      description: 'Sets the image URL.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    dateFormat: {
      control: 'text',
      description: 'Sets the date format.',
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
    image: 'https://picsum.photos/id/64/200/300',
    dateFormat: 'yyyy-MM-dd HH:mm:ss',
  },
} as Meta<typeof BmbStudentActivityCardComponent>;

type Story = StoryObj<BmbStudentActivityCardComponent>;
export const Default: Story = {};
