import type { Meta, StoryObj } from '@storybook/angular';
import { BmbNotificationCardComponent } from './bmb-notification-card.component';

export default {
  title: 'Micro Componentes/Notification Card',
  component: BmbNotificationCardComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbNotificationCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbNotificationCardComponent, IBmbNotificationCardData ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})

export class AppComponent {
    data: IBmbNotificationCardData = {
        new: [
            {
                description: 'Descripcion Corta',
                time: '4d 12h'
            },
        ],
        all: [
            {
                description: 'Descripcion Corta',
                time: '4d 12h'
            },
            {
                description: 'Descripcion Corta',
                time: '4d 12h'
            },
        ],
        seen: [
            {
                description: 'Descripcion Corta',
                time: '4d 12h'
            },
            {
                description: 'Descripcion Corta',
                time: '4d 12h'
            },
            {
                description: 'Descripcion Corta',
                time: '4d 12h'
            },
        ]
    },
}
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    data: {
      name: 'Data Source',
      control: {
        type: 'IBmbNotificationCardData',
      },
      description: 'Set information that the component will show',
      table: {
        category: 'Properties',
        type: { summary: 'object' },
        defaultValue: { summary: `{}` },
      },
    },
  },
  args: {
    data: {
      new: [
        {
          description: 'Descripcion Corta',
          time: '4d 12h',
        },
      ],
      all: [
        {
          description: 'Descripcion Corta',
          time: '5d 12h',
        },
        {
          description: 'Descripcion Corta 2',
          time: '6d 12h',
        },
      ],
      seen: [
        {
          description: 'Descripcion Corta',
          time: '7d 12h',
        },
        {
          description: 'Descripcion Corta 2',
          time: '8d 12h',
        },
        {
          description: 'Descripcion Corta 3',
          time: '9d 12h',
        },
      ],
    },
    subtitle: 'Subtitulo',
  },
} as Meta<typeof BmbNotificationCardComponent>;

type Story = StoryObj<BmbNotificationCardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
        <bmb-notification-card [data]="data"></bmb-notification-card>
    `,
  }),
};
