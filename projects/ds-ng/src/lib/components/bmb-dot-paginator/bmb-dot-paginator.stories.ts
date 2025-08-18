import { Meta, StoryObj } from '@storybook/angular';
import { BehaviorSubject } from 'rxjs';
import { BmbDotPaginatorComponent } from './bmb-dot-paginator.component';
import {
  attributes,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
} from '../../utils/doc/utils';
import {
  getAppearanceParam,
  getOnClickParam,
} from '../../utils/doc/parameterDescriptions';

export interface Target {
  target: string;
  index: number;
}

export default {
  title: 'Components/Status indicators/Dot paginator',
  component: BmbDotPaginatorComponent,
  parameters: {
    docs: {
      controls: { exclude: ['getDotsArray', 'onDotClicked', 'getClasses'] },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('dot-paginator')} to create a pager using dots to select elements.`, 'https://bamboo.tec.mx/latest/componentes/dot-paginator/descripcion-general-gKwavF4A')}
${getBasicExampleBlock(
  'BmbDotPaginatorComponent',
  '',
  `imgArray = [
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
  }`,
)}
\`\`\`html
<!-- EXAMPLE -->
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
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    appearance: getAppearanceParam(
      'dot paginator',
      ['primary', 'secondary'],
      'primary',
    ),
    activeDotIndex: {
      control: 'number',
      description: 'Sets the index of the active dot.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
    totalDots: {
      control: 'number',
      description: 'Sets the total number of dots.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
    targets: {
      control: 'object',
      description: 'Target objects for each dot.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
        type: {
          summary: 'Target[]',
          detail: `Target {
  target: string;
  index: number;
}`,
        },
      },
    },
    onDotPress: getOnClickParam(
      getOnEvent('each dot', 'onDotPress', 'number'),
      ``,
    ),
  },
  args: {
    activeDotIndex: 0,
    totalDots: 4,
    targets: [
      { target: '#item1', index: 0 },
      { target: '#item2', index: 1 },
      { target: '#item3', index: 2 },
      { target: '#item4', index: 3 },
    ],
  },
} as Meta<typeof BmbDotPaginatorComponent>;

type Story = StoryObj<BmbDotPaginatorComponent>;

export const Default: Story = {
  render: (args) => {
    // If `args.activeDotIndex` is a ModelSignal<number>, extract its value.
    const initialActiveDotIndex =
      typeof args.activeDotIndex === 'function'
        ? (args.activeDotIndex as () => number)() // Call the signal to get the number value
        : args.activeDotIndex;

    const activeDotIndex$ = new BehaviorSubject<number>(initialActiveDotIndex);

    return {
      props: {
        ...args,
        activeDotIndex$: activeDotIndex$, // Pass the BehaviorSubject
        getActiveDotIndex: () => activeDotIndex$.value, // Function to get the current value
        handleDotPress: (index: number) => {
          activeDotIndex$.next(index); // Update the BehaviorSubject value
          console.log('Active dot changed to:', index);
        },
      },
      template: `
        <div style="display: flex; justify-content: center;">
          <!-- Dynamically display the image based on the active dot -->
          <figure *ngIf="getActiveDotIndex() === 0">
            <picture>
              <source
                media="(min-width: 100px)"
                srcset="https://es.mypet.com/wp-content/uploads/sites/23/2021/03/GettyImages-1143107320-e1597136744606.jpg"
              />
              <img
                [loading]="'lazy'"
                srcset="https://es.mypet.com/wp-content/uploads/sites/23/2021/03/GettyImages-1143107320-e1597136744606.jpg"
                alt="Dog 1"
              />
            </picture>
          </figure>
          <figure *ngIf="getActiveDotIndex() === 1">
            <picture>
              <source
                media="(min-width: 100px)"
                srcset="https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/15665/production/_107435678_perro1.jpg"
              />
              <img
                [loading]="'lazy'"
                srcset="https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/15665/production/_107435678_perro1.jpg"
                alt="Dog 2"
              />
            </picture>
          </figure>
          <figure *ngIf="getActiveDotIndex() === 2">
            <picture>
              <source
                media="(min-width: 100px)"
                srcset="https://definicion.de/wp-content/uploads/2013/03/perro-1.jpg"
              />
              <img
                [loading]="'lazy'"
                srcset="https://definicion.de/wp-content/uploads/2013/03/perro-1.jpg"
                alt="Dog 3"
              />
            </picture>
          </figure>
          <figure *ngIf="getActiveDotIndex() === 3">
            <picture>
              <source
                media="(min-width: 100px)"
                srcset="https://www.cdc.gov/flu-in-animals/media/images/influenzaindogstp4.jpg"
              />
              <img
                [loading]="'lazy'"
                srcset="https://www.cdc.gov/flu-in-animals/media/images/influenzaindogstp4.jpg"
                alt="Dog 4"
              />
            </picture>
          </figure>
        </div>
        <!-- Dot paginator with event binding -->
        <bmb-dot-paginator
           ${attributes(args)}
           (onDotPress)="handleDotPress($event)"
        ></bmb-dot-paginator>
      `,
    };
  },
};
