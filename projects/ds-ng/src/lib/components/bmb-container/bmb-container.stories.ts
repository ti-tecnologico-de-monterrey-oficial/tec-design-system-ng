import type { Meta, StoryObj } from '@storybook/angular';
import { BmbContainerComponent } from './bmb-container.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';

export default {
  title: 'Components/Containers/Global container',
  component: BmbContainerComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription({ content: `${getGeneralComponentDescription({ name: 'container' })} to define specific sections of content, this component encloses and groups other HTML elements.`, generalDocLink: 'https://bamboo.tec.mx/latest/componentes/global-container/descripcion-general-MJF3dmwC' })}
${getBasicExampleBlock('BmbContainerComponent')}
        `,
      },
    },
  },
  argTypes: {
    appearance: {
      control: {
        type: 'radio',
      },
      options: [
        'primary-container',
        'primary-home',
        'primary-header',
        'secondary-container',
        'contrast-box-container',
        'button-container',
      ],
      table: {
        category: 'Properties',
        defaultValue: { summary: 'primary-container' },
        type: {
          summary: 'IBmbAppearanceType',
          detail: `IBmbAppearanceType =
  | 'primary-container'
  | 'primary-home'
  | 'primary-header'
  | 'secondary-container'
  | 'contrast-box-container'
  | 'button-container'`,
        },
      },
      description:
        'Sets the appearance of the container, affecting its visual style.',
    },
    isHidden: {
      control: { type: 'boolean' },
      table: {
        category: 'Properties',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      description:
        'Hides the container when true. Determines whether the container is hidden.',
    },
  },
  args: {
    appearance: 'primary-container',
  },
} as Meta<typeof BmbContainerComponent>;

type Story = StoryObj<BmbContainerComponent>;

export const Default: Story = {
  name: 'Default: primary container',
  args: {
    appearance: 'primary-container',
  },
};

export const PrimaryHome: Story = {
  name: 'Primary home',
  args: {
    appearance: 'primary-home',
  },
};

export const PrimaryHeader: Story = {
  name: 'Primary header',
  args: {
    appearance: 'primary-header',
  },
};

export const SecondaryContainer: Story = {
  name: 'Secondary container',
  args: {
    appearance: 'secondary-container',
  },
};

export const ContrastBoxContainer: Story = {
  name: 'Contrast box container',
  args: {
    appearance: 'contrast-box-container',
  },
};

export const ButtonContainer: Story = {
  name: 'Button container',
  args: {
    appearance: 'button-container',
  },
};
