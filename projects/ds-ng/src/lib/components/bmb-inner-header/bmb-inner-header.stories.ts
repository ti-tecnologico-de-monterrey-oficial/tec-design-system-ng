import { Meta, StoryObj } from '@storybook/angular';
import { BmbInnerHeaderComponent } from './bmb-inner-header.component';

export default {
  title: 'Micro Componentes/Inner Header',
  component: BmbInnerHeaderComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbInnerHeaderComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbInnerHeaderComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class AppComponent {
  title = 'My Title';
  isLoading = false;
  data = ['Item 1', 'Item 2', 'Item 3'];

  handleBack() {
    console.log('Back button clicked');
  }

  handleSearch() {
    console.log('Search button clicked');
  }

  handleValueChange(value: string) {
    console.log('Value changed:', value);
  }
}
\`\`\`

Below is an example of how you can use this component in HTML:

\`\`\`html
<bmb-inner-header
  [title]="title"
  [isLoading]="isLoading"
  [data]="data"
  (onHandleBack)="handleBack()"
  (onHandleSearch)="handleSearch()"
  (onValueChange)="handleValueChange($event)"
></bmb-inner-header>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: 'The title of the inner header section.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    isLoading: {
      name: 'Is Loading',
      control: { type: 'boolean' },
      description: 'Loading state of the component.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
      },
    },
    data: {
      name: 'Data',
      control: {
        type: 'array',
      },
      description: 'Array of data items for the search input.',
      table: {
        category: 'Properties',
        type: { summary: 'string[]' },
      },
    },
    onHandleBack: {
      name: 'On Handle Back',
      control: { type: '' },
      description: 'Event emitted when the back button is clicked.',
      table: {
        category: 'Events',
        type: { summary: '(onHandleBack)="yourFunction()"' },
      },
    },
    onHandleSearch: {
      name: 'On Handle Search',
      control: { type: '' },
      description: 'Event emitted when the search button is clicked.',
      table: {
        category: 'Events',
        type: { summary: '(onHandleSearch)="yourFunction()"' },
      },
    },
    onValueChange: {
      name: 'On Value Change',
      control: { type: '' },
      description: 'Event emitted when the value changes.',
      table: {
        category: 'Events',
        type: { summary: '(onValueChange)="yourFunction($event)"' },
      },
    },
  },
  args: {
    title: 'My Title',
    isLoading: false,
    data: ['Item 1', 'Item 2', 'Item 3'],
    onHandleBack: () => {
      window.alert('Back button clicked in Storybook');
    },
    onHandleSearch: () => {
      window.alert('Search button clicked in Storybook');
    },
    onValueChange: (value: string) => {
      window.alert(`Value changed in Storybook: ${value}`);
    },
  },
} as Meta<typeof BmbInnerHeaderComponent>;

type Story = StoryObj<BmbInnerHeaderComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <bmb-inner-header
        [src]="src"
        [mobileSrc]="mobileSrc"
        [alt]="alt"
        [width]="width"
        [ratio]="ratio"
        [borderRadius]="borderRadius"
        [loading]="loading"
        [enableZoom]="enableZoom"
        [isBlurredBackdrop]="isBlurredBackdrop"
        [type]="type"
      >
        <h2>Custom Component</h2>
        <p>Custom component area has a max height 90px (transformed to rem) no scrollable.</p>
        <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Bibendum augue facilisi ac fusce porttitor. Lacus torquent nullam libero iaculis sociosqu parturient. Inceptos amet lectus turpis in curabitur. Ultricies vulputate massa vitae volutpat odio neque. Eros hendrerit dis facilisi praesent placerat diam dapibus primis. Aenean fringilla curabitur tincidunt eu phasellus ante. Class leo diam tristique ligula ullamcorper imperdiet sociosqu fermentum?</p>
      </bmb-inner-header>
    `,
  }),
};
