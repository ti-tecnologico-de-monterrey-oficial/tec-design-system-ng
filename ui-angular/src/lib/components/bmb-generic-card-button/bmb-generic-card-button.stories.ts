import { Meta, StoryObj } from '@storybook/angular';
import { BmbGenericCardButtonComponent } from './bmb-generic-card-button.component';
import {
  getBasicExampleBlock,
  getSpecialSpecifications,
} from '@docs/utils/utils';
import { getDefaultValueControl } from '@docs/utils/parameterDescriptions';

const meta: Meta<BmbGenericCardButtonComponent> = {
  title: 'Components/Buttons/Card button/Generic',
  component: BmbGenericCardButtonComponent,
  tags: ['!autodocs'],
  parameters: {
    docs: {
      controls: {
        exclude: ['handleClick', 'handleKeydown'],
      },
      description: {
        component: `${getSpecialSpecifications(`
A card that owns sizing, click/keyboard behavior, and state/chrome styling (hover, active,
focus, disabled, selected) — layout is entirely up to the consumer. Project any content
wrapped in your own \`[bmbLayoutGrid]\` (\`columns\`/\`rows\`/etc.), and place each piece with
\`[bmbLayoutGridItem]\` (\`colStart\`, \`rowStart\`, \`numberOfColumns\`, \`numberOfRows\`).
>
The card also supports **custom responsiveness**: mark a whole alternate layout block with
\`bmbCardButtonMedium\` or \`bmbCardButtonLarge\` and the card switches to it once its own
rendered size crosses into that bucket (M ≥ 180px tall, L ≥ 502px wide — the midpoints between
the S/M/L reference sizes: 328x152, 328x208, 676x208). Declare nothing for a bucket and it just
falls back to your plain (undecorated) content — "declare nothing" means the same layout
everywhere.
        `)}
${getBasicExampleBlock('BmbGenericCardButtonComponent')}`,
      },
    },
  },
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables card interaction and applies the disabled state.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    appearance: {
      control: { type: 'select' },
      options: ['default', 'alternative'],
      description: 'Sets the visual appearance of the card button.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl('default'),
        type: { summary: "'default' | 'alternative'" },
      },
    },
    cardClick: {
      control: false,
      description:
        'Emits when the card is activated with a mouse click or keyboard event.',
      table: {
        category: 'Events',
        type: { summary: 'MouseEvent | KeyboardEvent' },
      },
    },
  },
  args: { disabled: false, appearance: 'default' },
};
export default meta;

type Story = StoryObj<BmbGenericCardButtonComponent>;

export const Default: Story = {};
