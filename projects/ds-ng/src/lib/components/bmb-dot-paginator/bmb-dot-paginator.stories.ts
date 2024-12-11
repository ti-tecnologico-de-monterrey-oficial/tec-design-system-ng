import { Meta, StoryObj } from '@storybook/angular';
import { BmbDotPaginatorComponent } from './bmb-dot-paginator.component';

export interface Target {
  target: string;
  index: number;
}

export default {
  title: 'Micro Componentes/Dot Paginator',
  component: BmbDotPaginatorComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbDotPaginatorComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

export interface Target {
  target: string;
  index: number;
}

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbDotPaginatorComponent ],
  templateUrl: '
  <!-- USE EXAMPLE -->
      <figure>
        <picture>
          <source
            media="(min-width: 100px)"
            [srcset]="imgArray[myActiveDotIndex]"
          />
          <img
            [loading]="'lazy'"
            [srcset]="imgArray[myActiveDotIndex]"
            alt=""
          />
        </picture>
      </figure>

      <bmb-dot-paginator
        [activeDotIndex]="myActiveDotIndex"
        [totalDots]="imgArray.length"
        (onDotPress)="handleDotPress($event)"
      ></bmb-dot-paginator>  
  ',
  styleUrl: './component.scss',
})

export class Component {
  imgArray = [
    'https://es.mypet.com/wp-content/uploads/sites/23/2021/03/GettyImages-1143107320-e1597136744606.jpg',
    'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/15665/production/_107435678_perro1.jpg',
    'https://definicion.de/wp-content/uploads/2013/03/perro-1.jpg',
    'https://www.cdc.gov/flu-in-animals/media/images/influenzaindogstp4.jpg'
  ]
  myActiveDotIndex: number = 1;
  myTotalDots: number = 5;
  myTargets: Target[] = [
    { target: '#item1', index: 0 },
    { target: '#item2', index: 1 },
  ];

  handleDotPress(index: number): void {
    this.myActiveDotIndex = index;
  }
}
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    appearance: {
      name: 'Appearance',
      control: {
        type: 'radio',
      },
      options: ['primary', 'secondary'],
      description:
        'The style of the dot paginator. Is not neccesary to add the "primary" style.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'primary' },
        type: { summary: 'string' },
      },
    },
    activeDotIndex: {
      name: 'Active dot index',
      control: 'number',
      description: 'Index of the active dot.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
    totalDots: {
      name: 'Total Dots',
      control: 'number',
      description: 'Total number of dots.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 5 },
        type: { summary: 'number' },
      },
    },
    targets: {
      name: 'Targets',
      control: 'object',
      description: 'Target objects for each dot.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'optional' },
        type: { summary: 'Target[]' },
      },
    },
    onDotPress: {
      name: 'On Dot Press',
      control: {
        type: '',
      },
      description:
        'This handler can be used to perform a specific interaction with each dot.',
      table: {
        category: 'Events',
        type: { summary: '(onDotPress)="yourFunction($event)"' },
      },
    },
  },
  args: {
    activeDotIndex: 0,
    totalDots: 5,
    targets: [
      { target: '#item1', index: 0 },
      { target: '#item2', index: 1 },
    ],
  },
} as Meta<typeof BmbDotPaginatorComponent>;

type Story = StoryObj<BmbDotPaginatorComponent>;

export const Default: Story = {
  render: (args) => ({
    template: `
      <bmb-dot-paginator
        [activeDotIndex]="myActiveDotIndex"
        [totalDots]="5"
        (onDotPress)="handleDotPress($event)"
      ></bmb-dot-paginator> 
    `,
  }),
};
