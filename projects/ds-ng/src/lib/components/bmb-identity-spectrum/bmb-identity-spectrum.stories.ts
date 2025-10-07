import { Meta, StoryObj } from '@storybook/angular';
import { BmbIdentitySpectrumComponent } from './bmb-identity-spectrum.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';

export default {
  title: 'mitec web/Identity spectrum',
  component: BmbIdentitySpectrumComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'identity-spectrum', type: 'element' })} `)}
${getBasicExampleBlock('BmbIdentitySpectrumComponent')}
    `,
      },
    },
  },
  argTypes: {},
  args: {},
} as Meta<typeof BmbIdentitySpectrumComponent>;

type Story = StoryObj<BmbIdentitySpectrumComponent>;

export const Default: Story = {};
