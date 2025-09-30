import { Meta, StoryObj } from '@storybook/angular';
import { BmbToastAppearance, BmbToastComponent } from './bmb-toast.component';
import {
  getArchitectureSection,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  getOnClickParam,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

const appearanceOptions: BmbToastAppearance[] = [
  'neutral',
  'primary',
  'successful',
  'warning',
  'error',
  'event',
  'reminder',
  'mitec_blue',
  'mitec_red',
  'mitec_green',
  'mitec_orange',
  'mitec_light_green',
  'mitec_purple',
  'creative_violet',
  'creative_indigo',
  'creative_emerald',
  'creative_licorice',
  'creative_darkteal',
  'creative_peach',
  'creative_sepia',
  'creative_softred',
  'creative_wattle',
  'creative_shipcove',
  'creative_plantation',
  'creative_rum',
  'creative_hibiscus',
  'creative_ripelemon',
];
const onEventBlock = getOnEvent('close', 'onClose');

export default {
  title: 'Components/Status indicators/Toast',
  component: BmbToastComponent,
  parameters: {
    docs: {
      controls: { exclude: ['getIcon', 'handleClose', 'getClasses'] },
      description: {
        component: `
${getGeneralDescription({ content: `${getGeneralComponentDescription({ name: 'toast' })} to display a short, non-critical message without interrupting browsing or the task at hand.`, generalDocLink: 'https://bamboo.tec.mx/latest/componentes/toast/descripcion-general-1yUMwDNA' })}
${getArchitectureSection(`<div class="bmb_toast" <!-- conditional classes bmb_toast bmb_toast-{this.appearance} >
  < icon />
  <div class="bmb_toast-content" <!-- conditional classes bmb_toast-content bmb_toast-content-{appearance} --> >
    <h4 class="bmb_toast-title">{ title }</h4>

    <!-- if description is defined -->
    <p class="bmb_toast-description">{ description }</p>
  </div>

  <!-- if appearance is not reminder and is closable -->
  <button class="bmb_toast-button">
    < icon />
  </button>
</div>`)}
${getBasicExampleBlock(
  'BmbToastComponent',
  '',
  ` //Add your code

//This block of code is only needed if the close button is displayed${onEventBlock.handleExample}`,
)}
---

**ℹ️ Note:**
If you want to see how it works with the **Notification Service** and animations, go to:
- [Portal → Toast](?path=/docs/dev-tools-portal--toast--documentation)

        `,
      },
    },
  },
  argTypes: {
    title: getPropertyParamDesc(
      'toast notification',
      'text',
      '',
      `<br/><br/>This title should be concise and direct, providing the user with immediate feedback or information related to their actions.`,
    ),
    description: {
      control: {
        type: 'text',
      },
      description:
        'Sets additional details or context in the toast notification, displayed beneath the title. This is optional and should be used when more information is needed.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    appearance: {
      control: 'select',
      options: appearanceOptions,
      description:
        'Sets the visual style of the toast, allowing it to match the context of the notification. Each option represents a different level of notification severity or type, such as informational (neutral), success (successful), warning (warning), error (error), event (event), or reminder (reminder).',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'neutral' },
        type: { summary: 'string' },
      },
    },
    isClosable: {
      control: 'boolean',
      description:
        'Shows the close button when true. Determines whether the toast can be closed by the user. **this property is valid only for the `portal` component.**',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    id: {
      control: 'text',
      description:
        'Sets the unique identifier for the toast, allowing you to target specific notifications for updates or removal.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    onClose: getOnClickParam(onEventBlock, ` and the toast is closed`),
    position: DBmbGenericParamDesc.deprecated,
  },
  args: {
    title: 'Your toast title here',
    description: 'Your toast description here (optional)',
    appearance: 'neutral',
    isClosable: false,
    id: '',
  },
} as Meta<typeof BmbToastComponent>;

type Story = StoryObj<BmbToastComponent>;

export const Default: Story = {};
