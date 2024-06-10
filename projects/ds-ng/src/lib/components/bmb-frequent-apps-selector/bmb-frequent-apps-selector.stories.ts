import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbFrequentAppsSelectorComponent } from './bmb-frequent-apps-selector.component';

export default {
  title: 'Macro Componentes/Frequent Apps Selector',
  component: BmbFrequentAppsSelectorComponent,
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
import { BmbFrequentAppsSelectorComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbFrequentAppsSelectorComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {},
  args: {},
} as Meta<typeof BmbFrequentAppsSelectorComponent>;

type Story = StoryObj<BmbFrequentAppsSelectorComponent>;

export const Default: Story = {};
