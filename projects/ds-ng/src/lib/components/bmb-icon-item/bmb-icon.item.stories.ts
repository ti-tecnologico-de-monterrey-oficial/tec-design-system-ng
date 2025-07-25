import {
  componentWrapperDecorator,
  moduleMetadata,
  StoryObj,
  type Meta,
} from '@storybook/angular';
import { BmbIconItemComponent } from './bmb-icon-item.component';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';

export default {
  title: 'Components/Visual labels/Icon item',
  component: BmbIconItemComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbDividerComponent],
      providers: [],
    }),
    componentWrapperDecorator((story: string) => {
      return `<div style="max-width: 560px; margin: 0 auto">
          ${story}
        </div>`;
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbIconItemComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbIconItemComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class AppComponent {
}
...
\`\`\`


Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description: 'Sets the icon for the item.',
      table: { category: 'Properties', type: { summary: 'string (required)' } },
    },
    iconSize: {
      name: 'Icon size',
      control: { type: 'number' },
      description: "Sets the size of the item's icon.",
      table: {
        category: 'Properties',
        defaultValue: { summary: 24 },
        type: { summary: 'number' },
      },
    },
    label: {
      name: 'Label',
      control: { type: 'text' },
      description:
        'Sets the label for the item. This corresponds to the text shown on the left.',
      table: { category: 'Properties', type: { summary: 'string (required)' } },
    },
    value: {
      name: 'Value',
      control: { type: 'text' },
      description: `Sets the value for the item. This corresponds to the text shown on the right.

You can pass plain text or valid HTML tags. If HTML is used, it will be safely rendered inside the component.`,
      table: { category: 'Properties', type: { summary: 'string (required)' } },
    },
  },
  args: {
    icon: 'calendar_month',
    iconSize: 24,
    label: 'Semestre',
    value: `<a href="https://linkedin.com">Ir a enlace Linkedin</a>`,
  },
} as Meta<typeof BmbIconItemComponent>;

type Story = StoryObj<BmbIconItemComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <bmb-icon-item
        [icon]="icon"
        [iconSize]="iconSize"
        [label]="label"
        [value]="value"
      />
      <bmb-divider />
    `,
  }),
};
