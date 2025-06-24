import type { Meta, StoryObj } from '@storybook/angular';
import { BmbAdvertisementCardComponent } from './bmb-advertisement-card.component';
import { storiesLayoutHorizontal } from '../../utils/bambooLayout';

export default {
  title: 'Components/Containers/Advertisement card',
  component: BmbAdvertisementCardComponent,
  decorators: [storiesLayoutHorizontal],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbAdvertisementCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbAdvertisementCardComponent, IBmbAdvertisementData ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})

export class AppComponent {
...
}
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    data: {
      name: 'Data Source',
      control: {
        type: 'object',
      },
      description: `
Sets information that the component will show.

    IBmbAdvertisementData = {
      promociones: Array<IBmbAdvertisementCard>;
      avisos: Array<IBmbAdvertisementCard>;
      informacion: Array<IBmbAdvertisementCard>;
    }

    IBmbAdvertisementCard = {
      content: IBmbAdvertisementContent;
      imgData: IBmbAdvertisementImage;
    };

    IBmbAdvertisementContent = {
      description: string;
      linkBtn?: string;
      title: string;
      labelBtn?: string;
    };

    export type IBmbAdvertisementImage = {
      alt: string;
      url: string;
    };

    IBmbTargetLink = '_blank' | '_parent' | '_self' | '_top';
      `,
      table: {
        category: 'Properties',
        type: { summary: 'IBmbAdvertisementData' },
        defaultValue: { summary: `{}` },
      },
    },
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: 'Sets the title that the card shows',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'Mis Anuncios' },
      },
    },
    subtitle: {
      name: 'Subititle',
      control: {
        type: 'text',
      },
      description: 'Sets the subtitle that the card shows when its expanded',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
  args: {
    data: {
      promociones: [
        {
          imgData: {
            url: 'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg',
            alt: 'Imagen',
          },
          content: {
            title: 'Lorem ipsum dolor sit amet p1',
            description:
              'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
            linkBtn: 'www.google.com',
            labelBtn: 'ACTION',
          },
        },
        {
          imgData: {
            url: 'https://content.elmueble.com/medio/2023/03/29/razas-de-perros_725466fb_230329160906_900x900.jpg',
            alt: 'Imagen',
          },
          content: {
            title: 'Lorem ipsum p2',
            description:
              'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente. lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente. lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
            linkBtn: 'www.google.com',
            labelBtn: 'GO',
          },
        },
        {
          imgData: {
            url: 'https://content.elmueble.com/medio/2024/04/03/razas-de-perros-pequenos_0718680a_240403083147_900x900.jpg',
            alt: 'Imagen',
          },
          content: {
            title: 'Lorem ipsum dolor p3',
            description:
              'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente. lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente. lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente. lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente. lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente. lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
            linkBtn: 'www.google.com',
            labelBtn: 'ACTION',
          },
        },
      ],
      avisos: [
        {
          imgData: {
            url: 'https://picsum.photos/id/10/200/300',
            alt: 'AVISOS',
          },
          content: {
            title: 'Lorem ipsum dolor sit amet avisos',
            description:
              'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
            linkBtn: 'www.google.com',
            labelBtn: 'ACTION',
          },
        },
        {
          imgData: {
            url: 'https://picsum.photos/id/11/200/300',
            alt: 'AVISOS',
          },
          content: {
            title: 'Lorem ipsum dolor sit amet a2',
            description:
              'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
            linkBtn: 'www.google.com',
            labelBtn: 'ACTION',
          },
        },
        {
          imgData: {
            url: 'https://picsum.photos/id/18/200/300',
            alt: 'Imagen',
          },
          content: {
            title: 'Lorem ipsum dolor sit amet a3',
            description:
              'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
            linkBtn: 'www.google.com',
            labelBtn: 'ACTION',
          },
        },
      ],
      informacion: [
        {
          imgData: {
            url: 'https://picsum.photos/id/48/200/300',
            alt: 'PROMO',
          },
          content: {
            title: 'Lorem ipsum dolor sit amet i1',
            description:
              'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
            linkBtn: 'www.google.com',
            labelBtn: 'ACTION',
          },
        },
        {
          imgData: {
            url: 'https://picsum.photos/id/8/200/300',
            alt: 'PROMO',
          },
          content: {
            title: 'Lorem ipsum dolor sit amet i2',
            description:
              'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
            linkBtn: 'www.google.com',
            labelBtn: 'ACTION',
          },
        },
      ],
    },
    subtitle: 'Subtitulo',
  },
} as Meta<typeof BmbAdvertisementCardComponent>;

type Story = StoryObj<BmbAdvertisementCardComponent>;

export const Default: Story = {};
