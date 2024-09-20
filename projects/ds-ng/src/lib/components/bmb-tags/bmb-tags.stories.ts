import type { Meta, StoryObj } from '@storybook/angular';
import { BmbTagComponent } from './bmb-tags.component';

export default {
  title: 'Micro Componentes/Tag',
  component: BmbTagComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbTagComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbTagComponent ],
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
    appearance: {
      name: 'Appearance',
      control: {
        type: 'radio',
      },
      options: ['info', 'event', 'life'],
      description:
        'When the activity tag property is set as true, the tag can change the appearance.',
      table: {
        category: 'Properties',
        type: { summary: 'radio' },
        deafaultValue: { summary: 'info' },
      },
    },
    rounded: {
      name: 'Rounded',
      control: {
        type: 'boolean',
      },
      description:
        'The tag changes their border-radius to a higher border-radius. When the activity tag property is set as true, the rounded property always be set as true, and cannot be changed.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        deprecated: {
          summary:
            'This property is deprecated and will be removed in future versions..',
        },
      },
    },
    activityTag: {
      name: 'Activity Tag',
      control: {
        type: 'boolean',
      },
      description:
        'When the activity tag property is set as true, the tag can change the appearance. this is only an informative tag, cannot be clicked or dismissable. ',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    text: {
      name: 'Text',
      control: {
        type: 'text',
      },
      description:
        'The text of the Tag. The width will increase depending on the length of the text.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
      },
    },
    grouped: {
      name: 'Grouped',
      control: { type: 'boolean' },
      description:
        'When set to true, it groups multiple badges into a parent element. By default, it is false, and you do not need to explicitly set it. The badge should always have a parent element.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    dissmisable: {
      name: 'Dissmisable',
      control: { type: 'boolean' },
      description:
        'When set to true, a close icon appears, when is clicked the tag is remove from the DOM. By default, it is false, and you do not need to explicitly set it. The badge should always have a parent element.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    text: 'Badge text',
    grouped: false,
    dissmisable: false,
    activityTag: true,
    appearance: 'event',
  },
} as Meta<typeof BmbTagComponent>;

type Story = StoryObj<BmbTagComponent>;

export const Default: Story = {};
