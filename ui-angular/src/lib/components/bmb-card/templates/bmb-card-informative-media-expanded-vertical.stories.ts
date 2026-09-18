import { moduleMetadata } from '@storybook/angular';
import type { Meta } from '@storybook/angular';
import { BmbCardExampleComponent, cardExampleStory } from './bmb-card-examples.story';

const meta: Meta<BmbCardExampleComponent> = {
  title: 'Templates/Generic card/Informative media expanded vertical',
  component: BmbCardExampleComponent,
  tags: ['!autodocs'],
  decorators: [moduleMetadata({ imports: [BmbCardExampleComponent] })],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component: `Composición Bamboo de GenericCard.

- **Visibilidad del ID según el rol:** Implementa en la aplicación consumidora la lógica para mostrar u ocultar el texto del ID según el rol del usuario.
- **Límite de líneas de texto:** Implementa en la aplicación consumidora la lógica que determine cuántas líneas de texto se muestran en la plantilla.

Estas reglas deben definirse en la aplicación consumidora; la plantilla no las aplica automáticamente.`,
      },
    },
  },
};
export default meta;

export const Desktop = cardExampleStory('informative-media-expanded-vertical');
export const Mobile = cardExampleStory('informative-media-expanded-vertical', true);
