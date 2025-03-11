import { moduleMetadata, StoryObj, type Meta } from '@storybook/angular';
import { attributes } from '../../utils/utils';
import { BmbIconItemComponent } from './bmb-icon-item.component';
import { BmbDividerComponent } from 'ds-ng';

export default {
  title: 'Macro Componentes/Icon item',
  component: BmbIconItemComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbDividerComponent],
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
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
      },
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
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
      },
    },
    value: {
      name: 'Value',
      control: { type: 'text' },
      description:
        'Sets the value for the item. This corresponds to the text shown on the right.',
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
      },
    },
  },
  args: {
    icon: 'calendar_month',
    iconSize: 24,
    label: 'Semestre',
    value: 'AGO-DIC 24',
  },
} as Meta<typeof BmbIconItemComponent>;

type Story = StoryObj<BmbIconItemComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
<!-- Instruction to users: This html is used for internal Storybook logic and should not be copied -->
<div style="max-width: 560px; margin: 0 auto">
  <!-- Example of how you can use this component -->
  <bmb-icon-item
    ${attributes(args)}
  />
  <!-- End of the example -->
  <bmb-divider />
</div>
    `,
  }),
};
