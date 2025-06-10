import type { Meta, StoryObj } from '@storybook/angular';
import { BmbBadgeComponent } from './bmb-badge.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';
import { storiesLayoutHorizontal } from '../../utils/bambooLayout';

const appearanceOptions: IBbmBgAppearance[] = [
  'normal',
  'strong',
  'success',
  'info',
  'warning',
  'error',
  'brand',
  'alert',
  'disabled',
  'mitec_blue',
  'mitec_red',
  'mitec_green',
  'mitec_orange',
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
  decorators: [
    storiesLayoutHorizontal,
  ],
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
        'Sets the text of the badge. The width will increase depending on the length of the text.',
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
      description: `
Sets the appearance of the badge, affecting its visual style.

  **Default appearance**: normal.

  **Note**: background appareance is deprecated.
      `,
    },
    container: {
      name: 'Container',
      control: { type: 'boolean' },
      description:
        'Sets the container flag. This displays the container when true; if false, it displays a bullet.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
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

export const Container = {
  args: {
    container: true,
  },
};
