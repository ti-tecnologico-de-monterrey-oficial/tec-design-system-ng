import { Meta, StoryObj } from '@storybook/angular';
import { BmbSkeletonComponent } from './bmb-skeleton.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';

export default {
  title: 'Dev tools/Skeleton',
  component: BmbSkeletonComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'skeleton', type: 'element' })} for the implementation of simple specific structures.`, 'https://bamboo.tec.mx/latest/dev-tools/coleccion-de-componentes-uC69aq75')}
${getBasicExampleBlock('BmbSkeletonComponent')}
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['header', 'input', 'stray', 'generic1', 'generic2', 'generic3'],
      description: 'Sets the type of skeleton to display.',
      table: {
        category: 'Properties',
        type: {
          summary: 'BmbSkeletonType',
          detail: `options: 'header' | 'input' | 'stray' | 'generic1' | 'generic2' | 'generic3'`,
        },
        defaultValue: { summary: 'header' },
      },
    },
  },
  args: {
    type: 'header',
  },
} as Meta<typeof BmbSkeletonComponent>;

type Story = StoryObj<BmbSkeletonComponent>;

export const Default: Story = {};
