import type { Meta, StoryObj } from '@storybook/angular';
import { BmbBadgeComponent } from './bmb-badge.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';

const appearanceOptions: IBbmBgAppearance[] = [
  'normal',
  'strong',
  'success',
  'info',
  'warning',
  'error',
  'brand',
  'background',
  'disabled',
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

export default {
  title: 'Micro Componentes/Badge',
  component: BmbBadgeComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbBadgeComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbBadgeComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

## Architecture

\`\`\`html
<section class="bmb_badge"> <!-- conditional classes bmb_badge-{appearance} bmb_badge-container ->
  <span class="bmb_badge-bullet"></span>
  <span class="bmb_badge-content"></span>
</section>
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    text: {
      name: 'Text',
      control: {
        type: 'text',
      },
      description:
        'The text of the badge. The width will increase depending on the length of the text.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    appearance: {
      name: 'Appearance',
      control: {
        type: 'select',
      },
      options: appearanceOptions,
      table: {
        category: 'Properties',
        defaultValue: { summary: 'normal' },
        type: { summary: 'string' },
      },
      description: 'The appearance of the badge, affecting its visual style.',
    },
    container: {
      name: 'Container',
      control: { type: 'boolean' },
      description:
        'This property is deprecated and will be removed in future versions.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    text: 'Badge text',
    appearance: 'normal',
    container: false,
  },
} as Meta<typeof BmbBadgeComponent>;

type Story = StoryObj<BmbBadgeComponent>;

export const Default: Story = {};
