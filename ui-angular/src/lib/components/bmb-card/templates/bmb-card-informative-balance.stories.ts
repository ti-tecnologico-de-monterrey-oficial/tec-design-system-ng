import { moduleMetadata } from '@storybook/angular';
import type { Meta } from '@storybook/angular';
import { BmbCardExampleComponent, cardExampleStory } from './bmb-card-examples.story';

const meta: Meta<BmbCardExampleComponent> = {
  title: 'Templates/Generic card/Informative balance',
  component: BmbCardExampleComponent,
  tags: ['!autodocs'],
  decorators: [moduleMetadata({ imports: [BmbCardExampleComponent] })],
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Tarjeta de balance compuesta con elementos Bamboo, sin estilos personalizados. El botón de ampliar es demostrativo.' } },
  },
};
export default meta;

export const Desktop = cardExampleStory('informative-balance');
export const Mobile = cardExampleStory('informative-balance', true);
