import { Meta, StoryObj } from '@storybook/angular';
import { BmbCarouselComponent } from './bmb-carousel.component';
import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';

export default {
  title: 'Macro Componentes/Carousel',
  component: BmbCarouselComponent,
  subcomponents: {},
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, BmbCarouselComponent, BmbHomeCardComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbCarouselComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbCarouselComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {},
  args: {},
} as Meta<typeof BmbCarouselComponent>;

type Story = StoryObj<BmbCarouselComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
<bmb-carousel>
<!-- Here you can add whatever you want to the carousel but need to add #carouselItem for each one -->
  <h1 #carouselItem>Slide 1</h1>
  <div #carouselItem><img
              width="100%"
              alt="gatito"
              src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
            /></div>
  <h1 #carouselItem>Slide 3</h1>
</bmb-carousel>
  `,
  }),
};
