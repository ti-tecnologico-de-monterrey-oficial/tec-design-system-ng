import type { Meta, StoryObj } from '@storybook/angular';
import { BmbProgressBarComponent } from './bmb-progress-bar.component';

export default {
  title: 'Micro Componentes/Progress Bar',
  component: BmbProgressBarComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbProgressBarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbProgressBarComponent ],
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
    type: {
      name: 'Type',
      control: {
        type: 'radio',
      },
      options: ['simple', 'counter', 'container'],
      description: 'Select the design of the progress bar',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'simple' },
      },
    },
    totalCount: {
      name: 'Total Count',
      control: {
        type: 'number',
      },
      description: 'Set the total value to calculate the percentage',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    counter: {
      name: 'Counter',
      control: {
        type: 'number',
      },
      description: 'Set the amount of the total to calculate the percentage ',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description:
        'Set the title that the component will show if the type is set as a container',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    appearance: {
      name: 'Appearance',
      control: {
        type: 'radio',
      },
      options: ['info', 'warning', 'error'],
      description: 'Set the appearance of the progress bar',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: 'info' },
      },
    },
    textLink: {
      name: 'Text link',
      control: {
        type: 'text',
      },
      description: 'Set the text for the link',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    href: {
      name: 'Href',
      control: {
        type: 'text',
      },
      description: 'Set the url to follow in the text link',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    target: {
      name: 'Target',
      control: {
        type: 'radio',
      },
      options: ['_blank', '_parent', '_self', '_top'],
      description: 'Set the percentage to show in the progress bar',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        target: { summary: '_blank' },
      },
    },
    progress: {
      name: 'Porcentaje',
      control: {
        type: 'number',
      },
      description: 'Set the percentage to show in the progress bar',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
  },
  args: {
    type: 'container',
    totalCount: 1000,
    counter: 560,
    title: 'Creditos ocupados para esta iniciativa',
    appearance: 'info',
    textLink: 'Aumentar Creditos',
    href: 'https://www.google.com',
  },
} as Meta<typeof BmbProgressBarComponent>;

type Story = StoryObj<BmbProgressBarComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <bmb-progress-bar
        [appearance]="appearance"
        [type]="type"
        [counter]="counter"
        [totalCount]="totalCount"
        [title]="'title'"
        [textLink]="textLink"
        [href]="href"
      />
    `,
  }),
};
