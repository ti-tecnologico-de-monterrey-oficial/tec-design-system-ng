import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbSwitchComponent } from './bmb-switch.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

export default {
  title: 'Micro Componentes/Switch',
  component: BmbSwitchComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbIconComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbSwitchComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbSwitchComponent ],
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
    leftText: {
      name: 'Left Text',
      control: {
        type: 'text',
      },
      description:
        'Text displayed on the left side of the switch. Useful for indicating the action or state associated with the "on" position. Do not use the leftIcon propery if you want to use leftText.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    leftIcon: {
      name: 'Left Icon',
      control: { type: 'text' },
      description:
        'Icon displayed on the left side of the switch. It visually represents the action or state associated with the "on" position. Please use Material icons: https://fonts.google.com/icons. Do not use the leftText property if you want to use leftIcon.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    rightText: {
      name: 'Right Text',
      control: {
        type: 'text',
      },
      description:
        'Text displayed on the right side of the switch. Useful for indicating the action or state associated with the "off" position. Do not use the rightIcon propery if you want to use rightText',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    rightIcon: {
      name: 'Right Icon',
      control: { type: 'text' },
      description:
        'Icon displayed on the right side of the switch. It visually represents the action or state associated with the "off" position. Please use Material icons: https://fonts.google.com/icons. Do not use the rightText property if you want to use rightIcon.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    id: {
      name: 'Id',
      control: {
        type: 'text',
      },
      description:
        'A unique identifier for the switch. If not provided, an id will be generated automatically.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    isChecked: {
      name: 'Is Checked',
      control: { type: 'boolean' },
      description:
        'Determines whether the switch is in the "on" (true) or "off" (false) position.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      name: 'Disabled',
      control: { type: 'boolean' },
      description:
        'If true, the switch will be disabled and cannot be interacted with.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    change: {
      name: 'Change',
      table: {
        category: 'Events',
        type: { summary: '(change)="toggleSwitch()"' },
      },
      description:
        "Emits a boolean value whenever the switch changes its state. This can be used to react to changes in the switch's position.",
    },
  },
  args: {
    leftText: 'Light',
    rightText: 'Dark',
    id: '1',
    isChecked: false,
    disabled: false,
  },
} as Meta<typeof BmbSwitchComponent>;

type Story = StoryObj<BmbSwitchComponent>;

export const Default: Story = {};
