import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbVerticalLayoutItemDirective } from './bmb-vertical-layout-item.directive';
import {
  attributes,
  attributesText,
  getAuxiliaryDescription,
  getBasicExampleBlock,
  getGeneralDescription,
} from '../../../utils/doc/utils';
import { BmbIconStatusComponent } from '../../../../public-api';

export default {
  title:
    'Foundations/Layouts/Vertical layout container/Vertical layout container item',
  tags: ['!autodocs'],
  component: BmbVerticalLayoutItemDirective,
  decorators: [
    moduleMetadata({
      imports: [BmbIconStatusComponent],
    }),
  ],
  parameters: {
    controls: { exclude: ['flex'] },
    docs: {
      description: {
        component: `
${getGeneralDescription(getAuxiliaryDescription('Vertical layout container', 'Vertical layout container item'), 'https://bamboo.tec.mx/latest/foundations/vertical-layout-container/descripcion-general-Crf8ymYZ').replace('Description', '-Description')}
${getBasicExampleBlock('BmbVerticalLayoutDirective, BmbVerticalLayoutItemDirective').replace('TypeScript example', '-TypeScript example').replace('HTML example', '-HTML example')}
        `,
      },
    },
  },
  argTypes: {
    rowGrow: {
      control: 'number',
      description:
        'Sets how much of the flex container positive free space, if any, should be assigned to the flex item main size.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
    test_text: {
      name: 'Test text',
      control: 'text',
      description: '',
      table: {
        category: 'Example',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    rowGrow: 1,
    test_text: 'Estamos activando tu credencial digital en este equipo',
  },
} as Meta<typeof BmbVerticalLayoutItemDirective>;

type Story = StoryObj<BmbVerticalLayoutItemDirective>;

export const Default: Story = {
  render: (args) => ({
    template: `
  <div bmbVerticalLayoutItem ${attributes(args)}>
    <bmb-icon-status [icon]="'id_card'" />
    <p class="font-regular-9" style="text-align: center">
      ${attributesText(args)}
    </p>
  </div>
  `,
  }),
};
