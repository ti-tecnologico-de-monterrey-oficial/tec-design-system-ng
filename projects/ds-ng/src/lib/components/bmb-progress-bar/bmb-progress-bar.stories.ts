import type { Meta, StoryObj } from '@storybook/angular';
import { BmbProgressBarComponent } from './bmb-progress-bar.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  getDefaultValueControl,
  getAppearanceParam,
  getPropertyParamDesc,
  DBmbIconParamDesc,
} from '../../utils/doc/parameterDescriptions';

const getPropertyForType = (
  isCounter: boolean = true,
  isSimple: boolean = false,
) => `
<br/><br/>This property is displayed for the property type:
${isSimple ? '- simple' : ''}
${isCounter ? '- counter' : ''}
- container
`;

export default {
  title: 'Components/Status indicators/Progress bar',
  component: BmbProgressBarComponent,
  parameters: {
    docs: {
      controls: { exclude: ['getFormattedText', 'progressValue'] },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'progress-bar' })} to show how complete a process is, visually indicating the progression gradually.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/progress-bar/descripcion-general-EZrYlLVQ' })}
${getBasicExampleBlock('BmbProgressBarComponent')}
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: {
        type: 'radio',
      },
      options: ['simple', 'counter', 'container'],
      description: 'Sets the type of progress bar to display.',
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbProgressBarTypes',
          detail: `IBmbProgressBarTypes = 'simple' | 'counter' | 'container'`,
        },
        defaultValue: getDefaultValueControl('simple'),
      },
    },
    totalCount: {
      control: {
        type: 'number',
      },
      description: `Sets the total value to calculate the percentage. ${getPropertyForType()}`,
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: getDefaultValueControl(0),
      },
    },
    counter: {
      control: {
        type: 'number',
      },
      description: `Sets the amount of the total to calculate the percentage. ${getPropertyForType()}`,
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: getDefaultValueControl(0),
      },
    },
    title: getPropertyParamDesc(
      'progress bar',
      'text',
      '""',
      getPropertyForType(false),
    ),
    appearance: getAppearanceParam(
      'progress bar',
      ['info', 'warning', 'error'],
      'info',
      getPropertyForType(true, true),
    ),
    textLink: {
      name: 'Text link',
      control: {
        type: 'text',
      },
      description: `Sets the text for the link ${getPropertyForType(false)}`,
      table: {
        category: 'Events',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl(),
      },
    },
    href: {
      ...DBmbGenericParamDesc.link,
      description: DBmbGenericParamDesc.link.description.concat(
        getPropertyForType(false),
      ),
    },
    target: {
      ...DBmbGenericParamDesc.target,
      description: DBmbGenericParamDesc.target.description.concat(
        getPropertyForType(false),
      ),
    },
    textFormat: {
      control: {
        type: 'function',
      },
      description: `
Sets the text format function to show the percentage in the progress bar.
${getPropertyForType()}
The function receives two parameters: the current value and the total value, and should return a formatted string.

If not set, it defaults to showing the value as *"value/total"*.

${RELEVANT_TITLE.note} Avoid return HTML code, whether HTML code will be parsed.`,
      table: {
        category: 'Properties',
        type: {
          summary: '(value: string, total: string) => string',
          detail:
            'textFormat: (value: string, total: string) => `$${value}/$${total}MXN`',
        },
        defaultValue: getDefaultValueControl('value => value'),
      },
    },
    icon: DBmbIconParamDesc.icon,
  },
  args: {
    type: 'container',
    totalCount: 1000,
    counter: 560,
    title: 'Creditos ocupados para esta iniciativa',
    appearance: 'info',
    textLink: 'Aumentar Creditos',
    href: 'https://www.google.com',
    target: '_blank',
    textFormat: (value: string, total: string) => `$${value}/$${total}MXN`,
  },
} as Meta<typeof BmbProgressBarComponent>;

type Story = StoryObj<BmbProgressBarComponent>;

export const Default: Story = {};
