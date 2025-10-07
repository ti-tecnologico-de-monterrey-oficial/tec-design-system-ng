import { Meta, StoryObj } from '@storybook/angular';
import { BmbCarouselComponent } from './bmb-carousel.component';
import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import {
  DESIGN_SYSTEM_TITLE,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';

export default {
  title: 'Components/Status indicators/Carousel',
  component: BmbCarouselComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BmbCarouselComponent, BmbHomeCardComponent],
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'numberOfElements',
          'selectedIndex',
          'swipeThreshold',
          'touchEndX',
          'touchStartX',
          'onTouchEnd',
          'onTouchMove',
          'onTouchStart',
          'selectItem',
          'setClassActive',
          'ngAfterContentInit',
          'contentChildren',
        ],
      },
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({ name: 'carousel' })} to present a series of sequentially rotating content by clicking or swiping to view the next or previous item.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/componentes/carousel/descripcion-general-5KuPHrn1',
  },
)}
${getSpecialSpecifications(`Any ${DESIGN_SYSTEM_TITLE} component or html element can be easily added to \`bmb-carousel\`.
><br/><br/>
###${RELEVANT_TITLE.important}
It is essential to add ***#carouselItem*** to each of the elements or components that \`bmb-carousel\` will embrace.
`)}
${getBasicExampleBlock('BmbCarouselComponent')}
\`\`\`html
<bmb-carousel>
<!-- Add your ${DESIGN_SYSTEM_TITLE} component or HTML code, please remember to add #carouselItem for each of them -->
</bmb-carousel>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    carouselItem: {
      name: '#carouselItem',
      control: { type: '' },
      description: `
  Assigns the element or component as @ContentChildren of \`bmb-carousel\`, as long as it is inside \`bmb-carousel\`.

  For each element or component with #carouselItem there will be a slider item in the carousel.`,
      table: {
        category: 'Properties',
      },
    },
  },
  args: {},
} as Meta<typeof BmbCarouselComponent>;

type Story = StoryObj<BmbCarouselComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
<bmb-carousel>
  <h1 #carouselItem>Slide 1</h1>
  <div #carouselItem>
    <img
    width="100%"
    alt="gatito"
    src="https://img.freepik.com/fotos-premium/dia-internacional-gato-8-agosto-gatos-lindos-gatito-pequeno-hermosos-pequenos-animales-compania-verdadero-amigo-bonitos-divertidos-tiernos-esponjosos-juguetones-shorties-ia-generativa_887181-4265.jpg?w=2000"
  />
  </div>
  <h1 #carouselItem>Slide 3</h1>
</bmb-carousel>
  `,
  }),
};
