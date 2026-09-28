import { moduleMetadata } from '@storybook/angular';
import type { Meta } from '@storybook/angular';
import { BmbCardExampleComponent, cardExampleStory } from './bmb-card-examples.story';

const meta: Meta<BmbCardExampleComponent> = {
  title: 'Templates/Generic card/Informative',
  component: BmbCardExampleComponent,
  tags: ['!autodocs'],
  decorators: [moduleMetadata({ imports: [BmbCardExampleComponent] })],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Uses the same Informative markup as the Angular template. The copied HTML requires isInformativeMobile (a BreakpointObserver signal for width < 1001px), informativeImage, and handleButtonClick from BmbCardExampleComponent in bmb-card-examples.story.ts.',
      },
    },
  },
};
export default meta;

export const Desktop = cardExampleStory('informative');
export const Mobile = cardExampleStory('informative', true);
