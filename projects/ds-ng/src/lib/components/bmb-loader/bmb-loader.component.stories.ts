import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbLoaderComponent } from './bmb-loader.component';

export default {
  title: 'Loader',
  component: BmbLoaderComponent,
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
import { BmbLoaderComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbLoaderComponent ],
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
    status: {
      name: 'Satus',
      control: {
        type: 'radio',
      },
      options: ['loading', 'noConnection'],
      description:
        'The status of the loader, is not neccesary to add the status loading, this one is the default.',
      table: {
        defaultValue: { summary: 'loading' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    status: 'loading',
  },
} as Meta<typeof BmbLoaderComponent>;

type Story = StoryObj<BmbLoaderComponent>;

export const Default: Story = {};
