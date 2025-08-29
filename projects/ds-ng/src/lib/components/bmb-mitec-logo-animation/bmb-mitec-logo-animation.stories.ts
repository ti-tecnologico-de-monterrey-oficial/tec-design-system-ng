import {
  componentWrapperDecorator,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { BmbMitecLogoAnimationComponent } from './bmb-mitec-logo-animation.component';
import {
  attributes,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';

export default {
  title: 'Dev tools/Mitec logo animation',
  component: BmbMitecLogoAnimationComponent,
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `
            <div style="width: 300px">${story}</div>`;
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('mitec-logo-animation', 'element')} the ***mitec*** logo to be displayed in different variants of size.`, 'https://bamboo.tec.mx/latest/dev-tools/coleccion-de-componentes-uC69aq75')}
${getBasicExampleBlock('BmbMitecLogoAnimationComponent')}
        `,
      },
    },
  },
  argTypes: {
    label: {
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
      <bmb-mitec-logo-animation ${attributes(args)} />
    `,
  }),
};

export const CollaboratorExamples = {
  args: {
    label: 'COLABORADORES',
  },
  render: (args: any) => ({
    template: `
      <bmb-mitec-logo-animation ${attributes(args)} />
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
      <bmb-mitec-logo-animation ${attributes(args)} />
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
