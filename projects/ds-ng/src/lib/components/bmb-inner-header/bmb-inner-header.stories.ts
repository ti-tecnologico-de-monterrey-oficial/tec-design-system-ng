import { Meta, StoryFn } from '@storybook/angular';
import { BmbInnerHeaderComponent } from './bmb-inner-header.component';
import { attributes, attributesText } from '../../utils/utils';

export default {
  title: 'Micro Componentes/Inner Header Mobile',
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
   handleSearch(event: string): void {
    console.log('Received search value:', event);
  }
}
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    title: {
      name: 'Title',
      control: { type: 'text' },
      description: 'Sets the main title for the header.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    placeholderSearch: {
      name: 'Placeholder Search',
      control: { type: 'text' },
      description: 'Defines the placeholder text for the search input.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    subTitle: {
      name: 'Sub Title',
      control: { type: 'text' },
      description: 'Displays a subtitle below the main title.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    trailingIconPrimary: {
      name: 'Trailing Icon Primary',
      control: { type: 'text' },
      description: 'Specifies the icon shown as the primary trailing icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    trailingIconSecondary: {
      name: 'Trailing Icon Secondary',
      control: { type: 'text' },
      description: 'Specifies the icon shown as the secondary trailing icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    showClose: {
      name: 'Show Close',
      control: { type: 'boolean' },
      description: 'Toggles the visibility of the close button.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
      },
    },
    showReturn: {
      name: 'Show Return',
      control: { type: 'boolean' },
      description: 'Displays the return button if true.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
      },
    },
    showSearch: {
      name: 'Show Search',
      control: { type: 'boolean' },
      description: 'Toggles the visibility of the search bar.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
      },
    },
    onHandleBack: {
      name: 'On Handle Back',
      control: { type: '' },
      description: 'Event triggered when the back button is clicked.',
      table: {
        category: 'Events',
        type: { summary: '(onHandleBack)="yourFunction()"' },
      },
    },
    onHandleClose: {
      name: 'On Handle Close',
      control: { type: '' },
      description: 'Event triggered when the close button is clicked.',
      table: {
        category: 'Events',
        type: { summary: '(onHandleClose)="yourFunction()"' },
      },
    },
    onHandleTrailingPrimary: {
      name: 'On Handle Trailing Primary',
      control: { type: '' },
      description: 'Event triggered when the primary trailing icon is clicked.',
      table: {
        category: 'Events',
        type: { summary: '(onHandleTrailingPrimary)="yourFunction()"' },
      },
    },
    onHandleTrailingSecondary: {
      name: 'On Handle Trailing Secondary',
      control: { type: '' },
      description:
        'Event triggered when the secondary trailing icon is clicked.',
      table: {
        category: 'Events',
        type: { summary: '(onHandleTrailingSecondary)="yourFunction()"' },
      },
    },
    searchData: {
      name: 'Search Data',
      control: { type: 'void' },
      description: 'Output emitted when the user initiates a search.',
      table: {
        category: 'Outputs',
        type: { summary: 'void' },
      },
    },
    isLoading: {
      name: 'Is Loading',
      description:
        'This property is deprecated and will be removed in future versions.',
      table: {
        category: 'Deprecated',
        deprecated: {
          summary:
            'This property is deprecated and will be removed in future versions.',
        },
      },
    },
    data: {
      name: 'Data',
      description:
        'This property is deprecated and will be removed in future versions.',
      table: {
        category: 'Deprecated',
        deprecated: {
          summary:
            'This property is deprecated and will be removed in future versions.',
        },
      },
    },
    test_text: {
      name: 'Text',
      description: 'Header content example.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    onValueChange: {
      name: 'On Value Change',
      description:
        'This property is deprecated and will be removed in future versions.',
      table: {
        category: 'Deprecated',
        deprecated: {
          summary:
            'This property is deprecated and will be removed in future versions.',
        },
      },
    },
  },
  args: {
    title: 'My Title',
    placeholderSearch: 'Search',
    showClose: true,
    showReturn: false,
    showSearch: false,
    subTitle: 'http://www.link.com',
    trailingIconPrimary: 'lock',
    trailingIconSecondary: 'home',
    test_text: 'hello world',
    onHandleBack: () => {
      window.alert('Back button clicked in Storybook');
    },
    onHandleTrailingPrimary: () => {
      window.alert('Trailing Primary button clicked in Storybook');
    },
    onHandleTrailingSecondary: () => {
      window.alert('Trailing Secondary button clicked in Storybook');
    },
    onHandleClose: () => {
      window.alert('Close button clicked in Storybook');
    },
  },
} as Meta<typeof BmbInnerHeaderComponent>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
    <!-- Example of how you can use this component. -->
    <bmb-inner-header
      ${attributes(args)}
    >
      <!-- Example of content. The content can be a bamboo component or html. -->
      <div style="text-align: center;">${attributesText(args)}</div>
    </bmb-inner-header>
  `,
});

export const Default = customizable();
