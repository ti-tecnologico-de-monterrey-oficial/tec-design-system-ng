import type { Meta, StoryObj } from '@storybook/angular';
import { BmbMitecLogoAnimationComponent } from './bmb-mitec-logo-animation.component';
import { attributes } from '../../utils/doc/utils';

export default {
  title: 'Dev tools/Mitec logo animation',
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
  argTypes: {
    label: {
      name: 'Label',
      control: 'text',
      description: 'Sets the label to be displayed in mitec logo.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'ESTUDIANTES' },
      },
    },
  },
  args: {},
} as Meta<typeof BmbMitecLogoAnimationComponent>;

type Story = StoryObj<typeof BmbMitecLogoAnimationComponent>;

export const Default: Story = {
  render: (args) => ({
    template: `
      <div style="width: 300px">
        <bmb-mitec-logo-animation ${attributes(args)} />
      </div>
    `,
  }),
};

export const CollaboratorExamples = {
  args: {
    label: 'COLABORADORES',
  },
  render: (args: any) => ({
    template: `
      <div style="width: 300px">
        <bmb-mitec-logo-animation ${attributes(args)} />
      </div>
    `,
  }),
};

export const Example = {
  name: 'Example with empty label',
  args: {
    label: '',
  },
  render: (args: any) => ({
    template: `
      <div style="width: 300px">
        <bmb-mitec-logo-animation ${attributes(args)} />
      </div>
    `,
  }),
};

export const Examples = {
  name: 'Examples (the logo size fits its container)',
  render: (args: any) => ({
    template: `
    <!-- The logo size fits its container -->
      <div style="width: 300px">
        <bmb-mitec-logo-animation ${attributes(args)} />
      </div>
      <div style="width: 500px">
        <bmb-mitec-logo-animation ${attributes(args)}/>
      </div>
      <div style="width: 700px">
        <bmb-mitec-logo-animation ${attributes(args)}/>
      </div>
    `,
  }),
};
