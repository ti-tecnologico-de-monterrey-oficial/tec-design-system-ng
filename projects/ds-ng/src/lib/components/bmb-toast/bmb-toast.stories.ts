import { Meta, StoryObj } from '@storybook/angular';
import { BmbToastComponent } from './bmb-toast.component';

export default {
  title: 'Micro Componentes/Toast',
  component: BmbToastComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbToastComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbToastComponent ],
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
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description:
        'Specifies the title displayed within the toast notification. This title should be concise and direct, providing the user with immediate feedback or information related to their actions.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    description: {
      name: 'Description',
      control: {
        type: 'text',
      },
      description:
        'Provides additional details or context in the toast notification, displayed beneath the title. This is optional and should be used when more information is needed.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    appearance: {
      name: 'Appearance',
      control: 'select',
      options: [
        'neutral',
        'primary',
        'successful',
        'warning',
        'error',
        'event',
        'reminder',
      ],
      description:
        'Defines the visual style of the toast, allowing it to match the context of the notification. Each option represents a different level of notification severity or type, such as informational (neutral), success (successful), warning (warning), error (error), event (event), or reminder (reminder).',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'neutral' },
        type: { summary: 'string' },
      },
    },
    position: {
      name: 'Position',
      control: 'select',
      options: ['top', 'bottom', 'middle'],
      description:
        'Controls the position of the toast on the screen, **this property is valid only for the `portal` component.**',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'top' },
        type: { summary: 'string' },
      },
    },
    isClosable: {
      name: 'Is Closable',
      control: 'boolean',
      description:
        'Determines whether the toast can be closed by the user. **this property is valid only for the `portal` component.**',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    id: {
      name: 'ID',
      control: 'text',
      description:
        'A unique identifier for the toast, allowing you to target specific notifications for updates or removal.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    onClose: {
      name: 'On Close',
      control: null,
      description:
        'Emits an event when the user closes the toast notification.',
      table: {
        category: 'Events',
        type: { summary: 'Event' },
      },
    },
  },
  args: {
    title: 'Your toast title here',
    description: 'Your toast description here (optional)',
    appearance: 'neutral',
    position: 'top',
    isClosable: false,
    id: '',
  },
} as Meta<typeof BmbToastComponent>;

type Story = StoryObj<BmbToastComponent>;

export const Default: Story = {};
