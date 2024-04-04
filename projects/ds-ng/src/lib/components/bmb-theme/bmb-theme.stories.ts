import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbThemeComponent } from './bmb-theme.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

export default {
  title: 'Micro Componentes/Theme',
  component: BmbThemeComponent,
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
import { BmbThemeComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbThemeComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML (you don't need parameters for this component and is using localStorage to save theme you are selecting):
        `,
      },
    },
  },
} as Meta<typeof BmbThemeComponent>;

type Story = StoryObj<BmbThemeComponent>;

export const Default: Story = {};
