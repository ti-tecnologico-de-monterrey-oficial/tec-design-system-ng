import { moduleMetadata } from '@storybook/angular';
import type { Meta } from '@storybook/angular';
import { BmbCardExampleComponent, cardExampleStory } from './bmb-card-examples.story';

const meta: Meta<BmbCardExampleComponent> = {
  title: 'Components/Containers/Generic card/Informative FocusElement',
  component: BmbCardExampleComponent,
  tags: ['!autodocs'],
  decorators: [moduleMetadata({ imports: [BmbCardExampleComponent] })],
  parameters: {
    controls: { disable: true },
    docs: { description: { component: 'Composición Bamboo de GenericCard. El estado de demostración y los estilos locales están en bmb-card-examples.story.ts y bmb-card-examples.story.scss.' } },
  },
};
export default meta;

export const Desktop = cardExampleStory('informative-focus-element');
export const Mobile = cardExampleStory('informative-focus-element', true);
