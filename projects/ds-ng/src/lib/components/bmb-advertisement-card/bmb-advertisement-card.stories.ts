import type { Meta, StoryObj } from '@storybook/angular';
import { BmbAdvertisementCardComponent } from './bmb-advertisement-card.component';

export default {
  title: 'Micro Componentes/Advertisement Card',
  component: BmbAdvertisementCardComponent,
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
        data: IBmbAdvertisementData = {
        promociones: [
          {
            imgData:{
              url:'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg',
              alt:'Imagen',
            },
            content:{
              title: 'Lorem ipsum dolor sit amet',
              description: 'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
              linkBtn: 'www.google.com',
              labelBtn: 'ACTION'
            }
          },
        ],
        avisos: [
          {
            imgData:{
              url:'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg',
              alt:'AVISOS',
            },
            content:{
                title: 'Lorem ipsum dolor sit amet avisos',
                description: 'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
                linkBtn: 'www.google.com',
                labelBtn: 'ACTION'
            }
          },
        ],
        informacion: [
          {
            imgData:{
              url:'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg',
              alt:'PROMO',
            },
            content:{
                title: 'Lorem ipsum dolor sit amet',
                description: 'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
                linkBtn: 'www.google.com',
                labelBtn: 'ACTION'
            }
          },
        ],
    },
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
        type: 'IBmbAdvertisementData',
      },
      description: 'Set information that the component will show',
      table: {
        category: 'Properties',
        type: { summary: 'object' },
        defaultValue: { summary: `{}` },
      },
    },
    subtitle: {
      name: 'Subititle',
      control: {
        type: 'text',
      },
      description: 'Set the subtitle that the card shows when its expanded',
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
            title: 'Lorem ipsum dolor sit amet',
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
            title: 'Lorem ipsum',
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
            title: 'Lorem ipsum dolor',
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
            url: 'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg',
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
            url: 'https://content.elmueble.com/medio/2023/03/29/razas-de-perros_725466fb_230329160906_900x900.jpg',
            alt: 'AVISOS',
          },
          content: {
            title: 'Lorem ipsum dolor sit amet',
            description:
              'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
            linkBtn: 'www.google.com',
            labelBtn: 'ACTION',
          },
        },
        {
          imgData: {
            url: 'https://content.elmueble.com/medio/2024/04/03/razas-de-perros-pequenos_0718680a_240403083147_900x900.jpg',
            alt: 'Imagen',
          },
          content: {
            title: 'Lorem ipsum dolor sit amet',
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
            url: 'https://farm2.staticflickr.com/1919/45579541712_f58c1fd0ed_o.jpg',
            alt: 'PROMO',
          },
          content: {
            title: 'Lorem ipsum dolor sit amet',
            description:
              'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
            linkBtn: 'www.google.com',
            labelBtn: 'ACTION',
          },
        },
        {
          imgData: {
            url: 'https://content.elmueble.com/medio/2023/03/29/razas-de-perros_725466fb_230329160906_900x900.jpg',
            alt: 'PROMO',
          },
          content: {
            title: 'Lorem ipsum dolor sit amet',
            description:
              'lorem commodi eveniet ullam accusantium officiis mollitia error ipsa sapiente.',
            linkBtn: 'www.google.com',
            labelBtn: 'ACTION',
          },
        },
        {
          imgData: {
            url: 'https://content.elmueble.com/medio/2024/04/03/razas-de-perros-pequenos_0718680a_240403083147_900x900.jpg',
            alt: 'PROMO',
          },
          content: {
            title: 'Lorem ipsum dolor sit amet',
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

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
        <bmb-advertisement-card [subtitle]="'Titulo'" [data]="data"></bmb-advertisement-card>
    `,
  }),
};
