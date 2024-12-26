import type { Meta, StoryObj } from '@storybook/angular';
import { BmbMitecLogoAnimationComponent } from './bmb-mitec-logo-animation.component';

export default {
  title: 'Micro Componentes/Mitec Logo Animation',
  component: BmbMitecLogoAnimationComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbMitecLogoAnimationComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbMitecLogoAnimationComponent ],
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
} as Meta<typeof BmbMitecLogoAnimationComponent>;

type Story = StoryObj<typeof BmbMitecLogoAnimationComponent>;

export const Default: Story = {
  args: {},
  render: () => ({
    template: `
      <div style="width: 300px">
        <bmb-mitec-logo-animation />
      </div>
      <div style="width: 500px">
        <bmb-mitec-logo-animation />
      </div>
      <div style="width: 700px">
        <bmb-mitec-logo-animation />
      </div>
    `,
  }),
};
