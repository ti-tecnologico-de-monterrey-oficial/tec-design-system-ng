import { Meta, StoryObj } from '@storybook/angular';
import { BmbBookmarkComponent } from './bmb-bookmark.component';
import { storiesLayoutHorizontal } from '../../utils/bambooLayout';

export default {
  title: 'Micro Componentes/Bookmark',
  component: BmbBookmarkComponent,
  decorators: [
    storiesLayoutHorizontal,
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbBookmarkComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbBookmarkComponent ],
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
} as Meta<typeof BmbBookmarkComponent>;

type Story = StoryObj<BmbBookmarkComponent>;

export const Default: Story = {};
