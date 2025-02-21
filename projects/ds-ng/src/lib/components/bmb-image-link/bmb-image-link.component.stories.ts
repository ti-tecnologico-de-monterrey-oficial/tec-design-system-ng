import { Meta, StoryObj } from '@storybook/angular';
import { BmbImageLinkComponent } from './bmb-image-link.component';

export default {
  title: 'Micro Componentes/Image Link',
  component: BmbImageLinkComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbImageLinkComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbImageLinkComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    isActive: {
      name: 'Is active',
      control: {
        type: 'boolean',
      },
      description:
        'Set the active state of the bookmark, this input is a model so you can detect a change in the state in the same place.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    isActive: false,
  },
} as Meta<typeof BmbImageLinkComponent>;

type Story = StoryObj<BmbImageLinkComponent>;

export const Default: Story = {};
