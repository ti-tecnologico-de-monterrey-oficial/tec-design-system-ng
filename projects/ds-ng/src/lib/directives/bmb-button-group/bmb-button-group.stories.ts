import { Meta, StoryObj } from '@storybook/angular';
import { BmbButtonGroupDirective } from './bmb-button-group.directive';
import {
  attributes,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import { DBmbButtonParamDesc } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Buttons/Button group',
  component: BmbButtonGroupDirective,
  imports: [BmbButtonGroupDirective],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription({ content: `${getGeneralComponentDescription({ name: 'ButtonGroup', type: 'directive' })} to add the same property to buttons that are inside the element that groups them.`, generalDocLink: 'https://bamboo.tec.mx/latest/componentes/button-group/descripcion-general-39ELIbCW' })}
${getBasicExampleBlock('BmbButtonGroupDirective')}
        `,
      },
    },
  },
  argTypes: {
    appearance: DBmbButtonParamDesc.appearance,
    size: DBmbButtonParamDesc.size,
  },
  args: {
    appearance: 'primary',
    size: 'small',
  },
} as Meta<typeof BmbButtonGroupDirective>;

type Story = StoryObj<typeof BmbButtonGroupDirective>;

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    props: args,
    template: `
    <section bmbButtonGroup ${attributes(args)}>
    <!-- IMPORTANT
    You can add the class bmb_btn-toggle-active to set a button as active and keep that state of active,
    otherwise the button will just behave as a simple button without keeping the activated state.
    The styles of the buttons group are defined by Bamboo and will be adjusted according to the appearance
    of the component.
    -->
    <button class="bmb_btn-toggle-active">Button 1</button>
    <button>Button 2</button>
    <button>Button 3</button>
  </section>
  `,
  }),
};
