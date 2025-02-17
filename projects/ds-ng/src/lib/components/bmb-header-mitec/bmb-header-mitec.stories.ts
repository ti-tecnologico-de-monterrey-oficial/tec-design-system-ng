import type { Meta, StoryObj } from '@storybook/angular';
import { BmbHeaderMitecComponent } from './bmb-header-mitec.component';

export default {
  title: 'Internal/Header mitec',
  component: BmbHeaderMitecComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbHeaderMitecComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`
Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    actionHeaders: {
      name: 'Action header',
      control: { type: 'object' },
      description:
        'Sets an array of IBmbActionHeader objects, default value is an empty array.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[] (empty array)' },
        type: {
          summary:
            'IBmbActionHeader[], {icon: string; iconSize?: number; iconActiveToggle?: string; isToggleActive?: boolean; isAccentColor?: boolean; link?: string; target?: IBmbTargetLink; action: () => void;}',
        },
      },
    },
  },
  args: {
    actionHeaders: [
      {
        icon: 'nutrition',
        link: 'https://www.youtube.com/',
        action: () => {},
      },
      {
        icon: 'smart_toy',
        link: 'https://www.youtube.com/',
        action: () => {},
      },
      {
        icon: 'raven',
        link: 'https://www.youtube.com/',
        action: () => {},
      },
      {
        icon: 'ar_on_you',
        link: 'https://www.youtube.com/',
        action: () => {},
      },
      {
        icon: 'photo_camera',
        link: 'https://www.youtube.com/',
        action: () => {},
      },
      {
        icon: 'youtube_activity',
        link: 'https://www.youtube.com/',
        action: () => {},
      },
    ],
  },
} as Meta<typeof BmbHeaderMitecComponent>;

type Story = StoryObj<BmbHeaderMitecComponent>;

export const Default: Story = {};
